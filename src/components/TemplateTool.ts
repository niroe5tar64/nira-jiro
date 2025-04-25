import { h } from "preact";
import htm from "htm";
import "./TemplateTool.css";
import { useState } from "preact/hooks";

const html = htm.bind(h);

export function TemplateTool() {
  const [isActive, setIsActive] = useState(false);
  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return html`
    <div class="aui-buttons" name="template-tool">
      <a href="#" class="aui-button aui-button-subtle wiki-edit-operation-template ${isActive ? "active" : ""}">
        <span>nirAJIRo</span>
      </a>
      <a
        href="#"
        class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-template-trigger ${isActive ? "active" : ""}"
        onFocus="${handleFocus}"
        onBlur="${handleBlur}"
      >
      </a>
    </div>`;
  // <div class="aui-dropdown2-section">
  //   <ul class="aui-list-truncate">
  //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">取り消し線</a></li>
  //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">下付き</a></li>
  //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">上付き</a></li>
  //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">引用</a></li>
  //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">等幅フォント</a></li>
  //   </ul>
  // </div>
}

TemplateTool.displayName = "TemplateTool";
