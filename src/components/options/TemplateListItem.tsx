import type { JSX } from "solid-js";
import type { Template } from "./TemplateList";
import { DragHandleIcon } from "./DragHandleIcon";
import { DeleteIcon } from "./DeleteIcon";

export type TemplateListItemProps = {
  template: Template;
  selected: boolean;
  dragged: boolean;
  dragOver: boolean;
  dragOverPosition: "above" | "below" | null;
  onSelect: (id: string) => void;
  onDragStart: (e: DragEvent, liElement: HTMLLIElement | null) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onDragEnd: () => void;
  onDragLeave: (e: DragEvent) => void;
  onDelete: (e: MouseEvent) => void;
};

export function TemplateListItem(props: TemplateListItemProps): JSX.Element {
  let liRef: HTMLLIElement | null = null;
  return (
    <li
      ref={(el) => {
        liRef = el;
      }}
      class={`w-full flex flex-col rounded transition-colors list-none relative ${props.dragged ? "opacity-50" : ""}`}
    >
      {/* 挿入線（上） */}
      {props.dragOver && props.dragOverPosition === "above" && (
        <div class="absolute left-0 right-0 top-0 h-2 flex items-center pointer-events-none z-10">
          <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
        </div>
      )}
      <div
        class={`flex items-center w-full text-left p-1 rounded transition-colors text-sm font-medium ${props.selected ? "bg-green-200 text-green-900 font-bold" : "hover:bg-green-100 text-green-800"}`}
      >
        <span
          class="mr-1 px-1 py-2 text-green-700 cursor-grab active:cursor-grabbing rounded flex-shrink-0"
          draggable="true"
          onDragStart={(e) => props.onDragStart(e, liRef)}
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
          onDragEnd={props.onDragEnd}
          onDragLeave={props.onDragLeave}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <DragHandleIcon />
        </span>
        <button
          type="button"
          class="truncate min-w-0 flex-1 text-left py-2 transition-colors text-sm font-medium cursor-pointer"
          onClick={() => props.onSelect(props.template.id)}
          tabIndex={0}
        >
          {props.template.title}
        </button>
        <button
          type="button"
          class={`ml-2 p-1 rounded-full cursor-pointer focus:outline-none ${props.selected ? "hover:bg-green-300 text-green-900" : "hover:bg-green-300 text-green-800"}`}
          aria-label="テンプレート削除"
          tabIndex={0}
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </button>
      </div>
      {/* 挿入線（下） */}
      {props.dragOver && props.dragOverPosition === "below" && (
        <div class="absolute left-0 right-0 bottom-0 h-2 flex items-center pointer-events-none z-10">
          <div class="w-full h-0.5 bg-green-500 rounded-full shadow" />
        </div>
      )}
    </li>
  );
}
