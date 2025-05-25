import type { BlockTokenBase } from "./BlockTokenBase";

export interface BlockquoteEndToken extends BlockTokenBase {
  kind: "blockquote_end";
}

export function createBlockquoteEndToken(): BlockquoteEndToken {
  return { kind: "blockquote_end" };
}
