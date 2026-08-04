"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { RecordedAudio } from "../types/speaking.types";

export type AudioRecorderStatus =
  | "idle"
  | "requesting_permission"
  | "recording"
  | "paused"
  | "stopped"
  | "error";

const SUPPORTED_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
] as const;

function findSupportedMimeType(): string | undefined {
  if (
    typeof MediaRecorder === "undefined" ||
    typeof MediaRecorder.isTypeSupported !== "function"
  ) {
    return undefined;
  }

  return SUPPORTED_MIME_TYPES.find((mimeType) =>
    MediaRecorder.isTypeSupported(mimeType),
  );
}

function getRecorderErrorMessage(error: unknown): string {
  if (!(error instanceof DOMException)) {
    return "خطای ناشناخته‌ای هنگام دسترسی به میکروفون رخ داد.";
  }

  switch (error.name) {
    case "NotAllowedError":
      return "اجازه دسترسی به میکروفون داده نشد. دسترسی میکروفون را از تنظیمات مرورگر فعال کن.";

    case "NotFoundError":
      return "هیچ میکروفونی روی دستگاه پیدا نشد.";

    case "NotReadableError":
      return "میکروفون توسط برنامه دیگری استفاده می‌شود یا در دسترس نیست.";

    case "SecurityError":
      return "مرورگر به دلایل امنیتی اجازه استفاده از میکروفون را نمی‌دهد.";

    case "AbortError":
      return "فعال‌سازی میکروفون متوقف شد. دوباره تلاش کن.";

    default:
      return "امکان شروع ضبط صدا وجود ندارد.";
  }
}

function stopMediaStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => {
    track.stop();
  });
}

export function useAudioRecorder(maxDurationSeconds = 120) {
  const recorderRef = useRef<MediaRecorder | null>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const chunksRef = useRef<Blob[]>([]);

  const recordingUrlRef = useRef<string | null>(null);

  const [status, setStatus] = useState<AudioRecorderStatus>("idle");

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const [recording, setRecording] = useState<RecordedAudio | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    typeof MediaRecorder !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia);

  const isSecureContext =
    typeof window === "undefined" ? true : window.isSecureContext;

  const revokeCurrentRecordingUrl = useCallback((): void => {
    if (!recordingUrlRef.current) {
      return;
    }

    URL.revokeObjectURL(recordingUrlRef.current);

    recordingUrlRef.current = null;
  }, []);

  const resetRecording = useCallback((): void => {
    const recorder = recorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    stopMediaStream(streamRef.current);

    recorderRef.current = null;
    streamRef.current = null;
    chunksRef.current = [];

    revokeCurrentRecordingUrl();

    setRecording(null);
    setElapsedSeconds(0);
    setErrorMessage(null);
    setStatus("idle");
  }, [revokeCurrentRecordingUrl]);

  const stopRecording = useCallback((): void => {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      return;
    }

    recorder.stop();
  }, []);

  const pauseRecording = useCallback((): void => {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state !== "recording") {
      return;
    }

    recorder.pause();
    setStatus("paused");
  }, []);

  const resumeRecording = useCallback((): void => {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state !== "paused") {
      return;
    }

    recorder.resume();
    setStatus("recording");
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      setStatus("error");
      setErrorMessage("مرورگر فعلی از ضبط صدا پشتیبانی نمی‌کند.");
      return;
    }

    if (!isSecureContext) {
      setStatus("error");
      setErrorMessage(
        "برای استفاده از میکروفون، صفحه باید روی HTTPS یا localhost اجرا شود.",
      );
      return;
    }

    try {
      setStatus("requesting_permission");
      setErrorMessage(null);
      setElapsedSeconds(0);
      setRecording(null);

      revokeCurrentRecordingUrl();

      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,

        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });

      streamRef.current = stream;

      const supportedMimeType = findSupportedMimeType();

      const recorder = supportedMimeType
        ? new MediaRecorder(stream, {
            mimeType: supportedMimeType,
          })
        : new MediaRecorder(stream);

      recorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = (): void => {
        stopMediaStream(streamRef.current);

        setErrorMessage("هنگام ضبط صدا خطایی رخ داد.");

        setStatus("error");
      };

      recorder.onstop = (): void => {
        const mimeType = recorder.mimeType || supportedMimeType || "audio/webm";

        const blob = new Blob(chunksRef.current, {
          type: mimeType,
        });

        const url = URL.createObjectURL(blob);

        recordingUrlRef.current = url;

        setRecording({
          blob,
          url,
          mimeType,
          durationSeconds: elapsedSeconds,
        });

        stopMediaStream(streamRef.current);

        streamRef.current = null;
        recorderRef.current = null;
        chunksRef.current = [];

        setStatus("stopped");
      };

      recorder.start(250);

      setStatus("recording");
    } catch (error) {
      stopMediaStream(streamRef.current);

      streamRef.current = null;
      recorderRef.current = null;

      setStatus("error");
      setErrorMessage(getRecorderErrorMessage(error));
    }
  }, [elapsedSeconds, isSecureContext, isSupported, revokeCurrentRecordingUrl]);

  useEffect(() => {
    if (status !== "recording") {
      return;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [status]);

  useEffect(() => {
    if (
      status === "recording" &&
      maxDurationSeconds !== Infinity &&
      elapsedSeconds >= maxDurationSeconds
    ) {
      stopRecording();
    }
  }, [elapsedSeconds, maxDurationSeconds, status, stopRecording]);

  useEffect(() => {
    return () => {
      const recorder = recorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.ondataavailable = null;
        recorder.onstop = null;
        recorder.onerror = null;

        recorder.stop();
      }

      stopMediaStream(streamRef.current);

      if (recordingUrlRef.current) {
        URL.revokeObjectURL(recordingUrlRef.current);
      }
    };
  }, []);

  return {
    status,
    elapsedSeconds,
    recording,
    errorMessage,

    isSupported,
    isSecureContext,

    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  };
}
