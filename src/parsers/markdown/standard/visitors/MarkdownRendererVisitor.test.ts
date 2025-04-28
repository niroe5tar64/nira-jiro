import { describe, it, expect } from "bun:test";
import { MarkdownRendererVisitor } from ".";
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../../common/ast/nodes";

describe("MarkdownRendererVisitor", () => {
  const visitor = new MarkdownRendererVisitor();

  it("should render a heading", () => {
    const node = new MarkdownHeadingNode(2, [new MarkdownTextNode("Heading 2")]);
    const result = visitor.visitHeading(node);
    expect(result).toBe("## Heading 2\n");
  });

  it("should render a paragraph", () => {
    const node = new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]);
    const result = visitor.visitParagraph(node);
    expect(result).toBe("This is a paragraph.\n");
  });

  it("should render a code block", () => {
    const node = new MarkdownCodeBlockNode("javascript", "console.log('Hello, world!');");
    const result = visitor.visitCodeBlock(node);
    expect(result).toBe("```javascript\nconsole.log('Hello, world!');\n```\n");
  });

  it("should render a blockquote", () => {
    const node = new MarkdownBlockquoteNode([
      new MarkdownParagraphNode([new MarkdownTextNode("This is a blockquote.")]),
    ]);
    const result = visitor.visitBlockquote(node);
    expect(result).toBe("> This is a blockquote.\n");
  });

  it("should render an unordered list", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([new MarkdownTextNode("Item 1")]),
      new MarkdownListItemNode([new MarkdownTextNode("Item 2")]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("- Item 1\n- Item 2\n");
  });

  it("should render an ordered list", () => {
    const node = new MarkdownListNode(true, [
      new MarkdownListItemNode([new MarkdownTextNode("First item")]),
      new MarkdownListItemNode([new MarkdownTextNode("Second item")]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("1. First item\n2. Second item\n");
  });

  it("should render a list item with order", () => {
    const node = new MarkdownListItemNode([new MarkdownTextNode("Ordered item")]);
    const result = visitor.visitListItem(node);
    expect(result).toBe("Ordered item");
  });

  it("should render a list item without order", () => {
    const node = new MarkdownListItemNode([new MarkdownTextNode("Unordered item")]);
    const result = visitor.visitListItem(node);
    expect(result).toBe("Unordered item");
  });

  it("should render plain text", () => {
    const node = new MarkdownTextNode("Plain text content");
    const result = visitor.visitText(node);
    expect(result).toBe("Plain text content");
  });
});
