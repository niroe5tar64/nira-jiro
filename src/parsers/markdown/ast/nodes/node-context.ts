export type NodeContext =
  | HeadingContext
  | ParagraphContext
  | CodeBlockContext
  | BlockquoteContext
  | ListContext
  | ListItemContext
  | TextContext;

/* TODO: `// biome-ignore-all`, `// biome-ignore-start / end` が実装されたら修正
 *  Biome公式 Roadmap 2025 and Biome 2.0: https://biomejs.dev/blog/roadmap-2025/
 */
// biome-ignore lint/suspicious/noEmptyInterface: `undefined` は type で定義するのが一般的だが、ここではinterface で統一するため
export interface HeadingContext {}
// biome-ignore lint/suspicious/noEmptyInterface: `undefined` は type で定義するのが一般的だが、ここではinterface で統一するため
export interface ParagraphContext {}
// biome-ignore lint/suspicious/noEmptyInterface: `undefined` は type で定義するのが一般的だが、ここではinterface で統一するため
export interface CodeBlockContext {}
// biome-ignore lint/suspicious/noEmptyInterface: `undefined` は type で定義するのが一般的だが、ここではinterface で統一するため
export interface BlockquoteContext {}
// biome-ignore lint/suspicious/noEmptyInterface: `undefined` は type で定義するのが一般的だが、ここではinterface で統一するため
export interface ListContext {}
export interface ListItemContext {
  order?: number;
}
// biome-ignore lint/suspicious/noEmptyInterface: This is a marker interface for node contexts
export interface TextContext {}
