import type {
  ReadingComprehensionQuestion,
  ReadingGrammarPoint,
  ReadingSectionDetail,
  ReadingTextBlock,
  ReadingVocabularyItem,
} from "../types/reading.types";

export type ReadingExpressionInsight =
  Readonly<{
    id:
      string;

    expression:
      string;

    meaning:
      string;

    usageNote:
      string;

    example:
      string | null;
  }>;

export type ReadingParagraphAnalysis =
  Readonly<{
    block:
      ReadingTextBlock;

    concept:
      string;

    translation:
      string | null;

    educationalNote:
      string;

    vocabulary:
      readonly ReadingVocabularyItem[];

    grammarPoints:
      readonly ReadingGrammarPoint[];

    expressions:
      readonly ReadingExpressionInsight[];

    quizQuestions:
      readonly ReadingComprehensionQuestion[];
  }>;

function normalize(
  value:
    string,
): string {
  return value
    .toLocaleLowerCase(
      "en",
    )
    .replace(
      /[^\p{L}\p{N}'’]+/gu,
      " ",
    )
    .trim();
}

function tokenize(
  value:
    string,
): string[] {
  return normalize(
    value,
  )
    .split(
      /\s+/u,
    )
    .filter(
      (
        token,
      ) =>
        token.length >=
        3,
    );
}

function calculateTokenOverlap(
  first:
    string,
  second:
    string,
): number {
  const firstTokens =
    new Set(
      tokenize(
        first,
      ),
    );

  return tokenize(
    second,
  ).reduce(
    (
      count,
      token,
    ) =>
      count +
      (
        firstTokens.has(
          token,
        )
          ? 1
          : 0
      ),
    0,
  );
}

function getParagraphVocabulary(
  section:
    ReadingSectionDetail,

  block:
    ReadingTextBlock,

  blockIndex:
    number,
): ReadingVocabularyItem[] {
  const normalizedText =
    normalize(
      block.text,
    );

  const directMatches =
    section.vocabulary.filter(
      (
        item,
      ) =>
        normalizedText.includes(
          normalize(
            item.term,
          ),
        ) ||
        calculateTokenOverlap(
          block.text,
          item.example,
        ) >=
          3,
    );

  if (
    directMatches.length >
    0
  ) {
    return directMatches;
  }

  return section.vocabulary.filter(
    (
      _,
      index,
    ) =>
      index %
        section.content.length ===
      blockIndex,
  );
}

function getParagraphGrammar(
  section:
    ReadingSectionDetail,

  block:
    ReadingTextBlock,

  blockIndex:
    number,
): ReadingGrammarPoint[] {
  const directMatches =
    section.grammarPoints.filter(
      (
        point,
      ) =>
        point.examples.some(
          (
            example,
          ) =>
            calculateTokenOverlap(
              block.text,
              example.source,
            ) >=
            3,
        ),
    );

  if (
    directMatches.length >
    0
  ) {
    return directMatches;
  }

  return section.grammarPoints.filter(
    (
      _,
      index,
    ) =>
      index %
        section.content.length ===
      blockIndex,
  );
}

function extractQuotedExpressions(
  note:
    string | null,
): string[] {
  if (!note) {
    return [];
  }

  const quoted =
    Array.from(
      note.matchAll(
        /["“”'«»]([A-Za-z][A-Za-z'’]*(?:\s+[A-Za-z][A-Za-z'’]*){0,7})["“”'«»]/gu,
      ),
    )
      .map(
        (
          match,
        ) =>
          match[1]?.trim() ??
          "",
      )
      .filter(
        (
          value,
        ) =>
          value
            .split(
              /\s+/u,
            )
            .length >=
          2,
      );

  return Array.from(
    new Set(
      quoted,
    ),
  );
}

function extractCommonExpressions(
  text:
    string,
): string[] {
  const patterns = [
    /\bwould like\b/giu,
    /\bused to\b/giu,
    /\blook forward to\b/giu,
    /\bas soon as\b/giu,
    /\bin order to\b/giu,
    /\bno longer\b/giu,
    /\bat least\b/giu,
    /\beven though\b/giu,
    /\brather than\b/giu,
    /\bone of the\b/giu,
    /\bcould no longer\b/giu,
    /\bfor the first time\b/giu,
  ];

  return Array.from(
    new Set(
      patterns.flatMap(
        (
          pattern,
        ) =>
          Array.from(
            text.matchAll(
              pattern,
            ),
          ).map(
            (
              match,
            ) =>
              match[0],
          ),
      ),
    ),
  );
}

function buildExpressions(
  block:
    ReadingTextBlock,

  vocabulary:
    readonly ReadingVocabularyItem[],
): ReadingExpressionInsight[] {
  const phraseVocabulary =
    vocabulary
      .filter(
        (
          item,
        ) =>
          item.term
            .trim()
            .split(
              /\s+/u,
            )
            .length >
            1 ||
          item.partOfSpeech
            ?.toLowerCase()
            .includes(
              "phrase",
            ),
      )
      .map(
        (
          item,
        ): ReadingExpressionInsight => ({
          id:
            `vocab-expression-${item.id}`,

          expression:
            item.term,

          meaning:
            item.contextualMeaning,

          usageNote:
            item.meaning,

          example:
            item.example,
        }),
      );

  const extracted =
    [
      ...extractQuotedExpressions(
        block.note,
      ),
      ...extractCommonExpressions(
        block.text,
      ),
    ]
      .filter(
        (
          expression,
        ) =>
          !phraseVocabulary.some(
            (
              item,
            ) =>
              normalize(
                item.expression,
              ) ===
              normalize(
                expression,
              ),
          ),
      )
      .map(
        (
          expression,
          index,
        ): ReadingExpressionInsight => ({
          id:
            `paragraph-expression-${block.id}-${index + 1}`,

          expression,

          meaning:
            "عبارت طبیعی و کاربردی در Context این پاراگراف",

          usageNote:
            "این عبارت را به‌صورت یک Chunk کامل یاد بگیر و در جمله مشابه استفاده کن.",

          example:
            block.text,
        }),
      );

  return [
    ...phraseVocabulary,
    ...extracted,
  ].slice(
    0,
    6,
  );
}

function buildConcept(
  block:
    ReadingTextBlock,

  section:
    ReadingSectionDetail,
): string {
  const translation =
    block.translation
      ?.trim();

  if (translation) {
    const firstIdea =
      translation
        .split(
          /[.!؟]+/u,
        )
        .map(
          (
            part,
          ) =>
            part.trim(),
        )
        .find(
          Boolean,
        );

    if (firstIdea) {
      return `ایده اصلی این بخش روی این مفهوم متمرکز است: ${firstIdea}`;
    }
  }

  return section.summary;
}

export function buildReadingParagraphAnalysis(
  section:
    ReadingSectionDetail,

  blockIndex:
    number,
): ReadingParagraphAnalysis {
  const sortedBlocks =
    [...section.content]
      .sort(
        (
          first,
          second,
        ) =>
          first.order -
          second.order,
      );

  const safeIndex =
    Math.min(
      sortedBlocks.length -
        1,
      Math.max(
        0,
        blockIndex,
      ),
    );

  const block =
    sortedBlocks[
      safeIndex
    ];

  const vocabulary =
    getParagraphVocabulary(
      section,
      block,
      safeIndex,
    );

  const grammarPoints =
    getParagraphGrammar(
      section,
      block,
      safeIndex,
    );

  const quizQuestions =
    section.comprehensionQuestions.filter(
      (
        _,
        index,
      ) =>
        index %
          sortedBlocks.length ===
        safeIndex,
    );

  return {
    block,

    concept:
      buildConcept(
        block,
        section,
      ),

    translation:
      block.translation,

    educationalNote:
      block.note ??
      "روی ارتباط جمله‌ها، انتخاب واژه‌ها و نحوه توسعه ایده در این پاراگراف تمرکز کن.",

    vocabulary,

    grammarPoints,

    expressions:
      buildExpressions(
        block,
        vocabulary,
      ),

    quizQuestions,
  };
}