import { JSDOM } from "jsdom";
import { describe, it, expect, beforeEach } from "bun:test";
import dedent from "dedent";

import { BlockLexer } from "../../../dialects/standard/lexer/BlockLexer";
import { BlockParser } from "../../../dialects/standard/parser/BlockParser";
import { DomRendererVisitor } from "./DomRendererVisitor";

function renderToHTML(markdown: string): string {
  const tokens = new BlockLexer(markdown).tokenize();
  const ast = new BlockParser(tokens).parse();
  const fragment = new DomRendererVisitor().render(ast);
  const div = document.createElement("div");
  div.appendChild(fragment);
  return div.innerHTML;
}

describe("DomRendererVisitor", () => {
  beforeEach(() => {
    const dom = new JSDOM("<!doctype html><html><body></body></html>");
    globalThis.document = dom.window.document;
    globalThis.Node = dom.window.Node; // Node型比較などに必要なら
  });

  it("renders heading and paragraph with inline", () => {
    const input = dedent`
      # Hello **World**

      This is *italic* text.
    `;
    const htmlLiteral = dedent`
      <h1>Hello <strong>World</strong></h1>
      <br>
      <p>This is <em>italic</em> text.</p>
    `.replace(/\n\s*/g, "");
    expect(renderToHTML(input)).toMatchInlineSnapshot(`"${htmlLiteral}"`);
  });

  it("renders list with inline formatting", () => {
    const input = dedent`
      - **Item A**
      - *Item B*
    `;
    const htmlLiteral = dedent`
      <ul>
        <li><strong>Item A</strong></li>
        <li><em>Item B</em></li>
      </ul>
    `.replace(/\n\s*/g, "");
    expect(renderToHTML(input)).toMatchInlineSnapshot(`"${htmlLiteral}"`);
  });
});
