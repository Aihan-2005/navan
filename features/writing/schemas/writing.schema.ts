import {
  z,
} from "zod";

import {
  writingAnalysisResultSchema,
} from "./writing-analysis.schema";

export {
  writingActionPlanItemSchema,
  writingAiCoachSchema,
  writingAnalysisEngineSchema,
  writingAnalysisIssueSchema,
  writingAnalysisMetricSchema,
  writingAnalysisResultSchema,
  writingCefrLevelSchema,
  writingDocumentStatsSchema,
  writingErrorPatternSchema,
  writingFeedbackPointSchema,
  writingIssueCategorySchema,
  writingIssueSeveritySchema,
  writingParagraphFeedbackSchema,
  writingParagraphRoleSchema,
  writingRewriteChangeSchema,
  writingTaskAchievementSchema,
  writingVocabularyUpgradeSchema,
} from "./writing-analysis.schema";

export const writingOverviewStatsSchema =
  z.object({
    totalWritings:
      z.number(),

    weeklyWords:
      z.number(),

    averageScore:
      z.number(),

    currentStreak:
      z.number(),
  });

export const writingDraftSchema =
  z.object({
    id:
      z.string(),

    title:
      z.string(),

    updatedAt:
      z.string(),

    excerpt:
      z.string(),

    wordCount:
      z.number(),

    targetWordCount:
      z.number()
        .optional(),

    progressPercent:
      z.number()
        .optional(),
  });

export const writingExerciseSchema =
  z.object({
    id:
      z.string(),

    title:
      z.string(),

    description:
      z.string(),

    difficulty:
      z.enum([
        "مبتدی",
        "متوسط",
        "پیشرفته",
      ]),

    estimatedMinutes:
      z.number(),

    category:
      z.string(),

    isFeatured:
      z.boolean()
        .optional(),

    prompt:
      z.string(),

    instructions:
      z.array(
        z.string(),
      ),

    targetWritingGoal:
      z.string(),

    /**
     * Legacy / recommendation metadata.
     *
     * این مقدار دیگر Limit یا شرط Submit نیست.
     * فقط برای پیشنهاد طول تقریبی تمرین نگه داشته شده
     * تا Contract فعلی Backend/Mock شکسته نشود.
     */
    expectedWordCount:
      z.number(),
  });

export const recentWritingSchema =
  z.object({
    id:
      z.string(),

    title:
      z.string(),

    date:
      z.string(),

    score:
      z.number(),

    feedback:
      z.string(),

    excerpt:
      z.string(),

    mode:
      z.enum([
        "free",
        "exercise",
        "draft",
      ]),

    analysis:
      writingAnalysisResultSchema,
  });

export const writingWeakPointSchema =
  z.object({
    id:
      z.string(),

    title:
      z.string(),

    description:
      z.string(),

    severity:
      z.enum([
        "کم",
        "متوسط",
        "زیاد",
      ]),
  });

export const writingOverviewSchema =
  z.object({
    stats:
      writingOverviewStatsSchema,

    currentDraft:
      writingDraftSchema,

    recommendedExercise:
      writingExerciseSchema,

    exercises:
      z.array(
        writingExerciseSchema,
      ),

    recentWritings:
      z.array(
        recentWritingSchema,
      ),

    weakPoints:
      z.array(
        writingWeakPointSchema,
      ),
  });