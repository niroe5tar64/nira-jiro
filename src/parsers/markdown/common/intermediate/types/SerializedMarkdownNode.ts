/**
 * JSON保存時に使う純粋なデータ型定義
 */
export type SerializedMarkdownNode =
  | { type: "heading"; level: number; children: SerializedMarkdownNode[] }
  | { type: "paragraph"; children: SerializedMarkdownNode[] }
  | { type: "codeBlock"; language: string | null; content: string }
  | { type: "blockquote"; children: SerializedMarkdownNode[] }
  | { type: "list"; ordered: boolean; items: SerializedMarkdownNode[] }
  | { type: "listItem"; children: SerializedMarkdownNode[] }
  | { type: "text"; content: string };
