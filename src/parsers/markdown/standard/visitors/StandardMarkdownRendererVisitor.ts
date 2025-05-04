import { AbstractMarkdownNodeVisitor } from "../../common/ast/visitors/AbstractMarkdownNodeVisitor";
import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  MarkdownBlankLineNode,
} from "../../common/ast/nodes";

export class StandardMarkdownRendererVisitor extends AbstractMarkdownNodeVisitor<string> {
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
    const lines = node.children
      .map((child) => child.accept(this))
      .join("\n")
      .split("\n");

    const content = lines
      .map((line, index) => {
        const hasContent = line.trim() !== "";
        const isLastLine = index === lines.length - 1;
        return hasContent && !isLastLine ? `> ${line}` : null;
      })
      .filter((line) => line !== null)
      .join("\n");

    return `${content}\n`;
  }

  visitList(node: MarkdownListNode): string {
    const ordered = node.ordered;
    let index = 1;

    const items = node.items.map((item) => {
      const prefix = ordered ? `${index++}. ` : "- ";
      const content = item.accept(this);
      return prefix + content;
    });

    return `${items.join("\n")}\n`;
  }

  visitListItem(node: MarkdownListItemNode): string {
    return node.children.map((child) => child.accept(this)).join("");
  }

  visitText(node: MarkdownTextNode): string {
    return node.content;
  }

  visitBlankLine(node: MarkdownBlankLineNode): string {
    return node.content;
  }
}
