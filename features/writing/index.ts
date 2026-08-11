export { getWritingOverview } from "./api/get-writing-overview";
export { getWritingPrompts, getWritingPromptById } from "./api/get-writing-prompts";
export { getWritingSubmission } from "./api/get-writing-submission";
export { getWritingHistory } from "./api/get-writing-history";
export { submitWritingAnalysis } from "./api/submit-writing-analysis";
export { WritingOverview } from "./components/overview/writing-overview";
export { WritingWorkspace } from "./components/workspace/writing-workspace";
export { WritingAnalysisView } from "./components/analysis/writing-analysis-view";
export { WritingCategorySelector } from "./components/workspace/writing-category-selector";
export * from "./components/upload";
export { WRITING_DIFFICULTY_STYLES, WRITING_CATEGORIES } from "./constants/writing.constants";
export { writingOverviewMock } from "./mocks/writing-overview.mock";

export type {
  RecentWriting,
  WritingDraft,
  WritingExercise,
  WritingOverviewData,
  WritingOverviewStats,
  WritingWeakPoint,
} from "./types/writing.types";
