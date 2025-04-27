import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { type MarkdownListItemNode, MarkdownBlockNode } from ".";

export class MarkdownListNode extends MarkdownBlockNode {
  constructor(
    public ordered: boolean,
    public items: MarkdownListItemNode[],
  ) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitList(this);
  }
}
