import type {
  BlankLineToken,
  BlockquoteToken,
  CodeBlockContentToken,
  CodeBlockEndToken,
  CodeBlockStartToken,
  HeadingToken,
  ListItemToken,
  ParagraphToken,
} from ".";

export abstract class MarkdownToken {
  abstract readonly type: string;

  isHeading(): this is HeadingToken {
    return false;
  }

  isParagraph(): this is ParagraphToken {
    return false;
  }

  isListItem(): this is ListItemToken {
    return false;
  }

  isCodeBlockStart(): this is CodeBlockStartToken {
    return false;
  }

  isCodeBlockContent(): this is CodeBlockContentToken {
    return false;
  }

  isCodeBlockEnd(): this is CodeBlockEndToken {
    return false;
  }

  isBlockquote(): this is BlockquoteToken {
    return false;
  }

  isBlankLine(): this is BlankLineToken {
    return false;
  }
}
