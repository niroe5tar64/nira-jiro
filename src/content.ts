function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function setupMutationObserver() {
  let lastMode: "markdown" | "wysiwyg" | null = null;

  const handleMutation = () => {
    const activeForm = document.querySelector("[field-id=description]");
    if (!activeForm) return;

    const textarea = activeForm.querySelector("#description");
    const wysiwyg = activeForm.querySelector("#description.richeditor-cover");

    let newMode: typeof lastMode = null;
    if (textarea && !wysiwyg) newMode = "markdown";
    if (textarea && wysiwyg) newMode = "wysiwyg";

    if (newMode && newMode !== lastMode) {
      lastMode = newMode;
      console.log("🌀 モードが切り替わりました:", newMode);
      // ここでテンプレ挿入や処理を行える
    }
  };

  const observer = new MutationObserver(debounce(handleMutation, 100)); // 実行間隔は適宜調整

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 起動
setupMutationObserver();
