import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function TemplateTool() {
  return html`<button type="button">にらじろう注入</button>`;
}

TemplateTool.displayName = "TemplateTool";
