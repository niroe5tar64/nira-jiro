import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedBlockquoteNode extends SerializedNode {
  readonly type = "blockquote";

  constructor(public children: SerializedNode[]) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitBlockquote(this);
  }
}
