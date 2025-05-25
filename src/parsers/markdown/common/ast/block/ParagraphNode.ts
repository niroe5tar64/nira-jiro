import type { InlineNode } from "../inline";
import type { BlockNodeBase } from "./BlockNodeBase";

export interface ParagraphNode extends BlockNodeBase {
  kind: "paragraph";
  rawText: string;
  inline: InlineNode[];
}

export function createParagraphNode(rawText: string, inline: InlineNode[] = []): ParagraphNode {
  return {
    kind: "paragraph",
    rawText,
    inline,
  };
}
