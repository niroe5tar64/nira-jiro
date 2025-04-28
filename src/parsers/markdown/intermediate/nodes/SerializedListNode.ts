import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedListNode extends SerializedNode {
  readonly type = "list";

  constructor(
    public ordered: boolean,
    public items: SerializedNode[],
  ) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitList(this);
  }
}
