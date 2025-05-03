import { createSignal, onMount } from "solid-js";
import { getMarkdownConversionEnabled, setMarkdownConversionEnabled } from "~/features";

export function useMarkdownConversionEnabled() {
  const [markdownConversionEnabled, setMarkdownConversionEnabled] = createSignal(false);

  onMount(async () => {
    const current = await getMarkdownConversionEnabled();
    setMarkdownConversionEnabled(current);
  });

  const handleToggle = async (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setMarkdownConversionEnabled(checked);
    await setMarkdownConversionEnabled(checked);
  };

  return {
    markdownConversionEnabled,
    handleToggle,
  };
}
