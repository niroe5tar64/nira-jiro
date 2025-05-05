export type InlineTokenKind = "text" | "strong" | "emphasis";

export interface InlineTokenBase {
  kind: InlineTokenKind;
}
