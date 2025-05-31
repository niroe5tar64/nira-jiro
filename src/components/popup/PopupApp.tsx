import { useMarkdownConversionEnabled } from "~/hooks";

// @ts-ignore
import pkg from "../../../package.json";

export function PopupApp() {
  const { markdownConversionEnabled, handleToggle } = useMarkdownConversionEnabled();

  return (
    <div class="w-[240px] bg-green-50 rounded shadow text-gray-800">
      <header class="bg-green-700 text-white px-4 py-2 rounded-t text-sm font-semibold">
        <img src="icons/icon-32.png" alt="logo icon" width={24} height={24} class="inline mr-2" />
        <span>韮次郎 - Jira拡張機能</span>
      </header>
      <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-xs text-gray-600 px-4 py-2 border-t">
        <span class="font-medium">Product Name</span>
        <span class="pl-2">{pkg.name}</span>
        <span class="font-medium">Version</span>
        <span class="pl-2">{pkg.version}</span>
        <span class="font-medium">Last Updated</span>
        <span class="pl-2">{pkg.lastUpdated}</span>
      </div>
      <hr />
      <div class="px-4 py-2">
        <label class="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            class="accent-blue-500 cursor-pointer"
            checked={markdownConversionEnabled()}
            onChange={handleToggle}
          />
          Markdown変換を有効にする
        </label>
      </div>
      <div class="px-4 py-2 border-t text-xs">
        <button
          type="button"
          class="text-blue-500 hover:underline cursor-pointer"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          設定を開く
        </button>
      </div>
    </div>
  );
}
