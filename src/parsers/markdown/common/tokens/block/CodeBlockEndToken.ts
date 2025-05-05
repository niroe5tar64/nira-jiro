import type { BlockTokenBase } from "./BlockTokenBase";

export interface CodeBlockEndToken extends BlockTokenBase {
  kind: "code_block_end";
}

export function createCodeBlockEndToken(): CodeBlockEndToken {
  return { kind: "code_block_end" };
}
