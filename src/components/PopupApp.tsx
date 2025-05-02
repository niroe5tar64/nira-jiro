import { createSignal, onMount } from "solid-js";

export function PopupApp() {
  const [markdownConversionEnabled, setMarkdownConversionEnabled] = createSignal(false);

  // 初回ロード時にchrome.storage.localから設定を取得
  onMount(async () => {
    const stored = await chrome.storage.local.get("markdownConversionEnabled");
    if (stored.markdownConversionEnabled !== undefined) {
      setMarkdownConversionEnabled(stored.markdownConversionEnabled);
    }
  });

  // トグル変更ハンドラ
  const handleToggle = async (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setMarkdownConversionEnabled(checked);
    await chrome.storage.local.set({ markdownConversionEnabled: checked });
  };

  return (
    <div class="">
      <div class="bg-blue-500 text-white p-4">Tailwind効いてるかチェック！</div>
      <h1 class="">設定</h1>
      <label class="flex items-center gap-2">
        <input type="checkbox" checked={markdownConversionEnabled()} onChange={handleToggle} />
        Markdown変換を有効にする
      </label>
    </div>
  );
}
