import type { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

/**
 * 任意のターゲットにコンポーネントを注入する (Solid.js)
 */
export function mountComponent(
  Component: () => JSX.Element,
  target?: Element | null,
  container: Element | null = null,
  forceMount = false,
) {
  if (!target) {
    console.warn("Target element not found for mounting component.");
    return;
  }

  // マウント済みなら処理をスキップ
  const mountId = `nira-jiro-${Component.name || "unknown"}`;
  if (!forceMount && target.querySelector(`[data-mounted="${mountId}"]`)) {
    return;
  }

  const mountContainer = container ?? document.createElement("div");
  target.appendChild(mountContainer);

  render(Component, mountContainer);

  // マウント済みであることを示す属性を追加
  mountContainer.setAttribute("data-mounted", mountId);
}
