import type { BlockNodeBase } from "./BlockNodeBase";
import type { ListItemNode } from "./ListItemNode";

export interface ListNode extends BlockNodeBase {
  kind: "list";
  items: ListItemNode[];
}

export function createListNode(items: ListItemNode[]): ListNode {
  return {
    kind: "list",
    items,
  };
}
