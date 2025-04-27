import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  ListItemContext,
} from "../nodes";

export abstract class AbstractMarkdownNodeVisitor {
  abstract visitHeading(node: MarkdownHeadingNode): string;
  abstract visitParagraph(node: MarkdownParagraphNode): string;
  abstract visitCodeBlock(node: MarkdownCodeBlockNode): string;
  abstract visitBlockquote(node: MarkdownBlockquoteNode): string;
  abstract visitList(node: MarkdownListNode): string;
  abstract visitListItem(node: MarkdownListItemNode, context: ListItemContext): string;
  abstract visitText(node: MarkdownTextNode): string;
}
