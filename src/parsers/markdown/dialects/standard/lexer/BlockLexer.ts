import type { BlockToken } from "../../../common/tokens/block";

export class BlockLexer {
  private lines: string[];
  private insideCodeBlock = false;
  private insideBlockquote = false;

  constructor(private source: string) {
    this.lines = source.split(/\r?\n/);
  }

  tokenize(): BlockToken[] {
    const tokens: BlockToken[] = [];

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const trimmed = line.trim();

      // Code Block Mode
      if (this.insideCodeBlock) {
        if (trimmed.startsWith("```")) {
          tokens.push({ kind: "code_block_end" });
          this.insideCodeBlock = false;
        } else {
          tokens.push({ kind: "code_block_content", content: line });
        }
        continue;
      }

      // Code Block Start
      if (trimmed.startsWith("```")) {
        const lang = trimmed.slice(3).trim() || null;
        tokens.push({ kind: "code_block_start", language: lang });
        this.insideCodeBlock = true;
        continue;
      }

      // Empty line
      if (trimmed === "") {
        // 引用の途中の空行も引用継続扱い
        if (this.insideBlockquote) {
          tokens.push({ kind: "blockquote", content: "" });
        } else {
          tokens.push({ kind: "blank_line" });
        }
        continue;
      }

      // Blockquote Line
      const blockquoteMatch = line.match(/^>\s?(.*)$/);
      if (blockquoteMatch) {
        tokens.push({ kind: "blockquote", content: blockquoteMatch[1] });
        this.insideBlockquote = true;
        continue;
      }

      // 引用の継続条件: 空行ではない + 直前が引用
      if (this.insideBlockquote && trimmed !== "") {
        this.insideBlockquote = false;
        tokens.push({ kind: "blockquote", content: trimmed });
        continue;
      }

      // List item
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
      if (listMatch) {
        const indent = listMatch[1].length;
        const marker = listMatch[2];
        const content = listMatch[3];
        const ordered = /^\d+\./.test(marker);
        const level = Math.floor(indent / 2) + 1;
        tokens.push({ kind: "list_item", ordered, level, content });
        continue;
      }

      // Heading
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = headingMatch[2];
        tokens.push({ kind: "heading", level, content });
        continue;
      }

      // Paragraph（今は他の構文は考慮せず fallback 扱い）
      tokens.push({ kind: "paragraph", content: trimmed });
    }

    return tokens;
  }
}
