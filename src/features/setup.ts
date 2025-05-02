import { handleModeSwitch } from "~/features";
import { checkRichFormExistence, observeRichFormChanges } from "~/dom";
import type { InputMode, RichFormType } from "~/dom";

export function setupMutationObserver() {
  const lastModes: Record<RichFormType, InputMode | null> = { description: null, addComment: null };

  observeRichFormChanges(() => {
    const targetRichFormTypes: RichFormType[] = ["description", "addComment"];
    targetRichFormTypes.map((type) => {
      const formExists = checkRichFormExistence(type);
      if (formExists) {
        lastModes[type] = handleModeSwitch(type, lastModes[type]);
      } else {
        lastModes[type] = null;
      }
    });
  });
}
