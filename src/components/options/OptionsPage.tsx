import { createSignal, onCleanup } from "solid-js";

export function OptionsPage() {
  // 左右の幅（%）を管理
  const [leftWidth, setLeftWidth] = createSignal(30);
  let isDragging = false;

  // ドラッグイベントのハンドラ
  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    document.body.style.cursor = "col-resize";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    // ページ全体の幅に対する割合で計算
    const totalWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / totalWidth) * 100;
    // 10%〜90%の範囲に制限
    setLeftWidth(Math.max(20, Math.min(80, newLeftWidth)));
  };

  const onMouseUp = () => {
    isDragging = false;
    document.body.style.cursor = "";
  };

  // イベントリスナーの登録・解除
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  onCleanup(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "";
  });

  return (
    <div class="flex h-screen w-full">
      {/* 左側エリア */}
      <div class="h-full overflow-auto" style={{ width: `${leftWidth()}%` }}>
        <div class="p-4">左側エリア</div>
      </div>
      {/* ドラッグバー */}
      <div
        class="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-400 transition-colors"
        onMouseDown={onMouseDown}
        style={{ "z-index": 10 }}
      />
      {/* 右側エリア */}
      <div class="flex-1 h-full overflow-auto" style={{ width: `${100 - leftWidth()}%` }}>
        <div class="p-4">右側エリア</div>
      </div>
    </div>
  );
}
