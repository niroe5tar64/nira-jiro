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
      # Heading 1

      This is a paragraph.

      ## Heading 2
      Another paragraph line.
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(
      [
        {
          kind: "heading",
          level: 1,
          content: "Heading 1",
        },
        {
          kind: "blank_line",
        },
        {
          kind: "paragraph",
          content: "This is a paragraph.",
        },
        {
          kind: "blank_line",
        },
        {
          kind: "heading",
          level: 2,
          content: "Heading 2",
        },
        {
          kind: "paragraph",
          content: "Another paragraph line.",
        },
      ],
      `
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
    `,
    );
  });

  it("parses code blocks", () => {
    const input = dedent`
      \`\`\`ts
      const a = 1;
      console.log(a);
      \`\`\`
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(
      [
        {
          kind: "code_block_start",
          language: "ts",
        },
        {
          kind: "code_block_content",
          content: "const a = 1;",
        },
        {
          kind: "code_block_content",
          content: "console.log(a);",
        },
        {
          kind: "code_block_end",
        },
      ],
      `
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
      ]
    `,
    );
  });

  it("parses list items with nesting", () => {
    const input = dedent`
      - Item 1
        - Subitem 1
        - Subitem 2
      1. Numbered
      2. Numbered again
    `;

    const tokens = runLexer(input);
    expect(tokens).toMatchInlineSnapshot(
      [
        {
          kind: "list_item",
          ordered: false,
          level: 1,
          content: "Item 1",
        },
        {
          kind: "list_item",
          ordered: false,
          level: 2,
          content: "Subitem 1",
        },
        {
          kind: "list_item",
          ordered: false,
          level: 2,
          content: "Subitem 2",
        },
        {
          kind: "list_item",
          ordered: true,
          level: 1,
          content: "Numbered",
        },
        {
          kind: "list_item",
          ordered: true,
          level: 1,
          content: "Numbered again",
        },
      ],
      `
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
          "level": 1,
          "ordered": true,
        },
      ]
    `,
    );
  });

  it("parses blockquotes", () => {
    const input = dedent`
      > This is a quote.
      > Still quoted - 01.
      >
      > Still quoted - 02.
      Still quoted - 03.

      This is a paragraph line.
    `;

    const tokens = runLexer(input);

    expect(tokens).toMatchInlineSnapshot(
      [
        { kind: "blockquote", content: "This is a quote." },
        { kind: "blockquote", content: "Still quoted - 01." },
        { kind: "blockquote", content: "" }, // 空行も引用扱い
        { kind: "blockquote", content: "Still quoted - 02." },
        { kind: "paragraph", content: "Still quoted - 03." },
        { kind: "blank_line" },
        { kind: "paragraph", content: "This is a paragraph line." },
      ],
      `
      [
        {
          "content": "This is a quote.",
          "kind": "blockquote",
        },
        {
          "content": "Still quoted - 01.",
          "kind": "blockquote",
        },
        {
          "content": "",
          "kind": "blockquote",
        },
        {
          "content": "Still quoted - 02.",
          "kind": "blockquote",
        },
        {
          "content": "Still quoted - 03.",
          "kind": "paragraph",
        },
        {
          "kind": "blank_line",
        },
        {
          "content": "This is a paragraph line.",
          "kind": "paragraph",
        },
      ]
    `,
    );
  });
});
