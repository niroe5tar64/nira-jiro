import { describe, it, expect } from "bun:test";
import { JiraLexer } from "./lexer";
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

describe("JiraLexer", () => {
  it("should tokenize headings", () => {
    const source = "h1. Heading 1\nh2. Heading 2";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([new HeadingToken(1, "Heading 1"), new HeadingToken(2, "Heading 2")]);
  });

  it("should tokenize paragraphs", () => {
    const source = "This is a paragraph.";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([new ParagraphToken("This is a paragraph.")]);
  });

  it("should tokenize unordered list items", () => {
    const source = "* Item 1\n** Subitem 1\n*** Subsubitem 1";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      new ListItemToken(false, 1, "Item 1"),
      new ListItemToken(false, 2, "Subitem 1"),
      new ListItemToken(false, 3, "Subsubitem 1"),
    ]);
  });

  it("should tokenize ordered list items", () => {
    const source = "# Item 1\n## Subitem 1\n### Subsubitem 1";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      new ListItemToken(true, 1, "Item 1"),
      new ListItemToken(true, 2, "Subitem 1"),
      new ListItemToken(true, 3, "Subsubitem 1"),
    ]);
  });

  it("should tokenize code blocks", () => {
    const source = "{code:javascript}\nconsole.log('Hello, world!');\n{code}";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      new CodeBlockStartToken("javascript"),
      new CodeBlockContentToken("console.log('Hello, world!');"),
      new CodeBlockEndToken(),
    ]);
  });

  it("should tokenize blockquotes", () => {
    const source = "{quote}\nThis is a blockquote.\n{quote}";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([new BlockquoteToken("This is a blockquote."), new BlankLineToken()]);
  });

  it("should tokenize single-line blockquotes", () => {
    const source = "bq. This is a single-line blockquote.";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([new BlockquoteToken("This is a single-line blockquote.")]);
  });

  it("should tokenize blank lines", () => {
    const source = "\n\n";
    const lexer = new JiraLexer(source);
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([new BlankLineToken(), new BlankLineToken()]);
  });
});
