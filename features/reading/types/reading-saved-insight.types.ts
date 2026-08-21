export type ReadingSavedInsightKind =
  | "vocabulary"
  | "concept"
  | "translation"
  | "educational_note"
  | "grammar"
  | "expression";

export type ReadingSavedInsight =
  Readonly<{
    key:
      string;

    kind:
      ReadingSavedInsightKind;

    resourceId:
      string;

    resourceTitle:
      string;

    sectionId:
      string;

    sectionTitle:
      string;

    blockId:
      string;

    blockOrder:
      number;

    sourceId:
      string;

    title:
      string;

    subtitle:
      string | null;

    body:
      string;

    detail:
      string | null;

    savedAt:
      string;
  }>;

export type ReadingSavedInsightInput =
  Readonly<
    Omit<
      ReadingSavedInsight,
      "key" | "savedAt"
    >
  >;