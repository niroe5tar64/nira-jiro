import type { AbstractMarkdownNodeVisitor } from "../visitors";

export abstract class MarkdownNode {
  abstract accept<T>(visitor: AbstractMarkdownNodeVisitor<T>): T;
}

export abstract class MarkdownBlockNode extends MarkdownNode {}

export abstract class MarkdownInlineNode extends MarkdownNode {}
