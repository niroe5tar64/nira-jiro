import type { BlockTokenBase } from "./BlockTokenBase";

export interface BlockquoteContentToken extends BlockTokenBase {
  kind: "blockquote_content";
  content: string;
}

export function createBlockquoteContentToken(content: string): BlockquoteContentToken {
  return { kind: "blockquote_content", content };
}
