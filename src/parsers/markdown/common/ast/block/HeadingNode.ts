import type { BlockNodeBase } from "./BlockNodeBase";

export interface HeadingNode extends BlockNodeBase {
  kind: "heading";
  level: number; // 1〜6
  text: string; // 見出しテキスト
}

export function createHeadingNode(level: number, text: string): HeadingNode {
  return { kind: "heading", level, text };
}
