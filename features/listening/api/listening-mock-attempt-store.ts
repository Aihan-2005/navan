import "server-only";

import type {
  ListeningAttemptAnalysis,
} from "../types/listening.types";

type GlobalListeningMockStore =
  typeof globalThis & {
    __navanListeningMockAttempts?: Map<
      string,
      ListeningAttemptAnalysis
    >;
  };

const globalStore =
  globalThis as
    GlobalListeningMockStore;

export const listeningMockAttemptStore =
  globalStore
    .__navanListeningMockAttempts ??
  new Map<
    string,
    ListeningAttemptAnalysis
  >();

if (
  process.env.NODE_ENV !==
  "production"
) {
  globalStore.__navanListeningMockAttempts =
    listeningMockAttemptStore;
}