import type { BlockTokenBase } from "./BlockTokenBase";

export interface BlockquoteToken extends BlockTokenBase {
  kind: "blockquote";
  content: string;
}

export function createBlockquoteToken(content: string): BlockquoteToken {
  return { kind: "blockquote", content };
}
