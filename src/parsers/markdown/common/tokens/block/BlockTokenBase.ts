export type BlockTokenKind =
  | "blank_line"
  | "blockquote"
  | "code_block_content"
  | "code_block_end"
  | "code_block_start"
  | "heading"
  | "list_item"
  | "paragraph";

export interface BlockTokenBase {
  kind: BlockTokenKind;
}
