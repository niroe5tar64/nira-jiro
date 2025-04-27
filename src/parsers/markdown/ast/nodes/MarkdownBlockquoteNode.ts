import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { MarkdownBlockNode } from ".";

export class MarkdownBlockquoteNode extends MarkdownBlockNode {
  constructor(public children: MarkdownBlockNode[]) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitBlockquote(this);
  }
}
