import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

// === Serialize / Deserialize ===
export function serializeAst(ast: MarkdownBlockNode[]): MarkdownBlockNode[] {
  // MarkdownBlockNode は Pure Object なので、ASTをそのまま利用可能。
  return ast;
}

export function deserializeAst(json: unknown): MarkdownBlockNode[] {
  // JSONをASTに変換する関数だが Pure Object なので、キャストするだけでOK
  return json as MarkdownBlockNode[];
}
