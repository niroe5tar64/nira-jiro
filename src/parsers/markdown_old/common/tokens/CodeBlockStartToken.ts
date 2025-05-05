import { MarkdownToken } from ".";

export class CodeBlockStartToken extends MarkdownToken {
  readonly type = "codeBlockStart";

  constructor(public language: string | null) {
    super();
  }

  override isCodeBlockStart(): this is CodeBlockStartToken {
    return true;
  }
}
