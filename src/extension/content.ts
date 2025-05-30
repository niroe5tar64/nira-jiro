import { getStoredMarkdownConversionEnabled, setupMutationObserver } from "~/features";

(async () => {
  const enabled = await getStoredMarkdownConversionEnabled();
  if (!enabled) {
    return;
  }
  // 起動
  setupMutationObserver();
})();
