import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { type MarkdownListItemNode, MarkdownBlockNode } from ".";

export class MarkdownListNode extends MarkdownBlockNode {
  constructor(
    public ordered: boolean,
    public items: MarkdownListItemNode[],
  ) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitList(this);
  }
}
