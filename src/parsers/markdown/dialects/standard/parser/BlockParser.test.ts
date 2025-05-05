import { describe, it, expect } from "bun:test";
import dedent from "dedent";

import { BlockLexer } from "../lexer/BlockLexer";
import { BlockParser } from "./BlockParser";
import type { BlockNode } from "../../../common/ast/block";

function parseToAst(markdown: string): BlockNode[] {
  const tokens = new BlockLexer(markdown).tokenize();
  return new BlockParser(tokens).parse();
}

describe("BlockParser", () => {
  it("parses heading and paragraph", () => {
    const input = dedent`
      # Heading 1

      This is a paragraph.
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "heading",
          level: 1,
          text: "Heading 1",
        },
        {
          kind: "paragraph",
          rawText: "This is a paragraph.",
        },
      ],
      `
      [
        {
          "kind": "heading",
          "level": 1,
          "text": "Heading 1",
        },
        {
          "inline": [
            {
              "content": "This is a paragraph.",
              "kind": "text",
            },
          ],
          "kind": "paragraph",
          "rawText": "This is a paragraph.",
        },
      ]
    `,
    );
  });

  it("parses code block", () => {
    const input = dedent`
      \`\`\`js
      console.log("hello");
      \`\`\`
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "code_block",
          language: "js",
          content: ['console.log("hello");'],
        },
      ],
      `
      [
        {
          "content": [
            "console.log("hello");",
          ],
          "kind": "code_block",
          "language": "js",
        },
      ]
    `,
    );
  });

  it("parses blockquotes", () => {
    const input = dedent`
      > Line 1
      > Line 2
      >
      > Line 3
      Line 4

      Paragraph here.
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "blockquote",
          lines: ["Line 1", "Line 2", "", "Line 3", "Line 4"],
        },
        {
          kind: "paragraph",
          rawText: "Paragraph here.",
          inline: [
            {
              kind: "text",
              content: "Paragraph here.",
            },
          ],
        },
      ],
      `
      [
        {
          "kind": "blockquote",
          "lines": [
            "Line 1",
            "Line 2",
            "",
            "Line 3",
            "Line 4",
          ],
        },
        {
          "inline": [
            {
              "content": "Paragraph here.",
              "kind": "text",
            },
          ],
          "kind": "paragraph",
          "rawText": "Paragraph here.",
        },
      ]
    `,
    );
  });

  it("parses list items with nesting", () => {
    const input = dedent`
      - Item 1
        - Subitem 1
      1. Numbered 1
      2. Numbered 2
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "list",
          items: [
            {
              content: "Item 1",
              level: 1,
              ordered: false,
            },
            {
              content: "Subitem 1",
              level: 2,
              ordered: false,
            },
            {
              content: "Numbered 1",
              level: 1,
              ordered: true,
            },
            {
              content: "Numbered 2",
              level: 1,
              ordered: true,
            },
          ],
        },
      ],
      `
      [
        {
          "items": [
            {
              "content": "Item 1",
              "level": 1,
              "ordered": false,
            },
            {
              "content": "Subitem 1",
              "level": 2,
              "ordered": false,
            },
            {
              "content": "Numbered 1",
              "level": 1,
              "ordered": true,
            },
            {
              "content": "Numbered 2",
              "level": 1,
              "ordered": true,
            },
          ],
          "kind": "list",
        },
      ]
    `,
    );
  });
});

describe("BlockParser with inline structure", () => {
  it("parses paragraph with inline emphasis and strong", () => {
    const input = dedent`
      This is a paragraph with **bold** and *italic* text.
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "paragraph",
          rawText: "This is a paragraph with **bold** and *italic* text.",
          inline: [
            {
              kind: "text",
              content: "This is a paragraph with ",
            },
            {
              kind: "strong",
              content: "bold",
            },
            {
              kind: "text",
              content: " and ",
            },
            {
              kind: "emphasis",
              content: "italic",
            },
            {
              kind: "text",
              content: " text.",
            },
          ],
        },
      ],
      `
      [
        {
          "inline": [
            {
              "content": "This is a paragraph with ",
              "kind": "text",
            },
            {
              "content": "bold",
              "kind": "strong",
            },
            {
              "content": " and ",
              "kind": "text",
            },
            {
              "content": "italic",
              "kind": "emphasis",
            },
            {
              "content": " text.",
              "kind": "text",
            },
          ],
          "kind": "paragraph",
          "rawText": "This is a paragraph with **bold** and *italic* text.",
        },
      ]
    `,
    );
  });

  it("parses paragraph with only text", () => {
    const input = "Just a plain paragraph.";
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "paragraph",
          rawText: "Just a plain paragraph.",
          inline: [
            {
              kind: "text",
              content: "Just a plain paragraph.",
            },
          ],
        },
      ],
      `
      [
        {
          "inline": [
            {
              "content": "Just a plain paragraph.",
              "kind": "text",
            },
          ],
          "kind": "paragraph",
          "rawText": "Just a plain paragraph.",
        },
      ]
    `,
    );
  });
});
