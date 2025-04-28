import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedListItemNode extends SerializedNode {
  readonly type = "listItem";

  constructor(public children: SerializedNode[]) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitListItem(this);
  }
}
