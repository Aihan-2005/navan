import { writingOverviewMock } from "../mocks/writing-overview.mock";
import { writingOverviewSchema } from "../schemas/writing.schema";
import type { WritingOverviewData } from "../types/writing.types";

export async function getWritingOverview(): Promise<WritingOverviewData> {
  const overview = { ...writingOverviewMock };

  // Use the first exercise as the recommended one (could be random in production)
  const recommendedExercise = {
    ...overview.exercises[0],
    isFeatured: true,
  };

  return writingOverviewSchema.parse({
    ...overview,
    recommendedExercise,
  });
}
