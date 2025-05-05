import {
  type SerializedNode,
  SerializedHeadingNode,
  SerializedParagraphNode,
  SerializedCodeBlockNode,
  SerializedBlockquoteNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedTextNode,
} from ".";

import type { SerializedMarkdownNode } from "../types";

/**
 * 純粋なJSONオブジェクトから仮ノードクラスへ変換する
 */
export function parseSerializedNode(raw: SerializedMarkdownNode): SerializedNode {
  switch (raw.type) {
    case "heading":
      return new SerializedHeadingNode(raw.level, raw.children.map(parseSerializedNode));
    case "paragraph":
      return new SerializedParagraphNode(raw.children.map(parseSerializedNode));
    case "codeBlock":
      return new SerializedCodeBlockNode(raw.language, raw.content);
    case "blockquote":
      return new SerializedBlockquoteNode(raw.children.map(parseSerializedNode));
    case "list":
      return new SerializedListNode(raw.ordered, raw.items.map(parseSerializedNode));
    case "listItem":
      return new SerializedListItemNode(raw.children.map(parseSerializedNode));
    case "text":
      return new SerializedTextNode(raw.content);
    default:
      throw new Error("Unknown node type");
  }
}
