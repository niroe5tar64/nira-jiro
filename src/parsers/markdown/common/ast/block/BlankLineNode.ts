import type { BlockNodeBase } from "./BlockNodeBase";

export interface BlankLineNode extends BlockNodeBase {
  kind: "blank_line";
}

export function createBlankLineNode(): BlankLineNode {
  return { kind: "blank_line" };
}
