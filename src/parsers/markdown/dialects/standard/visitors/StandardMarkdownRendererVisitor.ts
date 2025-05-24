import { AbstractMarkdownNodeVisitor } from "../../../common/ast/visitors/AbstractMarkdownNodeVisitor";
import type {
  BlockNode,
  ParagraphNode,
  HeadingNode,
  BlockquoteNode,
  ListNode,
  CodeBlockNode,
  BlankLineNode,
} from "../../../common/ast/block";
import type { TextNode, EmphasisNode, StrongNode } from "../../../common/ast/inline";

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
