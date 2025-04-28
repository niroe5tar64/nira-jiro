import { describe, it, expect, mock } from "bun:test";
import { AstDeserializerVisitor } from ".";
import type {
  SerializedHeadingNode,
  SerializedParagraphNode,
  SerializedCodeBlockNode,
  SerializedBlockquoteNode,
  SerializedListNode,
  SerializedListItemNode,
  SerializedTextNode,
} from "../nodes";
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  MarkdownNode,
} from "../../ast/nodes";

describe("AstDeserializerVisitor", () => {
  const visitor = new AstDeserializerVisitor();

  it("should deserialize a heading node", () => {
    const serializedNode: SerializedHeadingNode = {
      type: "heading",
      level: 1,
      children: [{ type: "text", accept: mock() }],
      accept: mock(),
    };

    const result = visitor.visitHeading(serializedNode);

    expect(result).toBeInstanceOf(MarkdownHeadingNode);
    expect(result.level).toBe(1);
    expect(result.children).toHaveLength(1);
  });

  it("should deserialize a paragraph node", () => {
    const serializedNode: SerializedParagraphNode = {
      type: "paragraph",
      children: [{ type: "text", accept: mock() }],
      accept: mock(),
    };

    const result = visitor.visitParagraph(serializedNode);

    expect(result).toBeInstanceOf(MarkdownParagraphNode);
    expect(result.children).toHaveLength(1);
  });

  it("should deserialize a code block node", () => {
    const serializedNode: SerializedCodeBlockNode = {
      type: "codeBlock",
      language: "javascript",
      content: "console.log('Hello, world!');",
      accept: mock(),
    };

    const result = visitor.visitCodeBlock(serializedNode);

    expect(result).toBeInstanceOf(MarkdownCodeBlockNode);
    expect(result.language).toBe("javascript");
    expect(result.content).toBe("console.log('Hello, world!');");
  });

  it("should deserialize a blockquote node", () => {
    const serializedNode: SerializedBlockquoteNode = {
      type: "blockquote",
      children: [{ type: "text", accept: mock() }],
      accept: mock(),
    };

    const result = visitor.visitBlockquote(serializedNode);

    expect(result).toBeInstanceOf(MarkdownBlockquoteNode);
    expect(result.children).toHaveLength(1);
  });

  it("should deserialize a list node", () => {
    const serializedNode: SerializedListNode = {
      type: "list",
      ordered: true,
      items: [{ type: "listItem", accept: mock() }],
      accept: mock(),
    };

    const result = visitor.visitList(serializedNode);

    expect(result).toBeInstanceOf(MarkdownListNode);
    expect(result.ordered).toBe(true);
    expect(result.items).toHaveLength(1);
  });

  it("should deserialize a list item node", () => {
    const serializedNode: SerializedListItemNode = {
      type: "listItem",
      children: [{ type: "text", accept: mock() }],
      accept: mock(),
    };

    const result = visitor.visitListItem(serializedNode);

    expect(result).toBeInstanceOf(MarkdownListItemNode);
    expect(result.children).toHaveLength(1);
  });

  it("should deserialize a text node", () => {
    const serializedNode: SerializedTextNode = {
      type: "text",
      content: "Text Content",
      accept: mock(),
    };

    const result = visitor.visitText(serializedNode);

    expect(result).toBeInstanceOf(MarkdownTextNode);
    expect(result.content).toBe("Text Content");
  });
});
