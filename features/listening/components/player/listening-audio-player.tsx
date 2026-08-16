"use client";

import {
  useEffect,
} from "react";

import {
  Gauge,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  LISTENING_PLAYBACK_SPEEDS,
} from "../../constants/listening.constants";

import {
  useAudioPlayer,
} from "../../hooks/use-audio-player";

import type {
  ListeningPlaybackSnapshot,
} from "../../types/listening.types";

type ListeningAudioPlayerVariant =
  | "practice"
  | "listen_only";

type ListeningAudioPlayerProps =
  Readonly<{
    audioUrl:
      string;

    title:
      string;

    variant?:
      ListeningAudioPlayerVariant;

    onPlaybackSnapshot?:
      (
        snapshot:
          ListeningPlaybackSnapshot,
      ) => void;

    onEnded?:
      () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );function formatDuration(
  totalSeconds:
    number,
): string {
  if (
    !Number.isFinite(
      totalSeconds,
    ) ||
    totalSeconds <
      0
  ) {
    return "۰۰:۰۰";
  }

  const roundedSeconds =
    Math.floor(
      totalSeconds,
    );

  const minutes =
    Math.floor(
      roundedSeconds /
        60,
    );

  const seconds =
    roundedSeconds %
    60;

  return `${numberFormatter
    .format(
      minutes,
    )
    .padStart(
      2,
      "۰",
    )}:${numberFormatter
    .format(
      seconds,
    )
    .padStart(
      2,
      "۰",
    )}`;
}

export function ListeningAudioPlayer({
  audioUrl,
  title,
  variant =
    "practice",
  onPlaybackSnapshot,
  onEnded,
}: ListeningAudioPlayerProps) {
  const {
    audioRef,

    isPlaying,
    isReady,

    currentTime,
     duration,

    playbackRate,

    volume,
    isMuted,

    errorMessage,

    togglePlayback,
    seekTo,
    seekBy,

    updatePlaybackRate,
    updateVolume,
    toggleMute,

    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleEnded,
    handleError,
  } =
    useAudioPlayer({
      src:
        audioUrl,
    });

  const progressMaximum =
    duration >
    0
      ? duration
      : 1;

  const progressPercent =
    duration >
    0
      ? Math.min(
          100,
          Math.max(
            0,
            (
              currentTime /
              duration
            ) *
              100,
          ),
        )
      : 0;

  useEffect(() => {
    onPlaybackSnapshot?.({
      isReady,
 isPlaying,

      currentTime,

      duration,

      playbackRate,

      progressPercent,
    });
  }, [
    currentTime,
    duration,
    isPlaying,
    isReady,
    onPlaybackSnapshot,
    playbackRate,
    progressPercent,
  ]);

  function handleAudioEnded(): void {
    handleEnded();

    onEnded?.();
  }

  const isListenOnly =
    variant ===
    "listen_only";

  return (
    <Card
      className={cn(
        "relative",
        "overflow-hidden",
        "p-5 sm:p-6",

        isListenOnly &&
          "border-cyan-400/20",
      )}
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

      <audio
        ref={
          audioRef
        }
        src={
          audioUrl
        }
        preload="metadata"
        onLoadedMetadata={
                    handleLoadedMetadata
  }
        onTimeUpdate={
          handleTimeUpdate
        }
        onPlay={
          handlePlay
        }
        onPause={
          handlePause
        }
        onEnded={
          handleAudioEnded
        }
        onError={
          handleError
        }
      >
        مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
      </audio>

      <div className="relative">
        <div
          className="
            flex
            flex-wrap
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-medium
                text-cyan-300
              "
            >
              <Headphones
                aria-hidden="true"
                className="h-4 w-4"
              />

              {isListenOnly
                ? "جلسه شنیدن متمرکز"
                : "فایل تمرین"}
            </div>
  <h2
              className="
                mt-2
                text-lg
                font-bold
                text-white
              "
            >
              {title}
            </h2>
          </div>

          {isListenOnly ? (
            <span
              className="
                rounded-full
                border
                border-cyan-400/15
                bg-cyan-400/[0.06]
                px-3
                py-1.5
                text-[11px]
                text-cyan-200
              "
            >
              بدون Transcript اجباری
            </span>
          ) : null}
        </div>

        <div
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <button
            type="button"
            onClick={() => {
              seekBy(
                -5,
              );
            }}
            disabled={
              !isReady
            }
            aria-label="پنج ثانیه عقب"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.04]
              text-slate-300
              transition
              hover:bg-white/[0.08]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >  <RotateCcw
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              void togglePlayback();
            }}
            disabled={
              !isReady
            }
            aria-label={
              isPlaying
                ? "توقف پخش"
                : "شروع پخش"
            }
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-cyan-300
              text-slate-950
              shadow-lg
              shadow-cyan-950/30
              transition
              hover:scale-105
              hover:bg-cyan-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isPlaying ? (
              <Pause
                aria-hidden="true"
                className="h-7 w-7"
              />
            ) : (
              <Play
                aria-hidden="true"
                className="
                  mr-0.5
                  h-7
                  w-7
                "
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              seekBy(
                5,
              ); }}
            disabled={
              !isReady
            }
            aria-label="پنج ثانیه جلو"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.04]
              text-slate-300
              transition
              hover:bg-white/[0.08]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <RotateCw
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div className="mt-7">
          <input
            type="range"
            min={0}
            max={
              progressMaximum
            }
            step={0.1}
            value={Math.min(
              currentTime,
              progressMaximum,
            )}
            disabled={
              !isReady
            }
            onChange={(
              event,
            ) => {
              seekTo(
                Number(
                  event.target
                    .value,
                ),
              );
            }}
            aria-label="موقعیت پخش صوت"
            className="
              h-2
              w-full
              cursor-pointer
              accent-cyan-300
              disabled:cursor-not-allowed
            "
            dir="ltr"
          />

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
              text-xs
              tabular-nums
              text-slate-500
            "
            dir="ltr"
          >
            <span>
              {formatDuration(
                currentTime,
              )}
            </span>

            <span>
              {formatDuration(
                duration,
              )}
            </span>
          </div>
        </div>

        {isListenOnly ? (
          <div
            className="
              mt-5
              h-1.5
              overflow-hidden
              rounded-full
              bg-white/[0.05]
            "
            aria-label="پوشش فایل"
          >
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                 from-cyan-400
                to-violet-400
                transition-[width]
              "
              style={{
                width:
                  `${progressPercent}%`,
              }}
            />
          </div>
        ) : null}

        <div
          className="
            mt-6
            grid
            gap-5
            border-t
            border-white/[0.06]
            pt-5
            sm:grid-cols-2
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              <Gauge
                aria-hidden="true"
                className="h-4 w-4"
              />

              سرعت پخش
            </div>

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-2
              "
            >
              {LISTENING_PLAYBACK_SPEEDS.map(
                (
                  speed,
                ) => {
                  const active =
                    playbackRate ===
                    speed;

                  return (
                    <button key={
                        speed
                      }
                      type="button"
                      onClick={() => {
                        updatePlaybackRate(
                          speed,
                        );
                      }}
                      className={cn(
                        "rounded-lg",
                        "border",
                        "px-3",
                        "py-1.5",
                        "text-xs",
                        "transition",

                        active
                          ? [
                              "border-cyan-300/30",
                              "bg-cyan-400/10",
                              "text-cyan-200",
                            ]
                          : [
                              "border-white/[0.06]",
                              "bg-white/[0.025]",
                              "text-slate-500",
                              "hover:bg-white/[0.05]",
                            ],
                      )}
                    >
                      {speed}×
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              {isMuted ? (
                <VolumeX
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              ) : (
                <Volume2
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}

              حجم صدا
            </div>

            <div
              className="
                mt-3 flex
                items-center
                gap-3
              "
            >
              <button
                type="button"
                onClick={
                  toggleMute
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  text-slate-400
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                "
                aria-label={
                  isMuted
                    ? "فعال کردن صدا"
                    : "بی‌صدا کردن"
                }
              >
                {isMuted ? (
                  <VolumeX
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                ) : (
                  <Volume2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={
                  isMuted
                    ? 0
                    : volume
                }
                onChange={(
                  event,
                ) => {
                  updateVolume(
                    Number(
                      event.target
                        .value,
                    ),
                  );
                }}
                aria-label="حجم صدا"
                 className="
                  h-2
                  w-full
                  cursor-pointer
                  accent-cyan-300
                "
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div
            role="alert"
            className="
              mt-5
              rounded-xl
              border
              border-red-400/15
              bg-red-400/[0.05]
              px-4
              py-3
              text-sm
              leading-6
              text-red-200
            "
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </Card>
  );
}