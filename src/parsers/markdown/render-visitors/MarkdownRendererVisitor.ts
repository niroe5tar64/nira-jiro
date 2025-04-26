import { AbstractMarkdownNodeVisitor } from ".";
import type {
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  ListItemContext,
} from "../nodes";

export class MarkdownRendererVisitor extends AbstractMarkdownNodeVisitor {
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
    return `${node.items
      .map((item, index) => {
        const order = node.ordered ? index + 1 : undefined;
        return item.accept(this, { order });
      })
      .join("\n")}\n`;
  }

  visitListItem(node: MarkdownListItemNode, context: ListItemContext): string {
    const content = node.children.map((child) => child.accept(this)).join("");
    const prefix = context.order !== undefined ? `${context.order}. ` : "- ";
    return `${prefix}${content}`;
  }

  visitText(node: MarkdownTextNode): string {
    return node.content;
  }
}
