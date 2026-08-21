import type {
  ReadingSavedInsight,
  ReadingSavedInsightInput,
  ReadingSavedInsightKind,
} from "../types/reading-saved-insight.types";

export const READING_SAVED_INSIGHTS_STORAGE_KEY =
  "meowlingo:reading:saved-insights:v1";

export const READING_SAVED_INSIGHTS_CHANGED_EVENT =
  "meowlingo:reading:saved-insights:changed";

const VALID_KINDS =
  new Set<ReadingSavedInsightKind>([
    "vocabulary",
    "concept",
    "translation",
    "educational_note",
    "grammar",
    "expression",
  ]);

function isRecord(
  value:
    unknown,
): value is Record<string, unknown> {
  return (
    typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value,
    )
  );
}

function parseSavedInsight(
  value:
    unknown,
): ReadingSavedInsight | null {
  if (
    !isRecord(
      value,
    )
  ) {
    return null;
  }

  const kind =
    value.kind;

  if (
    typeof value.key !==
      "string" ||
    typeof kind !==
      "string" ||
    !VALID_KINDS.has(
      kind as ReadingSavedInsightKind,
    ) ||
    typeof value.resourceId !==
      "string" ||
    typeof value.resourceTitle !==
      "string" ||
    typeof value.sectionId !==
      "string" ||
    typeof value.sectionTitle !==
      "string" ||
    typeof value.blockId !==
      "string" ||
    typeof value.blockOrder !==
      "number" ||
    !Number.isInteger(
      value.blockOrder,
    ) ||
    typeof value.sourceId !==
      "string" ||
    typeof value.title !==
      "string" ||
    !(
      value.subtitle ===
        null ||
      typeof value.subtitle ===
        "string"
    ) ||
    typeof value.body !==
      "string" ||
    !(
      value.detail ===
        null ||
      typeof value.detail ===
        "string"
    ) ||
    typeof value.savedAt !==
      "string"
  ) {
    return null;
  }

  return {
    key:
      value.key,

    kind:
      kind as ReadingSavedInsightKind,

    resourceId:
      value.resourceId,

    resourceTitle:
      value.resourceTitle,

    sectionId:
      value.sectionId,

    sectionTitle:
      value.sectionTitle,

    blockId:
      value.blockId,

    blockOrder:
      value.blockOrder,

    sourceId:
      value.sourceId,

    title:
      value.title,

    subtitle:
      value.subtitle,

    body:
      value.body,

    detail:
      value.detail,

    savedAt:
      value.savedAt,
  };
}

export function createReadingSavedInsightKey(
  input:
    Pick<
      ReadingSavedInsightInput,
      | "kind"
      | "resourceId"
      | "sectionId"
      | "blockId"
      | "sourceId"
    >,
): string {
  return [
    input.kind,
    input.resourceId,
    input.sectionId,
    input.blockId,
    input.sourceId,
  ]
    .map(
      (
        value,
      ) =>
        encodeURIComponent(
          value,
        ),
    )
    .join(
      ":",
    );
}

function emitChangedEvent():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new Event(
      READING_SAVED_INSIGHTS_CHANGED_EVENT,
    ),
  );
}

function writeReadingSavedInsights(
  insights:
    readonly ReadingSavedInsight[],
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      READING_SAVED_INSIGHTS_STORAGE_KEY,
      JSON.stringify(
        insights,
      ),
    );

    emitChangedEvent();
  } catch (
    error
  ) {
    console.error(
      "Reading saved insights persistence failed:",
      error,
    );
  }
}

export function readReadingSavedInsights():
  ReadingSavedInsight[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        READING_SAVED_INSIGHTS_STORAGE_KEY,
      );

    if (!rawValue) {
      return [];
    }

    const parsed:
      unknown =
      JSON.parse(
        rawValue,
      );

    if (
      !Array.isArray(
        parsed,
      )
    ) {
      return [];
    }

    return parsed
      .map(
        parseSavedInsight,
      )
      .filter(
        (
          value,
        ): value is ReadingSavedInsight =>
          value !==
          null,
      )
      .sort(
        (
          first,
          second,
        ) =>
          Date.parse(
            second.savedAt,
          ) -
          Date.parse(
            first.savedAt,
          ),
      );
  } catch {
    return [];
  }
}

export function saveReadingInsight(
  input:
    ReadingSavedInsightInput,
): ReadingSavedInsight[] {
  const current =
    readReadingSavedInsights();

  const key =
    createReadingSavedInsightKey(
      input,
    );

  const existing =
    current.find(
      (
        item,
      ) =>
        item.key ===
        key,
    );

  const nextItem:
    ReadingSavedInsight =
    {
      ...input,

      key,

      savedAt:
        existing?.savedAt ??
        new Date()
          .toISOString(),
    };

  const next = [
    nextItem,

    ...current.filter(
      (
        item,
      ) =>
        item.key !==
        key,
    ),
  ];

  writeReadingSavedInsights(
    next,
  );

  return next;
}

export function removeReadingSavedInsight(
  key:
    string,
): ReadingSavedInsight[] {
  const next =
    readReadingSavedInsights()
      .filter(
        (
          item,
        ) =>
          item.key !==
          key,
      );

  writeReadingSavedInsights(
    next,
  );

  return next;
}

export function toggleReadingSavedInsight(
  input:
    ReadingSavedInsightInput,
): ReadingSavedInsight[] {
  const current =
    readReadingSavedInsights();

  const key =
    createReadingSavedInsightKey(
      input,
    );

  if (
    current.some(
      (
        item,
      ) =>
        item.key ===
        key,
    )
  ) {
    const next =
      current.filter(
        (
          item,
        ) =>
          item.key !==
          key,
      );

    writeReadingSavedInsights(
      next,
    );

    return next;
  }

  const next: ReadingSavedInsight[] =
    [
      {
        ...input,

        key,

        savedAt:
          new Date()
            .toISOString(),
      },

      ...current,
    ];

  writeReadingSavedInsights(
    next,
  );

  return next;
}