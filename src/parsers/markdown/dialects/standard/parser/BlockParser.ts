import type { BlockToken } from "../../../common/tokens/block";
import type { BlockNode } from "../../../common/ast/block";

import {
  createHeadingNode,
  createParagraphNode,
  createCodeBlockNode,
  createBlockquoteNode,
  createListNode,
} from "../../../common/ast/block";

export class BlockParser {
  private index = 0;

  constructor(private tokens: BlockToken[]) {}

  private peek(): BlockToken | undefined {
    return this.tokens[this.index];
  }

  private next(): BlockToken | undefined {
    return this.tokens[this.index++];
  }

  private eof(): boolean {
    return this.index >= this.tokens.length;
  }

  parse(): BlockNode[] {
    const nodes: BlockNode[] = [];

    while (!this.eof()) {
      const token = this.peek();

      if (!token) break;

      switch (token.kind) {
        case "heading": {
          this.next(); // consume
          nodes.push(createHeadingNode(token.level, token.content));
          break;
        }

        case "paragraph": {
          this.next();
          nodes.push(createParagraphNode(token.content));
          break;
        }

        case "code_block_start": {
          nodes.push(this.parseCodeBlock());
          break;
        }

        case "blockquote": {
          nodes.push(this.parseBlockquote());
          break;
        }

        case "list_item": {
          nodes.push(this.parseList());
          break;
        }

        case "blank_line": {
          this.next(); // skip
          break;
        }

        default: {
          throw new Error(`Unhandled token: ${JSON.stringify(token)}`);
        }
      }
    }

    return nodes;
  }

  private parseCodeBlock() {
    const start = this.next();
    if (start?.kind !== "code_block_start") throw new Error("Expected code_block_start");

    const content: string[] = [];

    while (!this.eof()) {
      const token = this.next();
      if (!token) break;

      if (token.kind === "code_block_content") {
        content.push(token.content);
      } else if (token.kind === "code_block_end") {
        break;
      } else {
        throw new Error("Unexpected token inside code block");
      }
    }

    return createCodeBlockNode(start.language, content);
  }

  private parseBlockquote() {
    const lines: string[] = [];

    while (!this.eof()) {
      const token = this.peek();
      if (!token || token.kind !== "blockquote") break;

      lines.push(token.content);
      this.next();
    }

    return createBlockquoteNode(lines);
  }

  private parseList() {
    const items: {
      ordered: boolean;
      level: number;
      content: string;
    }[] = [];

    while (!this.eof()) {
      const token = this.peek();
      if (!token || token.kind !== "list_item") break;

      items.push({
        ordered: token.ordered,
        level: token.level,
        content: token.content,
      });
      this.next();
    }

    return createListNode(items);
  }
}
