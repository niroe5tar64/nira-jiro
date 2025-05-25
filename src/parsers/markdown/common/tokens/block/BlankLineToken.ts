import type { BlockTokenBase } from "./BlockTokenBase";

export interface BlankLineToken extends BlockTokenBase {
  kind: "blank_line";
}

export function createBlankLineToken(): BlankLineToken {
  return { kind: "blank_line" };
}
