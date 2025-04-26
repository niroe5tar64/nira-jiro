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
} from "./tokens";

/**
 * Markdownテキストをトークン列に分割する
 */
export function tokenizeMarkdown(source: string): MarkdownToken[] {
  const lines = source.split(/\r?\n/);

  if (lines.every((line) => line.trim() === "")) {
    lines.pop(); // 全て空行の場合の考慮（空行が余分に出力される）
  }
  const tokens: MarkdownToken[] = [];
  let insideCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (insideCodeBlock) {
      if (line.startsWith("```")) {
        tokens.push(new CodeBlockEndToken());
        insideCodeBlock = false;
      } else {
        tokens.push(new CodeBlockContentToken(line));
      }
      continue;
    }

    if (line.trim() === "") {
      tokens.push(new BlankLineToken());
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || null;
      tokens.push(new CodeBlockStartToken(language));
      insideCodeBlock = true;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      tokens.push(new HeadingToken(headingMatch[1].length, headingMatch[2]));
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)/);
    if (blockquoteMatch) {
      tokens.push(new BlockquoteToken(blockquoteMatch[1]));
      continue;
    }

    const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)/);
    if (listMatch) {
      const indent = listMatch[1].length;
      const ordered = /^\d+\./.test(listMatch[2]);
      tokens.push(new ListItemToken(ordered, indent, listMatch[3]));
      continue;
    }

    tokens.push(new ParagraphToken(line.trim()));
  }

  return tokens;
}
