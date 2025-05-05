export class ParagraphNode {
  kind = "paragraph" as const;

  constructor(
    public rawText: string, // インライン構文を処理する前のテキスト
  ) {}
}
