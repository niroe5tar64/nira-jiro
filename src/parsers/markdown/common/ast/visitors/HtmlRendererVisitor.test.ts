import { describe, it, expect } from "bun:test";
import { HtmlRendererVisitor } from ".";
import {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../nodes";

describe("HtmlRendererVisitor", () => {
  const visitor = new HtmlRendererVisitor();

  it("should render a heading", () => {
    const node = new MarkdownHeadingNode(1, [new MarkdownTextNode("Heading 1")]);
    const result = visitor.visitHeading(node);
    expect(result).toBe("<h1>Heading 1</h1>");
  });

  it("should render a paragraph", () => {
    const node = new MarkdownParagraphNode([new MarkdownTextNode("This is a paragraph.")]);
    const result = visitor.visitParagraph(node);
    expect(result).toBe("<p>This is a paragraph.</p>");
  });

  it("should render a code block", () => {
    const node = new MarkdownCodeBlockNode("javascript", "console.log('Hello, world!');");
    const result = visitor.visitCodeBlock(node);
    expect(result).toBe(
      `<pre><code class="language-javascript">console.log(&#039;Hello, world!&#039;);</code></pre>`,
    );
  });

  it("should render a blockquote", () => {
    const node = new MarkdownBlockquoteNode([
      new MarkdownParagraphNode([new MarkdownTextNode("This is a blockquote.")]),
    ]);
    const result = visitor.visitBlockquote(node);
    expect(result).toBe("<blockquote>\n<p>This is a blockquote.</p>\n</blockquote>");
  });

  it("should render an unordered list", () => {
    const node = new MarkdownListNode(false, [
      new MarkdownListItemNode([new MarkdownTextNode("Item 1")]),
      new MarkdownListItemNode([new MarkdownTextNode("Item 2")]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>");
  });

  it("should render an ordered list", () => {
    const node = new MarkdownListNode(true, [
      new MarkdownListItemNode([new MarkdownTextNode("First item")]),
      new MarkdownListItemNode([new MarkdownTextNode("Second item")]),
    ]);
    const result = visitor.visitList(node);
    expect(result).toBe("<ol>\n<li>First item</li>\n<li>Second item</li>\n</ol>");
  });

  it("should render a list item", () => {
    const node = new MarkdownListItemNode([new MarkdownTextNode("List item content")]);
    const result = visitor.visitListItem(node);
    expect(result).toBe("<li>List item content</li>");
  });

  it("should render text with HTML escaping", () => {
    const node = new MarkdownTextNode("<div>Text & more</div>");
    const result = visitor.visitText(node);
    expect(result).toBe("&lt;div&gt;Text &amp; more&lt;/div&gt;");
  });
});
