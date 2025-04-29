import type { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

/**
 * 任意のターゲットにコンポーネントを注入する (Solid.js)
 *
 * @param Component マウントするコンポーネント
 * @param target マウント対象となる親要素
 * @param container マウント先のコンテナ（省略時は自動生成）
 * @param forceMount 強制的にマウントするか（trueなら二重マウントを許可）
 * @param mountPrefix マウント済み管理用のプレフィックス（デフォルト "nira-jiro-"）
 */
export function mountComponent(
  Component: () => JSX.Element,
  target?: Element | null,
  container: Element | null = null,
  forceMount = false,
  mountPrefix = "nira-jiro-",
) {
  if (!target) {
    console.warn("Target element not found for mounting component.");
    return;
  }

  // マウント済みなら処理をスキップ
  const mountId = `${mountPrefix}${Component.name || "unknown"}`;
  if (!forceMount && target.querySelector(`[data-mounted="${mountId}"]`)) {
    return;
  }

  const mountContainer = container ?? document.createElement("div");
  target.appendChild(mountContainer);

  render(Component, mountContainer);

  // マウント済みであることを示す属性を追加
  mountContainer.setAttribute("data-mounted", mountId);
}
