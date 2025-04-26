import type { AbstractMarkdownNodeVisitor } from "../render-visitors";
import type { NodeContext } from ".";

export abstract class MarkdownNode {
  abstract accept(visitor: AbstractMarkdownNodeVisitor, context?: NodeContext): string;
}

export abstract class MarkdownBlockNode extends MarkdownNode {}

export abstract class MarkdownInlineNode extends MarkdownNode {}
