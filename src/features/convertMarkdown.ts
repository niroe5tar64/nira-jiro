import {
  type MarkdownBlockNode,
  parseJiraMarkdown,
  parseStandardMarkdown,
  renderJiraMarkdown,
  renderStandardMarkdown,
} from "../parsers/markdown";

type MarkdownDialects = "standard" | "jira";

interface ConvertMarkdownArgs {
  source: string;
  from: MarkdownDialects;
  to: MarkdownDialects;
}

export function convertMarkdown(args: ConvertMarkdownArgs) {
  const { source, from, to } = args;

  const astNodes = parsers[from](source);
  return renderers[to](astNodes);
}

const parsers: Record<MarkdownDialects, (source: string) => MarkdownBlockNode[]> = {
  standard: parseStandardMarkdown,
  jira: parseJiraMarkdown,
};

const renderers: Record<MarkdownDialects, (astNodes: MarkdownBlockNode[]) => string> = {
  standard: renderStandardMarkdown,
  jira: renderJiraMarkdown,
};
