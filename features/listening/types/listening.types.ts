import type { z } from "zod";

import type {
  listeningAnswerSourceSchema,
  listeningAttemptDraftSchema,
  listeningAttemptStatusSchema,
  listeningDraftSaveStatusSchema,
} from "../schemas/listening-attempt.schema";

import type {
  listeningAttemptAnalysisSchema,
  listeningComparisonKindSchema,
  listeningComparisonSegmentSchema,
  listeningScoreBreakdownSchema,
  listeningTeacherFeedbackSchema,
} from "../schemas/listening-analysis.schema";

import type {
  cefrLevelSchema,
  continueListeningSchema,
  listeningAccentSchema,
  listeningContentDetailSchema,
  listeningContentStatusSchema,
  listeningContentSummarySchema,
  listeningContentTypeSchema,
  listeningInsightSchema,
  listeningInsightTypeSchema,
  listeningOverviewSchema,
  listeningPracticeModeSchema,
  listeningSourceTypeSchema,
  listeningStatsSchema,
  recentListeningActivitySchema,
} from "../schemas/listening.schema";

import type {
  listeningNoteExtractionStatusSchema,
  listeningNoteFileKindSchema,
  listeningNotesUploadResultSchema,
} from "../schemas/listening-upload.schema";

export type CefrLevel = z.infer<
  typeof cefrLevelSchema
>;

export type ListeningContentType = z.infer<
  typeof listeningContentTypeSchema
>;

export type ListeningSourceType = z.infer<
  typeof listeningSourceTypeSchema
>;

export type ListeningPracticeMode = z.infer<
  typeof listeningPracticeModeSchema
>;

export type ListeningAccent = z.infer<
  typeof listeningAccentSchema
>;

export type ListeningContentStatus = z.infer<
  typeof listeningContentStatusSchema
>;

export type ListeningInsightType = z.infer<
  typeof listeningInsightTypeSchema
>;

export type ListeningContentSummary = z.infer<
  typeof listeningContentSummarySchema
>;

export type ListeningContentDetail = z.infer<
  typeof listeningContentDetailSchema
>;

export type ListeningStats = z.infer<
  typeof listeningStatsSchema
>;

export type ContinueListening = z.infer<
  typeof continueListeningSchema
>;

export type ListeningInsight = z.infer<
  typeof listeningInsightSchema
>;

export type RecentListeningActivity = z.infer<
  typeof recentListeningActivitySchema
>;

export type ListeningOverview = z.output<
  typeof listeningOverviewSchema
>;

export type ListeningOverviewInput = z.input<
  typeof listeningOverviewSchema
>;

export type ListeningAnswerSource = z.infer<
  typeof listeningAnswerSourceSchema
>;

export type ListeningAttemptStatus = z.infer<
  typeof listeningAttemptStatusSchema
>;

export type ListeningDraftSaveStatus = z.infer<
  typeof listeningDraftSaveStatusSchema
>;

export type ListeningAttemptDraft = z.infer<
  typeof listeningAttemptDraftSchema
>;

export type ListeningNoteFileKind = z.infer<
  typeof listeningNoteFileKindSchema
>;

export type ListeningNoteExtractionStatus =
  z.infer<
    typeof listeningNoteExtractionStatusSchema
  >;

export type ListeningNotesUploadResult = z.infer<
  typeof listeningNotesUploadResultSchema
>;


export type ListeningComparisonKind = z.infer<
  typeof listeningComparisonKindSchema
>;

export type ListeningComparisonSegment =
  z.infer<
    typeof listeningComparisonSegmentSchema
  >;

export type ListeningScoreBreakdown = z.infer<
  typeof listeningScoreBreakdownSchema
>;

export type ListeningTeacherFeedback = z.infer<
  typeof listeningTeacherFeedbackSchema
>;

export type ListeningAttemptAnalysis = z.infer<
  typeof listeningAttemptAnalysisSchema
>;