import { createSignal, onMount } from "solid-js";
import {
  getMarkdownConversionEnable,
  setMarkdownConversionEnable as setMdConversionEnable,
} from "~/features";

export function PopupApp() {
  const [markdownConversionEnabled, setMarkdownConversionEnabled] = createSignal(false);

  // 初回ロード時にchrome.storage.localから設定を取得
  onMount(async () => {
    const currentState = await getMarkdownConversionEnable();
    setMarkdownConversionEnabled(currentState);
  });

  // トグル変更ハンドラ
  const handleToggle = async (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setMarkdownConversionEnabled(checked);
    await setMdConversionEnable(checked);
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
