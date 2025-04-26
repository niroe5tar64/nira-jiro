import { MarkdownToken } from ".";

export class BlankLineToken extends MarkdownToken {
  readonly type = "blankLine";

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {
    super();
  }

  override isBlankLine(): this is BlankLineToken {
    return true;
  }
}
