import { createSignal } from "solid-js";
import "./TemplateTool.css";

export function TemplateTool() {
  const [isActive, setIsActive] = createSignal(false);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return (
    <div class="aui-buttons template-tool">
      <button
        type="button"
        class={`aui-button aui-button-subtle wiki-edit-operation-template ${isActive() ? "active" : ""}`}
      >
        <span>nirAJIRo</span>
      </button>
      <button
        type="button"
        class={`aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-template-trigger ${isActive() ? "active" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
    // <div class="aui-dropdown2-section">
    //   <ul class="aui-list-truncate">
    //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">取り消し線</a></li>
    //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">下付き</a></li>
    //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">上付き</a></li>
    //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">引用</a></li>
    //     <li><a href="#" class="wiki-edit-operation" tabindex="-1">等幅フォント</a></li>
    //   </ul>
    // </div>
  );
}
