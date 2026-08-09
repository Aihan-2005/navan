import type { z } from "zod";

import type {
  readingAiAnalysisStatusSchema,
  readingAiContentQualitySchema,
  readingAiDifficultyScoresSchema,
  readingAiInsightPrioritySchema,
  readingAiInsightSchema,
  readingAiInsightTypeSchema,
  readingAiVocabularyProfileSchema,
  readingResourceAiAnalysisSchema,
} from "../schemas/reading-ai-analysis.schema";

export type ReadingAiAnalysisStatus =
  z.infer<
    typeof readingAiAnalysisStatusSchema
  >;

export type ReadingAiInsightType =
  z.infer<
    typeof readingAiInsightTypeSchema
  >;

export type ReadingAiInsightPriority =
  z.infer<
    typeof readingAiInsightPrioritySchema
  >;

export type ReadingAiDifficultyScores =
  z.infer<
    typeof readingAiDifficultyScoresSchema
  >;

export type ReadingAiContentQuality =
  z.infer<
    typeof readingAiContentQualitySchema
  >;

export type ReadingAiVocabularyProfile =
  z.infer<
    typeof readingAiVocabularyProfileSchema
  >;

export type ReadingAiInsight =
  z.infer<
    typeof readingAiInsightSchema
  >;

export type ReadingResourceAiAnalysis =
  z.infer<
    typeof readingResourceAiAnalysisSchema
  >;