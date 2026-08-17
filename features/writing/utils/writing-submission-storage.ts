import {
  recentWritingSchema,
} from "../schemas/writing.schema";

import type {
  RecentWriting,
} from "../types/writing.types";

const WRITING_SUBMISSION_STORAGE_PREFIX =
  "navan:writing:submission";

function getStorageKey(
  submissionId:
    string,
): string {
  return `${WRITING_SUBMISSION_STORAGE_PREFIX}:${submissionId}`;
}

export function saveWritingSubmission(
  submission:
    RecentWriting,
): boolean {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  const parsed =
    recentWritingSchema.safeParse(
      submission,
    );

  if (
    !parsed.success
  ) {
    console.error(
      "Cannot persist invalid writing submission:",
      parsed.error.flatten(),
    );

    return false;
  }

  try {
    window.localStorage.setItem(
      getStorageKey(
        submission.id,
      ),
      JSON.stringify(
        parsed.data,
      ),
    );

    return true;
  } catch (
    error
  ) {
    console.error(
      "Writing submission persistence failed:",
      error,
    );

    return false;
  }
}

export function readWritingSubmission(
  submissionId:
    string,
): RecentWriting | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const serialized =
      window.localStorage.getItem(
        getStorageKey(
          submissionId,
        ),
      );

    if (
      !serialized
    ) {
      return null;
    }

    const parsedJson:
      unknown =
        JSON.parse(
          serialized,
        );

    const result =
      recentWritingSchema.safeParse(
        parsedJson,
      );

    if (
      !result.success
    ) {
      window.localStorage.removeItem(
        getStorageKey(
          submissionId,
        ),
      );

      return null;
    }

    return result.data;
  } catch (
    error
  ) {
    console.error(
      "Writing submission read failed:",
      error,
    );

    return null;
  }
}