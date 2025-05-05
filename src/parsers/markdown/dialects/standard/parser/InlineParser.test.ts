import { describe, it, expect } from "bun:test";
import dedent from "dedent";

import { InlineLexer } from "../lexer/InlineLexer";
import { InlineParser } from "./InlineParser";
import type { InlineNode } from "../../../common/ast/inline";

function parseInline(input: string): InlineNode[] {
  const tokens = new InlineLexer(input).tokenize();
  return new InlineParser(tokens).parse();
}

describe("InlineParser", () => {
  it("parses plain text", () => {
    const input = "Just plain text.";
    expect(parseInline(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Just plain text.",
        },
      ],
      `
      [
        {
          "content": "Just plain text.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses strong text", () => {
    const input = "This is **bold** text.";
    expect(parseInline(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "This is ",
        },
        {
          kind: "strong",
          content: "bold",
        },
        {
          kind: "text",
          content: " text.",
        },
      ],
      `
      [
        {
          "content": "This is ",
          "kind": "text",
        },
        {
          "content": "bold",
          "kind": "strong",
        },
        {
          "content": " text.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses emphasis text", () => {
    const input = "Try *italic* here.";
    expect(parseInline(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Try ",
        },
        {
          kind: "emphasis",
          content: "italic",
        },
        {
          kind: "text",
          content: " here.",
        },
      ],
      `
      [
        {
          "content": "Try ",
          "kind": "text",
        },
        {
          "content": "italic",
          "kind": "emphasis",
        },
        {
          "content": " here.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses mixed strong and emphasis", () => {
    const input = dedent`
      Mixing **bold** and *italic* in one line.
    `;
    expect(parseInline(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Mixing ",
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
          content: " in one line.",
        },
      ],
      `
      [
        {
          "content": "Mixing ",
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
          "content": " in one line.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses adjacent inline styles", () => {
    const input = "**A** *B* **C**";
    expect(parseInline(input)).toMatchInlineSnapshot(
      [
        {
          kind: "strong",
          content: "A",
        },
        {
          kind: "text",
          content: " ",
        },
        {
          kind: "emphasis",
          content: "B",
        },
        {
          kind: "text",
          content: " ",
        },
        {
          kind: "strong",
          content: "C",
        },
      ],
      `
      [
        {
          "content": "A",
          "kind": "strong",
        },
        {
          "content": " ",
          "kind": "text",
        },
        {
          "content": "B",
          "kind": "emphasis",
        },
        {
          "content": " ",
          "kind": "text",
        },
        {
          "content": "C",
          "kind": "strong",
        },
      ]
    `,
    );
  });
});
