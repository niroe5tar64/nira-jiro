export type BlockNodeKind =
  | "blank_line"
  | "blockquote"
  | "code_block"
  | "heading"
  | "list"
  | "list_item"
  | "paragraph";

export interface BlockNodeBase {
  kind: BlockNodeKind;
}
