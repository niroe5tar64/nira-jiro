import { createSignal, onMount } from "solid-js";
import { getStoredMarkdownConversionEnabled, setStoredMarkdownConversionEnabled } from "~/features";

export function useMarkdownConversionEnabled() {
  const [markdownConversionEnabled, setMarkdownConversionEnabled] = createSignal(false);

  onMount(async () => {
    const current = await getStoredMarkdownConversionEnabled();
    setMarkdownConversionEnabled(current);
  });

  const handleToggle = async (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setMarkdownConversionEnabled(checked);
    await setStoredMarkdownConversionEnabled(checked);
  };

  return {
    markdownConversionEnabled,
    handleToggle,
  };
}
