import {
  type MarkdownBlockNode,
  parseStandardMarkdown,
  parseJiraMarkdown,
  renderStandardMarkdown,
  renderJiraMarkdown,
  renderHtml,
} from "../parsers/markdown";

type MarkdownFlavor = "standard" | "jira";
type DocumentFormat = MarkdownFlavor | "html";

interface ConvertMarkdownArgs {
  source: string;
  from: MarkdownFlavor;
  to: MarkdownFlavor;
}

export function convertMarkdown(args: ConvertMarkdownArgs) {
  const { source, from, to } = args;

  const astNodes = parsers[from](source);
  return renderers[to](astNodes);
}

const parsers: Record<MarkdownFlavor, (source: string) => MarkdownBlockNode[]> = {
  standard: parseStandardMarkdown,
  jira: parseJiraMarkdown,
};

const renderers: Record<DocumentFormat, (astNodes: MarkdownBlockNode[]) => string> = {
  standard: renderStandardMarkdown,
  jira: renderJiraMarkdown,
  html: renderHtml,
};
