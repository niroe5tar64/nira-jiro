import type { AbstractMarkdownNodeVisitor } from "../visitors";

import { MarkdownBlockNode } from ".";

export class MarkdownListItemNode extends MarkdownBlockNode {
  constructor(public children: MarkdownBlockNode[]) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitListItem(this);
  }
}
