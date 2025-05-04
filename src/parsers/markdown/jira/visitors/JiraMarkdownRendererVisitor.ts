import { AbstractMarkdownNodeVisitor } from "../../common/ast/visitors";
import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  MarkdownBlankLineNode,
} from "../../common/ast/nodes";

import { MarkdownListNode } from "../../common/ast/nodes";

export class JiraMarkdownRendererVisitor extends AbstractMarkdownNodeVisitor<string> {
  private indentLevel = 0;

  visitHeading(node: MarkdownHeadingNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    return `h${node.level}. ${content}\n`;
  }

  visitParagraph(node: MarkdownParagraphNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    return `${content}\n\n`;
  }

  visitCodeBlock(node: MarkdownCodeBlockNode): string {
    const lang = node.language ?? "";
    return `{code${lang ? `:${lang}` : ""}}\n${node.content}\n{code}\n\n`;
  }

  visitBlockquote(node: MarkdownBlockquoteNode): string {
    const content = node.children
      .map((child) => child.accept(this))
      .join("\n")
      .replace(/\n+$/, ""); // 末尾の無駄な改行を削除
    return `{quote}\n${content}\n{quote}\n\n`;
  }

  visitList(node: MarkdownListNode): string {
    const previousIndent = this.indentLevel;
    this.indentLevel++;

    const content = node.items.map((item) => item.accept(this)).join("");

    this.indentLevel = previousIndent;

    return content;
  }

  visitListItem(node: MarkdownListItemNode): string {
    const prefix = this.listMarker();
    const content = node.children
      .filter((child) => !(child instanceof MarkdownListNode))
      .map((child) => child.accept(this))
      .join("");

    const nestedList = node.children
      .filter((child) => child instanceof MarkdownListNode)
      .map((child) => child.accept(this))
      .join("");

    return `${prefix} ${content}\n${nestedList}`;
  }

  visitText(node: MarkdownTextNode): string {
    // Jira記法的にエスケープ必要な場合はここで対応
    return node.content;
  }

  private listMarker(): string {
    return this.indentLevel > 0 ? `${"*".repeat(this.indentLevel)}` : "*";
  }

  visitBlankLine(node: MarkdownBlankLineNode): string {
    return node.content;
  }
}
