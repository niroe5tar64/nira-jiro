import { checkRichFormExistence, detectInputMode, observeRichFormChanges } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";

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
