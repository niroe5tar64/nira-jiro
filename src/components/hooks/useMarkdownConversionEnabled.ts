import { createSignal, onMount } from "solid-js";
import { getMarkdownConversionEnable, setMarkdownConversionEnable } from "~/features";

export function useMarkdownConversionEnabled() {
  const [markdownConversionEnabled, setMarkdownConversionEnabled] = createSignal(false);

  onMount(async () => {
    const current = await getMarkdownConversionEnable();
    setMarkdownConversionEnabled(current);
  });

  const handleToggle = async (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setMarkdownConversionEnabled(checked);
    await setMarkdownConversionEnable(checked);
  };

  return {
    markdownConversionEnabled,
    handleToggle,
  };
}
