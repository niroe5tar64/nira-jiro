import { describe, it, expect } from "bun:test";
import { AstSerializerVisitor } from "./AstSerializerVisitor";
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../nodes";

describe("AstSerializerVisitor", () => {
  const visitor = new AstSerializerVisitor();

  it("should serialize a heading node", () => {
    const node = new MarkdownHeadingNode(2, [new MarkdownTextNode("Heading Text")]);
    const result = visitor.visitHeading(node);

    expect(result).toEqual({
      type: "heading",
      level: 2,
      children: [{ type: "text", content: "Heading Text" }],
    });
  });

  it("should serialize a paragraph node", () => {
    const node = new MarkdownParagraphNode([new MarkdownTextNode("Paragraph Text")]);
    const result = visitor.visitParagraph(node);

    expect(result).toEqual({
      type: "paragraph",
      children: [{ type: "text", content: "Paragraph Text" }],
    });
  });

  it("should serialize a code block node", () => {
    const node = new MarkdownCodeBlockNode("javascript", "console.log('Hello, world!');");
    const result = visitor.visitCodeBlock(node);

    expect(result).toEqual({
      type: "codeBlock",
      language: "javascript",
      content: "console.log('Hello, world!');",
    });
  });

  it("should serialize a blockquote node", () => {
    const node = new MarkdownBlockquoteNode([
      new MarkdownParagraphNode([new MarkdownTextNode("Blockquote Text")]),
    ]);
    const result = visitor.visitBlockquote(node);

    expect(result).toEqual({
      type: "blockquote",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", content: "Blockquote Text" }],
        },
      ],
    });
  });

  it("should serialize a list node", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([new MarkdownTextNode("Item 1")]),
      new MarkdownListItemNode([new MarkdownTextNode("Item 2")]),
    ]);
    const result = visitor.visitList(node);

    expect(result).toEqual({
      type: "list",
      ordered: false,
      items: [
        { type: "listItem", children: [{ type: "text", content: "Item 1" }] },
        { type: "listItem", children: [{ type: "text", content: "Item 2" }] },
      ],
    });
  });

  it("should serialize a list item node", () => {
    const node = new MarkdownListItemNode([new MarkdownTextNode("List Item Text")]);
    const result = visitor.visitListItem(node);

    expect(result).toEqual({
      type: "listItem",
      children: [{ type: "text", content: "List Item Text" }],
    });
  });

  it("should serialize a text node", () => {
    const node = new MarkdownTextNode("Text Content");
    const result = visitor.visitText(node);

    expect(result).toEqual({
      type: "text",
      content: "Text Content",
    });
  });
});
