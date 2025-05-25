import { describe, expect, it } from "bun:test";
import dedent from "dedent";

import { BlockLexer } from "../../jira/lexer/BlockLexer";
import { BlockParser } from "../../jira/parser/BlockParser";
import { JiraMarkdownRendererVisitor } from "./JiraMarkdownRendererVisitor";

function parseToJiraMarkdown(md: string): string {
  const tokens = new BlockLexer(md).tokenize();
  const ast = new BlockParser(tokens).parse();
  return new JiraMarkdownRendererVisitor().render(ast);
}

describe("JiraMarkdownRendererVisitor - extended cases", () => {
  it("preserves multiple blank lines between blocks", () => {
    const input = dedent`
      h1. Heading


      This is a paragraph.
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "h1. Heading


      This is a paragraph."
    `);
  });

  it("handles nested blockquotes", () => {
    const input = dedent`
      {quote}
      h2. Heading
      * Item 1

      Another paragraph.
      {quote}
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "{quote}
      h2. Heading
      * Item 1

      Another paragraph.
      {quote}"
    `);
  });

  it("handles deeply nested list items", () => {
    const input = dedent`
      * Level 1
      ** Level 2
      *** Level 3
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "* Level 1
      ** Level 2
      *** Level 3"
    `);
  });

  it("renders numbered (ordered) list items correctly", () => {
    const input = dedent`
      # First
      ## Second
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "# First
      ## Second"
    `);
  });

  it("renders various heading levels", () => {
    const input = dedent`
      h1. H1
      h2. H2
      h3. H3
      h4. H4
      h5. H5
      h6. H6
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "h1. H1
      h2. H2
      h3. H3
      h4. H4
      h5. H5
      h6. H6"
    `);
  });

  it("preserves code block with special characters", () => {
    const input = dedent`
      {code:bash}
      echo "Hello, world!"
      {code}
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "{code:bash}
      echo \"Hello, world!\"
      {code}"
    `);
  });
});

describe("JiraMarkdownRendererVisitor - complex case", () => {
  it("renders complex nested jira markdown structures", () => {
    const input = dedent`
      h1. Heading Text - 1
      Body Text - 1 (paragraph)

      h2. Heading Text - 2
      Body Text - 2 (paragraph)

      h3. Heading Text - 3
      Body Text - 3 (paragraph)

      * list item - 1
      ** list item - 1.1
      *** list item - 1.1.1
      *** list item - 1.1.2
      *** list item - 1.1.3
      ** list item - 1.2
      ** list item - 1.3
      *** list item - 1.3.1
      * list item - 2
      * list item - 3

      # list item - 1
      ## list item - 1.1
      ### list item - 1.1.1
      ### list item - 1.1.2
      ### list item - 1.1.3
      ## list item - 1.2
      ## list item - 1.3
      ### list item - 1.3.1
      # list item - 2
      # list item - 3

      {code:java}
      // Some comments here
      public String getFoo()
      {
          return foo;
      }
      {code}

      {quote}
      This is a quote.
      Still quoted - 01.

      Still quoted - 02.
      Still quoted - 03.
      {quote}

      This is a paragraph line.
    `;
    expect(parseToJiraMarkdown(input)).toMatchInlineSnapshot(`
      "h1. Heading Text - 1
      Body Text - 1 (paragraph)

      h2. Heading Text - 2
      Body Text - 2 (paragraph)

      h3. Heading Text - 3
      Body Text - 3 (paragraph)

      * list item - 1
      ** list item - 1.1
      *** list item - 1.1.1
      *** list item - 1.1.2
      *** list item - 1.1.3
      ** list item - 1.2
      ** list item - 1.3
      *** list item - 1.3.1
      * list item - 2
      * list item - 3

      # list item - 1
      ## list item - 1.1
      ### list item - 1.1.1
      ### list item - 1.1.2
      ### list item - 1.1.3
      ## list item - 1.2
      ## list item - 1.3
      ### list item - 1.3.1
      # list item - 2
      # list item - 3

      {code:java}
      // Some comments here
      public String getFoo()
      {
          return foo;
      }
      {code}

      {quote}
      This is a quote.
      Still quoted - 01.

      Still quoted - 02.
      Still quoted - 03.
      {quote}

      This is a paragraph line."
    `);
  });
});
