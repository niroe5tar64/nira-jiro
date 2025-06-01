import { type JSX, For, createSignal } from "solid-js";
import { TemplateListItem } from "./TemplateListItem";

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

export function TemplateList(props: TemplateListProps): JSX.Element {
  const [draggedId, setDraggedId] = createSignal<string | null>(null);
  const [dragOverId, setDragOverId] = createSignal<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = createSignal<"above" | "below" | null>(null);

  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggedId(id);
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(e.currentTarget as HTMLElement, e.offsetX, e.offsetY); // ドラッグイメージをli要素自身に
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
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        // ここでli外でドロップされた場合の処理
        const fromId = draggedId();
        if (!fromId) {
          return;
        }
        const fromIdx = props.templates.findIndex((t) => t.id === fromId);
        const ul = e.currentTarget.querySelector("ul");
        if (fromIdx === -1 || !ul) {
          return;
        }
        const newList = [...props.templates];
        const [removedList] = newList.splice(fromIdx, 1);
        // ulの上半分/下半分で先頭に挿入(unshift)/末尾に挿入(push)
        const rect = ul.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          newList.unshift(removedList);
        } else {
          newList.push(removedList);
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
            <TemplateListItem
              template={template}
              selected={props.selectedId === template.id}
              dragged={draggedId() === template.id}
              dragOver={dragOverId() === template.id}
              dragOverPosition={dragOverId() === template.id ? dragOverPosition() : null}
              onSelect={props.onSelect}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
                setDragOverPosition(null);
              }}
              onDragLeave={handleDragLeave}
            />
          )}
        </For>
      </ul>
    </div>
  );
}
