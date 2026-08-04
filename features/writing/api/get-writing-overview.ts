import { writingOverviewMock } from "../mocks/writing.mock";
import { writingOverviewSchema } from "../schemas/writing.schema";
import type { WritingOverview } from "../types/writing.types";

export async function getWritingOverview(): Promise<WritingOverview> {
  return writingOverviewSchema.parse(writingOverviewMock);
}
