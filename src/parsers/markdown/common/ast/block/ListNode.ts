import type { BlockNodeBase } from "./BlockNodeBase";

export interface ListItem {
  ordered: boolean;
  level: number;
  content: string;
}

export interface ListNode extends BlockNodeBase {
  kind: "list";
  items: ListItem[];
}

export function createListNode(items: ListItem[]): ListNode {
  return {
    kind: "list",
    items,
  };
}
