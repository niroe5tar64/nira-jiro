import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

import { attachInlineNodesToBlocks } from "./common/ast/helpers/attachInlineNodesToBlocks";
import { DomRendererVisitor } from "./common/ast/visitors/DomRendererVisitor";
import { BlockLexer as JiraBlockLexer } from "./dialects/jira/lexer/BlockLexer";
import { BlockParser as JiraBlockParser } from "./dialects/jira/parser/BlockParser";
import { JiraMarkdownRendererVisitor } from "./dialects/jira/visitors/JiraMarkdownRendererVisitor";
import { BlockLexer as StandardBlockLexer } from "./dialects/standard/lexer/BlockLexer";
import { InlineLexer } from "./dialects/standard/lexer/InlineLexer";
import { BlockParser as StandardBlockParser } from "./dialects/standard/parser/BlockParser";
import { InlineParser } from "./dialects/standard/parser/InlineParser";
import { StandardMarkdownRendererVisitor } from "./dialects/standard/visitors/StandardMarkdownRendererVisitor";

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

// === Serialize / Deserialize ===
export function serializeAst(ast: MarkdownBlockNode[]): MarkdownBlockNode[] {
  // MarkdownBlockNode は Pure Object なので、ASTをそのまま利用可能。
  return ast;
}

export function deserializeAst(json: unknown): MarkdownBlockNode[] {
  // JSONをASTに変換する関数だが Pure Object なので、キャストするだけでOK
  return json as MarkdownBlockNode[];
}
