import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedHeadingNode extends SerializedNode {
  readonly type = "heading";

  constructor(
    public level: number,
    public children: SerializedNode[],
  ) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitHeading(this);
  }
}
