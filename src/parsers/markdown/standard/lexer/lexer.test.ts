import { describe, it, expect } from "bun:test";
import { tokenizeMarkdown } from "./lexer";
import {
  HeadingToken,
  ParagraphToken,
  ListItemToken,
  CodeBlockStartToken,
  CodeBlockContentToken,
  CodeBlockEndToken,
  BlockquoteToken,
  BlankLineToken,
} from "../../common/tokens";

describe("tokenizeMarkdown", () => {
  it("should tokenize blank lines", () => {
    const source = "\n\n";
    const tokens = tokenizeMarkdown(source);

    expect(tokens).toEqual([new BlankLineToken(), new BlankLineToken()]);
  });

  it("should tokenize headings", () => {
    const source = "# Heading 1\n## Heading 2\n### Heading 3";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new HeadingToken(1, "Heading 1"),
      new HeadingToken(2, "Heading 2"),
      new HeadingToken(3, "Heading 3"),
    ]);
  });

  it("should tokenize paragraphs", () => {
    const source = "This is a paragraph.\n\nAnother paragraph.";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new ParagraphToken("This is a paragraph."),
      new BlankLineToken(),
      new ParagraphToken("Another paragraph."),
    ]);
  });

  it("should tokenize code blocks", () => {
    const source = "```\ncode line 1\ncode line 2\n```";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new CodeBlockStartToken(null),
      new CodeBlockContentToken("code line 1"),
      new CodeBlockContentToken("code line 2"),
      new CodeBlockEndToken(),
    ]);
  });

  it("should tokenize code blocks with language", () => {
    const source = "```javascript\nconsole.log('Hello');\n```";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new CodeBlockStartToken("javascript"),
      new CodeBlockContentToken("console.log('Hello');"),
      new CodeBlockEndToken(),
    ]);
  });

  it("should tokenize block quotes", () => {
    const source = "> This is a blockquote.";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([new BlockquoteToken("This is a blockquote.")]);
  });

  it("should tokenize unordered lists", () => {
    const source = "- Item 1\n  - Subitem 1\n* Item 2";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new ListItemToken(false, 1, "Item 1"),
      new ListItemToken(false, 2, "Subitem 1"),
      new ListItemToken(false, 1, "Item 2"),
    ]);
  });

  it("should tokenize ordered lists", () => {
    const source = "1. First item\n2. Second item";
    const tokens = tokenizeMarkdown(source);
    expect(tokens).toEqual([
      new ListItemToken(true, 1, "First item"),
      new ListItemToken(true, 1, "Second item"),
    ]);
  });
});
