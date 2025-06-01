import { type JSX, createSignal, onCleanup, For } from "solid-js";
import { useTemplateListDnD } from "~/hooks";
import { TemplateForm } from "./TemplateForm";
import { TemplateListItem } from "./TemplateListItem";
import { TemplateIcon } from "./TemplateIcon";

export function OptionsPage(): JSX.Element {
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

  const handleAdd = (e: MouseEvent) => {
    console.log("追加イベント");
  };

  const handleDelete = (id: string) => (_e: MouseEvent) => {
    console.log("削除イベント実行", id);
  };

  // テンプレートリストの状態を管理
  const [templates, setTemplates] = createSignal([
    { id: "1", title: "バグ報告用テンプレート" },
    { id: "2", title: "新機能提案テンプレート" },
    { id: "3", title: "定例議事録テンプレート" },
    { id: "4", title: "週次レポートテンプレート" },
    { id: "5", title: "月次報告テンプレート" },
    { id: "6", title: "会議アジェンダテンプレート" },
    { id: "7", title: "タスク管理テンプレート" },
    { id: "8", title: "リリースノートテンプレート" },
    { id: "9", title: "障害対応テンプレート" },
    { id: "10", title: "問い合わせ対応テンプレート" },
    { id: "11", title: "仕様変更提案テンプレート" },
    { id: "12", title: "ユーザー調査テンプレート" },
    { id: "13", title: "開発計画テンプレート" },
    { id: "14", title: "テストケーステンプレート" },
    { id: "15", title: "議事録テンプレートA" },
    { id: "16", title: "議事録テンプレートB" },
    { id: "17", title: "議事録テンプレートC" },
    { id: "18", title: "議事録テンプレートD" },
    { id: "19", title: "議事録テンプレートE" },
    { id: "20", title: "議事録テンプレートF" },
  ]);
  const [selectedId, setSelectedId] = createSignal<string | undefined>(templates()[0].id);

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
  } = useTemplateListDnD(templates(), setTemplates);

  return (
    <div class="flex flex-col h-screen w-full">
      {/* ヘッダー */}
      <header class="bg-green-700 text-white px-6 h-14 flex items-center shadow z-10">
        <div class="flex items-center h-full w-full">
          <img src="icons/icon-32.png" alt="logo icon" width={28} height={28} class="inline mr-3" />
          <span class="text-base font-semibold">韮次郎 - Jira拡張機能</span>
        </div>
      </header>
      {/* メインエリア（左右分割） */}
      <div class="flex flex-1 min-h-0 bg-green-50">
        {/* 左側エリア */}
        <div
          class="relative"
          style={{ width: `${leftWidth()}%` }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOutside}
        >
          {/* 見出し */}
          <div class="text-lg font-extrabold text-green-900 border-b border-green-700 rounded-t px-3 py-2 shadow-sm tracking-wide flex items-center gap-2 select-none">
            <TemplateIcon />
            テンプレート一覧
          </div>
          {/* リスト本体の高さを見出し・テンプレート追加ボタンエリア分を減らす（例: calc(100% - 48px - 40px)） */}
          <div
            class="p-1 overflow-auto scrollbar-hide"
            style={{ height: "calc(100% - 48px - 40px)" }}
          >
            <ul class="flex flex-col gap-1">
              <For each={templates()}>
                {(template) => (
                  <TemplateListItem
                    template={template}
                    selected={selectedId() === template.id}
                    dragged={draggedId() === template.id}
                    dragOver={dragOverId() === template.id}
                    dragOverPosition={dragOverId() === template.id ? dragOverPosition() : null}
                    onSelect={setSelectedId}
                    onDragStart={handleDragStart(template.id)}
                    onDragOver={handleDragOver(template.id)}
                    onDrop={handleDrop(template.id)}
                    onDragEnd={resetDnD}
                    onDragLeave={handleDragLeave(template.id)}
                    onDelete={handleDelete(template.id)}
                  />
                )}
              </For>
            </ul>
            {/* テンプレート追加ボタン */}
            <div class="absolute bottom-0 border-t border-green-700 w-full h-12">
              <div class="flex w-full h-full items-center">
                <button
                  type="button"
                  class="flex items-center w-full h-full text-left py-2 px-1 cursor-pointer rounded transition-colors font-bold hover:bg-green-100 focus:bg-green-200 text-green-800 justify-center"
                  onClick={handleAdd}
                >
                  <span class="text-lg mr-1 leading-none">＋</span>
                  <span>テンプレート追加</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ドラッグバー */}
        <div
          class="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-400 transition-colors"
          onMouseDown={onMouseDown}
          style={{ "z-index": 10 }}
        />
        {/* 右側エリア */}
        <div class="flex-1 h-full overflow-auto" style={{ width: `${100 - leftWidth()}%` }}>
          <div class="p-4 flex flex-col h-full min-h-0">
            <TemplateForm initialTemplate={{ title: "", body: "" }} onSave={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
