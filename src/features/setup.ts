import { getActiveFormElement, mountAdditionalTools, observeRichFormChanges } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";
import { handleModeSwitch } from "~/features";

export function setupMutationObserver() {
  const lastModes: Record<RichFormType, InputMode | null> = { description: null, addComment: null };

  observeRichFormChanges(() => {
    const targetRichFormTypes: RichFormType[] = ["description", "addComment"];
    targetRichFormTypes.map((type) => {
      const activeForm = getActiveFormElement(type);
      if (activeForm) {
        mountAdditionalTools(activeForm, type);
        lastModes[type] = handleModeSwitch(type, lastModes[type]);
      } else {
        lastModes[type] = null;
      }
    });
  });
}
