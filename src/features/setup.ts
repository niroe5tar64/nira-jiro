import type { JiraForm } from "~/types";
import { debounce } from "~/utils";

type InputMode = JiraForm.InputMode | null;

export function setupMutationObserver() {
  let lastMode: InputMode = null;

  const handleMutation = () => {
    const activeForm = document.querySelector("[field-id=description]");
    if (!activeForm) return;

    const textarea = activeForm.querySelector("#description");
    const wysiwyg = activeForm.querySelector("#description.richeditor-cover");

    let newMode: InputMode = null;
    if (textarea && !wysiwyg) newMode = "markdown";
    if (textarea && wysiwyg) newMode = "wysiwyg";

    if (newMode && newMode !== lastMode) {
      lastMode = newMode;
      console.log("🌀 モードが切り替わりました:", newMode);
      // ここでテンプレ挿入や処理を行える
    }
  };

  const observer = new MutationObserver(debounce(handleMutation, 100)); // 実行間隔は適宜調整

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
