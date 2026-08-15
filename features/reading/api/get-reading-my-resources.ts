import {
  readingMyResourcesMock,
} from "../mocks/reading-my-resources.mock";

import {
  readingMyResourcesSchema,
} from "../schemas/reading-my-resources.schema";

import type {
  ReadingMyResources,
} from "../types/reading-my-resources.types";

function parseReadingMyResources(
  payload: unknown,
): ReadingMyResources {
  const result =
    readingMyResourcesSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading my-resources payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading my-resources payload is invalid.",
    );
  }
return result.data;
}

/**
 * این Function عمداً API Boundary دارد
 * حتی اگر فعلاً Mock باشد.
 *
 * در مرحله اتصال Backend فقط implementation
 * همین فایل تغییر می‌کند و UI دست نمی‌خورد.
 */
export function getReadingMyResources(): Promise<ReadingMyResources> {
  return Promise.resolve(
    parseReadingMyResources(
      readingMyResourcesMock,
    ),
  );
}