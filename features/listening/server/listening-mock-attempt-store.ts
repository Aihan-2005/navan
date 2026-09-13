import "server-only";

import {
  randomUUID,
} from "node:crypto";

import {
  listeningAttemptDraftSchema,
} from "../schemas/listening-attempt.schema";

import type {
  CreateListeningAttemptInput,
  UpdateListeningDraftInput,
} from "../types/listening-bff.types";

import type {
  ListeningAttemptDraft,
} from "../types/listening.types";

type ListeningAttemptStoreGlobal =
  typeof globalThis & {
    __navanListeningAttemptStore?: Map<
      string,
      ListeningAttemptDraft
    >;
  };

const globalStore =
  globalThis as
    ListeningAttemptStoreGlobal;

const attemptStore =
  globalStore
    .__navanListeningAttemptStore ??
  new Map<
    string,
    ListeningAttemptDraft
  >();

if (
  process.env.NODE_ENV !==
  "production"
) {
  globalStore
    .__navanListeningAttemptStore =
    attemptStore;
}

export function createMockListeningAttempt(
  input:
    CreateListeningAttemptInput,
): ListeningAttemptDraft {
  const now =
    new Date()
      .toISOString();

  const attempt =
    listeningAttemptDraftSchema.parse(
      {
        attemptId:
          `listening_attempt_${randomUUID()}`,

        contentId:
          input.contentId,

        practiceMode:
          input.practiceMode,

        answerSource:
          "typed",

        transcript:
          "",

        currentPositionSeconds:
          0,

        playbackRate:
          1,

        status:
          "draft",

        createdAt:
          now,

        updatedAt:
          now,
      },
    );

  if (
    attempt.attemptId
  ) {
    attemptStore.set(
      attempt.attemptId,
      attempt,
    );
  }

  return attempt;
}

export function getMockListeningAttemptDraft(
  attemptId:
    string,
): ListeningAttemptDraft | null {
  return (
    attemptStore.get(
      attemptId,
    ) ??
    null
  );
}

export function updateMockListeningAttemptDraft(
  attemptId:
    string,

  input:
    UpdateListeningDraftInput,
): ListeningAttemptDraft | null {
  const current =
    attemptStore.get(
      attemptId,
    );

  if (!current) {
    return null;
  }

  const updated =
    listeningAttemptDraftSchema.parse(
      {
        ...current,

        ...input,

        updatedAt:
          new Date()
            .toISOString(),
      },
    );

  attemptStore.set(
    attemptId,
    updated,
  );

  return updated;
}

export function markMockListeningAttemptSubmitted(
  attemptId:
    string,
): ListeningAttemptDraft | null {
  const current =
    attemptStore.get(
      attemptId,
    );

  if (!current) {
    return null;
  }

  const updated =
    listeningAttemptDraftSchema.parse(
      {
        ...current,

        status:
          "submitted",

        updatedAt:
          new Date()
            .toISOString(),
      },
    );

  attemptStore.set(
    attemptId,
    updated,
  );

  return updated;
}
