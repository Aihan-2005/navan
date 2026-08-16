import {
  classroomOverviewMock,
} from "../mocks/classroom.mock";

import {
  classroomOverviewSchema,
} from "../schemas/classroom.schema";

import type {
  ClassroomOverview,
} from "../types/classroom.types";

export async function getClassroomOverview(): Promise<ClassroomOverview> {
  const result =
    classroomOverviewSchema.safeParse(
      classroomOverviewMock,
    );

  if (
    !result.success
  ) {
    console.error(
      "Invalid classroom overview mock:",
      result.error.flatten(),
    );

    throw new Error(
      "Classroom overview payload is invalid.",
    );
  }

  return result.data;
}