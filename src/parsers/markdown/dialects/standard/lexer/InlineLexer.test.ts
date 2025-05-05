import { describe, it, expect } from "bun:test";
import dedent from "dedent";

import { InlineLexer } from "./InlineLexer";
import type { InlineToken } from "../../../common/tokens/inline";

function tokenize(source: string): InlineToken[] {
  return new InlineLexer(source).tokenize();
}

describe("InlineLexer", () => {
  it("parses plain text", () => {
    const input = "Just a simple sentence.";
    expect(tokenize(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Just a simple sentence.",
        },
      ],
      `
      [
        {
          "content": "Just a simple sentence.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses strong (**bold**) text", () => {
    const input = "Hello **world**!";
    expect(tokenize(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Hello ",
        },
        {
          kind: "strong",
          content: "world",
        },
        {
          kind: "text",
          content: "!",
        },
      ],
      `
      [
        {
          "content": "Hello ",
          "kind": "text",
        },
        {
          "content": "world",
          "kind": "strong",
        },
        {
          "content": "!",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses emphasis (*italic*) text", () => {
    const input = "Say *hi* now.";
    expect(tokenize(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "Say ",
        },
        {
          kind: "emphasis",
          content: "hi",
        },
        {
          kind: "text",
          content: " now.",
        },
      ],
      `
      [
        {
          "content": "Say ",
          "kind": "text",
        },
        {
          "content": "hi",
          "kind": "emphasis",
        },
        {
          "content": " now.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses mixed inline styles", () => {
    const input = dedent`
      A mix of **bold**, *italic*, and normal text.
    `;
    expect(tokenize(input)).toMatchInlineSnapshot(
      [
        {
          kind: "text",
          content: "A mix of ",
        },
        {
          kind: "strong",
          content: "bold",
        },
        {
          kind: "text",
          content: ", ",
        },
        {
          kind: "emphasis",
          content: "italic",
        },
        {
          kind: "text",
          content: ", and normal text.",
        },
      ],
      `
      [
        {
          "content": "A mix of ",
          "kind": "text",
        },
        {
          "content": "bold",
          "kind": "strong",
        },
        {
          "content": ", ",
          "kind": "text",
        },
        {
          "content": "italic",
          "kind": "emphasis",
        },
        {
          "content": ", and normal text.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("handles multiple adjacent tokens", () => {
    const input = "**A** *B* **C**";
    expect(tokenize(input)).toMatchInlineSnapshot(
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
