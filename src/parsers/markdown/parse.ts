import type { BlockNode as MarkdownBlockNode } from "./common/ast/block";
export type { MarkdownBlockNode };

import { attachInlineNodesToBlocks } from "./common/ast/helpers/attachInlineNodesToBlocks";
import { BlockLexer as JiraBlockLexer } from "./dialects/jira/lexer/BlockLexer";
import { InlineLexer as JiraInlineLexer } from "./dialects/jira/lexer/InlineLexer";
import { BlockParser as JiraBlockParser } from "./dialects/jira/parser/BlockParser";
import { InlineParser as JiraInlineParser } from "./dialects/jira/parser/InlineParser";
import { BlockLexer as StandardBlockLexer } from "./dialects/standard/lexer/BlockLexer";
import { InlineLexer as StandardInlineLexer } from "./dialects/standard/lexer/InlineLexer";
import { BlockParser as StandardBlockParser } from "./dialects/standard/parser/BlockParser";
import { InlineParser as StandardInlineParser } from "./dialects/standard/parser/InlineParser";

// === Parse ===
export function parseStandardMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new StandardBlockLexer(source).tokenize();
  const ast = new StandardBlockParser(tokens).parse();

  return attachInlineNodesToBlocks(ast, (text) => {
    const inlineTokens = new StandardInlineLexer(text).tokenize();
    return new StandardInlineParser(inlineTokens).parse();
  });
}

export function parseJiraMarkdown(source: string): MarkdownBlockNode[] {
  const tokens = new JiraBlockLexer(source).tokenize();
  const ast = new JiraBlockParser(tokens).parse();

  return attachInlineNodesToBlocks(ast, (text) => {
    const inlineTokens = new JiraInlineLexer(text).tokenize();
    return new JiraInlineParser(inlineTokens).parse();
  });
}
