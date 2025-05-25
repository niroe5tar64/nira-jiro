import type { BlockTokenBase } from "./BlockTokenBase";

export interface CodeBlockStartToken extends BlockTokenBase {
  kind: "code_block_start";
  language: string | null;
}

export function createCodeBlockStartToken(language: string | null = null): CodeBlockStartToken {
  return { kind: "code_block_start", language };
}
