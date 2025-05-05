import type { AbstractMarkdownNodeVisitor } from "../visitors";
import { MarkdownInlineNode } from ".";

export class MarkdownBlankLineNode extends MarkdownInlineNode {
  public content;

  constructor() {
    super();
    this.content = "\n";
  }

  accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T {
    return visitor.visitBlankLine(this);
  }
}
