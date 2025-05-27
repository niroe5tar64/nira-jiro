import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

import { DomRendererVisitor } from "./common/ast/visitors/DomRendererVisitor";
import { JiraMarkdownRendererVisitor } from "./dialects/jira/visitors/JiraMarkdownRendererVisitor";
import { StandardMarkdownRendererVisitor } from "./dialects/standard/visitors/StandardMarkdownRendererVisitor";

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
