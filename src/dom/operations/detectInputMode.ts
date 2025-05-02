import type { InputMode, RichFormType } from "~/dom";
import { QUERY_SELECTORS, getActiveFormElement } from "~/dom";

export function detectInputMode(richFormType: RichFormType): InputMode | null {
  const activeForm = getActiveFormElement(richFormType);
  if (!activeForm) {
    return null;
  }
  const textarea = activeForm.querySelector(QUERY_SELECTORS[richFormType].textArea);

  if (!textarea) {
    return null;
  }
  const isWysiwyg = textarea.classList.contains("richeditor-cover");
  return isWysiwyg ? "wysiwyg" : "markdown";
}
