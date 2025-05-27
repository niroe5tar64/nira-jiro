import type { BlockToken } from "./common/tokens/block";
import { BlockLexer as JiraBlockLexer } from "./dialects/jira/lexer/BlockLexer";
import { BlockLexer as StandardBlockLexer } from "./dialects/standard/lexer/BlockLexer";
import type { MarkdownDialects } from "./dialects/types";

/**
 * Markdown テキストが Standard 形式か Jira 形式かを判定
 */
export function detectFormat(text: string): MarkdownDialects {
  const standardTokens = new StandardBlockLexer(text).tokenize();
  const jiraTokens = new JiraBlockLexer(text).tokenize();

  const standardScore = scoreTokens(standardTokens);
  const jiraScore = scoreTokens(jiraTokens);

  return standardScore >= jiraScore ? "standard" : "jira";
}

/**
 * トークン列から構文の「スコア」を計算する（重みづけは要チューニング）
 */
function scoreTokens(tokens: BlockToken[]): number {
  let score = 0;

  for (const token of tokens) {
    switch (token.kind) {
      case "blockquote":
      case "blockquote_start":
      case "code_block_start":
        score += 2;
        break;

      case "heading":
      case "list_item":
        score += 1;
        break;

      case "blank_line":
      case "paragraph":
      case "code_block_content":
      case "blockquote_content":
        score += 0.1;
        break;

      default:
        break;
    }
  }

  return score;
}
