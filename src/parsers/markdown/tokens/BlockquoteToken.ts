import { MarkdownToken } from ".";

export class BlockquoteToken extends MarkdownToken {
  readonly type = "blockquote";

  constructor(public content: string) {
    super();
  }

  override isBlockquote(): this is BlockquoteToken {
    return true;
  }
}
