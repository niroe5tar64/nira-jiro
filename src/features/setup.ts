import type { JiraForm } from "~/types";
import { debounce, detectInputMode } from "~/utils";

export function setupMutationObserver() {
  let lastMode: JiraForm.InputMode | null = null;

  const handleMutation = () => {
    const newMode = detectInputMode("description");
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
