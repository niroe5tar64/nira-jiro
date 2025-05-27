import {
  type MarkdownBlockNode,
  type MarkdownDialects,
  detectFormat,
  parseJiraMarkdown,
  parseStandardMarkdown,
  renderJiraMarkdown,
  renderStandardMarkdown,
} from "../parsers/markdown";

interface ConvertMarkdownArgs {
  source: string;
  from: MarkdownDialects;
  to: MarkdownDialects;
}

export function convertMarkdown(args: ConvertMarkdownArgs): string {
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

export function toggleMarkdownFormat(source: string): string {
  const from = detectFormat(source);
  const to = from === "standard" ? "jira" : "standard";

  return convertMarkdown({ source, from, to });
}
