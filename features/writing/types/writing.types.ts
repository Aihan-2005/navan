export type WritingMode =
  | "free"
  | "exercise"
  | "draft";

export type WritingAnalysisEngine =
  | "mock"
  | "ai";

export type WritingCefrLevel =
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2";

export type WritingIssueSeverity =
  | "کم"
  | "متوسط"
  | "زیاد";

export type WritingIssueCategory =
  | "grammar"
  | "vocabulary"
  | "coherence"
  | "clarity"
  | "style"
  | "tone"
  | "organization"
  | "punctuation"
  | "spelling"
  | "task_response";

export type WritingOverviewStats =
  Readonly<{
    totalWritings:
      number;

    weeklyWords:
      number;

    averageScore:
      number;

    currentStreak:
      number;
  }>;

export type WritingDraft =
  Readonly<{
    id:
      string;

    title:
      string;

    updatedAt:
      string;

    excerpt:
      string;

    wordCount:
      number;

    targetWordCount?:
      number;

    progressPercent?:
      number;
  }>;

export type WritingExercise =
  Readonly<{
    id:
      string;

    title:
      string;

    description:
      string;

    difficulty:
      | "مبتدی"
      | "متوسط"
      | "پیشرفته";

    estimatedMinutes:
      number;

    category:
      string;

    isFeatured?:
      boolean;

    prompt:
      string;

    instructions:
      readonly string[];

    targetWritingGoal:
      string;

    /**
     * مقدار پیشنهادی Legacy.
     * دیگر هیچ محدودیتی روی Submit ایجاد نمی‌کند.
     */
    expectedWordCount:
      number;
  }>;

export type WritingAnalysisMetric =
  Readonly<{
    label:
      string;

    score:
      number;

    detail:
      string;
  }>;

export type WritingAnalysisIssue =
  Readonly<{
    id:
      string;

    title:
      string;

    description:
      string;

    severity:
      WritingIssueSeverity;

    suggestion:
      string;

    category?:
      WritingIssueCategory;

    originalText?:
      string | null;

    correctedText?:
      string | null;

    explanation?:
      string | null;
  }>;

export type WritingDocumentStats =
  Readonly<{
    wordCount:
      number;

    characterCount:
      number;

    sentenceCount:
      number;

    paragraphCount:
      number;

    averageSentenceLength:
      number;

    uniqueWordRatio:
      number;

    lexicalDensity:
      number;
  }>;

export type WritingFeedbackPoint =
  Readonly<{
    id:
      string;

    title:
      string;

    description:
      string;

    evidence:
      string | null;
  }>;

export type WritingErrorPattern =
  Readonly<{
    id:
      string;

    category:
      WritingIssueCategory;

    title:
      string;

    occurrenceCount:
      number;

    explanation:
      string;

    recommendation:
      string;
  }>;

export type WritingTaskAchievement =
  Readonly<{
    score:
      number;

    summary:
      string;

    coveredPoints:
      readonly string[];

    missingPoints:
      readonly string[];
  }>;

export type WritingParagraphRole =
  | "introduction"
  | "body"
  | "conclusion"
  | "single"
  | "other";

export type WritingParagraphFeedback =
  Readonly<{
    paragraphIndex:
      number;

    role:
      WritingParagraphRole;

    score:
      number;

    summary:
      string;

    suggestion:
      string;
  }>;

export type WritingVocabularyUpgrade =
  Readonly<{
    original:
      string;

    alternatives:
      readonly string[];

    reason:
      string;

    example:
      string | null;
  }>;

export type WritingRewriteChange =
  Readonly<{
    id:
      string;

    before:
      string;

    after:
      string;

    reason:
      string;

    category:
      WritingIssueCategory;
  }>;

export type WritingActionPlanItem =
  Readonly<{
    id:
      string;

    priority:
      number;

    title:
      string;

    description:
      string;

    focus:
      WritingIssueCategory;

    estimatedMinutes:
      number;
  }>;

export type WritingAiCoach =
  Readonly<{
    headline:
      string;

    diagnosis:
      string;

    nextFocus:
      string;

    estimatedCefrLevel:
      WritingCefrLevel;

    confidencePercent:
      number;

    nextSessionGoal:
      string;

    encouragement:
      string;
  }>;

export type WritingAnalysisResult =
  Readonly<{
    overallScore:
      number;

    grammar:
      WritingAnalysisMetric;

    vocabulary:
      WritingAnalysisMetric;

    coherence:
      WritingAnalysisMetric;

    clarity:
      WritingAnalysisMetric;

    tone:
      WritingAnalysisMetric;

    taskResponse?:
      WritingAnalysisMetric;

    organization?:
      WritingAnalysisMetric;

    style?:
      WritingAnalysisMetric;

    highlightedMistakes:
      readonly string[];

    issues:
      readonly WritingAnalysisIssue[];

    repeatedWords:
      readonly string[];

    betterVocabulary:
      readonly string[];

    rewrittenVersion:
      string;

    nextPractice:
      string;

    engine?:
      WritingAnalysisEngine;

    estimatedCefrLevel?:
      WritingCefrLevel;

    confidencePercent?:
      number;

    documentStats?:
      WritingDocumentStats;

    strengths?:
      readonly WritingFeedbackPoint[];

    priorities?:
      readonly WritingFeedbackPoint[];

    errorPatterns?:
      readonly WritingErrorPattern[];

    taskAchievement?:
      WritingTaskAchievement;

    paragraphFeedback?:
      readonly WritingParagraphFeedback[];

    vocabularyUpgrades?:
      readonly WritingVocabularyUpgrade[];

    rewriteChanges?:
      readonly WritingRewriteChange[];

    actionPlan?:
      readonly WritingActionPlanItem[];

    aiCoach?:
      WritingAiCoach;
  }>;

export type RecentWriting =
  Readonly<{
    id:
      string;

    title:
      string;

    date:
      string;

    score:
      number;

    feedback:
      string;

    excerpt:
      string;

    mode:
      WritingMode;

    analysis:
      WritingAnalysisResult;
  }>;

export type WritingWeakPoint =
  Readonly<{
    id:
      string;

    title:
      string;

    description:
      string;

    severity:
      WritingIssueSeverity;
  }>;

export type WritingOverviewData =
  Readonly<{
    stats:
      WritingOverviewStats;

    currentDraft:
      WritingDraft;

    recommendedExercise:
      WritingExercise;

    exercises:
      readonly WritingExercise[];

    recentWritings:
      readonly RecentWriting[];

    weakPoints:
      readonly WritingWeakPoint[];
  }>;

export type WritingOverview =
  WritingOverviewData;