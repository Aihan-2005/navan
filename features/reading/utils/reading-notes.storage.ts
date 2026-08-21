import {
  readingSavedItemInputSchema,
  readingSavedItemsCollectionSchema,
} from "../schemas/reading-note.schema";

import type {
  ReadingSavedItem,
  ReadingSavedItemInput,
  ReadingSavedItemsCollection,
} from "../types/reading-note.types";

export const READING_SAVED_ITEMS_STORAGE_KEY =
  "navan:reading:saved-items:v1";

export const READING_SAVED_ITEMS_CHANGED_EVENT =
  "navan:reading:saved-items-changed";

const STORAGE_VERSION =
  1 as const;

const MAX_SAVED_ITEMS =
  300;

function createEmptyCollection():
  ReadingSavedItemsCollection {
  return {
    version:
      STORAGE_VERSION,

    items:
      [],
  };
}

function emitChange():
  void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(
      READING_SAVED_ITEMS_CHANGED_EVENT,
    ),
  );
}

function writeCollection(
  collection:
    ReadingSavedItemsCollection,
): boolean {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  try {
    window.localStorage.setItem(
      READING_SAVED_ITEMS_STORAGE_KEY,
      JSON.stringify(
        collection,
      ),
    );

    emitChange();

    return true;
  } catch (
    error
  ) {
    console.error(
      "Unable to persist Reading saved items:",
      error,
    );

    return false;
  }
}

export function createReadingSavedItemId(
  kind:
    string,

  resourceId:
    string,

  sectionId:
    string,

  sourceId:
    string,
): string {
  return [
    "reading",
    kind,
    resourceId,
    sectionId,
    sourceId,
  ].join(
    ":",
  );
}

export function readReadingSavedItems():
  ReadingSavedItem[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        READING_SAVED_ITEMS_STORAGE_KEY,
      );

    if (!rawValue) {
      return [];
    }

    const parsed:
      unknown =
      JSON.parse(
        rawValue,
      );

    const result =
      readingSavedItemsCollectionSchema.safeParse(
        parsed,
      );

    if (
      !result.success
    ) {
      window.localStorage.removeItem(
        READING_SAVED_ITEMS_STORAGE_KEY,
      );

      return [];
    }

    return [
      ...result.data.items,
    ].sort(
      (
        first,
        second,
      ) =>
        Date.parse(
          second.savedAt,
        ) -
        Date.parse(
          first.savedAt,
        ),
    );
  } catch (
    error
  ) {
    console.error(
      "Unable to read Reading saved items:",
      error,
    );

    return [];
  }
}

export function readReadingSavedItemsForResource(
  resourceId:
    string,
): ReadingSavedItem[] {
  return readReadingSavedItems()
    .filter(
      (
        item,
      ) =>
        item.resourceId ===
        resourceId,
    );
}

export function ensureReadingSavedItem(
  input:
    ReadingSavedItemInput,
): boolean {
  const parsed =
    readingSavedItemInputSchema.safeParse(
      input,
    );

  if (
    !parsed.success
  ) {
    console.error(
      "Invalid Reading saved item:",
      parsed.error.flatten(),
    );

    return false;
  }

  const currentItems =
    readReadingSavedItems();

  if (
    currentItems.some(
      (
        item,
      ) =>
        item.id ===
        parsed.data.id,
    )
  ) {
    return true;
  }

  const nextItem:
    ReadingSavedItem =
    {
      ...parsed.data,

      savedAt:
        new Date()
          .toISOString(),
    };

  return writeCollection({
    version:
      STORAGE_VERSION,

    items: [
      nextItem,
      ...currentItems,
    ].slice(
      0,
      MAX_SAVED_ITEMS,
    ),
  });
}

export function removeReadingSavedItem(
  itemId:
    string,
): boolean {
  const currentItems =
    readReadingSavedItems();

  const nextItems =
    currentItems.filter(
      (
        item,
      ) =>
        item.id !==
        itemId,
    );

  if (
    nextItems.length ===
    currentItems.length
  ) {
    return true;
  }

  return writeCollection({
    version:
      STORAGE_VERSION,

    items:
      nextItems,
  });
}

export function toggleReadingSavedItem(
  input:
    ReadingSavedItemInput,
): boolean {
  const parsed =
    readingSavedItemInputSchema.safeParse(
      input,
    );

  if (
    !parsed.success
  ) {
    console.error(
      "Invalid Reading saved item:",
      parsed.error.flatten(),
    );

    return false;
  }

  const currentItems =
    readReadingSavedItems();

  const alreadySaved =
    currentItems.some(
      (
        item,
      ) =>
        item.id ===
        parsed.data.id,
    );

  if (
    alreadySaved
  ) {
    return removeReadingSavedItem(
      parsed.data.id,
    );
  }

  return ensureReadingSavedItem(
    parsed.data,
  );
}