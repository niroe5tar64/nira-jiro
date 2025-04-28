import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { MarkdownBlockNode } from ".";

export class MarkdownCodeBlockNode extends MarkdownBlockNode {
  constructor(
    public language: string | null,
    public content: string,
  ) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitCodeBlock(this);
  }
}
