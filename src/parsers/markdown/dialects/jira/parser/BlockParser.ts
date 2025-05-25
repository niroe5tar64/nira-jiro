import type { BlockToken } from "../../../common/tokens/block";
import type { BlockNode, ListItemNode } from "../../../common/ast/block";
import { InlineLexer } from "../lexer/InlineLexer";
import { InlineParser } from "./InlineParser";

import {
  createHeadingNode,
  createParagraphNode,
  createCodeBlockNode,
  createBlockquoteNode,
  createListNode,
  createListItemNode,
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

        case "blockquote_start": {
          nodes.push(this.parseBlockquoteBlock());
          break;
        }

        case "blockquote": {
          // bq. short blockquote
          this.next();
          const inlineTokens = new InlineLexer(token.content).tokenize();
          const inlineNodes = new InlineParser(inlineTokens).parse();
          const paragraph = createParagraphNode(token.content, inlineNodes);
          nodes.push(createBlockquoteNode([paragraph]));
          break;
        }

        case "list_item": {
          nodes.push(this.parseList());
          break;
        }

        case "blank_line": {
          this.next();
          nodes.push({ kind: "blank_line" });
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

  private parseBlockquoteBlock() {
    this.next(); // consume blockquote_start
    const lines: string[] = [];

    while (!this.eof()) {
      const token = this.peek();
      if (!token) break;

      if (token.kind === "blockquote_content") {
        lines.push(token.content);
        this.next();
      } else if (token.kind === "blockquote_end") {
        this.next();
        break;
      } else {
        throw new Error(`Unexpected token in blockquote: ${JSON.stringify(token)}`);
      }
    }

    const innerTokens = new BlockLexer(lines.join("\n")).tokenize();
    const children = new BlockParser(innerTokens).parse();
    return createBlockquoteNode(children);
  }

  private parseList() {
    const items: ListItemNode[] = [];

    while (!this.eof()) {
      const token = this.peek();
      if (!token || token.kind !== "list_item") break;

      items.push(createListItemNode(token.ordered, token.level, token.content));
      this.next();
    }

    return createListNode(items);
  }
}
