import type {
  SerializedHeadingNode,
  SerializedParagraphNode,
  SerializedCodeBlockNode,
  SerializedBlockquoteNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedTextNode,
} from "../nodes";

import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../../ast/nodes";

/**
 * 仮ノード(SerializedNode) → 本物ASTノードへの復元Visitor
 */
export class AstDeserializerVisitor {
  visitHeading(node: SerializedHeadingNode): MarkdownHeadingNode {
    return new MarkdownHeadingNode(
      node.level,
      node.children.map((child) => child.accept(this)),
    );
  }

  visitParagraph(node: SerializedParagraphNode): MarkdownParagraphNode {
    return new MarkdownParagraphNode(node.children.map((child) => child.accept(this)));
  }

  visitCodeBlock(node: SerializedCodeBlockNode): MarkdownCodeBlockNode {
    return new MarkdownCodeBlockNode(node.language, node.content);
  }

  visitBlockquote(node: SerializedBlockquoteNode): MarkdownBlockquoteNode {
    return new MarkdownBlockquoteNode(node.children.map((child) => child.accept(this)));
  }

  visitList(node: SerializedListNode): MarkdownListNode {
    return new MarkdownListNode(
      node.ordered,
      node.items.map((item) => item.accept(this) as MarkdownListItemNode),
    );
  }

  visitListItem(node: SerializedListItemNode): MarkdownListItemNode {
    return new MarkdownListItemNode(node.children.map((child) => child.accept(this)));
  }

  visitText(node: SerializedTextNode): MarkdownTextNode {
    return new MarkdownTextNode(node.content);
  }
}
