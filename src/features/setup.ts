import type { JiraForm } from "~/types";
import { debounce } from "~/utils";

type InputMode = JiraForm.InputMode | null;

export function setupMutationObserver() {
  let lastMode: InputMode = null;

  const handleMutation = () => {
    const newMode = detectInputMode();
    if (newMode && newMode !== lastMode) {
      console.log("🌀 モードが切り替わりました:", newMode);
      // ここでテンプレ挿入や処理を行える
    }
    lastMode = newMode;
  };

  const observer = new MutationObserver(debounce(handleMutation, 100)); // 実行間隔は適宜調整

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function detectInputMode(): InputMode {
  const activeForm = document.querySelector("[field-id=description]");
  if (!activeForm) {
    return null;
  }
  const hasTextarea = activeForm.querySelector("#description");
  const isWysiwyg = activeForm.querySelector("#description.richeditor-cover");

  if (!hasTextarea) {
    return null;
  }

  return isWysiwyg ? "wysiwyg" : "markdown";
}
