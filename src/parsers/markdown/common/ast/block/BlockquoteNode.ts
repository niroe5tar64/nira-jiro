import type { BlockNodeBase } from "./BlockNodeBase";
import type { BlockNode } from "./index";

export interface BlockquoteNode extends BlockNodeBase {
  kind: "blockquote";
  children: BlockNode[];
}

export function createBlockquoteNode(children: BlockNode[]): BlockquoteNode {
  return {
    kind: "blockquote",
    children,
  };
}
