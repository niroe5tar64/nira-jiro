import {
  type MarkdownBlockNode,
  MarkdownHeadingNode,
  MarkdownParagraphNode,
  MarkdownCodeBlockNode,
  MarkdownBlockquoteNode,
  MarkdownListNode,
  MarkdownListItemNode,
  MarkdownTextNode,
  MarkdownBlankLineNode,
} from "../../common/ast/nodes";

import {
  type MarkdownToken,
  HeadingToken,
  ParagraphToken,
  ListItemToken,
  CodeBlockStartToken,
  CodeBlockContentToken,
  CodeBlockEndToken,
  BlockquoteToken,
  BlankLineToken,
} from "../../common/tokens";

/**
 * Markdownのトークン列からASTを組み立てるパーサー
 */
export class StandardParser {
  private nodes: MarkdownBlockNode[] = [];

  constructor(private tokens: MarkdownToken[]) {}

  /**
   * AST構築のエントリポイント
   */
  build(): MarkdownBlockNode[] {
    let i = 0;

    while (i < this.tokens.length) {
      const token = this.tokens[i];

      if (token instanceof HeadingToken) {
        this.nodes.push(this.buildHeading(token));
        i++;
      } else if (token instanceof ParagraphToken) {
        this.nodes.push(this.buildParagraph(token));
        i++;
      } else if (token instanceof CodeBlockStartToken) {
        const [codeBlock, nextIndex] = this.buildCodeBlock(i);
        this.nodes.push(codeBlock);
        i = nextIndex;
      } else if (token instanceof BlockquoteToken) {
        const [blockquote, nextIndex] = this.buildBlockquote(i);
        this.nodes.push(blockquote);
        i = nextIndex;
      } else if (token instanceof ListItemToken) {
        const [list, nextIndex] = this.buildList(i);
        this.nodes.push(list);
        i = nextIndex;
      } else if (token instanceof BlankLineToken) {
        this.nodes.push(this.buildBlankLine());
        i++;
      } else {
        i++;
      }
    }

    return this.nodes;
  }

  private buildHeading(token: HeadingToken): MarkdownHeadingNode {
    return new MarkdownHeadingNode(token.level, [new MarkdownTextNode(token.content)]);
  }

  private buildParagraph(token: ParagraphToken): MarkdownParagraphNode {
    return new MarkdownParagraphNode([new MarkdownTextNode(token.content)]);
  }

  private buildCodeBlock(startIndex: number): [MarkdownCodeBlockNode, number] {
    const startToken = this.tokens[startIndex];
    if (!(startToken instanceof CodeBlockStartToken)) {
      throw new Error("Expected CodeBlockStartToken");
    }

    let content = "";
    let i = startIndex + 1;

    while (i < this.tokens.length) {
      const token = this.tokens[i];
      if (token instanceof CodeBlockEndToken) {
        break;
      }
      if (token instanceof CodeBlockContentToken) {
        content += `${token.content}\n`;
      }
      i++;
    }

    return [new MarkdownCodeBlockNode(startToken.language, content.trimEnd()), i + 1];
  }

  private buildBlockquote(startIndex: number): [MarkdownBlockquoteNode, number] {
    const children: MarkdownBlockNode[] = [];
    let i = startIndex;

    while (i < this.tokens.length) {
      const token = this.tokens[i];
      if (!(token instanceof BlockquoteToken)) {
        break;
      }
      children.push(this.buildParagraph(new ParagraphToken(token.content)));
      i++;
    }

    return [new MarkdownBlockquoteNode(children), i];
  }

  private buildList(startIndex: number): [MarkdownListNode, number] {
    const rootItems: MarkdownListItemNode[] = [];
    const stack: { list: MarkdownListNode; level: number }[] = [];
    const firstToken = this.tokens[startIndex];
    if (!(firstToken instanceof ListItemToken)) {
      throw new Error("Expected ListItemToken");
    }

    const ordered = firstToken.ordered;
    const currentList = new MarkdownListNode(ordered, rootItems);

    stack.push({ list: currentList, level: firstToken.level });

    let i = startIndex;
    while (i < this.tokens.length) {
      const token = this.tokens[i];

      if (!(token instanceof ListItemToken) || token.ordered !== ordered) {
        break;
      }

      const listItem = new MarkdownListItemNode([
        new MarkdownParagraphNode([new MarkdownTextNode(token.content)]),
      ]);

      const currentLevel = stack[stack.length - 1].level;

      if (token.level > currentLevel) {
        // レベルアップ（子リスト作成）
        const subList = new MarkdownListNode(ordered, [listItem]);
        const parentItem = stack[stack.length - 1].list.items.at(-1);
        if (parentItem) {
          parentItem.children.push(subList);
        }
        stack.push({ list: subList, level: token.level });
      } else if (token.level < currentLevel) {
        // レベルダウン（親リストに戻る）
        while (stack.length > 0 && stack[stack.length - 1].level > token.level) {
          stack.pop();
        }

        if (stack.length === 0) {
          // スタックが空ならroot直下に
          rootItems.push(listItem);
        } else {
          // 通常通り親リストに追加
          stack[stack.length - 1].list.items.push(listItem);
        }
      } else {
        // 同じレベルなら同じリストに追加
        stack[stack.length - 1].list.items.push(listItem);
      }
      i++;
    }

    return [currentList, i];
  }

  private buildBlankLine(): MarkdownBlankLineNode {
    return new MarkdownBlankLineNode();
  }
}
