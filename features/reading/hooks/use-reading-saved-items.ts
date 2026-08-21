"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReadingSavedItem,
  ReadingSavedItemInput,
} from "../types/reading-note.types";

import {
  ensureReadingSavedItem,
  READING_SAVED_ITEMS_CHANGED_EVENT,
  READING_SAVED_ITEMS_STORAGE_KEY,
  readReadingSavedItems,
  toggleReadingSavedItem,
} from "../utils/reading-notes.storage";

export function useReadingSavedItems(
  resourceId?:
    string,
) {
  const [
    allItems,
    setAllItems,
  ] =
    useState<
      ReadingSavedItem[]
    >([]);

  const refresh =
    useCallback(
      (): void => {
        setAllItems(
          readReadingSavedItems(),
        );
      },
      [],
    );

  useEffect(() => {
    refresh();

    function handleLocalChange():
      void {
      refresh();
    }

    function handleStorageChange(
      event:
        StorageEvent,
    ): void {
      if (
        event.key ===
        READING_SAVED_ITEMS_STORAGE_KEY
      ) {
        refresh();
      }
    }

    window.addEventListener(
      READING_SAVED_ITEMS_CHANGED_EVENT,
      handleLocalChange,
    );

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        READING_SAVED_ITEMS_CHANGED_EVENT,
        handleLocalChange,
      );

      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, [
    refresh,
  ]);

  const items =
    useMemo(
      () => {
        if (
          !resourceId
        ) {
          return allItems;
        }

        return allItems.filter(
          (
            item,
          ) =>
            item.resourceId ===
            resourceId,
        );
      },
      [
        allItems,
        resourceId,
      ],
    );

  const isSaved =
    useCallback(
      (
        itemId:
          string,
      ): boolean =>
        allItems.some(
          (
            item,
          ) =>
            item.id ===
            itemId,
        ),
      [
        allItems,
      ],
    );

  const toggleSavedItem =
    useCallback(
      (
        input:
          ReadingSavedItemInput,
      ): void => {
        toggleReadingSavedItem(
          input,
        );

        refresh();
      },
      [
        refresh,
      ],
    );

  const ensureSavedItem =
    useCallback(
      (
        input:
          ReadingSavedItemInput,
      ): void => {
        ensureReadingSavedItem(
          input,
        );

        refresh();
      },
      [
        refresh,
      ],
    );

  return {
    items,

    allItems,

    isSaved,

    toggleSavedItem,

    ensureSavedItem,

    refresh,
  };
}