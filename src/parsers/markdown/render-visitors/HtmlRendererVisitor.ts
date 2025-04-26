import { AbstractMarkdownNodeVisitor } from ".";
import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
} from "../nodes";

export class HtmlRendererVisitor extends AbstractMarkdownNodeVisitor {
  visitHeading(node: MarkdownHeadingNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    return `<h${node.level}>${content}</h${node.level}>`;
  }

  visitParagraph(node: MarkdownParagraphNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    return `<p>${content}</p>`;
  }

  visitCodeBlock(node: MarkdownCodeBlockNode): string {
    const langClass = node.language ? ` class="language-${node.language}"` : "";
    return `<pre><code${langClass}>${escapeHtml(node.content)}</code></pre>`;
  }

  visitBlockquote(node: MarkdownBlockquoteNode): string {
    const content = node.children.map((child) => child.accept(this)).join("\n");
    return `<blockquote>\n${content}\n</blockquote>`;
  }

  visitList(node: MarkdownListNode): string {
    const tag = node.ordered ? "ol" : "ul";
    const items = node.items
      .map((item, index) => item.accept(this, { order: node.ordered ? index + 1 : undefined }))
      .join("\n");
    return `<${tag}>\n${items}\n</${tag}>`;
  }

  visitListItem(node: MarkdownListItemNode): string {
    const content = node.children.map((child) => child.accept(this)).join("\n");
    return `<li>${content}</li>`;
  }

  visitText(node: MarkdownTextNode): string {
    return escapeHtml(node.content);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
