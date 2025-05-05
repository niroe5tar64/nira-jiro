export class HeadingNode {
  kind = "heading" as const;

  constructor(
    public level: number, // 1〜6
    public text: string, // 見出しテキスト
  ) {}
}
