import type { JSX } from "solid-js";
import type { Template } from "./TemplateList";

export type TemplateListItemProps = {
  template: Template;
  selected: boolean;
  dragged: boolean;
  dragOver: boolean;
  dragOverPosition: "above" | "below" | null;
  onSelect: (id: string) => void;
  onDragStart: (e: DragEvent, id: string) => void;
  onDragOver: (e: DragEvent, id: string) => void;
  onDrop: (e: DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragLeave: (e: DragEvent, id: string) => void;
};

export function TemplateListItem(props: TemplateListItemProps): JSX.Element {
  return (
    <li
      draggable="true"
      onDragStart={(e) => props.onDragStart(e, props.template.id)}
      onDragOver={(e) => props.onDragOver(e, props.template.id)}
      onDrop={(e) => props.onDrop(e, props.template.id)}
      onDragEnd={props.onDragEnd}
      onDragLeave={(e) => props.onDragLeave(e, props.template.id)}
      class={`w-full flex flex-col rounded transition-colors list-none relative ${props.dragged ? "opacity-50" : ""}`}
    >
      {/* 挿入線（上） */}
      {props.dragOver && props.dragOverPosition === "above" && (
        <div class="absolute left-0 right-0 top-0 h-1 flex items-center pointer-events-none">
          <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
        </div>
      )}
      <button
        type="button"
        class={`flex items-center w-full text-left p-1 rounded transition-colors text-sm font-medium hover:bg-green-100 focus:bg-green-200 ${
          props.selected ? "bg-green-200 text-green-900 font-bold" : "text-green-800"
        }`}
        onClick={() => props.onSelect(props.template.id)}
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
        <span class="truncate min-w-0 flex-1">{props.template.title}</span>
      </button>
      {/* 挿入線（下） */}
      {props.dragOver && props.dragOverPosition === "below" && (
        <div class="absolute left-0 right-0 bottom-0 h-1 flex items-center pointer-events-none">
          <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
        </div>
      )}
    </li>
  );
}
