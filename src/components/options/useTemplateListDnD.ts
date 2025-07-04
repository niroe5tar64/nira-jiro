import { createSignal } from "solid-js";
import type { Template } from "./TemplateList";

export function useTemplateListDnD(
  templates: Template[],
  onReorder?: (newList: Template[]) => void,
) {
  const [draggedId, setDraggedId] = createSignal<string | null>(null);
  const [dragOverId, setDragOverId] = createSignal<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = createSignal<"above" | "below" | null>(null);

  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggedId(id);
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(e.currentTarget as HTMLElement, e.offsetX, e.offsetY);
    }
  };

  const handleDragOver = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
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
      resetDnD();
      return;
    }
    const fromIdx = templates.findIndex((t) => t.id === fromId);
    const toIdx = templates.findIndex((t) => t.id === targetId);
    if (fromIdx === -1 || toIdx === -1) {
      resetDnD();
      return;
    }
    let insertIdx = toIdx;
    if (dragOverPosition() === "below") {
      insertIdx = toIdx + 1;
    }
    const newList = [...templates];
    const [removed] = newList.splice(fromIdx, 1);
    if (fromIdx < insertIdx) insertIdx--;
    newList.splice(insertIdx, 0, removed);
    resetDnD();
    onReorder?.(newList);
  };

  const handleDragLeave = (e: DragEvent, targetId: string) => {
    if (dragOverId() === targetId) {
      setDragOverId(null);
      setDragOverPosition(null);
    }
  };

  const handleDropOutside = (e: DragEvent) => {
    e.preventDefault();
    const fromId = draggedId();
    if (!fromId) return;
    const fromIdx = templates.findIndex((t) => t.id === fromId);
    const ul = (e.currentTarget as HTMLElement).querySelector("ul");
    if (fromIdx === -1 || !ul) return;
    const newList = [...templates];
    const [removedList] = newList.splice(fromIdx, 1);
    const rect = ul.getBoundingClientRect();
    if (e.clientY < rect.top + rect.height / 2) {
      newList.unshift(removedList);
    } else {
      newList.push(removedList);
    }
    resetDnD();
    onReorder?.(newList);
  };

  const resetDnD = () => {
    setDraggedId(null);
    setDragOverId(null);
    setDragOverPosition(null);
  };

  return {
    draggedId,
    dragOverId,
    dragOverPosition,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDropOutside,
    resetDnD,
  };
}
