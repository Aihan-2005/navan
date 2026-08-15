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

/**
 * نوع تمرین مربوط به یک Turn صوتی.
 *
 * scenario:
 * پاسخ داخل یک سناریوی مشخص.
 *
 * free:
 * گفت‌وگوی آزاد.
 */
export type SpeakingTurnMode =
  z.infer<
    typeof speakingTurnModeSchema
  >;

/**
 * مشخص می‌کند تحلیل توسط Mock
 * یا AI واقعی تولید شده است.
 */
export type SpeakingAnalysisEngine =
  z.infer<
    typeof speakingAnalysisEngineSchema
  >;

/**
 * دسته‌بندی اصلاحی که برای پاسخ کاربر
 * توسط سیستم تشخیص داده شده است.
 */
export type SpeakingCorrectionCategory =
  z.infer<
    typeof speakingCorrectionCategorySchema
  >;

/**
 * اهمیت اصلاح.
 */export type SpeakingCorrectionSeverity =
  z.infer<
    typeof speakingCorrectionSeveritySchema
  >;

/**
 * Metadata ارسالی همراه فایل صوتی
 * به API تحلیل Speaking.
 */
export type SpeakingTurnAnalyzeMetadata =
  z.infer<
    typeof speakingTurnAnalyzeMetadataSchema
  >;

/**
 * یک Segment از Transcript.
 *
 * بعداً STT واقعی می‌تواند Transcript
 * را به چند Segment زمانی تقسیم کند.
 */
export type SpeakingTranscriptSegment =
  z.infer<
    typeof speakingTranscriptSegmentSchema
  >;

/**
 * امتیازهای اصلی Speaking.
 */
export type SpeakingScoreBreakdown =
  z.infer<
    typeof speakingScoreBreakdownSchema
  >;

/**
 * اصلاح گرامر، واژگان، تلفظ
 * یا طبیعی بودن جمله.
 */
export type SpeakingCorrection =
  z.infer<
    typeof speakingCorrectionSchema
  >;

/**
 * نکته اختصاصی تلفظ.
 */
export type SpeakingPronunciationFinding =
  z.infer<
    typeof speakingPronunciationFindingSchema
  >;/**
 * پاسخ مربی AI برای ادامه مکالمه.
 */
export type SpeakingAiReply =
  z.infer<
    typeof speakingAiReplySchema
  >;

/**
 * نتیجه کامل تحلیل یک Turn صوتی.
 *
 * این Type همان Contract اصلی بین:
 *
 * Voice Recorder
 *      ↓
 * Speaking API
 *      ↓
 * STT / AI
 *      ↓
 * Speaking UI
 *
 * است.
 */
export type SpeakingTurnAnalysis =
  z.infer<
    typeof speakingTurnAnalysisSchema
  >;