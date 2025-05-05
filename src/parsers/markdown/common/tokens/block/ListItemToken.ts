import type { BlockTokenBase } from "./BlockTokenBase";

export interface ListItemToken extends BlockTokenBase {
  kind: "list_item";
  ordered: boolean;
  level: number;
  content: string;
}

export function createListItemToken(
  ordered: boolean,
  level: number,
  content: string,
): ListItemToken {
  return { kind: "list_item", ordered, level, content };
}
