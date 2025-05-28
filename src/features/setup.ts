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
        lastModes[type] = handleModeSwitch(type, lastModes[type], (newMode) =>
          switchButtonStatus(activeForm, newMode),
        );
      } else {
        lastModes[type] = null;
      }
    });
  });
}

function switchButtonStatus(activeForm: Element, newMode: InputMode) {
  const markdownButton = activeForm.querySelector(".wiki-edit-operation-markdown");
  if (!(markdownButton instanceof HTMLButtonElement)) {
    return;
  }
  markdownButton.disabled = newMode !== "markdown";
}
