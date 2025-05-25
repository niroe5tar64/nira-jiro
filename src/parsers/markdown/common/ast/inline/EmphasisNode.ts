import type { InlineNodeBase } from "./InlineNodeBase";

export interface EmphasisNode extends InlineNodeBase {
  kind: "emphasis";
  content: string;
}

export function createEmphasisNode(content: string): EmphasisNode {
  return { kind: "emphasis", content };
}
