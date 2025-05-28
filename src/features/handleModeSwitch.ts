import { detectInputMode } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";

export function handleModeSwitch(
  richFormType: RichFormType,
  lastMode: InputMode | null,
  callback: (newMode: InputMode) => void,
): InputMode | null {
  const newMode = detectInputMode(richFormType);
  if (newMode && newMode !== lastMode) {
    console.log("🌀 モードが切り替わりました:", newMode);
    callback(newMode);
  }
  return newMode;
}
