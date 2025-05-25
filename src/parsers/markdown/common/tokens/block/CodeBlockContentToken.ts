import type { BlockTokenBase } from "./BlockTokenBase";

export interface CodeBlockContentToken extends BlockTokenBase {
  kind: "code_block_content";
  content: string;
}

export function createCodeBlockContentToken(content: string): CodeBlockContentToken {
  return { kind: "code_block_content", content };
}
