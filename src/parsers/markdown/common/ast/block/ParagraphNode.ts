import type { BlockNodeBase } from "./BlockNodeBase";

export interface ParagraphNode extends BlockNodeBase {
  kind: "paragraph";
  rawText: string; // インライン構文を処理する前のテキスト
}

export function createParagraphNode(rawText: string): ParagraphNode {
  return { kind: "paragraph", rawText };
}
