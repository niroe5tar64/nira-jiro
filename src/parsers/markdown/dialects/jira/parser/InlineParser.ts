import type { InlineNode } from "../../../common/ast/inline";
import { createEmphasisNode, createStrongNode, createTextNode } from "../../../common/ast/inline";
import type { InlineToken } from "../../../common/tokens/inline";

export class InlineParser {
  constructor(private tokens: InlineToken[]) {}

  parse(): InlineNode[] {
    return this.tokens.map((token) => {
      switch (token.kind) {
        case "text":
          return createTextNode(token.content);
        case "strong":
          return createStrongNode(token.content);
        case "emphasis":
          return createEmphasisNode(token.content);
        default: {
          throw new Error(`Unknown inline token: ${JSON.stringify(token)}`);
        }
      }
    });
  }
}
