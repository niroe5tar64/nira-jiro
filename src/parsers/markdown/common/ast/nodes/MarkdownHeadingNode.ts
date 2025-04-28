import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { type MarkdownInlineNode, MarkdownBlockNode } from ".";

export class MarkdownHeadingNode extends MarkdownBlockNode {
  constructor(
    public level: number,
    public children: MarkdownInlineNode[],
  ) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitHeading(this);
  }
}
