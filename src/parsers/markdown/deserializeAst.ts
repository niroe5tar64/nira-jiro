import { AstDeserializerVisitor } from "./intermediate/visitors";
import { parseSerializedNode } from "./intermediate/nodes";
import type { SerializedMarkdownNode } from "./intermediate/types";
import type { MarkdownBlockNode } from "./ast/nodes";

/**
 * JSONデータからASTノードツリーを復元する
 */
export function deserializeAst(serialized: SerializedMarkdownNode[]): MarkdownBlockNode[] {
  const visitor = new AstDeserializerVisitor();
  const nodes = serialized.map(parseSerializedNode);
  return nodes.map((node) => node.accept(visitor));
}
