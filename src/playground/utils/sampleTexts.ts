import dedent from "dedent";

export const standardMarkdownTexts = [
  dedent`
    # 見出し1
    本文1

    ## 見出し2
    本文2

    ### 見出し3
    本文3

    - list item - 1
      - list item - 1.1
        - list item - 1.1.1
        - list item - 1.1.2
        - list item - 1.1.3
      - list item - 1.2
      - list item - 1.3
        - list item - 1.3.1
    - list item - 2
    - list item - 3

    1. list item - 1
      1. list item - 1.1
        1. list item - 1.1.1
        1. list item - 1.1.2
        1. list item - 1.1.3
      1. list item - 1.2
      1. list item - 1.3
        1. list item - 1.3.1
    1. list item - 2
    1. list item - 3

    \`\`\`java
    // Some comments here
    public String getFoo()
    {
        return foo;
    }
    \`\`\`

    > 引用テキスト1
    引用テキスト2
    **引用テキスト3**
    >
    > *引用テキスト4*

    > **引用テキストA - 1**

    > **引用テキストB - 1**
    > **引用テキストB - 2**
  `,
];

export const jiraMarkdownTexts = [
  dedent`
    h1. 見出し1
    本文1

    h2. 見出し2
    本文2

    h3. 見出し3
    本文3

    * list item - 1
    ** list item - 1.1
    *** list item - 1.1.1
    *** list item - 1.1.2
    *** list item - 1.1.3
    ** list item - 1.2
    ** list item - 1.3
    *** list item - 1.3.1
    * list item - 2
    * list item - 3

    # list item - 1
    ## list item - 1.1
    ### list item - 1.1.1
    ### list item - 1.1.2
    ### list item - 1.1.3
    ## list item - 1.2
    ## list item - 1.3
    ### list item - 1.3.1
    # list item - 2
    # list item - 3

    {code:java}
    // Some comments here
    public String getFoo()
    {
        return foo;
    }
    {code}

    {quote}
    引用テキスト1
    引用テキスト2
    *引用テキスト3*

    _引用テキスト4_
    {quote}

    bq. *引用テキストA*

    {quote}
    *引用テキストB - 1*
    *引用テキストB - 2*
    {quote}
  `,
];
