import type { InlineNodeBase } from "./InlineNodeBase";

export interface TextNode extends InlineNodeBase {
  kind: "text";
  content: string;
}

export function createTextNode(content: string): TextNode {
  return { kind: "text", content };
}
