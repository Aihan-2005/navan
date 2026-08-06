import { writingOverviewMock } from "../mocks/writing-overview.mock";
import { writingOverviewSchema } from "../schemas/writing.schema";
import type { WritingOverviewData } from "../types/writing.types";

export async function getWritingOverview(): Promise<WritingOverviewData> {
  return writingOverviewSchema.parse(writingOverviewMock);
}
