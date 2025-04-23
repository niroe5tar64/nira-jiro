import type { InputMode, RichFormType } from "~/utils";
import { debounce, detectInputMode, getActiveFormElement } from "~/utils";

export function setupMutationObserver() {
  const lastModes: Record<RichFormType, InputMode | null> = { description: null, addComment: null };

  const handleMutation = () => {
    const targetRichFormTypes: RichFormType[] = ["description", "addComment"];
    targetRichFormTypes.map((type) => {
      const formExists = checkRichFormExistence(type);
      if (formExists) {
        lastModes[type] = handleModeSwitch(type, lastModes[type]);
      } else {
        lastModes[type] = null;
      }
    });
  };

  const observer = new MutationObserver(debounce(handleMutation, 100)); // 実行間隔は適宜調整

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function checkRichFormExistence(richFormType: RichFormType) {
  const field = getActiveFormElement(richFormType);

  if (!field) {
    return false;
  }

  console.log("💡 フォームの存在を検知しました:", richFormType, field);
  return true;
}

function handleModeSwitch(
  richFormType: RichFormType,
  lastMode: InputMode | null,
): InputMode | null {
  const newMode = detectInputMode(richFormType);
  if (newMode && newMode !== lastMode) {
    console.log("🌀 モードが切り替わりました:", newMode);
    // ここでテンプレ挿入や処理を行える
  }
  return newMode;
}
