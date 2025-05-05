import type { BlockToken } from "../../../common/tokens/block";
import type { BlockNode } from "../../../common/ast/block";
import { InlineLexer } from "../lexer/InlineLexer";
import { InlineParser } from "./InlineParser";

import {
  createHeadingNode,
  createParagraphNode,
  createCodeBlockNode,
  createBlockquoteNode,
  createListNode,
} from "../../../common/ast/block";
import { BlockLexer } from "../lexer/BlockLexer";
import { attachInlineNodesToBlocks } from "../../../common/ast/helpers/attachInlineNodesToBlocks";

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
          this.next();
          const inlineTokens = new InlineLexer(token.content).tokenize();
          const inlineNodes = new InlineParser(inlineTokens).parse();
          nodes.push(createHeadingNode(token.level, token.content, inlineNodes));
          break;
        }

        case "paragraph": {
          this.next();
          const inlineTokens = new InlineLexer(token.content).tokenize();
          const inlineNodes = new InlineParser(inlineTokens).parse();
          nodes.push(createParagraphNode(token.content, inlineNodes));
          break;
        }

        case "code_block_start": {
          nodes.push(this.parseCodeBlock());
          break;
        }

        case "blockquote": {
          const quoteLines: string[] = [];

          while (this.peek()?.kind === "blockquote") {
            const token = this.next();
            const hasContent = token && "content" in token && typeof token.content === "string";
            if (hasContent) {
              quoteLines.push(token.content);
            } else {
              quoteLines.push("");
            }
          }

          const innerMarkdown = quoteLines.join("\n");
          const innerTokens = new BlockLexer(innerMarkdown).tokenize();
          const innerNodes = new BlockParser(innerTokens).parse();
          nodes.push(createBlockquoteNode(innerNodes));
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

    return attachInlineNodesToBlocks(nodes, (text) => {
      const tokens = new InlineLexer(text).tokenize();
      return new InlineParser(tokens).parse();
    });
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
