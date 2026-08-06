"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "writing-draft";

type WritingDraftStatus = "idle" | "saving" | "saved";

export function useWritingDraft(sessionKey: string) {
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<WritingDraftStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(
      `${STORAGE_PREFIX}:${sessionKey}`,
    );

    if (stored) {
      setContent(stored);
    }
  }, [sessionKey]);

  const persist = useCallback(
    (value: string) => {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.setItem(`${STORAGE_PREFIX}:${sessionKey}`, value);
      setSaveStatus("saved");
      setLastSavedAt(
        new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    },
    [sessionKey],
  );

  useEffect(() => {
    if (!sessionKey || typeof window === "undefined") {
      return;
    }

    const timer = window.setTimeout(() => {
      persist(content);
    }, 700);

    setSaveStatus("saving");

    return () => window.clearTimeout(timer);
  }, [content, persist, sessionKey]);

  const saveNow = useCallback(() => {
    persist(content);
  }, [content, persist]);

  const clearDraft = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`${STORAGE_PREFIX}:${sessionKey}`);
    }

    setContent("");
    setSaveStatus("idle");
    setLastSavedAt(null);
  }, [sessionKey]);

  return {
    content,
    setContent,
    saveStatus,
    lastSavedAt,
    saveNow,
    clearDraft,
  };
}
