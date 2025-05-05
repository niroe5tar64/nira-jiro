export * from "./InlineNodeBase";
export * from "./TextNode";
export * from "./StrongNode";
export * from "./EmphasisNode";

export type InlineNode =
  | import("./TextNode").TextNode
  | import("./StrongNode").StrongNode
  | import("./EmphasisNode").EmphasisNode;
