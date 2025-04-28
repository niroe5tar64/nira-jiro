import { describe, it, expect } from "bun:test";
import { JiraMarkdownRendererVisitor } from "./JiraMarkdownRendererVisitor";
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../../common/ast/nodes";

describe("JiraMarkdownRendererVisitor", () => {
  const visitor = new JiraMarkdownRendererVisitor();

  it("should render a heading", () => {
    const node = new MarkdownHeadingNode(2, [new MarkdownTextNode("Heading 2")]);
    const result = visitor.visitHeading(node);
    expect(result).toBe("h2. Heading 2\n");
  });

  it("should render a paragraph", () => {
    const node = new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]);
    const result = visitor.visitParagraph(node);
    expect(result).toBe("This is a paragraph.\n\n");
  });

  it("should render a code block", () => {
    const node = new MarkdownCodeBlockNode("javascript", "console.log('Hello, world!');");
    const result = visitor.visitCodeBlock(node);
    expect(result).toBe("{code:javascript}\nconsole.log('Hello, world!');\n{code}\n\n");
  });

  it("should render a blockquote", () => {
    const node = new MarkdownBlockquoteNode([
      new MarkdownParagraphNode([new MarkdownTextNode("This is a blockquote.")]),
    ]);
    const result = visitor.visitBlockquote(node);
    expect(result).toBe("{quote}\nThis is a blockquote.\n{quote}\n\n");
  });

  it("should render an unordered list", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([new MarkdownTextNode("Item 1")]),
      new MarkdownListItemNode([new MarkdownTextNode("Item 2")]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("* Item 1\n* Item 2\n");
  });

  it("should render a nested unordered list", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([
        new MarkdownTextNode("Parent Item"),
        new MarkdownListNode(false, [
          new MarkdownListItemNode([new MarkdownTextNode("Child Item")]),
        ]),
      ]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("* Parent Item\n** Child Item\n");
  });

  it("should render a text node", () => {
    const node = new MarkdownTextNode("Plain text content");
    const result = visitor.visitText(node);
    expect(result).toBe("Plain text content");
  });

  it("should render a deeply nested list", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([
        new MarkdownTextNode("Level 1"),
        new MarkdownListNode(false, [
          new MarkdownListItemNode([
            new MarkdownTextNode("Level 2"),
            new MarkdownListNode(false, [
              new MarkdownListItemNode([new MarkdownTextNode("Level 3")]),
            ]),
          ]),
        ]),
      ]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("* Level 1\n** Level 2\n*** Level 3\n");
  });
});
