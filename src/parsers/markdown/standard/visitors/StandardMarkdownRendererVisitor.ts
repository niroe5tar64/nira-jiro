import { AbstractMarkdownNodeVisitor } from "../../common/ast/visitors/AbstractMarkdownNodeVisitor";
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

export class StandardMarkdownRendererVisitor extends AbstractMarkdownNodeVisitor<string> {
  private listState = { marker: "*", indentLevel: 0 };

  visitHeading(node: MarkdownHeadingNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    const prefix = "#".repeat(node.level);
    return `${prefix} ${content}\n`;
  }

  visitParagraph(node: MarkdownParagraphNode): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    return `${content}\n`;
  }

  visitCodeBlock(node: MarkdownCodeBlockNode): string {
    const lang = node.language ?? "";
    return `\`\`\`${lang}\n${node.content}\n\`\`\`\n`;
  }

  visitBlockquote(node: MarkdownBlockquoteNode): string {
    const lines = node.children.map((child) => child.accept(this));

    const content = lines
      .map((line, index) => {
        const hasContent = line.trim() !== "";
        const isFirstLine = index === 0;
        return hasContent && isFirstLine ? `> ${line}` : line;
      })
      .join("");

    return `${content}\n`;
  }

  visitList(node: MarkdownListNode): string {
    const previousListState = this.listState;
    this.listState = {
      marker: node.ordered ? "1." : "- ",
      indentLevel: this.listState.indentLevel + 1,
    };

    const content = node.items.map((item) => item.accept(this)).join("");
    this.listState = previousListState;

    return content;
  }

  visitListItem(node: MarkdownListItemNode): string {
    const { marker, indentLevel } = this.listState;
    const prefix = " ".repeat(indentLevel * 2) + marker;
    const content = node.children
      .filter((child) => !(child instanceof MarkdownListNode))
      .map((child) => child.accept(this))
      .join("");

    const nestedList = node.children
      .filter((child) => child instanceof MarkdownListNode)
      .map((child) => child.accept(this))
      .join("");

    return `${prefix} ${content}${nestedList}`;
  }

  visitText(node: MarkdownTextNode): string {
    return node.content;
  }

  visitBlankLine(node: MarkdownBlankLineNode): string {
    return node.content;
  }
}
