import { handleModeSwitch } from "~/features";
import { getActiveFormElement, observeRichFormChanges, mountTemplateTool } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";

export function setupMutationObserver() {
  const lastModes: Record<RichFormType, InputMode | null> = { description: null, addComment: null };

  observeRichFormChanges(() => {
    const targetRichFormTypes: RichFormType[] = ["description", "addComment"];
    targetRichFormTypes.map((type) => {
      const activeForm = getActiveFormElement(type);
      if (activeForm) {
        mountTemplateTool(activeForm, type);
        lastModes[type] = handleModeSwitch(type, lastModes[type]);
      } else {
        lastModes[type] = null;
      }
    });
  });
}
