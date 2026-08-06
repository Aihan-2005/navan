import { writingOverviewMock } from "../mocks/writing-overview.mock";
import type { RecentWriting } from "../types/writing.types";

export async function getWritingHistory(): Promise<readonly RecentWriting[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return writingOverviewMock.recentWritings;
}
