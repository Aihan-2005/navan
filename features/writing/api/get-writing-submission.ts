import { writingOverviewMock } from "../mocks/writing-overview.mock";
import type { RecentWriting } from "../types/writing.types";

export async function getWritingSubmission(
  submissionId: string,
): Promise<RecentWriting | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return writingOverviewMock.recentWritings.find(
    (item) => item.id === submissionId,
  );
}
