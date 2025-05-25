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
            {
              kind: "blank_line",
            },
            {
              kind: "paragraph",
              rawText: "Line 3",
              inline: [{ kind: "text", content: "Line 3" }],
            },
            {
              kind: "paragraph",
              rawText: "Line 4",
              inline: [{ kind: "text", content: "Line 4" }],
            },
          ],
        },
        { kind: "blank_line" },
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
            {
              "kind": "blank_line",
            },
            {
              "inline": [
                {
                  "content": "Line 3",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "Line 3",
            },
            {
              "inline": [
                {
                  "content": "Line 4",
                  "kind": "text",
                },
              ],
              "kind": "paragraph",
              "rawText": "Line 4",
            },
          ],
          "kind": "blockquote",
        },
        {
          "kind": "blank_line",
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
              ordered: true,
              level: 1,
              rawText: "Numbered 1",
              inline: [{ kind: "text", content: "Numbered 1" }],
            },
            {
              kind: "list_item",
              ordered: true,
              level: 1,
              rawText: "Numbered 2",
              inline: [{ kind: "text", content: "Numbered 2" }],
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
                  "content": "Numbered 1",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 1,
              "ordered": true,
              "rawText": "Numbered 1",
            },
            {
              "inline": [
                {
                  "content": "Numbered 2",
                  "kind": "text",
                },
              ],
              "kind": "list_item",
              "level": 1,
              "ordered": true,
              "rawText": "Numbered 2",
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

it("parses nested blocks inside blockquote", () => {
  const input = dedent`
    > # Quote **Heading**
    > - List **item** in *quote*
    >
    > Paragraph in **quote**
    Outside *paragraph*
  `;
  expect(parseToAst(input)).toMatchInlineSnapshot(
    [
      {
        kind: "blockquote",
        children: [
          {
            kind: "heading",
            level: 1,
            rawText: "Quote **Heading**",
            inline: [
              { kind: "text", content: "Quote " },
              { kind: "strong", content: "Heading" },
            ],
          },
          {
            kind: "list",
            items: [
              {
                kind: "list_item",
                ordered: false,
                level: 1,
                rawText: "List **item** in *quote*",
                inline: [
                  { kind: "text", content: "List " },
                  { kind: "strong", content: "item" },
                  { kind: "text", content: " in " },
                  { kind: "emphasis", content: "quote" },
                ],
              },
            ],
          },
          { kind: "blank_line" },
          {
            kind: "paragraph",
            rawText: "Paragraph in **quote**",
            inline: [
              { kind: "text", content: "Paragraph in " },
              { kind: "strong", content: "quote" },
            ],
          },
          {
            kind: "paragraph",
            rawText: "Outside *paragraph*",
            inline: [
              { kind: "text", content: "Outside " },
              { kind: "emphasis", content: "paragraph" },
            ],
          },
        ],
      },
      { kind: "blank_line" },
    ],
    `
    [
      {
        "children": [
          {
            "inline": [
              {
                "content": "Quote ",
                "kind": "text",
              },
              {
                "content": "Heading",
                "kind": "strong",
              },
            ],
            "kind": "heading",
            "level": 1,
            "rawText": "Quote **Heading**",
          },
          {
            "items": [
              {
                "inline": [
                  {
                    "content": "List ",
                    "kind": "text",
                  },
                  {
                    "content": "item",
                    "kind": "strong",
                  },
                  {
                    "content": " in ",
                    "kind": "text",
                  },
                  {
                    "content": "quote",
                    "kind": "emphasis",
                  },
                ],
                "kind": "list_item",
                "level": 1,
                "ordered": false,
                "rawText": "List **item** in *quote*",
              },
            ],
            "kind": "list",
          },
          {
            "kind": "blank_line",
          },
          {
            "inline": [
              {
                "content": "Paragraph in ",
                "kind": "text",
              },
              {
                "content": "quote",
                "kind": "strong",
              },
            ],
            "kind": "paragraph",
            "rawText": "Paragraph in **quote**",
          },
          {
            "inline": [
              {
                "content": "Outside ",
                "kind": "text",
              },
              {
                "content": "paragraph",
                "kind": "emphasis",
              },
            ],
            "kind": "paragraph",
            "rawText": "Outside *paragraph*",
          },
        ],
        "kind": "blockquote",
      },
      {
        "kind": "blank_line",
      },
    ]
  `,
  );
});
