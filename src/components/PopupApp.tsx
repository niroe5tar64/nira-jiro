import { useMarkdownConversionEnabled } from "~/hooks";

export function PopupApp() {
  const { markdownConversionEnabled, handleToggle } = useMarkdownConversionEnabled();

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
