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

export class JiraLexer {
  private lines: string[];
  private insideCodeBlock = false;
  private insideQuoteBlock = false;

  constructor(private source: string) {
    this.lines = source.split(/\r?\n/);
  }

  tokenize(): MarkdownToken[] {
    const tokens: MarkdownToken[] = [];

    // 空行のみのケース考慮（無駄な空行を除去）
    if (this.lines.every((line) => line.trim() === "")) {
      this.lines.pop();
    }

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const trimmed = line.trim();

      // inside code block
      if (this.insideCodeBlock) {
        if (/^\{code.*\}$/.test(trimmed)) {
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

      // heading h1. h2. ...
      const headingMatch = trimmed.match(/^h([1-6])\.\s+(.*)$/);
      if (headingMatch) {
        tokens.push(new HeadingToken(Number(headingMatch[1]), headingMatch[2]));
        continue;
      }

      // code block start
      const codeStartMatch = trimmed.match(/^\{code(?::(\w+))?\}$/);
      if (codeStartMatch) {
        const language = codeStartMatch[1] ?? null;
        tokens.push(new CodeBlockStartToken(language));
        this.insideCodeBlock = true;
        continue;
      }

      // {quote} start/end
      if (trimmed === "{quote}") {
        this.insideQuoteBlock = !this.insideQuoteBlock;
        if (!this.insideQuoteBlock) {
          tokens.push(new BlankLineToken()); // quote閉じたら空行扱い
        }
        continue;
      }

      // inside quote block
      if (this.insideQuoteBlock) {
        tokens.push(new BlockquoteToken(trimmed));
        continue;
      }

      // bq. ワンショット引用
      const bqMatch = trimmed.match(/^bq\.\s+(.*)$/);
      if (bqMatch) {
        tokens.push(new BlockquoteToken(bqMatch[1]));
        continue;
      }

      // unordered list * / ** / ***
      if (/^\*+ /.test(trimmed)) {
        const match = trimmed.match(/^(\*+)\s(.*)$/);
        if (match) {
          const level = match[1].length;
          const content = match[2];
          tokens.push(new ListItemToken(false, level, content));
        }
        continue;
      }

      // ordered list # / ## / ###
      if (/^#+ /.test(trimmed)) {
        const match = trimmed.match(/^(#+)\s(.*)$/);
        if (match) {
          const level = match[1].length;
          const content = match[2];
          tokens.push(new ListItemToken(true, level, content));
        }
        continue;
      }

      // normal paragraph
      tokens.push(new ParagraphToken(trimmed));
    }

    return tokens;
  }
}
