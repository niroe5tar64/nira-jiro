import type { MarkdownNode } from "../../ast/nodes";
import type { AstDeserializerVisitor } from "../visitors";

/**
 * 仮ノード群の親クラス
 */
export abstract class SerializedNode {
  abstract readonly type: string;
  abstract accept(visitor: AstDeserializerVisitor): MarkdownNode;
}
