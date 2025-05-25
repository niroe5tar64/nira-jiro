import type { InlineTokenBase } from "./InlineTokenBase";

export interface TextToken extends InlineTokenBase {
  kind: "text";
  content: string;
}

export function createTextToken(content: string): TextToken {
  return { kind: "text", content };
}
