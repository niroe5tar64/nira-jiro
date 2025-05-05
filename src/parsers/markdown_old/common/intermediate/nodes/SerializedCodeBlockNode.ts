import { SerializedNode } from "./SerializedNode";
import type { AstDeserializerVisitor } from "../visitors";

export class SerializedCodeBlockNode extends SerializedNode {
  readonly type = "codeBlock";

  constructor(
    public language: string | null,
    public content: string,
  ) {
    super();
  }

  accept(visitor: AstDeserializerVisitor) {
    return visitor.visitCodeBlock(this);
  }
}
