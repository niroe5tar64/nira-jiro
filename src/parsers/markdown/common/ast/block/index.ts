export * from "./BlockNodeBase";
export * from "./HeadingNode";
export * from "./ParagraphNode";
// TODO: 他のノードもここに追加予定

export type BlockNode =
  | import("./HeadingNode").HeadingNode
  | import("./ParagraphNode").ParagraphNode;
// + 他ノードが追加されていく
