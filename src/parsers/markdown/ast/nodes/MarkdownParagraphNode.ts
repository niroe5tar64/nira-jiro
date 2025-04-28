import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { MarkdownBlockNode, type MarkdownInlineNode } from ".";

export class MarkdownParagraphNode extends MarkdownBlockNode {
  constructor(public children: MarkdownInlineNode[]) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitParagraph(this);
  }
}
