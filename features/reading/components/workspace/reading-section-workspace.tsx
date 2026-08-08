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

import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

import {
  ReadingAudioControls,
} from "./reading-audio-controls";

import {
  ReadingContentPanel,
} from "./reading-content-panel";

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
    section: ReadingSectionDetail;
  }>;

const PASSING_SCORE = 70;

function calculateQuizScore(
  section: ReadingSectionDetail,
  answers: Readonly<
    Record<string, string>
  >,
): number {
  const questions =
    section.comprehensionQuestions;

  if (questions.length === 0) {
    return 100;
  }

  const correctAnswers =
    questions.reduce(
      (total, question) => {
        return (
          total +
          (answers[question.id] ===
          question.correctOptionId
            ? 1
            : 0)
        );
      },
      0,
    );

  return Math.round(
    (correctAnswers /
      questions.length) *
      100,
  );
}

function calculateWorkspaceProgress(
  visitedTabs:
    readonly ReadingWorkspaceTab[],
  quizSubmitted: boolean,
): number {
  let progress = 30;

  if (
    visitedTabs.includes(
      "vocabulary",
    )
  ) {
    progress += 20;
  }

  if (
    visitedTabs.includes(
      "grammar",
    )
  ) {
    progress += 20;
  }

  if (quizSubmitted) {
    progress += 30;
  }

  return Math.min(
    progress,
    100,
  );
}

export function ReadingSectionWorkspace({
  section,
}: ReadingSectionWorkspaceProps) {
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
  ] = useState<
    ReadingWorkspaceTab[]
  >(["content"]);

  const [
    showTranslations,
    setShowTranslations,
  ] = useState(false);

  const [
    fontSize,
    setFontSize,
  ] =
    useState<ReadingFontSize>(
      "comfortable",
    );

  const [
    savedVocabularyIds,
    setSavedVocabularyIds,
  ] = useState<string[]>([]);

  const [
    quizAnswers,
    setQuizAnswers,
  ] = useState<
    Record<string, string>
  >({});

  const [
    quizSubmitted,
    setQuizSubmitted,
  ] = useState(false);

  const [
    hasHydrated,
    setHasHydrated,
  ] = useState(false);

  useEffect(() => {
    const storedState =
      readReadingWorkspaceState(
        section.resourceId,
        section.id,
      );

    if (storedState) {
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

      setSavedVocabularyIds(
        storedState.savedVocabularyIds,
      );

      setQuizAnswers(
        storedState.quizAnswers,
      );

      setQuizSubmitted(
        storedState.quizSubmitted,
      );
    }

    setHasHydrated(true);
  }, [
    section.id,
    section.resourceId,
  ]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    writeReadingWorkspaceState(
      section.resourceId,
      section.id,
      {
        activeTab,
        visitedTabs,
        showTranslations,
        fontSize,
        savedVocabularyIds,
        quizAnswers,
        quizSubmitted,
      },
    );
  }, [
    activeTab,
    fontSize,
    hasHydrated,
    quizAnswers,
    quizSubmitted,
    savedVocabularyIds,
    section.id,
    section.resourceId,
    showTranslations,
    visitedTabs,
  ]);

  const quizScore = useMemo(
    () =>
      calculateQuizScore(
        section,
        quizAnswers,
      ),
    [
      quizAnswers,
      section,
    ],
  );

  const progressPercent =
    useMemo(
      () =>
        calculateWorkspaceProgress(
          visitedTabs,
          quizSubmitted,
        ),
      [
        quizSubmitted,
        visitedTabs,
      ],
    );

  const isMastered =
    quizSubmitted &&
    quizScore >= PASSING_SCORE;

  const handleTabChange = (
    tab: ReadingWorkspaceTab,
  ): void => {
    setActiveTab(tab);

    setVisitedTabs(
      (currentTabs) => {
        if (
          currentTabs.includes(tab)
        ) {
          return currentTabs;
        }

        return [
          ...currentTabs,
          tab,
        ];
      },
    );
  };

  const handleToggleVocabulary = (
    vocabularyId: string,
  ): void => {
    setSavedVocabularyIds(
      (currentIds) => {
        if (
          currentIds.includes(
            vocabularyId,
          )
        ) {
          return currentIds.filter(
            (id) =>
              id !== vocabularyId,
          );
        }

        return [
          ...currentIds,
          vocabularyId,
        ];
      },
    );
  };

  const handleAnswer = (
    questionId: string,
    optionId: string,
  ): void => {
    if (quizSubmitted) {
      return;
    }

    setQuizAnswers(
      (currentAnswers) => ({
        ...currentAnswers,

        [questionId]:
          optionId,
      }),
    );
  };

  const handleQuizReset =
    (): void => {
      setQuizAnswers({});
      setQuizSubmitted(false);
  };

  const baseSectionPath =
    `/reading/resources/` +
    encodeURIComponent(
      section.resourceId,
    ) +
    "/sections";

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
    >
      <ReadingWorkspaceHeader
        section={section}
        progressPercent={
          progressPercent
        }
        showTranslations={
          showTranslations
        }
        fontSize={fontSize}
        onToggleTranslations={() => {
          setShowTranslations(
            (currentValue) =>
              !currentValue,
          );
        }}
        onFontSizeChange={
          setFontSize
        }
      />

      <ReadingAudioControls
        title={section.title}
        languageCode={
          section.languageCode
        }
        audioStatus={
          section.audioStatus
        }
        audioUrl={section.audioUrl}
        content={section.content}
      />

      <ReadingWorkspaceTabs
        activeTab={activeTab}
        vocabularyCount={
          section.vocabulary.length
        }
        grammarCount={
          section.grammarPoints.length
        }
        quizCount={
          section
            .comprehensionQuestions
            .length
        }
        onTabChange={
          handleTabChange
        }
      />

      <div
        role="tabpanel"
        className="min-h-96"
      >
        {activeTab ===
        "content" ? (
          <ReadingContentPanel
            content={
              section.content
            }
            languageCode={
              section.languageCode
            }
            showTranslations={
              showTranslations
            }
            fontSize={fontSize}
          />
        ) : null}

        {activeTab ===
        "vocabulary" ? (
          <ReadingVocabularyPanel
            vocabulary={
              section.vocabulary
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
              section.grammarPoints
            }
          />
        ) : null}

        {activeTab ===
        "quiz" ? (
          <ReadingQuizPanel
            questions={
              section
                .comprehensionQuestions
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

      {quizSubmitted ? (
        <Card
          className={cn(
            "p-5 sm:p-6",

            isMastered
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
              flex flex-col gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div
              className="
                flex items-start gap-3
              "
            >
              <span
                className={cn(
                  "flex h-11 w-11",
                  "shrink-0 items-center",
                  "justify-center",
                  "rounded-xl",

                  isMastered
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
                {isMastered ? (
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
                  {isMastered
                    ? "این بخش را با موفقیت یاد گرفتی"
                    : "آزمون ثبت شد"}
                </h2>

                <p
                  className="
                    mt-1 text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  {isMastered
                    ? "امتیاز درک مطلب تو برای عبور از این مرحله کافی است."
                    : `برای تسلط کامل به حداقل ${PASSING_SCORE}٪ نیاز داری. متن را مرور کن و دوباره آزمون بده.`}
                </p>
              </div>
            </div>

            {!isMastered ? (
              <button
                type="button"
                onClick={() => {
                  handleTabChange(
                    "content",
                  );
                }}
                className="
                  inline-flex min-h-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/[0.06]
                  px-4 py-2.5
                  text-sm font-medium
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
          flex flex-col gap-3
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
                inline-flex min-h-11
                items-center gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.035]
                px-4 py-2.5
                text-sm text-slate-300
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
              aria-disabled={
                !isMastered
              }
              onClick={(event) => {
                if (!isMastered) {
                  event.preventDefault();
                }
              }}
              className={cn(
                "inline-flex min-h-11",
                "items-center gap-2",
                "rounded-xl px-4",
                "py-2.5 text-sm",
                "font-bold transition",

                isMastered
                  ? [
                      "bg-cyan-400",
                      "text-slate-950",
                      "hover:bg-cyan-300",
                    ]
                  : [
                      "cursor-not-allowed",
                      "bg-white/[0.04]",
                      "text-slate-600",
                    ],
              )}
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
                inline-flex min-h-11
                items-center gap-2
                rounded-xl
                bg-white/[0.06]
                px-4 py-2.5
                text-sm font-medium
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