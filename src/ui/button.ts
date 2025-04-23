export function createButton() {
  // TODO: ボタン生成処理を実装（仮実装）
  const button = document.createElement("button");
  button.type = "button";
  button.name = "template-tool";
  button.textContent = "テンプレート挿入";
  button.style.margin = "0";
  return button;
}
