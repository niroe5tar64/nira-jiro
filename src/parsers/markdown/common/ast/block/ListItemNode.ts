import type { InlineNode } from "../inline";

export interface ListItemNode {
  kind: "list_item";
  ordered: boolean;
  level: number;
  rawText: string;
  inline: InlineNode[];
}

export function createListItemNode(
  ordered: boolean,
  level: number,
  rawText: string,
  inline: InlineNode[] = [],
): ListItemNode {
  return {
    kind: "list_item",
    ordered,
    level,
    rawText,
    inline,
  };
}
