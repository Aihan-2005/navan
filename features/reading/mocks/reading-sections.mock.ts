import {
  sherlockHolmesSectionsMock,
} from "./sections/sherlock-holmes-sections.mock";

import type {
  ReadingSectionDetail,
} from "../types/reading.types";

export const readingSectionsMock:
  readonly ReadingSectionDetail[] = [
    ...sherlockHolmesSectionsMock,
  ];

export function findReadingSectionMock(
  resourceId: string,
  sectionId: string,
): ReadingSectionDetail | null {
  const section =
    readingSectionsMock.find(
      (item) =>
        item.resourceId ===
          resourceId &&
        item.id === sectionId,
    );

  return section ?? null;
}