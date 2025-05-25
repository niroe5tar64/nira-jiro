import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

import { attachInlineNodesToBlocks } from "./common/ast/helpers/attachInlineNodesToBlocks";
import { DomRendererVisitor } from "./common/ast/visitors/DomRendererVisitor";
import { BlockLexer as JiraBlockLexer } from "./dialects/jira/lexer/BlockLexer";
import { InlineLexer as JiraInlineLexer } from "./dialects/jira/lexer/InlineLexer";
import { BlockParser as JiraBlockParser } from "./dialects/jira/parser/BlockParser";
import { InlineParser as JiraInlineParser } from "./dialects/jira/parser/InlineParser";
import { JiraMarkdownRendererVisitor } from "./dialects/jira/visitors/JiraMarkdownRendererVisitor";
import { BlockLexer as StandardBlockLexer } from "./dialects/standard/lexer/BlockLexer";
import { InlineLexer as StandardInlineLexer } from "./dialects/standard/lexer/InlineLexer";
import { BlockParser as StandardBlockParser } from "./dialects/standard/parser/BlockParser";
import { InlineParser as StandardInlineParser } from "./dialects/standard/parser/InlineParser";
import { StandardMarkdownRendererVisitor } from "./dialects/standard/visitors/StandardMarkdownRendererVisitor";

// === Parse ===
export function parseStandardMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new StandardBlockLexer(source).tokenize();
  const ast = new StandardBlockParser(tokens).parse();

  return attachInlineNodesToBlocks(ast, (text) => {
    const inlineTokens = new StandardInlineLexer(text).tokenize();
    return new StandardInlineParser(inlineTokens).parse();
  });
}

export function parseJiraMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new JiraBlockLexer(source).tokenize();
  const ast = new JiraBlockParser(tokens).parse();

  return attachInlineNodesToBlocks(ast, (text) => {
    const inlineTokens = new JiraInlineLexer(text).tokenize();
    return new JiraInlineParser(inlineTokens).parse();
  });
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

// === Serialize / Deserialize ===
export function serializeAst(ast: MarkdownBlockNode[]): MarkdownBlockNode[] {
  // MarkdownBlockNode は Pure Object なので、ASTをそのまま利用可能。
  return ast;
}

export function deserializeAst(json: unknown): MarkdownBlockNode[] {
  // JSONをASTに変換する関数だが Pure Object なので、キャストするだけでOK
  return json as MarkdownBlockNode[];
}
