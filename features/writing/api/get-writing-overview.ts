import {
  writingOverviewMock,
} from "../mocks/writing-overview.mock";

import {
  writingOverviewSchema,
} from "../schemas/writing.schema";

import type {
  WritingOverviewData,
} from "../types/writing.types";

export async function getWritingOverview():
  Promise<WritingOverviewData> {
  const recommendedExercise =
    writingOverviewMock.exercises[0];

  if (!recommendedExercise) {
    throw new Error(
      "Writing overview requires at least one exercise.",
    );
  }

  return writingOverviewSchema.parse({
    ...writingOverviewMock,

    recommendedExercise: {
      ...recommendedExercise,
      isFeatured: true,
    },
  });
}