import { render, h } from "preact";

/**
 * 任意のターゲットにコンポーネントを注入する
 */
export function mountComponent(
  Component: preact.FunctionComponent,
  target: Element | null,
  container: Element | null = null,
  forceMount = false,
) {
  if (!target) {
    console.warn("Target element not found for mounting component.");
    return;
  }

  // マウント済みなら処理をスキップ
  const mountId = `nira-jiro-${Component.displayName || Component.name || "unknown"}`;
  if (!forceMount && target.querySelector(`[data-mounted="${mountId}"]`)) {
    return;
  }

  const mountContainer = container ?? document.createElement("div");
  target.appendChild(mountContainer);
  render(h(Component, {}), mountContainer);

  // マウント済みであることを示す属性を追加
  mountContainer.setAttribute("data-mounted", mountId);
}
