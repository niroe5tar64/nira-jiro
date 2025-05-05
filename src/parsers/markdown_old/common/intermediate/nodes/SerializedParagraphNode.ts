import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedParagraphNode extends SerializedNode {
  readonly type = "paragraph";

  constructor(public children: SerializedNode[]) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitParagraph(this);
  }
}
