import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

// Dialects
import { BlockLexer as StandardBlockLexer } from "./dialects/standard/lexer/BlockLexer";
import { BlockParser as StandardBlockParser } from "./dialects/standard/parser/BlockParser";
import { BlockLexer as JiraBlockLexer } from "./dialects/jira/lexer/BlockLexer";
import { BlockParser as JiraBlockParser } from "./dialects/jira/parser/BlockParser";

// Visitors
import { StandardMarkdownRendererVisitor } from "./dialects/standard/visitors/StandardMarkdownRendererVisitor";
import { JiraMarkdownRendererVisitor } from "./dialects/jira/visitors/JiraMarkdownRendererVisitor";
import { DomRendererVisitor } from "./common/ast/visitors/DomRendererVisitor";

// Inline support
import { InlineLexer } from "./dialects/standard/lexer/InlineLexer";
import { InlineParser } from "./dialects/standard/parser/InlineParser";
import { attachInlineNodesToBlocks } from "./common/ast/helpers/attachInlineNodesToBlocks";

function attachInline(ast: MarkdownBlockNode[]): MarkdownBlockNode[] {
  return attachInlineNodesToBlocks(ast, (text) => {
    const inlineTokens = new InlineLexer(text).tokenize();
    return new InlineParser(inlineTokens).parse();
  });
}

// === Parse ===
export function parseStandardMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new StandardBlockLexer(source).tokenize();
  const ast = new StandardBlockParser(tokens).parse();
  return attachInline(ast);
}

export function parseJiraMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new JiraBlockLexer(source).tokenize();
  const ast = new JiraBlockParser(tokens).parse();
  return attachInline(ast);
}

// === Render ===
export function renderStandardMarkdown(ast: MarkdownBlockNode[]): string {
  const visitor = new StandardMarkdownRendererVisitor();
  return visitor.render(ast);
}

export function renderJiraMarkdown(ast: MarkdownBlockNode[]): string {
  const visitor = new JiraMarkdownRendererVisitor();
  return visitor.render(ast);
}

export function renderDomNode(ast: MarkdownBlockNode[]): DocumentFragment {
  const visitor = new DomRendererVisitor();
  return visitor.render(ast);
}
