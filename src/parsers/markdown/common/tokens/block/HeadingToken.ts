import type { BlockTokenBase } from "./BlockTokenBase";

export interface HeadingToken extends BlockTokenBase {
  kind: "heading";
  level: number;
  content: string;
}

export function createHeadingToken(level: number, content: string): HeadingToken {
  return { kind: "heading", level, content };
}
