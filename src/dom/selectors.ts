import type { InputMode, RichFormType } from "~/dom";
import { QUERY_SELECTORS } from "~/dom";

export function getActiveFormElement(richFormType: RichFormType): Element | null {
  return document.querySelector(QUERY_SELECTORS[richFormType].activeForm);
}

export function getToolbarElement(activeForm: Element, richFormType: RichFormType): Element | null {
  return activeForm.querySelector(QUERY_SELECTORS[richFormType].toolbar);
}

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
