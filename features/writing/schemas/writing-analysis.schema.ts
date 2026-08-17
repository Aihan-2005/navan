import {
  z,
} from "zod";

export const writingAnalysisEngineSchema =
  z.enum([
    "mock",
    "ai",
  ]);

export const writingCefrLevelSchema =
  z.enum([
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
  ]);

export const writingIssueSeveritySchema =
  z.enum([
    "کم",
    "متوسط",
    "زیاد",
  ]);

export const writingIssueCategorySchema =
  z.enum([
    "grammar",
    "vocabulary",
    "coherence",
    "clarity",
    "style",
    "tone",
    "organization",
    "punctuation",
    "spelling",
    "task_response",
  ]);

export const writingAnalysisMetricSchema =
  z.object({
    label: z
      .string()
      .trim()
      .min(1),

    score: z
      .number()
      .min(0)
      .max(100),

    detail: z
      .string()
      .trim()
      .min(1),
  });

export const writingAnalysisIssueSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    severity:
      writingIssueSeveritySchema,

    suggestion: z
      .string()
      .trim()
      .min(1),

    category:
      writingIssueCategorySchema
        .optional(),

    originalText: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    correctedText: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    explanation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),
  });

export const writingDocumentStatsSchema =
  z.object({
    wordCount: z
      .number()
      .int()
      .nonnegative(),

    characterCount: z
      .number()
      .int()
      .nonnegative(),

    sentenceCount: z
      .number()
      .int()
      .nonnegative(),

    paragraphCount: z
      .number()
      .int()
      .nonnegative(),

    averageSentenceLength: z
      .number()
      .nonnegative(),

    uniqueWordRatio: z
      .number()
      .min(0)
      .max(100),

    lexicalDensity: z
      .number()
      .min(0)
      .max(100),
  });

export const writingFeedbackPointSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    evidence: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const writingErrorPatternSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    category:
      writingIssueCategorySchema,

    title: z
      .string()
      .trim()
      .min(1),

    occurrenceCount: z
      .number()
      .int()
      .positive(),

    explanation: z
      .string()
      .trim()
      .min(1),

    recommendation: z
      .string()
      .trim()
      .min(1),
  });

export const writingTaskAchievementSchema =
  z.object({
    score: z
      .number()
      .min(0)
      .max(100),

    summary: z
      .string()
      .trim()
      .min(1),

    coveredPoints: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      ),

    missingPoints: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      ),
  });

export const writingParagraphRoleSchema =
  z.enum([
    "introduction",
    "body",
    "conclusion",
    "single",
    "other",
  ]);

export const writingParagraphFeedbackSchema =
  z.object({
    paragraphIndex: z
      .number()
      .int()
      .positive(),

    role:
      writingParagraphRoleSchema,

    score: z
      .number()
      .min(0)
      .max(100),

    summary: z
      .string()
      .trim()
      .min(1),

    suggestion: z
      .string()
      .trim()
      .min(1),
  });

export const writingVocabularyUpgradeSchema =
  z.object({
    original: z
      .string()
      .trim()
      .min(1),

    alternatives: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),

    reason: z
      .string()
      .trim()
      .min(1),

    example: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const writingRewriteChangeSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    before: z
      .string()
      .trim()
      .min(1),

    after: z
      .string()
      .trim()
      .min(1),

    reason: z
      .string()
      .trim()
      .min(1),

    category:
      writingIssueCategorySchema,
  });

export const writingActionPlanItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    priority: z
      .number()
      .int()
      .min(1)
      .max(5),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    focus:
      writingIssueCategorySchema,

    estimatedMinutes: z
      .number()
      .int()
      .positive(),
  });

export const writingAiCoachSchema =
  z.object({
    headline: z
      .string()
      .trim()
      .min(1),

    diagnosis: z
      .string()
      .trim()
      .min(1),

    nextFocus: z
      .string()
      .trim()
      .min(1),

    estimatedCefrLevel:
      writingCefrLevelSchema,

    confidencePercent: z
      .number()
      .min(0)
      .max(100),

    nextSessionGoal: z
      .string()
      .trim()
      .min(1),

    encouragement: z
      .string()
      .trim()
      .min(1),
  });

export const writingAnalysisResultSchema =
  z.object({
    overallScore: z
      .number()
      .min(0)
      .max(100),

    grammar:
      writingAnalysisMetricSchema,

    vocabulary:
      writingAnalysisMetricSchema,

    coherence:
      writingAnalysisMetricSchema,

    clarity:
      writingAnalysisMetricSchema,

    tone:
      writingAnalysisMetricSchema,

    taskResponse:
      writingAnalysisMetricSchema
        .optional(),

    organization:
      writingAnalysisMetricSchema
        .optional(),

    style:
      writingAnalysisMetricSchema
        .optional(),

    highlightedMistakes: z
      .array(
        z.string(),
      ),

    issues: z
      .array(
        writingAnalysisIssueSchema,
      ),

    repeatedWords: z
      .array(
        z.string(),
      ),

    betterVocabulary: z
      .array(
        z.string(),
      ),

    rewrittenVersion:
      z.string(),

    nextPractice:
      z.string(),

    engine:
      writingAnalysisEngineSchema
        .optional(),

    estimatedCefrLevel:
      writingCefrLevelSchema
        .optional(),

    confidencePercent: z
      .number()
      .min(0)
      .max(100)
      .optional(),

    documentStats:
      writingDocumentStatsSchema
        .optional(),

    strengths: z
      .array(
        writingFeedbackPointSchema,
      )
      .optional(),

    priorities: z
      .array(
        writingFeedbackPointSchema,
      )
      .optional(),

    errorPatterns: z
      .array(
        writingErrorPatternSchema,
      )
      .optional(),

    taskAchievement:
      writingTaskAchievementSchema
        .optional(),

    paragraphFeedback: z
      .array(
        writingParagraphFeedbackSchema,
      )
      .optional(),

    vocabularyUpgrades: z
      .array(
        writingVocabularyUpgradeSchema,
      )
      .optional(),

    rewriteChanges: z
      .array(
        writingRewriteChangeSchema,
      )
      .optional(),

    actionPlan: z
      .array(
        writingActionPlanItemSchema,
      )
      .optional(),

    aiCoach:
      writingAiCoachSchema
        .optional(),
  });