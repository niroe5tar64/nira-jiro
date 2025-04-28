import { MarkdownToken } from ".";

export class CodeBlockEndToken extends MarkdownToken {
  readonly type = "codeBlockEnd";

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {
    super();
  }

  override isCodeBlockEnd(): this is CodeBlockEndToken {
    return true;
  }
}
