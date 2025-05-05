import type { InlineToken } from "../../../common/tokens/inline";
import {
  createTextToken,
  createStrongToken,
  createEmphasisToken,
} from "../../../common/tokens/inline";

export class InlineLexer {
  constructor(private source: string) {}

  tokenize(): InlineToken[] {
    const tokens: InlineToken[] = [];
    const remaining = this.source;

    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while (true) {
      match = regex.exec(remaining);
      if (match === null) break;

      const [_matchedText, _all, strongMatch, emphasisMatch] = match;
      const matchStart = match.index;
      const matchEnd = regex.lastIndex;

      if (matchStart > lastIndex) {
        const text = remaining.slice(lastIndex, matchStart);
        tokens.push(createTextToken(text));
      }

      if (strongMatch) {
        tokens.push(createStrongToken(strongMatch));
      } else if (emphasisMatch) {
        tokens.push(createEmphasisToken(emphasisMatch));
      }

      lastIndex = matchEnd;
    }

    if (lastIndex < remaining.length) {
      tokens.push(createTextToken(remaining.slice(lastIndex)));
    }

    return tokens;
  }
}
