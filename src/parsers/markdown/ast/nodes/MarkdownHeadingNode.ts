import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { type MarkdownInlineNode, MarkdownBlockNode } from ".";

export class MarkdownHeadingNode extends MarkdownBlockNode {
  constructor(
    public level: number,
    public children: MarkdownInlineNode[],
  ) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitHeading(this);
  }
}
