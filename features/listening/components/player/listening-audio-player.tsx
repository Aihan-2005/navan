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
  );

function formatDuration(
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
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white
        p-5
        shadow-[0_8px_28px_rgba(15,23,42,0.045)]
        sm:p-6
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
          bg-[#14B8A6]/10
          blur-3xl
        "
      />

      <audio
        ref={audioRef}
        src={audioUrl}
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
                font-black
                text-[#00685F]
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
                font-black
                text-[#172321]
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
                border-[#B8DDD7]
                bg-[#EEF9F7]
                px-3
                py-1.5
                text-[11px]
                font-medium
                text-[#00685F]
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
          <PlayerAction
            label="پنج ثانیه عقب"
            disabled={
              !isReady
            }
            onClick={() => {
              seekBy(
                -5,
              );
            }}
          >
            <RotateCcw
              aria-hidden="true"
              className="h-5 w-5"
            />
          </PlayerAction>

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
              bg-[#00685F]
              text-white
              shadow-[0_10px_24px_rgba(0,104,95,0.22)]
              transition
              hover:scale-105
              hover:bg-[#005A52]
              disabled:cursor-not-allowed
              disabled:opacity-40
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

          <PlayerAction
            label="پنج ثانیه جلو"
            disabled={
              !isReady
            }
            onClick={() => {
              seekBy(
                5,
              );
            }}
          >
            <RotateCw
              aria-hidden="true"
              className="h-5 w-5"
            />
          </PlayerAction>
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
              accent-[#00685F]
              disabled:cursor-not-allowed
            "
            dir="ltr"
          />

          <div
            dir="ltr"
            className="
              mt-2
              flex
              items-center
              justify-between
              text-xs
              tabular-nums
              text-[#64748B]
            "
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

        <div
          className="
            mt-5
            h-1.5
            overflow-hidden
            rounded-full
            bg-[#E7EFED]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-[linear-gradient(90deg,#0D9488,#7C3AED)]
              transition-[width]
            "
            style={{
              width:
                `${progressPercent}%`,
            }}
          />
        </div>

        <div
          className="
            mt-6
            grid
            gap-5
            border-t
            border-[#E5ECEA]
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
                font-medium
                text-[#64748B]
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
                    <button
                      key={speed}
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
                        "font-bold",
                        "transition",

                        active
                          ? [
                              "border-[#A9D4CD]",
                              "bg-[#E7F4F2]",
                              "text-[#00685F]",
                            ]
                          : [
                              "border-[#DCE4E2]",
                              "bg-white",
                              "text-[#64748B]",
                              "hover:bg-[#F8FAF9]",
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
                font-medium
                text-[#64748B]
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
                mt-3
                flex
                items-center
                gap-3
              "
            >
              <button
                type="button"
                onClick={
                  toggleMute
                }
                aria-label={
                  isMuted
                    ? "فعال کردن صدا"
                    : "بی‌صدا کردن"
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
                  border-[#DCE4E2]
                  bg-white
                  text-[#52615F]
                  transition
                  hover:bg-[#F8FAF9]
                  hover:text-[#00685F]
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
                  accent-[#00685F]
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
              border-[#FECACA]
              bg-[#FEF2F2]
              px-4
              py-3
              text-sm
              leading-6
              text-[#B91C1C]
            "
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PlayerAction({
  label,
  disabled,
  onClick,
  children,
}: Readonly<{
  label:
    string;

  disabled:
    boolean;

  onClick:
    () => void;

  children:
    React.ReactNode;
}>) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-[#DCE4E2]
        bg-[#F8FAF9]
        text-[#52615F]
        transition
        hover:border-[#ABD4CE]
        hover:bg-[#EEF8F6]
        hover:text-[#00685F]
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      {children}
    </button>
  );
}

