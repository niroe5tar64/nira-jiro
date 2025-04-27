import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { MarkdownBlockNode } from ".";

export class MarkdownCodeBlockNode extends MarkdownBlockNode {
  constructor(
    public language: string | null,
    public content: string,
  ) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitCodeBlock(this);
  }
}
