import type { BlockNodeBase } from "./BlockNodeBase";

export interface CodeBlockNode extends BlockNodeBase {
  kind: "code_block";
  language: string | null;
  content: string[]; // 複数行
}

export function createCodeBlockNode(language: string | null, content: string[]): CodeBlockNode {
  return {
    kind: "code_block",
    language,
    content,
  };
}
