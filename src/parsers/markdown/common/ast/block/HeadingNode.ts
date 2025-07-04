import type { InlineNode } from "../inline";
import type { BlockNodeBase } from "./BlockNodeBase";

export interface HeadingNode extends BlockNodeBase {
  kind: "heading";
  level: number; // 1〜6
  rawText: string;
  inline: InlineNode[];
}

export function createHeadingNode(
  level: number,
  rawText: string,
  inline: InlineNode[] = [],
): HeadingNode {
  return {
    kind: "heading",
    level,
    rawText,
    inline,
  };
}
