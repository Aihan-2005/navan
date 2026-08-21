"use client";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  useReadingSavedItems,
} from "../../hooks/use-reading-saved-items";

import type {
  ReadingSavedItemInput,
  ReadingSavedItemKind,
} from "../../types/reading-note.types";

import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

import {
  createReadingSavedItemId,
} from "../../utils/reading-notes.storage";

import {
  ReadingAudioControls,
} from "./reading-audio-controls";

import {
  ReadingBlockNavigator,
} from "./reading-block-navigator";

import {
  ReadingContentPanel,
} from "./reading-content-panel";

import {
  ReadingExpressionsPanel,
} from "./reading-expressions-panel";

import {
  ReadingGrammarPanel,
} from "./reading-grammar-panel";

import {
  ReadingQuizPanel,
} from "./reading-quiz-panel";

import {
  ReadingVocabularyPanel,
} from "./reading-vocabulary-panel";

import {
  ReadingWorkspaceHeader,
} from "./reading-workspace-header";

import {
  readReadingWorkspaceState,
  writeReadingWorkspaceState,
} from "./reading-workspace.storage";

import {
  ReadingWorkspaceTabs,
} from "./reading-workspace-tabs";

import type {
  ReadingFontSize,
  ReadingWorkspaceTab,
} from "./reading-workspace.types";

type ReadingSectionWorkspaceProps =
  Readonly<{
    section:
      ReadingSectionDetail;
  }>;

const PASSING_SCORE =
  70;

const ANALYSIS_TABS:
  readonly ReadingWorkspaceTab[] =
  [
    "content",
    "vocabulary",
    "grammar",
    "expressions",
  ];

function calculateQuizScore(
  section:
    ReadingSectionDetail,

  answers:
    Readonly<
      Record<
        string,
        string
      >
    >,
): number {
  const questions =
    section.comprehensionQuestions;

  if (
    questions.length ===
    0
  ) {
    return 100;
  }

  const correctAnswers =
    questions.reduce(
      (
        total,
        question,
      ) =>
        total +
        (
          answers[
            question.id
          ] ===
          question.correctOptionId
            ? 1
            : 0
        ),
      0,
    );

  return Math.round(
    (
      correctAnswers /
      questions.length
    ) *
      100,
  );
}

function filterBySourceBlock<
  T extends {
    sourceBlockId?:
      string | null;
  },
>(
  items:
    readonly T[],

  blockId:
    string,
): readonly T[] {
  const hasScopedItems =
    items.some(
      (
        item,
      ) =>
        Boolean(
          item.sourceBlockId,
        ),
    );

  if (
    !hasScopedItems
  ) {
    /**
     * Backward compatibility:
     * داده‌های قدیمی Section هنوز sourceBlockId ندارند.
     */
    return items;
  }

  return items.filter(
    (
      item,
    ) =>
      item.sourceBlockId ===
      blockId,
  );
}

function createSavedInput({
  section,
  kind,
  sourceId,
  blockId,
  title,
  content,
  secondaryText,
}: Readonly<{
  section:
    ReadingSectionDetail;

  kind:
    ReadingSavedItemKind;

  sourceId:
    string;

  blockId:
    string | null;

  title:
    string;

  content:
    string;

  secondaryText:
    string | null;
}>): ReadingSavedItemInput {
  const sectionHref =
    `/reading/resources/${encodeURIComponent(
      section.resourceId,
    )}` +
    `/sections/${encodeURIComponent(
      section.id,
    )}`;

  const href =
    blockId
      ? `${sectionHref}#${encodeURIComponent(
          blockId,
        )}`
      : sectionHref;

  return {
    id:
      createReadingSavedItemId(
        kind,
        section.resourceId,
        section.id,
        sourceId,
      ),

    kind,

    resourceId:
      section.resourceId,

    resourceTitle:
      section.resourceTitle,

    sectionId:
      section.id,

    sectionTitle:
      section.title,

    blockId,

    title,

    content,

    secondaryText,

    href,
  };
}

function calculateProgress(
  reviewedBlockIds:
    readonly string[],

  activeBlockId:
    string,

  visitedTabs:
    readonly ReadingWorkspaceTab[],

  availableAnalysisTabs:
    readonly ReadingWorkspaceTab[],

  totalBlocks:
    number,
): number {
  if (
    totalBlocks <=
    0
  ) {
    return 0;
  }

  const fullyReviewedCount =
    reviewedBlockIds.filter(
      (
        id,
      ) =>
        id !==
        activeBlockId,
    ).length;

  const currentAlreadyReviewed =
    reviewedBlockIds.includes(
      activeBlockId,
    );

  const currentProgress =
    currentAlreadyReviewed
      ? 1
      : (
          availableAnalysisTabs.filter(
            (
              tab,
            ) =>
              visitedTabs.includes(
                tab,
              ),
          ).length /
          Math.max(
            1,
            availableAnalysisTabs.length,
          )
        );

  return Math.min(
    100,
    Math.round(
      (
        (
          fullyReviewedCount +
          currentProgress
        ) /
        totalBlocks
      ) *
        100,
    ),
  );
}

export function ReadingSectionWorkspace({
  section,
}: ReadingSectionWorkspaceProps) {
  const sortedContent =
    useMemo(
      () =>
        [
          ...section.content,
        ].sort(
          (
            first,
            second,
          ) =>
            first.order -
            second.order,
        ),
      [
        section.content,
      ],
    );

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<ReadingWorkspaceTab>(
      "content",
    );

  const [
    visitedTabs,
    setVisitedTabs,
  ] =
    useState<
      ReadingWorkspaceTab[]
    >([
      "content",
    ]);

  const [
    activeBlockIndex,
    setActiveBlockIndex,
  ] =
    useState(
      0,
    );

  const [
    showTranslations,
    setShowTranslations,
  ] =
    useState(
      false,
    );

  const [
    fontSize,
    setFontSize,
  ] =
    useState<ReadingFontSize>(
      "comfortable",
    );

  const [
    legacySavedVocabularyIds,
    setLegacySavedVocabularyIds,
  ] =
    useState<
      string[]
    >([]);

  const [
    masteredGrammarIds,
    setMasteredGrammarIds,
  ] =
    useState<
      string[]
    >([]);

  const [
    reviewedBlockIds,
    setReviewedBlockIds,
  ] =
    useState<
      string[]
    >([]);

  const [
    quizAnswers,
    setQuizAnswers,
  ] =
    useState<
      Record<
        string,
        string
      >
    >({});

  const [
    quizSubmitted,
    setQuizSubmitted,
  ] =
    useState(
      false,
    );

  const [
    hasHydrated,
    setHasHydrated,
  ] =
    useState(
      false,
    );

  const {
    isSaved,
    toggleSavedItem,
    ensureSavedItem,
  } =
    useReadingSavedItems(
      section.resourceId,
    );

  useEffect(() => {
    const storedState =
      readReadingWorkspaceState(
        section.resourceId,
        section.id,
      );

    let nextBlockIndex =
      0;

    if (
      storedState
    ) {
      setActiveTab(
        storedState.activeTab,
      );

      setVisitedTabs(
        storedState.visitedTabs,
      );

      setShowTranslations(
        storedState.showTranslations,
      );

      setFontSize(
        storedState.fontSize,
      );

      setLegacySavedVocabularyIds(
        storedState.savedVocabularyIds,
      );

      setMasteredGrammarIds(
        storedState.masteredGrammarIds,
      );

      setReviewedBlockIds(
        storedState.reviewedBlockIds,
      );

      setQuizAnswers(
        storedState.quizAnswers,
      );

      setQuizSubmitted(
        storedState.quizSubmitted,
      );

      nextBlockIndex =
        Math.min(
          sortedContent.length -
            1,
          Math.max(
            0,
            storedState.activeBlockIndex,
          ),
        );
    }

    const hash =
      decodeURIComponent(
        window.location.hash
          .replace(
            /^#/u,
            "",
          ),
      );

    const hashBlockIndex =
      sortedContent.findIndex(
        (
          block,
        ) =>
          block.id ===
          hash,
      );

    if (
      hashBlockIndex >=
      0
    ) {
      nextBlockIndex =
        hashBlockIndex;

      setActiveTab(
        "content",
      );

      setVisitedTabs([
        "content",
      ]);
    }

    setActiveBlockIndex(
      nextBlockIndex,
    );

    setHasHydrated(
      true,
    );
  }, [
    section.id,
    section.resourceId,
    sortedContent,
  ]);

  useEffect(() => {
    if (
      !hasHydrated
    ) {
      return;
    }

    writeReadingWorkspaceState(
      section.resourceId,
      section.id,
      {
        activeTab,

        visitedTabs,

        activeBlockIndex,

        showTranslations,

        fontSize,

        savedVocabularyIds:
          legacySavedVocabularyIds,

        masteredGrammarIds,

        reviewedBlockIds,

        quizAnswers,

        quizSubmitted,
      },
    );
  }, [
    activeBlockIndex,
    activeTab,
    fontSize,
    hasHydrated,
    legacySavedVocabularyIds,
    masteredGrammarIds,
    quizAnswers,
    quizSubmitted,
    reviewedBlockIds,
    section.id,
    section.resourceId,
    showTranslations,
    visitedTabs,
  ]);

  const activeBlock =
    sortedContent[
      activeBlockIndex
    ] ??
    sortedContent[0];

  /**
   * Migration Bookmarkهای Vocabulary قدیمی
   * به Storage مرکزی جدید.
   */
  useEffect(() => {
    if (
      !hasHydrated ||
      !activeBlock ||
      legacySavedVocabularyIds.length ===
        0
    ) {
      return;
    }

    legacySavedVocabularyIds.forEach(
      (
        vocabularyId,
      ) => {
        const vocabularyItem =
          section.vocabulary.find(
            (
              item,
            ) =>
              item.id ===
              vocabularyId,
          );

        if (
          !vocabularyItem
        ) {
          return;
        }

        const blockId =
          vocabularyItem.sourceBlockId ??
          activeBlock.id;

        ensureSavedItem(
          createSavedInput({
            section,

            kind:
              "vocabulary",

            sourceId:
              vocabularyItem.id,

            blockId,

            title:
              vocabularyItem.term,

            content:
              `${vocabularyItem.meaning} — ${vocabularyItem.contextualMeaning}`,

            secondaryText:
              vocabularyItem.example,
          }),
        );
      },
    );
  }, [
    activeBlock,
    ensureSavedItem,
    hasHydrated,
    legacySavedVocabularyIds,
    section,
  ]);

  if (
    !activeBlock
  ) {
    return null;
  }

  const expressions =
    section.expressions ??
    [];

  const currentVocabulary =
    filterBySourceBlock(
      section.vocabulary,
      activeBlock.id,
    );

  const currentGrammar =
    filterBySourceBlock(
      section.grammarPoints,
      activeBlock.id,
    );

  const currentExpressions =
    filterBySourceBlock(
      expressions,
      activeBlock.id,
    );

  const availableAnalysisTabs =
    ANALYSIS_TABS.filter(
      (
        tab,
      ) => {
        switch (
          tab
        ) {
          case "content":
            return true;

          case "vocabulary":
            return (
              currentVocabulary.length >
              0
            );

          case "grammar":
            return (
              currentGrammar.length >
              0
            );

          case "expressions":
            return (
              currentExpressions.length >
              0
            );

          case "quiz":
            return false;
        }
      },
    );

  const progressPercent =
    calculateProgress(
      reviewedBlockIds,
      activeBlock.id,
      visitedTabs,
      availableAnalysisTabs,
      sortedContent.length,
    );

  const quizScore =
    calculateQuizScore(
      section,
      quizAnswers,
    );

  const quizPassed =
    quizSubmitted &&
    quizScore >=
      PASSING_SCORE;

  const meaningSavedId =
    createReadingSavedItemId(
      "meaning",
      section.resourceId,
      section.id,
      activeBlock.id,
    );

  const noteSavedId =
    createReadingSavedItemId(
      "educational_note",
      section.resourceId,
      section.id,
      activeBlock.id,
    );

  const savedVocabularyIds =
    currentVocabulary
      .filter(
        (
          item,
        ) =>
          isSaved(
            createReadingSavedItemId(
              "vocabulary",
              section.resourceId,
              section.id,
              item.id,
            ),
          ),
      )
      .map(
        (
          item,
        ) =>
          item.id,
      );

  const savedGrammarIds =
    currentGrammar
      .filter(
        (
          item,
        ) =>
          isSaved(
            createReadingSavedItemId(
              "grammar",
              section.resourceId,
              section.id,
              item.id,
            ),
          ),
      )
      .map(
        (
          item,
        ) =>
          item.id,
      );

  const savedExpressionIds =
    currentExpressions
      .filter(
        (
          item,
        ) =>
          isSaved(
            createReadingSavedItemId(
              "expression",
              section.resourceId,
              section.id,
              item.id,
            ),
          ),
      )
      .map(
        (
          item,
        ) =>
          item.id,
      );

  function handleTabChange(
    tab:
      ReadingWorkspaceTab,
  ): void {
    setActiveTab(
      tab,
    );

    setVisitedTabs(
      (
        currentTabs,
      ) =>
        currentTabs.includes(
          tab,
        )
          ? currentTabs
          : [
              ...currentTabs,
              tab,
            ],
    );
  }

  function goToBlock(
    index:
      number,

    markCurrentAsReviewed:
      boolean,
  ): void {
    if (
      index <
        0 ||
      index >=
        sortedContent.length
    ) {
      return;
    }

    if (
      markCurrentAsReviewed
    ) {
      setReviewedBlockIds(
        (
          currentIds,
        ) =>
          currentIds.includes(
            activeBlock.id,
          )
            ? currentIds
            : [
                ...currentIds,
                activeBlock.id,
              ],
      );
    }

    setActiveBlockIndex(
      index,
    );

    setActiveTab(
      "content",
    );

    setVisitedTabs([
      "content",
    ]);
  }

  function handleToggleVocabulary(
    vocabularyId:
      string,
  ): void {
    const item =
      currentVocabulary.find(
        (
          vocabulary,
        ) =>
          vocabulary.id ===
          vocabularyId,
      );

    if (!item) {
      return;
    }

    const blockId =
      item.sourceBlockId ??
      activeBlock.id;

    const savedId =
      createReadingSavedItemId(
        "vocabulary",
        section.resourceId,
        section.id,
        item.id,
      );

    const wasSaved =
      isSaved(
        savedId,
      );

    toggleSavedItem(
      createSavedInput({
        section,

        kind:
          "vocabulary",

        sourceId:
          item.id,

        blockId,

        title:
          item.term,

        content:
          `${item.meaning} — ${item.contextualMeaning}`,

        secondaryText:
          item.example,
      }),
    );

    setLegacySavedVocabularyIds(
      (
        currentIds,
      ) => {
        if (
          wasSaved
        ) {
          return currentIds.filter(
            (
              id,
            ) =>
              id !==
              item.id,
          );
        }

        return currentIds.includes(
          item.id,
        )
          ? currentIds
          : [
              ...currentIds,
              item.id,
            ];
      },
    );
  }

  function handleToggleGrammar(
    grammarId:
      string,
  ): void {
    const item =
      currentGrammar.find(
        (
          grammar,
        ) =>
          grammar.id ===
          grammarId,
      );

    if (!item) {
      return;
    }

    toggleSavedItem(
      createSavedInput({
        section,

        kind:
          "grammar",

        sourceId:
          item.id,

        blockId:
          item.sourceBlockId ??
          activeBlock.id,

        title:
          item.title,

        content:
          item.explanation,

        secondaryText:
          item.pattern ??
          item.masteryTip ??
          null,
      }),
    );
  }

  function handleToggleExpression(
    expressionId:
      string,
  ): void {
    const item =
      currentExpressions.find(
        (
          expression,
        ) =>
          expression.id ===
          expressionId,
      );

    if (!item) {
      return;
    }

    toggleSavedItem(
      createSavedInput({
        section,

        kind:
          "expression",

        sourceId:
          item.id,

        blockId:
          item.sourceBlockId ??
          activeBlock.id,

        title:
          item.expression,

        content:
          item.meaning,

        secondaryText:
          `${item.usageNote} — ${item.example}`,
      }),
    );
  }

  function handleToggleGrammarMastery(
    grammarId:
      string,
  ): void {
    setMasteredGrammarIds(
      (
        currentIds,
      ) =>
        currentIds.includes(
          grammarId,
        )
          ? currentIds.filter(
              (
                id,
              ) =>
                id !==
                grammarId,
            )
          : [
              ...currentIds,
              grammarId,
            ],
    );
  }

  function handleAnswer(
    questionId:
      string,

    optionId:
      string,
  ): void {
    if (
      quizSubmitted
    ) {
      return;
    }

    setQuizAnswers(
      (
        currentAnswers,
      ) => ({
        ...currentAnswers,

        [questionId]:
          optionId,
      }),
    );
  }

  function handleQuizReset():
    void {
    setQuizAnswers(
      {},
    );

    setQuizSubmitted(
      false,
    );
  }

  const baseSectionPath =
    `/reading/resources/` +
    encodeURIComponent(
      section.resourceId,
    ) +
    "/sections";

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
      "
    >
      <ReadingWorkspaceHeader
        section={
          section
        }
        progressPercent={
          progressPercent
        }
        showTranslations={
          showTranslations
        }
        fontSize={
          fontSize
        }
        onToggleTranslations={() => {
          setShowTranslations(
            (
              currentValue,
            ) =>
              !currentValue,
          );
        }}
        onFontSizeChange={
          setFontSize
        }
      />

      <ReadingAudioControls
        title={
          section.title
        }
        languageCode={
          section.languageCode
        }
        audioStatus={
          section.audioStatus
        }
        audioUrl={
          section.audioUrl
        }
        content={
          section.content
        }
      />

      <ReadingWorkspaceTabs
        activeTab={
          activeTab
        }
        vocabularyCount={
          currentVocabulary.length
        }
        grammarCount={
          currentGrammar.length
        }
        expressionCount={
          currentExpressions.length
        }
        quizCount={
          section.comprehensionQuestions
            .length
        }
        onTabChange={
          handleTabChange
        }
      />

      <div
        role="tabpanel"
        className="
          min-h-96
        "
      >
        {activeTab ===
        "content" ? (
          <ReadingContentPanel
            block={
              activeBlock
            }
            blockIndex={
              activeBlockIndex
            }
            totalBlocks={
              sortedContent.length
            }
            languageCode={
              section.languageCode
            }
            showTranslations={
              showTranslations
            }
            fontSize={
              fontSize
            }
            isMeaningSaved={
              isSaved(
                meaningSavedId,
              )
            }
            isNoteSaved={
              isSaved(
                noteSavedId,
              )
            }
            onToggleMeaning={() => {
              const concept =
                activeBlock.conceptSummary ??
                activeBlock.translation ??
                activeBlock.text;

              toggleSavedItem(
                createSavedInput({
                  section,

                  kind:
                    "meaning",

                  sourceId:
                    activeBlock.id,

                  blockId:
                    activeBlock.id,

                  title:
                    `معنی و مفهوم پاراگراف ${activeBlock.order}`,

                  content:
                    concept,

                  secondaryText:
                    activeBlock.translation ??
                    null,
                }),
              );
            }}
            onToggleNote={() => {
              if (
                !activeBlock.note
              ) {
                return;
              }

              toggleSavedItem(
                createSavedInput({
                  section,

                  kind:
                    "educational_note",

                  sourceId:
                    activeBlock.id,

                  blockId:
                    activeBlock.id,

                  title:
                    `نکته آموزشی پاراگراف ${activeBlock.order}`,

                  content:
                    activeBlock.note,

                  secondaryText:
                    activeBlock.text,
                }),
              );
            }}
          />
        ) : null}

        {activeTab ===
        "vocabulary" ? (
          <ReadingVocabularyPanel
            vocabulary={
              currentVocabulary
            }
            savedVocabularyIds={
              savedVocabularyIds
            }
            onToggleSaved={
              handleToggleVocabulary
            }
          />
        ) : null}

        {activeTab ===
        "grammar" ? (
          <ReadingGrammarPanel
            grammarPoints={
              currentGrammar
            }
            savedGrammarIds={
              savedGrammarIds
            }
            masteredGrammarIds={
              masteredGrammarIds
            }
            onToggleSaved={
              handleToggleGrammar
            }
            onToggleMastered={
              handleToggleGrammarMastery
            }
          />
        ) : null}

        {activeTab ===
        "expressions" ? (
          <ReadingExpressionsPanel
            expressions={
              currentExpressions
            }
            savedExpressionIds={
              savedExpressionIds
            }
            onToggleSaved={
              handleToggleExpression
            }
          />
        ) : null}

        {activeTab ===
        "quiz" ? (
          <ReadingQuizPanel
            questions={
              section.comprehensionQuestions
            }
            answers={
              quizAnswers
            }
            submitted={
              quizSubmitted
            }
            scorePercent={
              quizScore
            }
            onAnswer={
              handleAnswer
            }
            onSubmit={() => {
              setQuizSubmitted(
                true,
              );
            }}
            onReset={
              handleQuizReset
            }
          />
        ) : null}
      </div>

      {activeTab !==
      "quiz" ? (
        <ReadingBlockNavigator
          currentIndex={
            activeBlockIndex
          }
          totalBlocks={
            sortedContent.length
          }
          onPrevious={() => {
            goToBlock(
              activeBlockIndex -
                1,
              false,
            );
          }}
          onNext={() => {
            goToBlock(
              activeBlockIndex +
                1,
              true,
            );
          }}
        />
      ) : null}

      {quizSubmitted ? (
        <Card
          className={cn(
            "p-5",
            "sm:p-6",

            quizPassed
              ? [
                  "border-emerald-400/20",
                  "bg-emerald-400/[0.05]",
                ]
              : [
                  "border-amber-400/20",
                  "bg-amber-400/[0.04]",
                ],
          )}
        >
          <div
            className="
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <span
                className={cn(
                  "flex",
                  "h-11",
                  "w-11",
                  "shrink-0",
                  "items-center",
                  "justify-center",
                  "rounded-xl",

                  quizPassed
                    ? [
                        "bg-emerald-400/10",
                        "text-emerald-300",
                      ]
                    : [
                        "bg-amber-400/10",
                        "text-amber-300",
                      ],
                )}
              >
                {quizPassed ? (
                  <Trophy
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                ) : (
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                )}
              </span>

              <div>
                <h2
                  className="
                    font-bold
                    text-white
                  "
                >
                  {quizPassed
                    ? "کوییز اختیاری با نتیجه خوبی ثبت شد"
                    : "کوییز اختیاری ثبت شد"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  امتیاز تو{" "}
                  {quizScore}
                  ٪ است. نتیجه این کوییز برای مرور و سنجش درک مطلب است و مسیر مطالعه را قفل نمی‌کند.
                </p>
              </div>
            </div>

            {!quizPassed ? (
              <button
                type="button"
                onClick={() => {
                  handleTabChange(
                    "content",
                  );
                }}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/[0.06]
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-white/[0.1]
                "
              >
                مرور دوباره متن
              </button>
            ) : null}
          </div>
        </Card>
      ) : null}

      <nav
        aria-label="جابجایی بین بخش‌های Reading"
        className="
          flex
          flex-col
          gap-3
          border-t
          border-white/[0.06]
          pt-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          {section.previousSectionId ? (
            <Link
              href={
                `${baseSectionPath}/` +
                encodeURIComponent(
                  section.previousSectionId,
                )
              }
              className="
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-4
                py-2.5
                text-sm
                text-slate-300
                transition
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />

              بخش قبلی
            </Link>
          ) : null}
        </div>

        <div>
          {section.nextSectionId ? (
            <Link
              href={
                `${baseSectionPath}/` +
                encodeURIComponent(
                  section.nextSectionId,
                )
              }
              className="
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                bg-cyan-400
                px-4
                py-2.5
                text-sm
                font-bold
                text-slate-950
                transition
                hover:bg-cyan-300
              "
            >
              بخش بعدی

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          ) : (
            <Link
              href={
                `/reading/resources/` +
                encodeURIComponent(
                  section.resourceId,
                )
              }
              className="
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                bg-white/[0.06]
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-white/[0.1]
              "
            >
              بازگشت به منبع

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}