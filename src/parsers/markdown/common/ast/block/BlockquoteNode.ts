import type { BlockNodeBase } from "./BlockNodeBase";

export interface BlockquoteNode extends BlockNodeBase {
  kind: "blockquote";
  lines: string[]; // 空行や通常テキストも含めて一括で
}

export function createBlockquoteNode(lines: string[]): BlockquoteNode {
  return {
    kind: "blockquote",
    lines,
  };
}
