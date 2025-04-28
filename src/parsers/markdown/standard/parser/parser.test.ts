import { describe, it, expect } from "bun:test";
import { MarkdownASTBuilder } from "./parser";

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
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../../common/ast/nodes";

describe("MarkdownASTBuilder", () => {
  it("should build an AST for headings", () => {
    const tokens = [new HeadingToken(1, "Heading 1"), new HeadingToken(2, "Heading 2")];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownHeadingNode(1, [new MarkdownTextNode("Heading 1")]),
      new MarkdownHeadingNode(2, [new MarkdownTextNode("Heading 2")]),
    ]);
  });

  it("should build an AST for paragraphs", () => {
    const tokens = [
      new ParagraphToken("This is a paragraph."),
      new ParagraphToken("Another paragraph."),
    ];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]),
      new MarkdownParagraphNode([new MarkdownTextNode("Another paragraph.")]),
    ]);
  });

  it("should build an AST for code blocks", () => {
    const tokens = [
      new CodeBlockStartToken(null),
      new CodeBlockContentToken("console.log('Hello, world!');"),
      new CodeBlockEndToken(),
    ];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([new MarkdownCodeBlockNode(null, "console.log('Hello, world!');")]);
  });

  it("should build an AST for block quotes", () => {
    const tokens = [
      new BlockquoteToken("This is a blockquote."),
      new BlockquoteToken("Another blockquote."),
    ];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownBlockquoteNode([
        new MarkdownParagraphNode([new MarkdownTextNode("This is a blockquote.")]),
        new MarkdownParagraphNode([new MarkdownTextNode("Another blockquote.")]),
      ]),
    ]);
  });

  it("should build an AST for lists", () => {
    const tokens = [new ListItemToken(false, 0, "Item 1"), new ListItemToken(false, 0, "Item 2")];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownListNode(false, [
        new MarkdownListItemNode([new MarkdownParagraphNode([new MarkdownTextNode("Item 1")])]),
        new MarkdownListItemNode([new MarkdownParagraphNode([new MarkdownTextNode("Item 2")])]),
      ]),
    ]);
  });

  it("should handle mixed tokens", () => {
    const tokens = [
      new HeadingToken(1, "Heading"),
      new ParagraphToken("This is a paragraph."),
      new CodeBlockStartToken("javascript"),
      new CodeBlockContentToken("console.log('Hello');"),
      new CodeBlockEndToken(),
    ];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownHeadingNode(1, [new MarkdownTextNode("Heading")]),
      new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]),
      new MarkdownCodeBlockNode("javascript", "console.log('Hello');"),
    ]);
  });

  it("should ignore blank lines", () => {
    const tokens = [
      new ParagraphToken("This is a paragraph."),
      new BlankLineToken(),
      new ParagraphToken("Another paragraph."),
    ];
    const builder = new MarkdownASTBuilder(tokens);
    const ast = builder.build();

    expect(ast).toEqual([
      new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]),
      new MarkdownParagraphNode([new MarkdownTextNode("Another paragraph.")]),
    ]);
  });
});
