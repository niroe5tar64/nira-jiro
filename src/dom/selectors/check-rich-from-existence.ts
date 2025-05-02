import { getActiveFormElement, mountTemplateTool } from "~/dom";
import type { RichFormType } from "~/dom";

export function checkRichFormExistence(richFormType: RichFormType) {
  const activeForm = getActiveFormElement(richFormType);

  if (!activeForm) {
    return false;
  }

  console.log("💡 フォームの存在を検知しました:", richFormType, activeForm);
  mountTemplateTool(activeForm, richFormType);
  return true;
}
