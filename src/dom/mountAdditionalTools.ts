import { AdditionalTools } from "~/components";
import { type RichFormType, getToolbarElement } from "~/dom";
import { mountComponent } from "~/utils";

/**
 * 指定したリッチフォームタイプのツールバーに AdditionalTools をマウントする
 */
export function mountAdditionalTools(activeForm: Element, richFormType: RichFormType): void {
  const toolbar = getToolbarElement(activeForm, richFormType);
  if (!toolbar) {
    console.warn("[mountAdditionalTools] toolbar element not found", richFormType);
    return;
  }

  mountComponent(AdditionalTools, toolbar);
}
