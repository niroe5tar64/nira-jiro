import { For, createSignal } from "solid-js";

export type Template = {
  id: string;
  title: string;
};

export type TemplateListProps = {
  templates: Template[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onReorder?: (newList: Template[]) => void;
};

export function TemplateList(props: TemplateListProps) {
  const [draggedId, setDraggedId] = createSignal<string | null>(null);
  // 新たに挿入インジケーターの位置を管理
  const [dragOverId, setDragOverId] = createSignal<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = createSignal<"above" | "below" | null>(null);

  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggedId(id);
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      // ドラッグイメージをli要素自身に
      e.dataTransfer.setDragImage(e.currentTarget as HTMLElement, e.offsetX, e.offsetY);
    }
  };

  const handleDragOver = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
    // マウス位置で上/下を判定
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offset = e.clientY - rect.top;
    if (offset < rect.height / 2) {
      setDragOverId(targetId);
      setDragOverPosition("above");
    } else {
      setDragOverId(targetId);
      setDragOverPosition("below");
    }
  };

  const handleDrop = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    const fromId = draggedId();
    if (!fromId || fromId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      setDragOverPosition(null);
      return;
    }
    const fromIdx = props.templates.findIndex((t) => t.id === fromId);
    const toIdx = props.templates.findIndex((t) => t.id === targetId);
    if (fromIdx === -1 || toIdx === -1) {
      setDraggedId(null);
      setDragOverId(null);
      setDragOverPosition(null);
      return;
    }
    // 挿入位置を計算
    let insertIdx = toIdx;
    if (dragOverPosition() === "below") {
      insertIdx = toIdx + 1;
    }
    const newList = [...props.templates];
    const [removed] = newList.splice(fromIdx, 1);
    // fromIdx < insertIdx の場合、splice後にindexが1つ減るので調整
    if (fromIdx < insertIdx) insertIdx--;
    newList.splice(insertIdx, 0, removed);
    setDraggedId(null);
    setDragOverId(null);
    setDragOverPosition(null);
    props.onReorder?.(newList);
  };

  const handleDragLeave = (e: DragEvent, targetId: string) => {
    // 他のliに移動したときのみ消す
    if (dragOverId() === targetId) {
      setDragOverId(null);
      setDragOverPosition(null);
    }
  };

  return (
    <div
      class="p-1 h-full"
      onDragOver={(e) => {
        e.preventDefault();
        // 必須: drop可能にする
      }}
      onDrop={(e) => {
        e.preventDefault();

        // ここでli外でドロップされた場合の処理
        const fromId = draggedId();
        if (!fromId) return;
        const fromIdx = props.templates.findIndex((t) => t.id === fromId);
        if (fromIdx === -1) return;
        const newList = [...props.templates];
        const [removed] = newList.splice(fromIdx, 1);
        // ulの上半分/下半分でunshift/push
        const ul = e.currentTarget.querySelector("ul");
        if (ul) {
          const rect = ul.getBoundingClientRect();
          if (e.clientY < rect.top + rect.height / 2) {
            newList.unshift(removed); // 先頭に挿入
          } else {
            newList.push(removed); // 末尾に挿入
          }
        } else {
          newList.push(removed); // フォールバック
        }
        setDraggedId(null);
        setDragOverId(null);
        setDragOverPosition(null);
        props.onReorder?.(newList);
      }}
    >
      <div class="text-xs text-green-900 font-bold mb-2 pl-1 tracking-wide">テンプレート一覧</div>
      <ul class="flex flex-col gap-1">
        <For each={props.templates}>
          {(template) => (
            <li
              draggable="true"
              onDragStart={(e) => handleDragStart(e as DragEvent, template.id)}
              onDragOver={(e) => handleDragOver(e as DragEvent, template.id)}
              onDrop={(e) => handleDrop(e as DragEvent, template.id)}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
                setDragOverPosition(null);
              }}
              onDragLeave={(e) => handleDragLeave(e as DragEvent, template.id)}
              class={`w-full flex flex-col rounded transition-colors list-none relative ${draggedId() === template.id ? "opacity-50" : ""}`}
            >
              {/* 挿入線（上） */}
              {dragOverId() === template.id && dragOverPosition() === "above" && (
                <div class="absolute left-0 right-0 top-0 h-1 flex items-center pointer-events-none">
                  <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
                </div>
              )}
              <button
                type="button"
                class={`flex items-center w-full text-left p-1 rounded transition-colors text-sm font-medium hover:bg-green-100 focus:bg-green-200 ${
                  props.selectedId === template.id
                    ? "bg-green-200 text-green-900 font-bold"
                    : "text-green-800"
                }`}
                onClick={() => props.onSelect(template.id)}
                tabIndex={0}
              >
                <span
                  class="mr-1 px-1 py-2 text-green-700 cursor-grab active:cursor-grabbing rounded flex-shrink-0"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>ドラッグハンドル</title>
                    <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                    <circle cx="6" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="6" cy="14" r="1.5" fill="currentColor" />
                    <circle cx="14" cy="6" r="1.5" fill="currentColor" />
                    <circle cx="14" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="14" cy="14" r="1.5" fill="currentColor" />
                  </svg>
                </span>
                <span class="truncate min-w-0 flex-1">{template.title}</span>
              </button>
              {/* 挿入線（下） */}
              {dragOverId() === template.id && dragOverPosition() === "below" && (
                <div class="absolute left-0 right-0 bottom-0 h-1 flex items-center pointer-events-none">
                  <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
                </div>
              )}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
