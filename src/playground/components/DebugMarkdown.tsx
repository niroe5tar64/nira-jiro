import { convertMarkdown } from "~/features";
import { jiraMarkdownTexts, standardMarkdownTexts } from "../utils/sampleTexts";

export function DebugMarkdown() {
  return (
    <>
      <details>
        <summary class="text-2xl font-bold mb-4 cursor-pointer">
          1. Convert Markdown from Standard to Jira
        </summary>
        <div class="flex flex-row gap-x-4">
          <div class="border border-customGray p-4 min-w-[400px] bg-gray-100">
            <h1 class="text-2xl font-bold mb-4">Standard Markdown</h1>
            <pre>{standardMarkdownTexts[0]}</pre>
          </div>
          <div class="border border-customGray p-4 min-w-[400px] bg-gray-100">
            <h1 class="text-2xl font-bold mb-4">Jira Markdown</h1>
            <pre>
              {convertMarkdown({
                source: standardMarkdownTexts[0],
                from: "standard",
                to: "jira",
              })}
            </pre>
          </div>
        </div>
      </details>

      <br />

      <details>
        <summary class="text-2xl font-bold mb-4 cursor-pointer">
          2. Convert Markdown from Jira to Standard
        </summary>
        <div class="flex flex-row gap-x-4">
          <div class="border border-customGray p-4 min-w-[400px] bg-gray-100">
            <h1 class="text-2xl font-bold mb-4">Jira Markdown</h1>
            <pre>{jiraMarkdownTexts[0]}</pre>
          </div>
          <div class="border border-customGray p-4 min-w-[400px] bg-gray-100">
            <h1 class="text-2xl font-bold mb-4">Standard Markdown</h1>
            <pre>
              {convertMarkdown({ source: jiraMarkdownTexts[0], from: "jira", to: "standard" })}
            </pre>
          </div>
        </div>
      </details>
    </>
  );
}
