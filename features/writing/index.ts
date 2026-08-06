export { getWritingOverview } from "./api/get-writing-overview";
export { getWritingPrompts, getWritingPromptById } from "./api/get-writing-prompts";
export { getWritingSubmission } from "./api/get-writing-submission";
export { getWritingHistory } from "./api/get-writing-history";
export { WritingOverview } from "./components/overview/writing-overview";
export { WritingWorkspace } from "./components/workspace/writing-workspace";
export { writingOverviewMock } from "./mocks/writing-overview.mock";

export type {
  RecentWriting,
  WritingDraft,
  WritingExercise,
  WritingOverviewData,
  WritingOverviewStats,
  WritingWeakPoint,
} from "./types/writing.types";
