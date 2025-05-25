import type { BlockNodeBase } from "./BlockNodeBase";
import type { InlineNode } from "../inline";

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
