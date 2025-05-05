import { MarkdownToken } from "./MarkdownToken";

export class HeadingToken extends MarkdownToken {
  readonly type = "heading";

  constructor(
    public level: number,
    public content: string,
  ) {
    super();
  }

  override isHeading(): this is HeadingToken {
    return true;
  }
}
