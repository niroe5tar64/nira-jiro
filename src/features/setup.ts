import { observeRichFormChanges } from "~/dom";
import { getActiveFormElement, detectInputMode, insertTemplateToolElement } from "~/utils";
import type { InputMode, RichFormType } from "~/utils";

export function setupMutationObserver() {
  const lastModes: Record<RichFormType, InputMode | null> = { description: null, addComment: null };

  observeRichFormChanges(() => {
    const targetRichFormTypes: RichFormType[] = ["description", "addComment"];
    targetRichFormTypes.map((type) => {
      const formExists = checkRichFormExistence(type);
      if (formExists) {
        lastModes[type] = handleModeSwitch(type, lastModes[type]);
      } else {
        lastModes[type] = null;
      }
    });
  });
}

function checkRichFormExistence(richFormType: RichFormType) {
  const activeForm = getActiveFormElement(richFormType);

  if (!activeForm) {
    return false;
  }

  console.log("💡 フォームの存在を検知しました:", richFormType, activeForm);
  insertTemplateToolElement(activeForm, richFormType);
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
