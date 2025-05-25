export type InlineNodeKind = "text" | "strong" | "emphasis";

export interface InlineNodeBase {
  kind: InlineNodeKind;
}
