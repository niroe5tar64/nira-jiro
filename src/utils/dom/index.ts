import { TemplateTool } from "~/components";
import { mountComponent } from "~/utils";

export type RichFormType = "description" | "addComment";
export type InputMode = "markdown" | "wysiwyg";

type FormSection = {
  activeForm: string;
  textArea: string;
  toolbar: string;
};

const QUERY_SELECTORS: Record<RichFormType, FormSection> = {
  description: {
    activeForm: "[field-id=description]",
    textArea: "#description",
    toolbar: ".wiki-edit-toolbar .aui-toolbar2-inner > .aui-toolbar2-primary",
  },
  addComment: {
    activeForm: "#addcomment.active",
    textArea: "#comment",
    toolbar: ".wiki-edit-toolbar .aui-toolbar2-inner > .aui-toolbar2-primary",
  },
};

export function getActiveFormElement(richFormType: RichFormType): Element | null {
  return document.querySelector(QUERY_SELECTORS[richFormType].activeForm);
}

export function getToolbarElement(activeForm: Element, richFormType: RichFormType): Element | null {
  return activeForm.querySelector(QUERY_SELECTORS[richFormType].toolbar);
}

export function insertTemplateToolElement(activeForm: Element, richFormType: RichFormType): void {
  const toolbar = getToolbarElement(activeForm, richFormType);
  const container = document.createElement("div");
  container.className = "aui-buttons";
  mountComponent(TemplateTool, toolbar, container);
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
