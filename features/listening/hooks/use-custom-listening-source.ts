"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  importCustomListeningUrl,
} from "../api/import-custom-listening-url";

import {
  uploadCustomListeningAudio,
} from "../api/upload-custom-listening-audio";

import type {
  CustomAudioUploadMetadata,
  CustomAudioUploadResult,
  CustomAudioUrlImportRequest,
  CustomAudioUrlImportResult,
  CustomSourceRequestStatus,
} from "../types/listening-custom-source.types";

import {
  validateListeningAudioFile,
} from "../utils/validate-listening-audio-file";

export function useCustomAudioUpload() {
  const abortControllerRef =
    useRef<AbortController | null>(null);

  const previewUrlRef =
    useRef<string | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [status, setStatus] =
    useState<CustomSourceRequestStatus>(
      "idle",
    );

  const [result, setResult] =
    useState<CustomAudioUploadResult | null>(
      null,
    );

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const revokePreview =
    useCallback((): void => {
      if (!previewUrlRef.current) {
        return;
      }

      URL.revokeObjectURL(
        previewUrlRef.current,
      );

      previewUrlRef.current = null;
      setPreviewUrl(null);
    }, []);

  const selectFile = useCallback(
    (nextFile: File): boolean => {
      setStatus("validating");

      const validationResult =
        validateListeningAudioFile(
          nextFile,
        );

      if (!validationResult.success) {
        revokePreview();

        setFile(null);
        setResult(null);
        setErrorMessage(
          validationResult.message,
        );

        setStatus("error");

        return false;
      }

      revokePreview();

      const nextPreviewUrl =
        URL.createObjectURL(nextFile);

      previewUrlRef.current =
        nextPreviewUrl;

      setPreviewUrl(nextPreviewUrl);
      setFile(nextFile);

      setResult(null);
      setErrorMessage(null);
      setStatus("idle");

      return true;
    },
    [revokePreview],
  );

  const submit = useCallback(
    async (
      metadata: CustomAudioUploadMetadata,
    ): Promise<void> => {
      if (!file) {
        setErrorMessage(
          "ابتدا فایل صوتی را انتخاب کن.",
        );

        setStatus("error");
        return;
      }

      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      setResult(null);
      setErrorMessage(null);
      setStatus("uploading");

      try {
        const uploadResult =
          await uploadCustomListeningAudio(
            file,
            metadata,
            controller.signal,
          );

        if (controller.signal.aborted) {
          return;
        }

        setResult(uploadResult);
        setStatus("success");
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Custom audio upload failed:",
          error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "آپلود فایل صوتی ناموفق بود.",
        );

        setStatus("error");
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
    [file],
  );

  const reset = useCallback((): void => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    revokePreview();

    setFile(null);
    setResult(null);
    setErrorMessage(null);
    setStatus("idle");
  }, [revokePreview]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();

      if (previewUrlRef.current) {
        URL.revokeObjectURL(
          previewUrlRef.current,
        );
      }
    };
  }, []);

  return {
    file,
    previewUrl,

    status,
    result,
    errorMessage,

    selectFile,
    submit,
    reset,
  };
}

export function useCustomAudioUrlImport() {
  const abortControllerRef =
    useRef<AbortController | null>(null);

  const [status, setStatus] =
    useState<CustomSourceRequestStatus>(
      "idle",
    );

  const [result, setResult] =
    useState<CustomAudioUrlImportResult | null>(
      null,
    );

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const submit = useCallback(
    async (
      input: CustomAudioUrlImportRequest,
    ): Promise<void> => {
      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      setResult(null);
      setErrorMessage(null);
      setStatus("submitting");

      try {
        const importResult =
          await importCustomListeningUrl(
            input,
            controller.signal,
          );

        if (controller.signal.aborted) {
          return;
        }

        setResult(importResult);
        setStatus("success");
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Custom audio URL import failed:",
          error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "ثبت لینک صوتی ناموفق بود.",
        );

        setStatus("error");
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
    [],
  );

  const reset = useCallback((): void => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setResult(null);
    setErrorMessage(null);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    status,
    result,
    errorMessage,

    submit,
    reset,
  };
}