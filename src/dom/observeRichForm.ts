import { debounce } from "~/utils";

/**
 * 指定のコールバックを、リッチテキストフォーム周りのDOM変化に応じて呼び出す
 *
 * @param onChange DOM変化検知時に呼び出されるコールバック
 * @returns MutationObserverインスタンス
 */
export function observeRichFormChanges(onChange: () => void): MutationObserver {
  const observer = new MutationObserver(debounce(onChange, 100));

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}
