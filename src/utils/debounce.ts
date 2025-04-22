/**
 * 指定した関数の呼び出しを遅延させるデバウンス関数を作成します。
 * デバウンス関数は、最後に呼び出されてから指定した待機時間が経過した後に
 * 元の関数を実行します。
 *
 * @template T - デバウンス対象の関数の型。
 * @param func - デバウンス対象の関数。
 * @param wait - 関数の呼び出しを遅延させる時間（ミリ秒）。
 * @returns デバウンスされた関数。
 *
 * @example
 * ```typescript
 * const log = (message: string) => console.log(message);
 * const debouncedLog = debounce(log, 300);
 *
 * debouncedLog("Hello");
 * debouncedLog("World"); // 300ms後に "World" がログに出力されます。
 * ```
 */
export function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
