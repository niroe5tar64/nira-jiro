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
      h1. Heading 1

      This is a paragraph.
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "heading",
          level: 1,
          rawText: "Heading 1",
          inline: [{ kind: "text", content: "Heading 1" }],
        },
        { kind: "blank_line" },
        {
          kind: "paragraph",
          rawText: "This is a paragraph.",
          inline: [{ kind: "text", content: "This is a paragraph." }],
        },
      ],
      `
      [
        {
          "inline": [
            {
              "content": "Heading 1",
              "kind": "text",
            },
          ],
          "kind": "heading",
          "level": 1,
          "rawText": "Heading 1",
        },
        {
          "kind": "blank_line",
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
      {code:js}
      console.log("hello");
      {code}
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

  it("parses list items with nesting", () => {
    const input = dedent`
      * Item 1
      ** Subitem 1
      ** Subitem 2
      # Numbered
      ## Numbered again
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "list",
          items: [
            {
              kind: "list_item",
              ordered: false,
              level: 1,
              rawText: "Item 1",
              inline: [{ kind: "text", content: "Item 1" }],
            },
            {
              kind: "list_item",
              ordered: false,
              level: 2,
              rawText: "Subitem 1",
              inline: [{ kind: "text", content: "Subitem 1" }],
            },
            {
              kind: "list_item",
              ordered: false,
              level: 2,
              rawText: "Subitem 2",
              inline: [{ kind: "text", content: "Subitem 2" }],
            },
            {
              kind: "list_item",
              ordered: true,
              level: 1,
              rawText: "Numbered",
              inline: [{ kind: "text", content: "Numbered" }],
            },
            {
              kind: "list_item",
              ordered: true,
              level: 2,
              rawText: "Numbered again",
              inline: [{ kind: "text", content: "Numbered again" }],
            },
          ],
        },
      ],
      `
      [
        {
          "items": [
            {
              "inline": [
                {
                  "content": "Item 1",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 1,
              "ordered": false,
              "rawText": "Item 1",
            },
            {
              "inline": [
                {
                  "content": "Subitem 1",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 2,
              "ordered": false,
              "rawText": "Subitem 1",
            },
            {
              "inline": [
                {
                  "content": "Subitem 2",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 2,
              "ordered": false,
              "rawText": "Subitem 2",
            },
            {
              "inline": [
                {
                  "content": "Numbered",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 1,
              "ordered": true,
              "rawText": "Numbered",
            },
            {
              "inline": [
                {
                  "content": "Numbered again",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 2,
              "ordered": true,
              "rawText": "Numbered again",
            },
          ],
          "kind": "list",
        },
      ]
    `,
    );
  });

  it("parses blockquotes", () => {
    const input = dedent`
      {quote}
      Line 1
      Line 2
      {quote}

      bq. Short quote
    `;
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "blockquote",
          children: [
            {
              kind: "paragraph",
              rawText: "Line 1",
              inline: [{ kind: "text", content: "Line 1" }],
            },
            {
              kind: "paragraph",
              rawText: "Line 2",
              inline: [{ kind: "text", content: "Line 2" }],
            },
          ],
        },
        { kind: "blank_line" },
        {
          kind: "blockquote",
          children: [
            {
              kind: "paragraph",
              rawText: "Short quote",
              inline: [{ kind: "text", content: "Short quote" }],
            },
          ],
        },
      ],
      `
      [
        {
          "children": [
            {
              "inline": [
                {
                  "content": "Line 1",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "Line 1",
            },
            {
              "inline": [
                {
                  "content": "Line 2",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "Line 2",
            },
          ],
          "kind": "blockquote",
        },
        {
          "kind": "blank_line",
        },
        {
          "children": [
            {
              "inline": [
                {
                  "content": "Short quote",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "Short quote",
            },
          ],
          "kind": "blockquote",
        },
      ]
    `,
    );
  });

  it("parses paragraph with inline emphasis and strong", () => {
    const input = "This is a paragraph with *bold* and _italic_ text.";
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "paragraph",
          rawText: "This is a paragraph with *bold* and _italic_ text.",
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
          "rawText": "This is a paragraph with *bold* and _italic_ text.",
        },
      ]
    `,
    );
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
    expect(parseToAst(input)).toMatchInlineSnapshot(
      [
        {
          kind: "paragraph",
          rawText: "Just a paragraph.",
          inline: [{ kind: "text", content: "Just a paragraph." }],
        },
        { kind: "blank_line" },
        {
          kind: "list",
          items: [
            {
              kind: "list_item",
              ordered: false,
              level: 1,
              rawText: "List item",
              inline: [{ kind: "text", content: "List item" }],
            },
          ],
        },
        { kind: "blank_line" },
        {
          kind: "code_block",
          language: null,
          content: ["code"],
        },
        { kind: "blank_line" },
        {
          kind: "blockquote",
          children: [
            {
              kind: "paragraph",
              rawText: "quoted",
              inline: [{ kind: "text", content: "quoted" }],
            },
          ],
        },
      ],
      `
      [
        {
          "inline": [
            {
              "content": "Just a paragraph.",
              "kind": "text",
            },
          ],
          "kind": "paragraph",
          "rawText": "Just a paragraph.",
        },
        {
          "kind": "blank_line",
        },
        {
          "items": [
            {
              "inline": [
                {
                  "content": "List item",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 1,
              "ordered": false,
              "rawText": "List item",
            },
          ],
          "kind": "list",
        },
        {
          "kind": "blank_line",
        },
        {
          "content": [
            "code",
          ],
          "kind": "code_block",
          "language": null,
        },
        {
          "kind": "blank_line",
        },
        {
          "children": [
            {
              "inline": [
                {
                  "content": "quoted",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "quoted",
            },
          ],
          "kind": "blockquote",
        },
      ]
    `,
    );
  });
});
