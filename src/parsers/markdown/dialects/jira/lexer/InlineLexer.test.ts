import { describe, expect, it } from "bun:test";
import type { InlineToken } from "../../../common/tokens/inline";
import { InlineLexer } from "./InlineLexer";

function runLexer(source: string): InlineToken[] {
  const lexer = new InlineLexer(source);
  return lexer.tokenize();
}

describe("InlineLexer", () => {
  it("parses plain text", () => {
    const tokens = runLexer("plain text only");
    expect(tokens).toMatchInlineSnapshot(
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
    const tokens = runLexer("This is *strong* text.");
    expect(tokens).toMatchInlineSnapshot(
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
    const tokens = runLexer("This is _emphasis_ text.");
    expect(tokens).toMatchInlineSnapshot(
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
    const tokens = runLexer("Mix *strong* and _emphasis_ here.");
    expect(tokens).toMatchInlineSnapshot(
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
    const tokens = runLexer("*strong* _emphasis_ plain");
    expect(tokens).toMatchInlineSnapshot(
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
    const tokens = runLexer("This is *not closed and _also not closed.");
    expect(tokens).toMatchInlineSnapshot(
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
