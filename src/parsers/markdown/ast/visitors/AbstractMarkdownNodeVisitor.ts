import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../nodes";

/**
 * ASTノード用のVisitor基底クラス
 */
export abstract class AbstractMarkdownNodeVisitor<T> {
  abstract visitHeading(node: MarkdownHeadingNode): T;
  abstract visitParagraph(node: MarkdownParagraphNode): T;
  abstract visitCodeBlock(node: MarkdownCodeBlockNode): T;
  abstract visitBlockquote(node: MarkdownBlockquoteNode): T;
  abstract visitList(node: MarkdownListNode): T;
  abstract visitListItem(node: MarkdownListItemNode): T;
  abstract visitText(node: MarkdownTextNode): T;
}
