import type { JSX } from "solid-js";

export function TemplateIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
    >
      <title>テンプレートアイコン</title>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
    </svg>
  );
}
