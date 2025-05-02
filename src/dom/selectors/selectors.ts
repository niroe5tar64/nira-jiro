import type { RichFormType } from "~/dom";
import { QUERY_SELECTORS } from "~/dom";

export function getActiveFormElement(richFormType: RichFormType): Element | null {
  return document.querySelector(QUERY_SELECTORS[richFormType].activeForm);
}

export function getToolbarElement(activeForm: Element, richFormType: RichFormType): Element | null {
  return activeForm.querySelector(QUERY_SELECTORS[richFormType].toolbar);
}
