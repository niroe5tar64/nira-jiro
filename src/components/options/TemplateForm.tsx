import { createSignal } from "solid-js";

type Template = {
  title: string;
  body: string;
};

type TemplateFormProps = {
  initialTemplate: Template;
  onSave: (updated: Template) => void;
};

export function TemplateForm(props: TemplateFormProps) {
  const [title, setTitle] = createSignal(props.initialTemplate.title);
  const [body, setBody] = createSignal(props.initialTemplate.body);

  const handleSave = (e: Event) => {
    e.preventDefault();
    props.onSave({ title: title(), body: body() });
  };

  return (
    <form class="flex flex-col flex-1 min-h-0 gap-4" onSubmit={handleSave}>
      <div>
        <label
          for="template-title"
          class="block text-base font-bold text-green-900 mb-2 tracking-wide"
        >
          <span class="inline-block border-l-4 border-green-700 pl-2">テンプレートタイトル</span>
        </label>
        <input
          id="template-title"
          type="text"
          class="w-full border-3 border-green-700 bg-white focus:border-green-500 rounded px-3 py-2 text-base text-green-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none"
          value={title()}
          placeholder="タイトルを入力"
          onInput={(e) => setTitle(e.currentTarget.value)}
          required
        />
      </div>
      <div class="flex-1 min-h-0 flex flex-col">
        <label
          for="template-body"
          class="block text-base font-bold text-green-900 mb-2 tracking-wide"
        >
          <span class="inline-block border-l-4 border-green-700 pl-2">テンプレート本文</span>
        </label>
        <textarea
          id="template-body"
          class="w-full border-3 border-green-700 bg-white focus:border-green-500 rounded px-3 py-2 text-base text-green-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none flex-1 min-h-0 resize-none"
          value={body()}
          placeholder="テンプレート本文を入力"
          required
          onInput={(e) => setBody(e.currentTarget.value)}
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-green-600 text-white w-full max-w-xs px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-base font-semibold shadow"
        >
          テンプレートを保存する
        </button>
      </div>
    </form>
  );
}
