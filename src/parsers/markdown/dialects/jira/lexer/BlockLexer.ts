import type { BlockToken } from "../../../common/tokens/block";

export class BlockLexer {
  private lines: string[];
  private insideCodeBlock = false;
  private insideQuoteBlock = false;

  constructor(private source: string) {
    this.lines = source.split(/\r?\n/);
  }

  tokenize(): BlockToken[] {
    const tokens: BlockToken[] = [];

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const trimmed = line.trim();

      // --- Code Block ---
      if (this.insideCodeBlock) {
        if (trimmed === "{code}") {
          tokens.push({ kind: "code_block_end" });
          this.insideCodeBlock = false;
        } else {
          tokens.push({ kind: "code_block_content", content: line });
        }
        continue;
      }

      if (trimmed.startsWith("{code")) {
        const langMatch = trimmed.match(/^\{code(?::(\w+))?\}$/);
        const lang = langMatch?.[1] ?? null;
        tokens.push({ kind: "code_block_start", language: lang });
        this.insideCodeBlock = true;
        continue;
      }

      // --- Quote Block ---
      if (this.insideQuoteBlock) {
        if (trimmed === "{quote}") {
          tokens.push({ kind: "blockquote_end" });
          this.insideQuoteBlock = false;
        } else {
          tokens.push({ kind: "blockquote_content", content: line });
        }
        continue;
      }

      if (trimmed === "{quote}") {
        tokens.push({ kind: "blockquote_start" });
        this.insideQuoteBlock = true;
        continue;
      }

      // --- Short quote (bq.) ---
      const bqMatch = trimmed.match(/^bq\.\s+(.*)$/);
      if (bqMatch) {
        tokens.push({ kind: "blockquote", content: bqMatch[1] });
        continue;
      }

      // --- Heading ---
      const headingMatch = trimmed.match(/^h([1-6])\.\s+(.*)$/);
      if (headingMatch) {
        const level = Number.parseInt(headingMatch[1], 10);
        tokens.push({ kind: "heading", level, content: headingMatch[2] });
        continue;
      }

      // --- Blank Line ---
      if (trimmed === "") {
        tokens.push({ kind: "blank_line" });
        continue;
      }

      // --- List Item ---
      const listMatch = trimmed.match(/^([*#]+)\s+(.*)$/);
      if (listMatch) {
        const markers = listMatch[1];
        const content = listMatch[2];
        const ordered = markers.startsWith("#");
        const level = markers.length;
        tokens.push({ kind: "list_item", ordered, level, content });
        continue;
      }

      // --- Paragraph (fallback) ---
      tokens.push({ kind: "paragraph", content: trimmed });
    }

    return tokens;
  }
}
