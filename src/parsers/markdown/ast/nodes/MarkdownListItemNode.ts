import type { AbstractMarkdownNodeVisitor } from "../render-visitors";

import { type ListItemContext, MarkdownBlockNode } from ".";

export class MarkdownListItemNode extends MarkdownBlockNode {
  constructor(public children: MarkdownBlockNode[]) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor, context: ListItemContext): string {
    return visitor.visitListItem(this, context);
  }
}
