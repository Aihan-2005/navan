"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReadingSavedInsight,
  ReadingSavedInsightInput,
} from "../types/reading-saved-insight.types";

import {
  readReadingSavedInsights,
  READING_SAVED_INSIGHTS_CHANGED_EVENT,
  READING_SAVED_INSIGHTS_STORAGE_KEY,
  removeReadingSavedInsight,
  saveReadingInsight,
  toggleReadingSavedInsight,
} from "../utils/reading-saved-insights.storage";

export function useReadingSavedInsights(
  resourceId?:
    string,
) {
  const [
    allInsights,
    setAllInsights,
  ] =
    useState<
      ReadingSavedInsight[]
    >([]);

  const refresh =
    useCallback(
      (): void => {
        setAllInsights(
          readReadingSavedInsights(),
        );
      },
      [],
    );

  useEffect(() => {
    refresh();

    const handleStorage = (
      event:
        StorageEvent,
    ): void => {
      if (
        event.key ===
        READING_SAVED_INSIGHTS_STORAGE_KEY
      ) {
        refresh();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    window.addEventListener(
      READING_SAVED_INSIGHTS_CHANGED_EVENT,
      refresh,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );

      window.removeEventListener(
        READING_SAVED_INSIGHTS_CHANGED_EVENT,
        refresh,
      );
    };
  }, [
    refresh,
  ]);

  const insights =
    useMemo(
      () =>
        resourceId
          ? allInsights.filter(
              (
                item,
              ) =>
                item.resourceId ===
                resourceId,
            )
          : allInsights,
      [
        allInsights,
        resourceId,
      ],
    );

  const saveInsight =
    useCallback(
      (
        input:
          ReadingSavedInsightInput,
      ): void => {
        setAllInsights(
          saveReadingInsight(
            input,
          ),
        );
      },
      [],
    );

  const toggleInsight =
    useCallback(
      (
        input:
          ReadingSavedInsightInput,
      ): void => {
        setAllInsights(
          toggleReadingSavedInsight(
            input,
          ),
        );
      },
      [],
    );

  const removeInsight =
    useCallback(
      (
        key:
          string,
      ): void => {
        setAllInsights(
          removeReadingSavedInsight(
            key,
          ),
        );
      },
      [],
    );

  return {
    insights,

    allInsights,

    saveInsight,

    toggleInsight,

    removeInsight,

    refresh,
  };
}