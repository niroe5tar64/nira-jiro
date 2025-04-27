import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { MarkdownBlockNode, type MarkdownInlineNode } from ".";

export class MarkdownParagraphNode extends MarkdownBlockNode {
  constructor(public children: MarkdownInlineNode[]) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitParagraph(this);
  }
}
