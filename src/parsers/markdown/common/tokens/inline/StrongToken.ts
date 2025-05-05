import type { InlineTokenBase } from "./InlineTokenBase";

export interface StrongToken extends InlineTokenBase {
  kind: "strong";
  content: string;
}

export function createStrongToken(content: string): StrongToken {
  return { kind: "strong", content };
}
