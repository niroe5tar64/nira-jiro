import { describe, expect, it } from "bun:test";
import dedent from "dedent";
import type { BlockToken } from "../../../common/tokens/block";
import { BlockLexer } from "./BlockLexer";

function runLexer(source: string): BlockToken[] {
  const lexer = new BlockLexer(source);
  return lexer.tokenize();
}

describe("BlockLexer", () => {
  it("parses headings and paragraphs", () => {
    const input = dedent`
      h1. Heading 1

      This is a paragraph.

      h2. Heading 2
      Another paragraph line.
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "content": "Heading 1",
          "kind": "heading",
          "level": 1,
        },
        {
          "kind": "blank_line",
        },
        {
          "content": "This is a paragraph.",
          "kind": "paragraph",
        },
        {
          "kind": "blank_line",
        },
        {
          "content": "Heading 2",
          "kind": "heading",
          "level": 2,
        },
        {
          "content": "Another paragraph line.",
          "kind": "paragraph",
        },
      ]
    `);
  });

  it("parses code blocks with and without language", () => {
    const input = dedent`
      {code:ts}
      const a = 1;
      console.log(a);
      {code}

      {code}
      no lang
      {code}
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "kind": "code_block_start",
          "language": "ts",
        },
        {
          "content": "const a = 1;",
          "kind": "code_block_content",
        },
        {
          "content": "console.log(a);",
          "kind": "code_block_content",
        },
        {
          "kind": "code_block_end",
        },
        {
          "kind": "blank_line",
        },
        {
          "kind": "code_block_start",
          "language": null,
        },
        {
          "content": "no lang",
          "kind": "code_block_content",
        },
        {
          "kind": "code_block_end",
        },
      ]
    `);
  });

  it("parses quote blocks and bq. short syntax", () => {
    const input = dedent`
      {quote}
      This is a quote.
      Spanning multiple lines.

      And an empty line.
      {quote}

      bq. Short quote
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "kind": "blockquote_start",
        },
        {
          "content": "This is a quote.",
          "kind": "blockquote_content",
        },
        {
          "content": "Spanning multiple lines.",
          "kind": "blockquote_content",
        },
        {
          "content": "",
          "kind": "blockquote_content",
        },
        {
          "content": "And an empty line.",
          "kind": "blockquote_content",
        },
        {
          "kind": "blockquote_end",
        },
        {
          "kind": "blank_line",
        },
        {
          "content": "Short quote",
          "kind": "blockquote",
        },
      ]
    `);
  });

  it("parses list items with nesting", () => {
    const input = dedent`
      * Item 1
      ** Subitem 1
      ** Subitem 2
      # Numbered
      ## Numbered again
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "content": "Item 1",
          "kind": "list_item",
          "level": 1,
          "ordered": false,
        },
        {
          "content": "Subitem 1",
          "kind": "list_item",
          "level": 2,
          "ordered": false,
        },
        {
          "content": "Subitem 2",
          "kind": "list_item",
          "level": 2,
          "ordered": false,
        },
        {
          "content": "Numbered",
          "kind": "list_item",
          "level": 1,
          "ordered": true,
        },
        {
          "content": "Numbered again",
          "kind": "list_item",
          "level": 2,
          "ordered": true,
        },
      ]
    `);
  });

  it("parses blank lines and fallback to paragraph", () => {
    const input = dedent`
      Just a paragraph.

      * List item

      {code}
      code
      {code}

      {quote}
      quoted
      {quote}
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "content": "Just a paragraph.",
          "kind": "paragraph",
        },
        {
          "kind": "blank_line",
        },
        {
          "content": "List item",
          "kind": "list_item",
          "level": 1,
          "ordered": false,
        },
        {
          "kind": "blank_line",
        },
        {
          "kind": "code_block_start",
          "language": null,
        },
        {
          "content": "code",
          "kind": "code_block_content",
        },
        {
          "kind": "code_block_end",
        },
        {
          "kind": "blank_line",
        },
        {
          "kind": "blockquote_start",
        },
        {
          "content": "quoted",
          "kind": "blockquote_content",
        },
        {
          "kind": "blockquote_end",
        },
      ]
    `);
  });
});
