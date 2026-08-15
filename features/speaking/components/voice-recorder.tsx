"use client";

import {
  useEffect,
} from "react";

import {
  AudioLines,
  CircleStop,
  Clock3,
  FileAudio2,
  LoaderCircle,
  Mic2,
  Pause,
  Play,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  useAudioRecorder,
} from "../hooks/use-audio-recorder";

import type {
  RecordedAudio,
} from "../types/speaking.types";

type VoiceRecorderProps =
  Readonly<{
    maxDurationSeconds?:
      number;
minimumUsefulDurationSeconds?:
      number;

    onRecordingReady?:
      (
        recording:
          RecordedAudio,
      ) => void;

    onRecordingCleared?:
      () => void;
  }>;

const WAVE_FACTORS = [
  0.42,
  0.65,
  0.82,
  0.54,
  0.92,
  0.7,
  1,
  0.62,
  0.86,
  0.48,
  0.74,
  0.96,
  0.58,
  0.8,
  0.68,
  0.9,
  0.52,
  0.76,
  0.98,
  0.6,
  0.84,
  0.56,
  0.72,
  0.88,
] as const;

function formatDuration(
  totalSeconds:
    number,
): string {
  if (
    !Number.isFinite(
      totalSeconds,
    )
  ) {
    return "بدون محدودیت";
  }

  const safeSeconds =
    Math.max(
      0,
      Math.floor(
        totalSeconds,
      ),
    );

  const minutes =
    Math.floor(
      safeSeconds /
        60,
    );

  const seconds =
    safeSeconds %
    60;

  return `${minutes
    .toString()
    .padStart(
      2,
      "0",
    )}:${seconds.toString()
    .padStart(
      2,
      "0",
    )}`;
}

function formatFileSize(
  bytes:
    number,
): string {
  if (
    bytes <
    1024
  ) {
    return `${bytes} B`;
  }

  if (
    bytes <
    1024 *
      1024
  ) {
    return `${(
      bytes /
      1024
    ).toFixed(
      1,
    )} KB`;
  }

  return `${(
    bytes /
    (
      1024 *
      1024    )
  ).toFixed(
    1,
  )} MB`;
}

function getStatusLabel(
  status:
    ReturnType<
      typeof useAudioRecorder
    >["status"],
): string {
  switch (
    status
  ) {
    case "requesting_permission":
      return "در انتظار اجازه میکروفون";

    case "recording":
      return "در حال ضبط";

    case "paused":
      return "ضبط متوقف موقت";

    case "stopped":
      return "فایل آماده تحلیل";

    case "error":
      return "خطا در ضبط";

    default:
      return "آماده ضبط";
  }
}

export function VoiceRecorder({
  maxDurationSeconds =
    120,minimumUsefulDurationSeconds =
    2,

  onRecordingReady,

  onRecordingCleared,
}: VoiceRecorderProps) {
  const {
    status,

    elapsedSeconds,

    inputLevel,

    recording,

    errorMessage,

    isSupported,

    isSecureContext,

    startRecording,

    pauseRecording,

    resumeRecording,

    stopRecording,

    resetRecording,
  } =
    useAudioRecorder(
      maxDurationSeconds,
    );

  const isRecording =
    status ===
    "recording";

  const isPaused =
    status ===
    "paused";

  const isRequestingPermission =
    status ===
    "requesting_permission";

  useEffect(() => {
    if (!recording) {
      return;
    }

    onRecordingReady?.(
      recording,
    );
  }, [
    onRecordingReady,
    recording,
  ]);

  function handleReset(): void {
    resetRecording();onRecordingCleared?.();
  }

  if (
    isSupported ===
      null ||
    isSecureContext ===
      null
  ) {
    return (
      <Card className="p-6">
        <div
          className="
            flex items-center
            gap-3
            text-slate-400
          "
        >
          <LoaderCircle
            aria-hidden="true"
            className="
              h-5 w-5
              animate-spin
            "
          />

          در حال بررسی وضعیت میکروفون...
        </div>
      </Card>
    );
  }

  if (
    !isSupported ||
    !isSecureContext
  ) {
    return (<Card
        className="
          border-red-400/15
          p-6
        "
      >
        <h2
          className="
            text-lg
            font-bold
            text-white
          "
        >
          امکان ضبط صدا وجود ندارد
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-slate-400
          "
        >
          مرورگر باید از MediaRecorder پشتیبانی کند و صفحه باید روی HTTPS یا localhost اجرا شود.
        </p>
      </Card>
    );
  }

  const recordingTooShort =
    recording
      ? recording.durationSeconds <
        minimumUsefulDurationSeconds
      : false;

  return (
    <Card
      className="
        relative
        overflow-hidden
        p-6
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                font-mediumtext-cyan-300
              "
            >
              <AudioLines
                aria-hidden="true"
                className="h-4 w-4"
              />

              ضبط پاسخ صوتی
            </div>

            <p
              className="
                mt-1
                text-xs
                leading-6
                text-slate-600
              "
            >
              صدای واضح و طبیعی ضبط کن؛ لازم نیست خیلی آهسته صحبت کنی.
            </p>
          </div>

          <span
            className={cn(
              "rounded-full",
              "border",
              "px-3 py-1",
              "text-xs",
              "font-medium",

              isRecording
                ? [
                    "border-red-400/20",
                    "bg-red-400/10",
                    "text-red-200",
                  ]
                : [
                     "border-white/[0.07]",
                    "bg-white/[0.03]",
                    "text-slate-400",
                  ],
            )}
          >
            {getStatusLabel(
              status,
            )}
          </span>
        </div>

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className={cn(
              "relative",
              "flex",
              "h-24 w-24",
              "items-center",
              "justify-center",
              "rounded-full",
              "border",
              "transition",
              "duration-300",

              isRecording
                ? [
                    "border-red-300/30",
                    "bg-red-400/15",
                    "text-red-300",
                                     "shadow-[0_0_50px_rgba(248,113,113,0.18)]",
                  ]
                : [
                    "border-cyan-300/20",
                    "bg-cyan-400/10",
                    "text-cyan-300",
                  ],
            )}
          >
            {isRecording ? (
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  animate-ping
                  rounded-full
                  border
                  border-red-400/20
                "
              />
            ) : null}

            <Mic2
              aria-hidden="true"
              className="
                relative
                h-9 w-9
              "
            />
          </div>

          <p
            className="
              mt-6
              text-3xl
              font-bold
              tabular-nums
              text-white
            "
          >
            {formatDuration(
              elapsedSeconds,
            )}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {Number.isFinite(
              maxDurationSeconds,
            )
              ? `حداکثر ${formatDuration(
                  maxDurationSeconds,
                )}`
              : "بدون محدودیت زمانی"}
          </p>

          <div
            aria-label="سطح ورودی میکروفون"
            className="
              mt-6
              flex
              h-12
              items-center
              justify-center
              gap-1
            "
          >
            {WAVE_FACTORS.map(
              (
                factor,
                index,
              ) => {
                const height =
                  isRecording
                    ? Math.max(
                        6,
                        Math.round(
                          6 +
                            inputLevel *
                              38 *
                              factor,
                        ),
                      )
                    : 6;

                return (
                  <span
                    key={`${factor}-${index}`}
                    aria-hidden="true"
                    className={cn(
                      "w-1",
                      "rounded-full",
                      "transition-[height,background-color]",
                      "duration-75",

                      isRecording
                        ? "bg-cyan-300"
                        : "bg-cyan-300/30",
                    )}
                    style={{
                      height:
                        `${height}px`,
                    }}
                  />
                ); },
            )}
          </div>

          {isRecording ? (
            <p
              className="
                mt-2
                text-xs
                text-slate-600
              "
            >
              شدت ورودی میکروفون:{" "}
              {Math.round(
                inputLevel *
                  100,
              )}
              ٪
            </p>
          ) : null}
        </div>

        {errorMessage ? (
          <div
            role="alert"
            className="
              mt-6
              rounded-xl
              border
              border-red-400/15
              bg-red-400/[0.06]
              px-4
              py-3
              text-sm
              leading-7
              text-red-200
            "
          >
            {errorMessage}
          </div>
        ) : null}

        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >
          {status ===
            "idle" ||
          status ===
            "error" ? (
            <button
              type="button"
              onClick={() => {
                void startRecording();
              }}
              disabled={
                isRequestingPermission
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-cyan-400
                px-6
                py-2.5
                text-sm
                font-bold
                text-slate-950transition
                hover:bg-cyan-300
                disabled:cursor-wait
                disabled:opacity-60
              "
            >
              {isRequestingPermission ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    animate-spin
                  "
                />
              ) : (
                <Mic2
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}

              {isRequestingPermission
                ? "در انتظار اجازه..."
                : "شروع ضبط"}
            </button>
          ) : null}

          {isRecording ? (
            <>
              <button
                type="button"
                onClick={
                  pauseRecording
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                <Pause
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                مکث
              </button>

              <button
                type="button"
                onClick={
                  stopRecording
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-400
                  px-5py-2.5
                  text-sm
                  font-bold
                  text-slate-950
                  transition
                  hover:bg-red-300
                "
              >
                <CircleStop
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                پایان ضبط
              </button>
            </>
          ) : null}

          {isPaused ? (
            <>
              <button
                type="button"
                onClick={
                  resumeRecording
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-cyan-400
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-950
                "
              >
                <Play
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                ادامه ضبط
              </button>

              <button
                type="button"
                onClick={
                  stopRecording
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-400/20
                  bg-red-400/10
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-red-200
                "
              >
                <CircleStop
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                 پایان ضبط
              </button>
            </>
          ) : null}
        </div>

        {recording ? (
          <div
            className="
              mt-7
              rounded-2xl
              border
              border-emerald-400/15
              bg-emerald-400/[0.05]
              p-4
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-emerald-200
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4w-4"
                />

                صدای شما با موفقیت ضبط شد
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  text-[11px]
                  text-slate-500
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                  "
                >
                  <Clock3
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />

                  {recording.durationSeconds.toFixed(
                    1,
                  )}
                  s
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                  ">
                  <FileAudio2
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />

                  {formatFileSize(
                    recording.sizeBytes,
                  )}
                </span>
              </div>
            </div>

            <audio
              controls
              preload="metadata"
              src={
                recording.url
              }
              className="
                mt-4
                w-full
              "
            >
              مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
            </audio>

            {recordingTooShort ? (
              <p
                className="
                  mt-3
                  text-xs
                  leading-6
                  text-amber-300
                "
              >
                این ضبط خیلی کوتاه است. برای تحلیل بهتر حداقل{" "}
                {minimumUsefulDurationSeconds}{" "}
                                ثانیه صحبت کن.
</p>
            ) : null}

            <button
              type="button"
              onClick={
                handleReset
              }
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-400
                transition
                hover:text-white
              "
            >
              <RefreshCcw
                aria-hidden="true"
                className="h-4 w-4"
              />

              ضبط مجدد
            </button>
          </div>
        ) : null}

        <p
          className="
            mt-6
            flex
            items-startjustify-center
            gap-2
            text-center
            text-xs
            leading-6
            text-slate-600
          "
        >
          <ShieldCheck
            aria-hidden="true"
            className="
              mt-1
              h-3.5
              w-3.5
              shrink-0
            "
          />

          فایل صوتی تا قبل از زدن دکمه تحلیل داخل مرورگر باقی می‌ماند.
        </p>
      </div>
    </Card>
  );
}