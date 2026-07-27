"use client";

import { useEffect } from "react";

import {
  CircleStop,
  Mic2,
  Pause,
  Play,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import { useAudioRecorder } from "../hooks/use-audio-recorder";

import type { RecordedAudio } from "../types/speaking.types";

type VoiceRecorderProps = {
  maxDurationSeconds?: number;

  onRecordingReady?: (recording: RecordedAudio) => void;
};

function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) {
    return "بدون محدودیت";
  }

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function VoiceRecorder({
  maxDurationSeconds = 240,
  onRecordingReady,
}: VoiceRecorderProps) {
  const {
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
  } = useAudioRecorder(maxDurationSeconds);

  const isRecording = status === "recording";
  const isPaused = status === "paused";

  const isRequestingPermission = status === "requesting_permission";

  useEffect(() => {
    if (!recording) {
      return;
    }

    onRecordingReady?.(recording);
  }, [onRecordingReady, recording]);

  if (!isSupported || !isSecureContext) {
    return (
      <Card className="border-red-400/15 p-6">
        <h2 className="text-lg font-bold text-white">
          امکان ضبط صدا وجود ندارد
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          مرورگر باید از MediaRecorder پشتیبانی کند و پروژه باید روی HTTPS یا
          localhost اجرا شود.
        </p>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden p-6">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-56 w-56 rounded-full
          bg-cyan-500/10 blur-3xl
        "
      />

      <div className="relative">
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "relative flex h-24 w-24 items-center",
              "justify-center rounded-full",
              "border transition duration-300",
              isRecording
                ? "border-red-300/30 bg-red-400/15 text-red-300 shadow-[0_0_50px_rgba(248,113,113,0.18)]"
                : "border-cyan-300/20 bg-cyan-400/10 text-cyan-300",
            )}
          >
            {isRecording ? (
              <span
                aria-hidden="true"
                className="
                  absolute inset-0 animate-ping
                  rounded-full border border-red-400/20
                "
              />
            ) : null}

            <Mic2 aria-hidden="true" className="relative h-9 w-9" />
          </div>

          <p className="mt-6 text-3xl font-bold tabular-nums text-white">
            {formatDuration(elapsedSeconds)}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            حداکثر {formatDuration(maxDurationSeconds)}
          </p>

          <div
            className="
              mt-5 flex h-10 items-end
              justify-center gap-1
            "
            aria-hidden="true"
          >
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "w-1 rounded-full bg-cyan-300/60",
                  isRecording && "animate-pulse",
                )}
                style={{
                  height: isRecording ? `${12 + ((index * 13) % 28)}px` : "6px",

                  animationDelay: `${index * 55}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {errorMessage ? (
          <div
            role="alert"
            className="
              mt-6 rounded-xl
              border border-red-400/15
              bg-red-400/6
              px-4 py-3 text-sm
              leading-7 text-red-200
            "
          >
            {errorMessage}
          </div>
        ) : null}

        <div
          className="
            mt-7 flex flex-wrap
            items-center justify-center gap-3
          "
        >
          {status === "idle" || status === "error" ? (
            <button
              type="button"
              onClick={() => {
                void startRecording();
              }}
              disabled={isRequestingPermission}
              className="
                inline-flex min-h-11 items-center
                justify-center gap-2 rounded-xl
                bg-cyan-400 px-6 py-2.5
                text-sm font-bold text-slate-950
                transition hover:bg-cyan-300
                disabled:cursor-wait
                disabled:opacity-60
              "
            >
              <Mic2 aria-hidden="true" className="h-4 w-4" />

              {isRequestingPermission ? "در انتظار اجازه..." : "شروع ضبط"}
            </button>
          ) : null}

          {isRecording ? (
            <>
              <button
                type="button"
                onClick={pauseRecording}
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  border border-white/10
                  bg-white/5 px-5 py-2.5
                  text-sm font-semibold text-white
                  transition hover:bg-white/10
                "
              >
                <Pause aria-hidden="true" className="h-4 w-4" />
                مکث
              </button>

              <button
                type="button"
                onClick={stopRecording}
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  bg-red-400 px-5 py-2.5
                  text-sm font-bold text-slate-950
                  transition hover:bg-red-300
                "
              >
                <CircleStop aria-hidden="true" className="h-4 w-4" />
                پایان ضبط
              </button>
            </>
          ) : null}

          {isPaused ? (
            <>
              <button
                type="button"
                onClick={resumeRecording}
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  bg-cyan-400 px-5 py-2.5
                  text-sm font-bold text-slate-950
                "
              >
                <Play aria-hidden="true" className="h-4 w-4" />
                ادامه ضبط
              </button>

              <button
                type="button"
                onClick={stopRecording}
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  border border-red-400/20
                  bg-red-400/10 px-5 py-2.5
                  text-sm font-semibold text-red-200
                "
              >
                پایان ضبط
              </button>
            </>
          ) : null}
        </div>

        {recording ? (
          <div
            className="
              mt-7 rounded-2xl
              border border-emerald-400/15
              bg-emerald-400/5 p-4
            "
          >
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              صدای شما با موفقیت ضبط شد
            </div>

            <audio
              controls
              preload="metadata"
              src={recording.url}
              className="mt-4 w-full"
            >
              مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
            </audio>

            <button
              type="button"
              onClick={resetRecording}
              className="
                mt-4 inline-flex items-center gap-2
                text-sm font-medium text-slate-400
                transition hover:text-white
              "
            >
              <RefreshCcw aria-hidden="true" className="h-4 w-4" />
              ضبط مجدد
            </button>
          </div>
        ) : null}

        <p
          className="
            mt-6 flex items-start justify-center
            gap-2 text-center text-xs
            leading-6 text-slate-600
          "
        >
          <ShieldCheck
            aria-hidden="true"
            className="mt-1 h-3.5 w-3.5 shrink-0"
          />
          در این مرحله فایل صوتی فقط داخل مرورگر نگهداری می‌شود و تا زمان ارسال
          برای تحلیل، آپلود نخواهد شد.
        </p>
      </div>
    </Card>
  );
}
