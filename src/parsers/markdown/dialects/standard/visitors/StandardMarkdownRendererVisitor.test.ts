import { describe, expect, it } from "bun:test";
import dedent from "dedent";

import { BlockLexer } from "../../../dialects/standard/lexer/BlockLexer";
import { BlockParser } from "../../../dialects/standard/parser/BlockParser";
import { StandardMarkdownRendererVisitor } from "./StandardMarkdownRendererVisitor";

function parseToMarkdown(md: string): string {
  const tokens = new BlockLexer(md).tokenize();
  const ast = new BlockParser(tokens).parse();

  return new StandardMarkdownRendererVisitor().render(ast);
}

describe("StandardMarkdownRendererVisitor - extended cases", () => {
  it("preserves multiple blank lines between blocks", () => {
    const input = dedent`
      # Heading


      This is a paragraph.
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "# Heading


      This is a paragraph."
      `);
  });

  it("handles nested blockquotes", () => {
    const input = dedent`
      > # Heading
      > - Item 1
      >
      > Another paragraph.
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "> # Heading
      > - Item 1
      > 
      > Another paragraph.
      "
      `);
  });

  it("handles deeply nested list items", () => {
    const input = dedent`
      - Level 1
        - Level 2
          - Level 3
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "- Level 1
        - Level 2
          - Level 3"
      `);
  });

  it("renders numbered (ordered) list items correctly", () => {
    const input = dedent`
      1. First
      2. Second
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "1. First
      1. Second"
      `);
  });

  it("renders various heading levels", () => {
    const input = dedent`
      # H1
      ## H2
      ### H3
      #### H4
      ##### H5
      ###### H6
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "# H1
      ## H2
      ### H3
      #### H4
      ##### H5
      ###### H6"
      `);
  });

  it("preserves code block with special characters", () => {
    const input = dedent`
      \`\`\`bash
      echo "Hello, world!"
      \`\`\`
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "\`\`\`bash
      echo "Hello, world!"
      \`\`\`"
      `);
  });
});

describe("StandardMarkdownRendererVisitor - complex case", () => {
  it("renders complex nested markdown structures", () => {
    const input = dedent`
      # Heading Text - 1
      Body Text - 1 (paragraph)

      ## Heading Text - 2
      Body Text - 2 (paragraph)

      ### Heading Text - 3
      Body Text - 3 (paragraph)

      - list item - 1
        - list item - 1.1
          - list item - 1.1.1
          - list item - 1.1.2
          - list item - 1.1.3
        - list item - 1.2
        - list item - 1.3
          - list item - 1.3.1
      - list item - 2
      - list item - 3

      1. list item - 1
        1. list item - 1.1
          1. list item - 1.1.1
          1. list item - 1.1.2
          1. list item - 1.1.3
        1. list item - 1.2
        1. list item - 1.3
          1. list item - 1.3.1
      1. list item - 2
      1. list item - 3

      \`\`\`java
      // Some comments here
      public String getFoo()
      {
          return foo;
      }
      \`\`\`

      > This is a quote.
      > Still quoted - 01.
      >
      > Still quoted - 02.
      Still quoted - 03.

      This is a paragraph line.
    `;
    expect(parseToMarkdown(input)).toMatchInlineSnapshot(`
      "# Heading Text - 1
      Body Text - 1 (paragraph)

      ## Heading Text - 2
      Body Text - 2 (paragraph)

      ### Heading Text - 3
      Body Text - 3 (paragraph)

      - list item - 1
        - list item - 1.1
          - list item - 1.1.1
          - list item - 1.1.2
          - list item - 1.1.3
        - list item - 1.2
        - list item - 1.3
          - list item - 1.3.1
      - list item - 2
      - list item - 3

      1. list item - 1
        2. list item - 1.1
          3. list item - 1.1.1
          3. list item - 1.1.2
          3. list item - 1.1.3
        2. list item - 1.2
        2. list item - 1.3
          3. list item - 1.3.1
      1. list item - 2
      1. list item - 3

      \`\`\`java
      // Some comments here
      public String getFoo()
      {
          return foo;
      }
      \`\`\`

      > This is a quote.
      > Still quoted - 01.
      > 
      > Still quoted - 02.
      > Still quoted - 03.

      This is a paragraph line."
    `);
  });
});
