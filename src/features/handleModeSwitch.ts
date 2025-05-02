import { detectInputMode } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";

export function handleModeSwitch(
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
