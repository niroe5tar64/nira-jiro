import { AbstractMarkdownNodeVisitor } from "./AbstractMarkdownNodeVisitor";
import type {
  BlockNode,
  ParagraphNode,
  HeadingNode,
  BlockquoteNode,
  ListNode,
  CodeBlockNode,
  BlankLineNode,
} from "../block";
import type { TextNode, EmphasisNode, StrongNode } from "../inline";

export class DomRendererVisitor extends AbstractMarkdownNodeVisitor<Node> {
  render(nodes: BlockNode[]): DocumentFragment {
    const fragment = document.createDocumentFragment();
    for (const node of nodes) {
      fragment.appendChild(this.visitBlock(node));
    }
    return fragment;
  }

  protected visitBlankLine(node: BlankLineNode): Node {
    const br = document.createElement("br");
    return br;
  }

  protected visitParagraph(node: ParagraphNode): HTMLElement {
    const p = document.createElement("p");
    const inlineNodes = this.visitInlineAll(node.inline);
    for (const child of inlineNodes) {
      p.appendChild(child);
    }
    return p;
  }

  protected visitHeading(node: HeadingNode): HTMLElement {
    const h = document.createElement(`h${node.level}`);
    const inlineNodes = this.visitInlineAll(node.inline);
    for (const child of inlineNodes) {
      h.appendChild(child);
    }
    return h;
  }

  protected visitBlockquote(node: BlockquoteNode): HTMLElement {
    const bq = document.createElement("blockquote");
    const children = this.render(node.children); // ← 再帰的にDOMを構築
    bq.appendChild(children);
    return bq;
  }

  protected visitList(node: ListNode): HTMLElement {
    const listEl = document.createElement(node.items[0]?.ordered ? "ol" : "ul");

    for (const item of node.items) {
      const li = document.createElement("li");
      const inlineNodes = this.visitInlineAll(item.inline);
      for (const child of inlineNodes) {
        li.appendChild(child);
      }
      listEl.appendChild(li);
    }

    return listEl;
  }

  protected visitCodeBlock(node: CodeBlockNode): HTMLElement {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    if (node.language) {
      code.className = `language-${node.language}`;
    }
    code.textContent = node.content.join("\n");
    pre.appendChild(code);
    return pre;
  }

  protected visitText(node: TextNode): Text {
    return document.createTextNode(node.content);
  }

  protected visitEmphasis(node: EmphasisNode): HTMLElement {
    const em = document.createElement("em");
    em.textContent = node.content;
    return em;
  }

  protected visitStrong(node: StrongNode): HTMLElement {
    const strong = document.createElement("strong");
    strong.textContent = node.content;
    return strong;
  }
}
