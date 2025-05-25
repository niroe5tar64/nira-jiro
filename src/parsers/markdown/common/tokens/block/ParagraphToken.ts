import type { BlockTokenBase } from "./BlockTokenBase";

export interface ParagraphToken extends BlockTokenBase {
  kind: "paragraph";
  content: string;
}

export function createParagraphToken(content: string): ParagraphToken {
  return { kind: "paragraph", content };
}
