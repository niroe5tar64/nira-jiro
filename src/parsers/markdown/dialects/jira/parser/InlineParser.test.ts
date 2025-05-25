import { describe, expect, it } from "bun:test";

import type { InlineNode } from "../../../common/ast/inline";
import { InlineLexer } from "../lexer/InlineLexer";
import { InlineParser } from "./InlineParser";

function parseInline(input: string): InlineNode[] {
  const tokens = new InlineLexer(input).tokenize();
  return new InlineParser(tokens).parse();
}

describe("InlineParser", () => {
  it("parses plain text", () => {
    expect(parseInline("plain text only")).toMatchInlineSnapshot(
      [{ kind: "text", content: "plain text only" }],
      `
      [
        {
          "content": "plain text only",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses strong (*text*)", () => {
    expect(parseInline("This is *strong* text.")).toMatchInlineSnapshot(
      [
        { kind: "text", content: "This is " },
        { kind: "strong", content: "strong" },
        { kind: "text", content: " text." },
      ],
      `
      [
        {
          "content": "This is ",
          "kind": "text",
        },
        {
          "content": "strong",
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

  it("parses emphasis (_text_)", () => {
    expect(parseInline("This is _emphasis_ text.")).toMatchInlineSnapshot(
      [
        { kind: "text", content: "This is " },
        { kind: "emphasis", content: "emphasis" },
        { kind: "text", content: " text." },
      ],
      `
      [
        {
          "content": "This is ",
          "kind": "text",
        },
        {
          "content": "emphasis",
          "kind": "emphasis",
        },
        {
          "content": " text.",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses mixed strong and emphasis", () => {
    expect(parseInline("Mix *strong* and _emphasis_ here.")).toMatchInlineSnapshot(
      [
        { kind: "text", content: "Mix " },
        { kind: "strong", content: "strong" },
        { kind: "text", content: " and " },
        { kind: "emphasis", content: "emphasis" },
        { kind: "text", content: " here." },
      ],
      `
      [
        {
          "content": "Mix ",
          "kind": "text",
        },
        {
          "content": "strong",
          "kind": "strong",
        },
        {
          "content": " and ",
          "kind": "text",
        },
        {
          "content": "emphasis",
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

  it("parses multiple inline tokens", () => {
    expect(parseInline("*strong* _emphasis_ plain")).toMatchInlineSnapshot(
      [
        { kind: "strong", content: "strong" },
        { kind: "text", content: " " },
        { kind: "emphasis", content: "emphasis" },
        { kind: "text", content: " plain" },
      ],
      `
      [
        {
          "content": "strong",
          "kind": "strong",
        },
        {
          "content": " ",
          "kind": "text",
        },
        {
          "content": "emphasis",
          "kind": "emphasis",
        },
        {
          "content": " plain",
          "kind": "text",
        },
      ]
    `,
    );
  });

  it("parses unmatched markers as text", () => {
    expect(parseInline("This is *not closed and _also not closed.")).toMatchInlineSnapshot(
      [{ kind: "text", content: "This is *not closed and _also not closed." }],
      `
      [
        {
          "content": "This is *not closed and _also not closed.",
          "kind": "text",
        },
      ]
    `,
    );
  });
});
