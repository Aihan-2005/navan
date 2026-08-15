import type {
  z,
} from "zod";

import type {
  speakingAiReplySchema,
  speakingAnalysisEngineSchema,
  speakingCorrectionCategorySchema,
  speakingCorrectionSchema,
  speakingCorrectionSeveritySchema,
  speakingPronunciationFindingSchema,
  speakingScoreBreakdownSchema,
  speakingTranscriptSegmentSchema,
  speakingTurnAnalysisSchema,
  speakingTurnAnalyzeMetadataSchema,
  speakingTurnModeSchema,
} from "../schemas/speaking-turn.schema";

export type SpeakingTurnMode =
  z.infer<
    typeof speakingTurnModeSchema
  >;

export type SpeakingAnalysisEngine =
  z.infer<
    typeof speakingAnalysisEngineSchema
  >;

export type SpeakingCorrectionCategory =
  z.infer<
    typeof speakingCorrectionCategorySchema
  >;

export type SpeakingCorrectionSeverity =
  z.infer<
    typeof speakingCorrectionSeveritySchema
  >;export type SpeakingTurnAnalyzeMetadata =
  z.infer<
    typeof speakingTurnAnalyzeMetadataSchema
  >;

export type SpeakingTranscriptSegment =
  z.infer<
    typeof speakingTranscriptSegmentSchema
  >;

export type SpeakingScoreBreakdown =
  z.infer<
    typeof speakingScoreBreakdownSchema
  >;

export type SpeakingCorrection =
  z.infer<
    typeof speakingCorrectionSchema
  >;

export type SpeakingPronunciationFinding =
  z.infer<
    typeof speakingPronunciationFindingSchema
  >;

export type SpeakingAiReply =
  z.infer<
    typeof speakingAiReplySchema
  >;

export type SpeakingTurnAnalysis =
  z.infer<
    typeof speakingTurnAnalysisSchema
  >;