import type {
  ReadingFontSize,
  ReadingWorkspaceTab,
} from "./reading-workspace.types";

const STORAGE_VERSION =
  1;

const VALID_TABS =
  new Set<ReadingWorkspaceTab>([
    "content",
    "vocabulary",
    "grammar",
    "expressions",
    "quiz",
  ]);

const VALID_FONT_SIZES =
  new Set<ReadingFontSize>([
    "compact",
    "comfortable",
    "large",
  ]);

export type ReadingWorkspaceStoredState =
  Readonly<{
    version:
      1;

    activeTab:
      ReadingWorkspaceTab;

    visitedTabs:
      ReadingWorkspaceTab[];

    activeBlockIndex:
      number;

    showTranslations:
      boolean;

    fontSize:
      ReadingFontSize;

    /**
     * Legacy field برای Migration
     * Bookmarkهای قبلی Vocabulary.
     */
    savedVocabularyIds:
      string[];

    masteredGrammarIds:
      string[];

    reviewedBlockIds:
      string[];

    quizAnswers:
      Record<
        string,
        string
      >;

    quizSubmitted:
      boolean;
  }>;

function isRecord(
  value:
    unknown,
): value is Record<
  string,
  unknown
> {
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

function createStorageKey(
  resourceId:
    string,

  sectionId:
    string,
): string {
  return [
    "meowlingo",
    "reading",
    "workspace",
    resourceId,
    sectionId,
  ].join(
    ":",
  );
}

function parseVisitedTabs(
  value:
    unknown,
): ReadingWorkspaceTab[] {
  if (
    !Array.isArray(
      value,
    )
  ) {
    return [
      "content",
    ];
  }

  const tabs =
    value.filter(
      (
        item,
      ): item is ReadingWorkspaceTab =>
        typeof item ===
          "string" &&
        VALID_TABS.has(
          item as ReadingWorkspaceTab,
        ),
    );

  if (
    !tabs.includes(
      "content",
    )
  ) {
    tabs.unshift(
      "content",
    );
  }

  return Array.from(
    new Set(
      tabs,
    ),
  );
}

function parseStringArray(
  value:
    unknown,
): string[] {
  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return Array.from(
    new Set(
      value.filter(
        (
          item,
        ): item is string =>
          typeof item ===
            "string" &&
          item.length >
            0,
      ),
    ),
  );
}

function parseQuizAnswers(
  value:
    unknown,
): Record<
  string,
  string
> {
  if (
    !isRecord(
      value,
    )
  ) {
    return {};
  }

  const entries =
    Object.entries(
      value,
    ).filter(
      (
        entry,
      ): entry is [
        string,
        string,
      ] =>
        entry[0].length >
          0 &&
        typeof entry[1] ===
          "string" &&
        entry[1].length >
          0,
    );

  return Object.fromEntries(
    entries,
  );
}

export function readReadingWorkspaceState(
  resourceId:
    string,

  sectionId:
    string,
): ReadingWorkspaceStoredState | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        createStorageKey(
          resourceId,
          sectionId,
        ),
      );

    if (!rawValue) {
      return null;
    }

    const parsed:
      unknown =
      JSON.parse(
        rawValue,
      );

    if (
      !isRecord(
        parsed,
      )
    ) {
      return null;
    }

    if (
      parsed.version !==
      STORAGE_VERSION
    ) {
      return null;
    }

    const activeTab =
      typeof parsed.activeTab ===
        "string" &&
      VALID_TABS.has(
        parsed.activeTab as ReadingWorkspaceTab,
      )
        ? parsed.activeTab as ReadingWorkspaceTab
        : "content";

    const fontSize =
      typeof parsed.fontSize ===
        "string" &&
      VALID_FONT_SIZES.has(
        parsed.fontSize as ReadingFontSize,
      )
        ? parsed.fontSize as ReadingFontSize
        : "comfortable";

    const activeBlockIndex =
      typeof parsed.activeBlockIndex ===
        "number" &&
      Number.isInteger(
        parsed.activeBlockIndex,
      ) &&
      parsed.activeBlockIndex >=
        0
        ? parsed.activeBlockIndex
        : 0;

    return {
      version:
        STORAGE_VERSION,

      activeTab,

      visitedTabs:
        parseVisitedTabs(
          parsed.visitedTabs,
        ),

      activeBlockIndex,

      showTranslations:
        parsed.showTranslations ===
        true,

      fontSize,

      savedVocabularyIds:
        parseStringArray(
          parsed.savedVocabularyIds,
        ),

      masteredGrammarIds:
        parseStringArray(
          parsed.masteredGrammarIds,
        ),

      reviewedBlockIds:
        parseStringArray(
          parsed.reviewedBlockIds,
        ),

      quizAnswers:
        parseQuizAnswers(
          parsed.quizAnswers,
        ),

      quizSubmitted:
        parsed.quizSubmitted ===
        true,
    };
  } catch {
    return null;
  }
}

export function writeReadingWorkspaceState(
  resourceId:
    string,

  sectionId:
    string,

  state:
    Omit<
      ReadingWorkspaceStoredState,
      "version"
    >,
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  const payload:
    ReadingWorkspaceStoredState =
    {
      version:
        STORAGE_VERSION,

      ...state,
    };

  try {
    window.localStorage.setItem(
      createStorageKey(
        resourceId,
        sectionId,
      ),
      JSON.stringify(
        payload,
      ),
    );
  } catch {
    /**
     * Persistence یک Enhancement است.
     * نبودن Storage نباید Reading را متوقف کند.
     */
  }
}