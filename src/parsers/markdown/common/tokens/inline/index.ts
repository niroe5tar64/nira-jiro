export * from "./InlineTokenBase";
export * from "./TextToken";
export * from "./StrongToken";
export * from "./EmphasisToken";

export type InlineToken =
  | import("./TextToken").TextToken
  | import("./StrongToken").StrongToken
  | import("./EmphasisToken").EmphasisToken;
