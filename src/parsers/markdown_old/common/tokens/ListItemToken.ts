import { MarkdownToken } from ".";

export class ListItemToken extends MarkdownToken {
  readonly type = "listItem";

  constructor(
    public ordered: boolean,
    public level: number,
    public content: string,
  ) {
    super();
  }

  override isListItem(): this is ListItemToken {
    return true;
  }
}
