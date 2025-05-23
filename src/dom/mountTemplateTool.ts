import { TemplateTool } from "~/components";
import { type RichFormType, getToolbarElement } from "~/dom";
import { mountComponent } from "~/utils";

/**
 * 指定したリッチフォームタイプのツールバーに TemplateTool をマウントする
 */
export function mountTemplateTool(activeForm: Element, richFormType: RichFormType): void {
  const toolbar = getToolbarElement(activeForm, richFormType);
  if (!toolbar) {
    console.warn("[mountTemplateTool] toolbar element not found", richFormType);
    return;
  }

  mountComponent(TemplateTool, toolbar);
}
