import {
  everydayEnglishCafeSectionsMock,
} from "./sections/everyday-english-cafe-sections.mock";

import {
  scienceOfHabitsSectionsMock,
} from "./sections/science-of-habits-sections.mock";

import {
  sherlockHolmesSectionsMock,
} from "./sections/sherlock-holmes-sections.mock";

import type {
  ReadingSectionDetail,
} from "../types/reading.types";

export const readingSectionsMock:
  readonly ReadingSectionDetail[] = [
    ...sherlockHolmesSectionsMock,

    ...everydayEnglishCafeSectionsMock,

    ...scienceOfHabitsSectionsMock,
  ];

export function findReadingSectionMock(
  resourceId: string,
  sectionId: string,
): ReadingSectionDetail | null {
  const normalizedResourceId =
    resourceId.trim();

  const normalizedSectionId =
    sectionId.trim();

  if (
    !normalizedResourceId ||
    !normalizedSectionId
  ) {
    return null;
  }

  const section =
    readingSectionsMock.find(
      (item) =>
        item.resourceId ===
          normalizedResourceId &&
        item.id ===
          normalizedSectionId,
    );

  return section ?? null;
}