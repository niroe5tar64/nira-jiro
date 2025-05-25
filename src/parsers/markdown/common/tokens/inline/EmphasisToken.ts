import type { InlineTokenBase } from "./InlineTokenBase";

export interface EmphasisToken extends InlineTokenBase {
  kind: "emphasis";
  content: string;
}

export function createEmphasisToken(content: string): EmphasisToken {
  return { kind: "emphasis", content };
}
