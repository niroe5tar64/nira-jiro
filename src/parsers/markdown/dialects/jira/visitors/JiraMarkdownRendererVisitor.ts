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

export class JiraMarkdownRendererVisitor extends AbstractMarkdownNodeVisitor<string> {
  render(nodes: BlockNode[]): string {
    return nodes.map((n) => this.visitBlock(n)).join("\n");
  }

  protected visitBlankLine(_node: BlankLineNode): string {
    return "";
  }

  protected visitParagraph(node: ParagraphNode): string {
    return this.visitInlineAll(node.inline).join("");
  }

  protected visitHeading(node: HeadingNode): string {
    return `h${node.level}. ${this.visitInlineAll(node.inline).join("")}`;
  }

  protected visitBlockquote(node: BlockquoteNode): string {
    const content = node.children.map((child) => this.visitBlock(child)).join("\n");
    const multiline = content.includes("\n");

    return multiline ? `{quote}\n${content}\n{quote}` : `bq. ${content}`;
  }

  protected visitList(node: ListNode): string {
    return node.items
      .map((item) => {
        const marker = item.ordered ? "#".repeat(item.level) : "*".repeat(item.level);
        const inline = item.inline.map((n) => this.visitInline(n)).join("");
        return `${marker} ${inline}`;
      })
      .join("\n");
  }

  protected visitCodeBlock(node: CodeBlockNode): string {
    const code = node.content.join("\n");
    return `{code${node.language ? `:${node.language}` : ""}}\n${code}\n{code}`;
  }

  protected visitText(node: TextNode): string {
    return node.content;
  }

  protected visitEmphasis(node: EmphasisNode): string {
    return `_${node.content}_`;
  }

  protected visitStrong(node: StrongNode): string {
    return `*${node.content}*`;
  }
}
