// 1. 型（必要なら）
import type { MarkdownBlockNode } from "./common/ast/nodes";
export type { MarkdownBlockNode };

// 2. パース関数
import { StandardLexer } from "./standard/lexer";
import { StandardParser } from "./standard/parser";
import { JiraLexer } from "./jira/lexer";
import { JiraParser } from "./jira/parser";

export function parseStandardMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new StandardLexer(source).tokenize();
  return new StandardParser(tokens).build();
}

export function parseJiraMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new JiraLexer(source).tokenize();
  return new JiraParser(tokens).build();
}

// 3. Markdown出力（Visitor）
import { StandardMarkdownRendererVisitor } from "./standard/visitors";
import { JiraMarkdownRendererVisitor } from "./jira/visitors";
import { HtmlRendererVisitor } from "./common/ast/visitors";

export function renderStandardMarkdown(ast: MarkdownBlockNode[]): string {
  const visitor = new StandardMarkdownRendererVisitor();
  return ast.map((node) => node.accept(visitor)).join("");
}

export function renderJiraMarkdown(ast: MarkdownBlockNode[]): string {
  const visitor = new JiraMarkdownRendererVisitor();
  return ast.map((node) => node.accept(visitor)).join("");
}

export function renderHtml(ast: MarkdownBlockNode[]): string {
  const visitor = new HtmlRendererVisitor();
  return ast.map((node) => node.accept(visitor)).join("");
}

// 4. シリアライズ系
export { serializeAst } from "./common/serializeAst";
export { deserializeAst } from "./common/deserializeAst";
