import { MarkdownToken } from ".";

export class ParagraphToken extends MarkdownToken {
  readonly type = "paragraph";

  constructor(public content: string) {
    super();
  }

  override isParagraph(): this is ParagraphToken {
    return true;
  }
}
