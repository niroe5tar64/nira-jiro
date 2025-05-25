import type {
  BlankLineNode,
  BlockNode,
  BlockquoteNode,
  CodeBlockNode,
  HeadingNode,
  ListNode,
  ParagraphNode,
} from "../block";
import type { EmphasisNode, InlineNode, StrongNode, TextNode } from "../inline";

export abstract class AbstractMarkdownNodeVisitor<T> {
  // エントリポイント：BlockNode配列を処理する
  abstract render(nodes: BlockNode[]): T;

  // BlockNode種別によるディスパッチ
  protected visitBlock(node: BlockNode): T {
    switch (node.kind) {
      case "blank_line":
        return this.visitBlankLine(node);
      case "paragraph":
        return this.visitParagraph(node);
      case "heading":
        return this.visitHeading(node);
      case "blockquote":
        return this.visitBlockquote(node);
      case "list":
        return this.visitList(node);
      case "code_block":
        return this.visitCodeBlock(node);
      default:
        throw new Error(`Unknown block node kind: ${node.kind}`);
    }
  }

  // InlineNode種別によるディスパッチ
  protected visitInline(node: InlineNode): T {
    switch (node.kind) {
      case "text":
        return this.visitText(node);
      case "emphasis":
        return this.visitEmphasis(node);
      case "strong":
        return this.visitStrong(node);
      default:
        throw new Error("Unknown inline node kind");
    }
  }

  // InlineNode種別によるディスパッチ（一括処理）
  protected visitInlineAll(nodes: InlineNode[]): T[] {
    return nodes.map((n) => this.visitInline(n));
  }

  // BlockNode関連
  protected abstract visitBlankLine(node: BlankLineNode): T;
  protected abstract visitParagraph(node: ParagraphNode): T;
  protected abstract visitHeading(node: HeadingNode): T;
  protected abstract visitBlockquote(node: BlockquoteNode): T;
  protected abstract visitList(node: ListNode): T;
  protected abstract visitCodeBlock(node: CodeBlockNode): T;
  // InlineNode関連
  protected abstract visitText(node: TextNode): T;
  protected abstract visitEmphasis(node: EmphasisNode): T;
  protected abstract visitStrong(node: StrongNode): T;
}
