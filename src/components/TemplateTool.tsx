import { createSignal } from "solid-js";
import "./TemplateTool.css";
import { getActiveFormElement } from "~/dom";
import { convertMarkdown, toggleMarkdownFormat } from "~/features";

export function TemplateTool() {
  const [isActive, setIsActive] = createSignal(false);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  const handleToggle = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const form = target.closest("form");

    const textarea = form?.querySelector("textarea");
    if (!textarea || !(textarea instanceof HTMLTextAreaElement)) {
      console.warn("Textarea not found");
      return;
    }

    const original = textarea.value;
    const converted = toggleMarkdownFormat(original);
    textarea.value = converted;

    console.info("✅ Markdown変換完了");
  };

  const handleClick = (event: MouseEvent, action: "standardToJira" | "jiraToStandard") => {
    const target = event.target as HTMLButtonElement;
    const form = target.closest("form");

    const textarea = form?.querySelector("textarea");
    if (!textarea || !(textarea instanceof HTMLTextAreaElement)) {
      console.warn("Textarea not found");
      return;
    }

    const original = textarea.value;
    const converted =
      action === "standardToJira"
        ? convertMarkdown({ source: original, from: "standard", to: "jira" })
        : convertMarkdown({ source: original, from: "jira", to: "standard" });
    textarea.value = converted;

    console.info("✅ Markdown変換完了");
  };

  return (
    <div class="aui-buttons template-tool">
      <button type="button" class="aui-button aui-button-subtle" onClick={handleToggle}>
        <span>MD</span>
      </button>
    </div>

    // <button
    //   type="button"
    //   class="aui-button aui-button-subtle"
    //   onClick={(e) => handleClick(e, "standardToJira")}
    // >
    //   <span>toJira</span>
    // </button>
    // <button
    //   type="button"
    //   class="aui-button aui-button-subtle"
    //   onClick={(e) => handleClick(e, "jiraToStandard")}
    // >
    //   <span>toMD</span>
    // </button>

    // <div class="aui-buttons template-tool">
    //   <button
    //     type="button"
    //     class={`aui-button aui-button-subtle wiki-edit-operation-template ${isActive() ? "active" : ""}`}
    //     onClick={handleClick}
    //   >
    //     <span>nirAJIRo</span>
    //   </button>
    //   <button
    //     type="button"
    //     class={`aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-template-trigger ${isActive() ? "active" : ""}`}
    //     onFocus={handleFocus}
    //     onBlur={handleBlur}
    //   />
    // </div>
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
