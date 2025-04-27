import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import { MarkdownInlineNode } from ".";

export class MarkdownTextNode extends MarkdownInlineNode {
  constructor(public content: string) {
    super();
  }

  accept(visitor: AbstractMarkdownNodeVisitor): string {
    return visitor.visitText(this);
  }
}
