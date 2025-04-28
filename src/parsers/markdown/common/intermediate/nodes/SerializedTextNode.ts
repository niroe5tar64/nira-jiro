import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedTextNode extends SerializedNode {
  readonly type = "text";

  constructor(public content: string) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitText(this);
  }
}
