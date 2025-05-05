import type { InlineNodeBase } from "./InlineNodeBase";

export interface StrongNode extends InlineNodeBase {
  kind: "strong";
  content: string;
}

export function createStrongNode(content: string): StrongNode {
  return { kind: "strong", content };
}
