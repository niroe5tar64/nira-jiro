import type {
  BlankLineNode,
  BlockNode,
  BlockquoteNode,
  CodeBlockNode,
  HeadingNode,
  ListNode,
  ParagraphNode,
} from "../../../common/ast/block";
import type { EmphasisNode, StrongNode, TextNode } from "../../../common/ast/inline";
import { AbstractMarkdownNodeVisitor } from "../../../common/ast/visitors/AbstractMarkdownNodeVisitor";

export class StandardMarkdownRendererVisitor extends AbstractMarkdownNodeVisitor<string> {
  render(nodes: BlockNode[]): string {
    return nodes.map((n) => this.visitBlock(n)).join("\n");
  }

  protected visitBlankLine(node: BlankLineNode): string {
    return "";
  }

  protected visitParagraph(node: ParagraphNode): string {
    return this.visitInlineAll(node.inline).join("");
  }

  protected visitHeading(node: HeadingNode): string {
    const prefix = "#".repeat(node.level);
    return `${prefix} ${this.visitInlineAll(node.inline).join("")}`;
  }

  protected visitBlockquote(node: BlockquoteNode): string {
    return node.children
      .map((child) => this.visitBlock(child))
      .map((line) => `> ${line}`)
      .join("\n");
  }

  protected visitList(node: ListNode): string {
    return node.items
      .map((item) => {
        const marker = item.ordered ? `${item.level}.` : "-";
        const inline = item.inline.map((n) => this.visitInline(n)).join("");
        return `${"  ".repeat(item.level - 1)}${marker} ${inline}`;
      })
      .join("\n");
  }

  protected visitCodeBlock(node: CodeBlockNode): string {
    const code = node.content.join("\n");
    return `\`\`\`${node.language ?? ""}\n${code}\n\`\`\``;
  }

  protected visitText(node: TextNode): string {
    return node.content;
  }

  protected visitEmphasis(node: EmphasisNode): string {
    return `*${node.content}*`;
  }

  protected visitStrong(node: StrongNode): string {
    return `**${node.content}**`;
  }
}
