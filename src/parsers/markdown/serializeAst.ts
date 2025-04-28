import { AstSerializerVisitor } from "./ast/visitors";
import type { MarkdownBlockNode } from "./ast/nodes";
import type { SerializedMarkdownNode } from "./intermediate/types";

/**
 * ASTノードツリーをJSONデータに変換する
 */
export function serializeAst(nodes: MarkdownBlockNode[]): SerializedMarkdownNode[] {
  const visitor = new AstSerializerVisitor();
  return nodes.map((node) => node.accept(visitor));
}
