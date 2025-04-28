import { AbstractMarkdownNodeVisitor } from "./AbstractMarkdownNodeVisitor";
import type { SerializedMarkdownNode } from "../../intermediate/types";
import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../nodes";

export class AstSerializerVisitor extends AbstractMarkdownNodeVisitor<SerializedMarkdownNode> {
  visitHeading(node: MarkdownHeadingNode): SerializedMarkdownNode {
    return {
      type: "heading" as const,
      level: node.level,
      children: node.children.map((child) => child.accept(this)),
    };
  }

  visitParagraph(node: MarkdownParagraphNode): SerializedMarkdownNode {
    return {
      type: "paragraph" as const,
      children: node.children.map((child) => child.accept(this)),
    };
  }

  visitCodeBlock(node: MarkdownCodeBlockNode): SerializedMarkdownNode {
    return {
      type: "codeBlock" as const,
      language: node.language,
      content: node.content,
    };
  }

  visitBlockquote(node: MarkdownBlockquoteNode): SerializedMarkdownNode {
    return {
      type: "blockquote" as const,
      children: node.children.map((child) => child.accept(this)),
    };
  }

  visitList(node: MarkdownListNode): SerializedMarkdownNode {
    return {
      type: "list" as const,
      ordered: node.ordered,
      items: node.items.map((item) => item.accept(this)),
    };
  }

  visitListItem(node: MarkdownListItemNode): SerializedMarkdownNode {
    return {
      type: "listItem" as const,
      children: node.children.map((child) => child.accept(this)),
    };
  }

  visitText(node: MarkdownTextNode): SerializedMarkdownNode {
    return {
      type: "text" as const,
      content: node.content,
    };
  }
}
