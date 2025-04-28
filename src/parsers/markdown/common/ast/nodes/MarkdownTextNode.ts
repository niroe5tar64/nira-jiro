import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { MarkdownInlineNode } from ".";

export class MarkdownTextNode extends MarkdownInlineNode {
  constructor(public content: string) {
    super();
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitText(this);
  }
}
