"use client";

import {
  create,
} from "zustand";

import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

import {
  vocabularyCollectionsMock,
  vocabularyWordsMock,
} from "../mocks/vocabulary.mock";

import {
  applyLeitnerReview,
} from "../domain/leitner";

import type {
  AddVocabularyWordInput,
  AddWordResult,
  LeitnerBoxNumber,
  ReviewGrade,
  UpdateVocabularyWordInput,
  VocabularyCollection,
  VocabularyReviewLogEntry,
  VocabularyWord,
} from "../types/vocabulary.types";

type VocabularyStore = {
  words: VocabularyWord[];

  collections:
    VocabularyCollection[];

  reviewLog:
    VocabularyReviewLogEntry[];

  dailyGoal: number;

  hasHydrated: boolean;

  setHasHydrated: (
    value: boolean,
  ) => void;

  setDailyGoal: (
    value: number,
  ) => void;

  addWord: (
    input:
      AddVocabularyWordInput,
  ) => AddWordResult;

  updateWord: (
    id: string,
    input:
      UpdateVocabularyWordInput,
  ) => void;

  deleteWord: (
    id: string,
  ) => void;

  moveWordToBox: (
    id: string,
    box:
      LeitnerBoxNumber,
  ) => void;

  reviewWord: (
    id: string,
    grade:
      ReviewGrade,
  ) =>
    | VocabularyReviewLogEntry
    | null;

  addCollection: (
    collection:
      Omit<
        VocabularyCollection,
        | "totalWords"
        | "learnedWords"
      >,
  ) => void;

  deleteCollection: (
    id: string,
  ) => void;

  resetVocabulary:
    () => void;
};

function normalizeWord(
  value: string,
): string {
  return value
    .trim()
    .toLocaleLowerCase(
      "en-US",
    );
}

function createId(
  prefix: string,
): string {
  if (
    typeof crypto !==
      "undefined" &&
    "randomUUID" in
      crypto
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export const useVocabularyStore =
  create<VocabularyStore>()(
    persist(
      (
        set,
        get,
      ) => ({
        words:
          vocabularyWordsMock,

        collections:
          vocabularyCollectionsMock,

        reviewLog:
          [],

        dailyGoal:
          30,

        hasHydrated:
          false,

        setHasHydrated: (
          value,
        ) => {
          set({
            hasHydrated:
              value,
          });
        },

        setDailyGoal: (
          value,
        ) => {
          const safeValue =
            Math.min(
              200,
              Math.max(
                5,
                Math.round(
                  value,
                ),
              ),
            );

          set({
            dailyGoal:
              safeValue,
          });
        },

        addWord: (
          input,
        ) => {
          const english =
            input.word.trim();

          const translation =
            input.translation.trim();

          if (
            !english ||
            !translation
          ) {
            return {
              ok: false,
              reason:
                "invalid",
            };
          }

          const duplicate =
            get().words.some(
              (word) =>
                normalizeWord(
                  word.word,
                ) ===
                normalizeWord(
                  english,
                ),
            );

          if (duplicate) {
            return {
              ok: false,
              reason:
                "duplicate",
            };
          }

          const now =
            new Date();

          const id =
            createId(
              "word",
            );

          const word:
            VocabularyWord =
            {
              id,

              word:
                english,

              translation,

              phonetic:
                input.phonetic
                  ?.trim() ||
                undefined,

              definition:
                input.definition
                  ?.trim() ||
                undefined,

              example:
                input.example
                  ?.trim() ||
                undefined,

              exampleTranslation:
                input.exampleTranslation
                  ?.trim() ||
                undefined,

              partOfSpeech:
                input.partOfSpeech,

              difficulty:
                input.difficulty,

              status:
                "new",

              leitnerBox:
                1,

              tags:
                input.tags ??
                [],

              collectionId:
                input.collectionId,

              reviewCount:
                0,

              correctCount:
                0,

              lapseCount:
                0,

              /**
               * واژه جدید بلافاصله
               * آماده اولین مرور است.
               */
              nextReviewAt:
                now.toISOString(),

              createdAt:
                now.toISOString(),

              updatedAt:
                now.toISOString(),
            };

          set(
            (state) => ({
              words: [
                word,
                ...state.words,
              ],
            }),
          );

          return {
            ok: true,
            id,
          };
        },

        updateWord: (
          id,
          input,
        ) => {
          set(
            (state) => ({
              words:
                state.words.map(
                  (word) =>
                    word.id ===
                    id
                      ? {
                          ...word,
                          ...input,

                          updatedAt:
                            new Date().toISOString(),
                        }
                      : word,
                ),
            }),
          );
        },

        deleteWord: (
          id,
        ) => {
          set(
            (state) => ({
              words:
                state.words.filter(
                  (word) =>
                    word.id !==
                    id,
                ),

              reviewLog:
                state.reviewLog.filter(
                  (log) =>
                    log.wordId !==
                    id,
                ),
            }),
          );
        },

        moveWordToBox: (
          id,
          box,
        ) => {
          set(
            (state) => ({
              words:
                state.words.map(
                  (word) =>
                    word.id ===
                    id
                      ? {
                          ...word,

                          leitnerBox:
                            box,

                          status:
                            box ===
                            5
                              ? "mastered"
                              : box <=
                                  2
                                ? "learning"
                                : "review",

                          updatedAt:
                            new Date().toISOString(),
                        }
                      : word,
                ),
            }),
          );
        },

        reviewWord: (
          id,
          grade,
        ) => {
          const current =
            get().words.find(
              (word) =>
                word.id ===
                id,
            );

          if (!current) {
            return null;
          }

          const result =
            applyLeitnerReview(
              current,
              grade,
            );

          set(
            (state) => ({
              words:
                state.words.map(
                  (word) =>
                    word.id ===
                    id
                      ? result.word
                      : word,
                ),

              reviewLog: [
                ...state.reviewLog,
                result.log,
              ],
            }),
          );

          return result.log;
        },

        addCollection: (
          collection,
        ) => {
          const exists =
            get().collections.some(
              (item) =>
                item.id ===
                collection.id,
            );

          if (exists) {
            return;
          }

          set(
            (state) => ({
              collections: [
                ...state.collections,
                {
                  ...collection,

                  totalWords:
                    0,

                  learnedWords:
                    0,
                },
              ],
            }),
          );
        },

        deleteCollection: (
          id,
        ) => {
          set(
            (state) => ({
              collections:
                state.collections.filter(
                  (collection) =>
                    collection.id !==
                    id,
                ),

              words:
                state.words.map(
                  (word) =>
                    word.collectionId ===
                    id
                      ? {
                          ...word,

                          collectionId:
                            undefined,
                        }
                      : word,
                ),
            }),
          );
        },

        resetVocabulary:
          () => {
            set({
              words:
                vocabularyWordsMock,

              collections:
                vocabularyCollectionsMock,

              reviewLog:
                [],

              dailyGoal:
                30,
            });
          },
      }),

      {
        name:
          "navan-vocabulary-v1",

        version:
          1,

        storage:
          createJSONStorage(
            () =>
              localStorage,
          ),

        partialize: (
          state,
        ) => ({
          words:
            state.words,

          collections:
            state.collections,

          reviewLog:
            state.reviewLog,

          dailyGoal:
            state.dailyGoal,
        }),

        onRehydrateStorage:
          () =>
          (state) => {
            state?.setHasHydrated(
              true,
            );
          },
      },
    ),
  );