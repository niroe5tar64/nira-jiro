import type { BlockNode } from "../block";
import type { InlineNode } from "../inline";

/**
 * BlockNodeの配列に対して、必要なノードにInlineNode[]を埋め込む。
 * - paragraph, heading: rawTextを元にinline解析を行う
 * - blockquote: 再帰的に内部に適用
 */
export function attachInlineNodesToBlocks(
  nodes: BlockNode[],
  parseInline: (text: string) => InlineNode[],
): BlockNode[] {
  return nodes.map((node) => {
    switch (node.kind) {
      case "paragraph":
      case "heading": {
        const inline = parseInline(node.rawText);
        return { ...node, inline };
      }

      case "blockquote": {
        const nested = attachInlineNodesToBlocks(node.children, parseInline);
        return { ...node, children: nested };
      }

      case "list": {
        const updatedItems = node.items.map((item) => ({
          ...item,
          inline: parseInline(item.rawText),
        }));
        return { ...node, items: updatedItems };
      }

      default:
        return node;
    }
  });
}
