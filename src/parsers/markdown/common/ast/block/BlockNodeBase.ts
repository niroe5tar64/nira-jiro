export type BlockNodeKind =
  | "blank_line"
  | "blockquote"
  | "code_block"
  | "heading"
  | "list"
  | "paragraph";

export interface BlockNodeBase {
  kind: BlockNodeKind;
}
