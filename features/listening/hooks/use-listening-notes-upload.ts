"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  uploadListeningNotes,
} from "../api/upload-listening-notes";

import type {
  ListeningNoteExtractionStatus,
  ListeningNoteFileKind,
  ListeningNotesUploadResult,
} from "../types/listening.types";

import {
  validateListeningNotesFile,
} from "../utils/validate-listening-notes-file";

export function useListeningNotesUpload() {
  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );

  const extractionTimerRef =
    useRef<number | null>(null);

  const [status, setStatus] =
    useState<ListeningNoteExtractionStatus>(
      "idle",
    );

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [selectedFileKind, setSelectedFileKind] =
    useState<ListeningNoteFileKind | null>(
      null,
    );

  const [result, setResult] =
    useState<ListeningNotesUploadResult | null>(
      null,
    );

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const clearExtractionTimer =
    useCallback((): void => {
      if (
        extractionTimerRef.current === null
      ) {
        return;
      }

      window.clearTimeout(
        extractionTimerRef.current,
      );

      extractionTimerRef.current = null;
    }, []);

  const reset =
    useCallback((): void => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;

      clearExtractionTimer();

      setStatus("idle");
      setSelectedFile(null);
      setSelectedFileKind(null);
      setResult(null);
      setErrorMessage(null);
    }, [clearExtractionTimer]);

  const upload =
    useCallback(
      async (
        file: File,
      ): Promise<void> => {
        const validationResult =
          validateListeningNotesFile(file);

        if (!validationResult.success) {
          setStatus("error");

          setSelectedFile(file);
          setSelectedFileKind(null);

          setResult(null);

          setErrorMessage(
            validationResult.message,
          );

          return;
        }

        abortControllerRef.current?.abort();
        clearExtractionTimer();

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        setSelectedFile(file);

        setSelectedFileKind(
          validationResult.fileKind,
        );

        setResult(null);
        setErrorMessage(null);
        setStatus("uploading");

        extractionTimerRef.current =
          window.setTimeout(() => {
            setStatus("extracting");
          }, 350);

        try {
          const uploadResult =
            await uploadListeningNotes(
              file,
              controller.signal,
            );

          if (controller.signal.aborted) {
            return;
          }

          clearExtractionTimer();

          setResult(uploadResult);
          setStatus("ready");
        } catch (error) {
          clearExtractionTimer();

          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error(
            "Listening notes upload failed:",
            error,
          );

          setStatus("error");

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "آپلود فایل با خطا مواجه شد.",
          );
        } finally {
          if (
            abortControllerRef.current ===
            controller
          ) {
            abortControllerRef.current =
              null;
          }
        }
      },
      [clearExtractionTimer],
    );

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();

      if (
        extractionTimerRef.current !== null
      ) {
        window.clearTimeout(
          extractionTimerRef.current,
        );
      }
    };
  }, []);

  return {
    status,

    selectedFile,
    selectedFileKind,

    result,
    errorMessage,

    upload,
    reset,
  };
}