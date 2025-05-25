import type { BlockTokenBase } from "./BlockTokenBase";

export interface BlockquoteStartToken extends BlockTokenBase {
  kind: "blockquote_start";
}

export function createBlockquoteStartToken(): BlockquoteStartToken {
  return { kind: "blockquote_start" };
}
