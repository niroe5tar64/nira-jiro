import { MarkdownToken } from ".";

export class CodeBlockContentToken extends MarkdownToken {
  readonly type = "codeBlockContent";

  constructor(public content: string) {
    super();
  }

  override isCodeBlockContent(): this is CodeBlockContentToken {
    return true;
  }
}
