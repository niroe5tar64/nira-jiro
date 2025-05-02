export type RichFormType = "description" | "addComment";
export type InputMode = "markdown" | "wysiwyg";

type FormSection = {
  activeForm: string;
  textArea: string;
  toolbar: string;
};

export const QUERY_SELECTORS: Record<RichFormType, FormSection> = {
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
