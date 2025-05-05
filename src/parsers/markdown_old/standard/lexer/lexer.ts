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

export class StandardLexer {
  private lines: string[];
  private insideCodeBlock = false;

  constructor(private source: string) {
    this.lines = source.split(/\r?\n/);
  }

  tokenize(): MarkdownToken[] {
    const tokens: MarkdownToken[] = [];

    // 空行のみのケース考慮（無駄な空行を除去）
    if (this.lines.every((line) => line.trim() === "")) {
      this.lines.pop();
    }

    for (const line of this.lines) {
      const trimmed = line.trim();

      // inside code block
      if (this.insideCodeBlock) {
        if (trimmed.startsWith("```")) {
          tokens.push(new CodeBlockEndToken());
          this.insideCodeBlock = false;
        } else {
          tokens.push(new CodeBlockContentToken(line));
        }
        continue;
      }

      // empty line
      if (trimmed === "") {
        tokens.push(new BlankLineToken());
        continue;
      }

      // code block start
      if (trimmed.startsWith("```")) {
        const language = trimmed.slice(3).trim() || null;
        tokens.push(new CodeBlockStartToken(language));
        this.insideCodeBlock = true;
        continue;
      }

      // heading (#, ##, ###...)
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        tokens.push(new HeadingToken(headingMatch[1].length, headingMatch[2]));
        continue;
      }

      // blockquote (>)
      const blockquoteMatch = trimmed.match(/^>\s?(.*)$/);
      if (blockquoteMatch) {
        tokens.push(new BlockquoteToken(blockquoteMatch[1]));
        continue;
      }

      // list item (-, *, +, 1.)
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
      if (listMatch) {
        const spaces = listMatch[1].length;
        const marker = listMatch[2];
        const content = listMatch[3];

        const ordered = /^\d+\./.test(marker);
        const level = Math.floor(spaces / 2) + 1;
        tokens.push(new ListItemToken(ordered, level, content));
        continue;
      }

      // default: paragraph
      tokens.push(new ParagraphToken(trimmed));
    }

    return tokens;
  }
}
