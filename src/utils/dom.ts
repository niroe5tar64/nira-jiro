import type { JiraForm } from "~/types";
type RichFormType = FieldType;
type FieldType = "description" | "comment";

const FIELD_QUERY_SELECTORS: Record<FieldType, string> = {
  description: "[field-id=description]",
  comment: "[field-id=comment]",
};

const RICH_FORM_QUERY_SELECTORS: Record<RichFormType, string> = {
  description: "#description",
  comment: "#comment",
};

export function getFieldElement(fieldType: FieldType): Element | null {
  return document.querySelector(FIELD_QUERY_SELECTORS[fieldType]);
}

export function detectInputMode(richFormType: RichFormType): JiraForm.InputMode | null {
  const activeForm = getFieldElement(richFormType);
  if (!activeForm) {
    return null;
  }
  const textarea = activeForm.querySelector(RICH_FORM_QUERY_SELECTORS[richFormType]);

  if (!textarea) {
    return null;
  }
  const isWysiwyg = textarea.classList.contains("richeditor-cover");
  return isWysiwyg ? "wysiwyg" : "markdown";
}
