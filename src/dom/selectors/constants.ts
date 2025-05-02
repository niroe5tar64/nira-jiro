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
