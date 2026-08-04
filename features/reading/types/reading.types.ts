import type { z } from "zod";

import type {
  continueReadingSchema,
  readingAudioStatusSchema,
  readingCefrLevelSchema,
  readingInsightSchema,
  readingInsightTypeSchema,
  readingJourneyStepSchema,
  readingLearningJourneySchema,
  readingLibrarySchema,
  readingOverviewSchema,
  readingProcessingStatusSchema,
  readingResourceDetailSchema,
  readingResourceStatusSchema,
  readingResourceSummarySchema,
  readingResourceTypeSchema,
  readingSectionStatusSchema,
  readingSectionSummarySchema,
  readingSourceFileKindSchema,
  readingSourceTypeSchema,
  readingSourceUploadMetadataSchema,
  readingSourceUploadResultSchema,
  readingStatsSchema,
  recentReadingActivitySchema,
} from "../schemas/reading.schema";

export type ReadingCefrLevel = z.infer<
  typeof readingCefrLevelSchema
>;

export type ReadingResourceType = z.infer<
  typeof readingResourceTypeSchema
>;

export type ReadingSourceType = z.infer<
  typeof readingSourceTypeSchema
>;

export type ReadingResourceStatus = z.infer<
  typeof readingResourceStatusSchema
>;

export type ReadingInsightType = z.infer<
  typeof readingInsightTypeSchema
>;

export type ReadingProcessingStatus = z.infer<
  typeof readingProcessingStatusSchema
>;

export type ReadingSectionStatus = z.infer<
  typeof readingSectionStatusSchema
>;

export type ReadingAudioStatus = z.infer<
  typeof readingAudioStatusSchema
>;

export type ReadingSourceFileKind = z.infer<
  typeof readingSourceFileKindSchema
>;

export type ReadingResourceSummary = z.infer<
  typeof readingResourceSummarySchema
>;

export type ReadingResourceDetail = z.infer<
  typeof readingResourceDetailSchema
>;

export type ReadingSectionSummary = z.infer<
  typeof readingSectionSummarySchema
>;

export type ReadingStats = z.infer<
  typeof readingStatsSchema
>;

export type ContinueReading = z.infer<
  typeof continueReadingSchema
>;

export type ReadingJourneyStep = z.infer<
  typeof readingJourneyStepSchema
>;

export type ReadingLearningJourney = z.infer<
  typeof readingLearningJourneySchema
>;

export type ReadingInsight = z.infer<
  typeof readingInsightSchema
>;

export type RecentReadingActivity = z.infer<
  typeof recentReadingActivitySchema
>;

export type ReadingOverview = z.output<
  typeof readingOverviewSchema
>;

export type ReadingOverviewInput = z.input<
  typeof readingOverviewSchema
>;

export type ReadingLibrary = z.output<
  typeof readingLibrarySchema
>;

export type ReadingSourceUploadMetadata = z.input<
  typeof readingSourceUploadMetadataSchema
>;

export type ReadingSourceUploadResult = z.infer<
  typeof readingSourceUploadResultSchema
>;