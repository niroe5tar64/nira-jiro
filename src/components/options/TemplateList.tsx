import { type JSX, For } from "solid-js";
import { TemplateListItem } from "./TemplateListItem";
import { useTemplateListDnD } from "../hooks/useTemplateListDnD";

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
  const {
    draggedId,
    dragOverId,
    dragOverPosition,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDropOutside,
    resetDnD,
  } = useTemplateListDnD(props.templates, props.onReorder);

  return (
    <div class="p-1 h-full" onDragOver={(e) => e.preventDefault()} onDrop={handleDropOutside}>
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
              onDragEnd={resetDnD}
              onDragLeave={handleDragLeave}
            />
          )}
        </For>
      </ul>
    </div>
  );
}
