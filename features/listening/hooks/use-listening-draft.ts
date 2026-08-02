"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ListeningDraftSaveStatus,
} from "../types/listening.types";

type StoredListeningDraft = {
  transcript: string;
  updatedAt: string;
};

type UseListeningDraftOptions = Readonly<{
  contentId: string;
  initialTranscript?: string;
  debounceMilliseconds?: number;
}>;

const STORAGE_PREFIX =
  "meowlingo:listening:draft";

export function useListeningDraft({
  contentId,
  initialTranscript = "",
  debounceMilliseconds = 1_200,
}: UseListeningDraftOptions) {
  const storageKey = useMemo(
    () => `${STORAGE_PREFIX}:${contentId}`,
    [contentId],
  );

  const [transcript, setTranscriptState] =
    useState(initialTranscript);

  const [saveStatus, setSaveStatus] =
    useState<ListeningDraftSaveStatus>(
      "idle",
    );

  const [lastSavedAt, setLastSavedAt] =
    useState<string | null>(null);

  const hydratedRef = useRef(false);
  const lastPersistedValueRef =
    useRef(initialTranscript);

  useEffect(() => {
    try {
      const storedValue =
        window.localStorage.getItem(
          storageKey,
        );

      if (!storedValue) {
        hydratedRef.current = true;
        setSaveStatus("saved");
        return;
      }

      const parsedValue =
        JSON.parse(
          storedValue,
        ) as Partial<StoredListeningDraft>;

      const storedTranscript =
        typeof parsedValue.transcript ===
        "string"
          ? parsedValue.transcript
          : initialTranscript;

      const storedUpdatedAt =
        typeof parsedValue.updatedAt ===
        "string"
          ? parsedValue.updatedAt
          : null;

      setTranscriptState(storedTranscript);
      setLastSavedAt(storedUpdatedAt);

      lastPersistedValueRef.current =
        storedTranscript;

      setSaveStatus("saved");
    } catch (error) {
      console.error(
        "Listening draft hydration failed:",
        error,
      );

      setSaveStatus("error");
    } finally {
      hydratedRef.current = true;
    }
  }, [
    initialTranscript,
    storageKey,
  ]);

  const persistDraft = useCallback(
    (value: string): void => {
      try {
        const updatedAt =
          new Date().toISOString();

        const payload: StoredListeningDraft = {
          transcript: value,
          updatedAt,
        };

        window.localStorage.setItem(
          storageKey,
          JSON.stringify(payload),
        );

        lastPersistedValueRef.current =
          value;

        setLastSavedAt(updatedAt);
        setSaveStatus("saved");
      } catch (error) {
        console.error(
          "Listening draft persistence failed:",
          error,
        );

        setSaveStatus("error");
      }
    },
    [storageKey],
  );

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    if (
      transcript ===
      lastPersistedValueRef.current
    ) {
      return;
    }

    setSaveStatus("dirty");

    const timeoutId =
      window.setTimeout(() => {
        setSaveStatus("saving");

        persistDraft(transcript);
      }, debounceMilliseconds);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    debounceMilliseconds,
    persistDraft,
    transcript,
  ]);

  const setTranscript = useCallback(
    (value: string): void => {
      setTranscriptState(value);
    },
    [],
  );

  const saveNow = useCallback((): void => {
    if (!hydratedRef.current) {
      return;
    }

    setSaveStatus("saving");
    persistDraft(transcript);
  }, [persistDraft, transcript]);

  const clearDraft = useCallback((): void => {
    try {
      window.localStorage.removeItem(
        storageKey,
      );
    } catch (error) {
      console.error(
        "Listening draft deletion failed:",
        error,
      );
    }

    setTranscriptState("");
    setLastSavedAt(null);

    lastPersistedValueRef.current = "";

    setSaveStatus("saved");
  }, [storageKey]);

  return {
    transcript,
    saveStatus,
    lastSavedAt,

    setTranscript,
    saveNow,
    clearDraft,
  };
}