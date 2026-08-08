"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  CircleAlert,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingAudioStatus,
  ReadingTextBlock,
} from "../../types/reading.types";

import {
  READING_PLAYBACK_RATE_OPTIONS,
  type ReadingPlaybackRate,
  type ReadingPlaybackState,
} from "./reading-workspace.types";

type ReadingAudioControlsProps =
  Readonly<{
    title: string;

    languageCode: string;

    audioStatus: ReadingAudioStatus;

    audioUrl: string | null;

    content: readonly ReadingTextBlock[];
  }>;

function getSpeechLanguage(
  languageCode: string,
): string {
  const normalizedLanguageCode =
    languageCode
      .trim()
      .toLowerCase();

  if (
    normalizedLanguageCode === "en"
  ) {
    return "en-US";
  }

  if (
    normalizedLanguageCode === "fa"
  ) {
    return "fa-IR";
  }

  return languageCode;
}

function buildSpeechText(
  content: readonly ReadingTextBlock[],
): string {
  return [...content]
    .sort(
      (first, second) =>
        first.order - second.order,
    )
    .map((block) => block.text)
    .join(" ");
}

export function ReadingAudioControls({
  title,
  languageCode,
  audioStatus,
  audioUrl,
  content,
}: ReadingAudioControlsProps) {
  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const utteranceRef =
    useRef<SpeechSynthesisUtterance | null>(
      null,
    );

  const [
    playbackState,
    setPlaybackState,
  ] =
    useState<ReadingPlaybackState>(
      "idle",
    );

  const [
    playbackRate,
    setPlaybackRate,
  ] =
    useState<ReadingPlaybackRate>(
      1,
    );

  const [
    supportsSpeechSynthesis,
    setSupportsSpeechSynthesis,
  ] = useState(false);

  const [
    playbackError,
    setPlaybackError,
  ] =
    useState<string | null>(
      null,
    );

  const speechText = useMemo(
    () => buildSpeechText(content),
    [content],
  );

  const usesGeneratedAudio =
    Boolean(audioUrl);

  const canUseAudio =
    audioStatus === "ready" &&
    (usesGeneratedAudio ||
      supportsSpeechSynthesis);

  const resetPlaybackState =
    useCallback((): void => {
      setPlaybackState("idle");
    }, []);

  useEffect(() => {
    const isSupported =
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in
        window;

    setSupportsSpeechSynthesis(
      isSupported,
    );
  }, []);

  useEffect(() => {
    const currentAudio =
      audioRef.current;

    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }

      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }

      utteranceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const currentAudio =
      audioRef.current;

    if (!currentAudio) {
      return;
    }

    currentAudio.playbackRate =
      playbackRate;
  }, [playbackRate]);

  const playGeneratedAudio =
    useCallback(
      async (): Promise<void> => {
        const currentAudio =
          audioRef.current;

        if (!currentAudio) {
          setPlaybackError(
            "فایل صوتی برای پخش آماده نیست.",
          );

          return;
        }

        currentAudio.playbackRate =
          playbackRate;

        try {
          await currentAudio.play();

          setPlaybackState(
            "playing",
          );

          setPlaybackError(null);
        } catch {
          setPlaybackState("idle");

          setPlaybackError(
            "مرورگر اجازه پخش فایل صوتی را نداد. دوباره تلاش کن.",
          );
        }
      },
      [playbackRate],
    );

  const playBrowserSpeech =
    useCallback((): void => {
      if (
        !supportsSpeechSynthesis
      ) {
        setPlaybackError(
          "مرورگر فعلی از خواندن خودکار متن پشتیبانی نمی‌کند.",
        );

        return;
      }

      const speechEngine =
        window.speechSynthesis;

      if (
        playbackState === "paused" &&
        speechEngine.paused
      ) {
        speechEngine.resume();

        setPlaybackState(
          "playing",
        );

        setPlaybackError(null);

        return;
      }

      speechEngine.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          speechText,
        );

      utterance.lang =
        getSpeechLanguage(
          languageCode,
        );

      utterance.rate =
        playbackRate;

      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        utteranceRef.current = null;

        resetPlaybackState();
      };

      utterance.onerror = (
        event,
      ) => {
        utteranceRef.current = null;

        resetPlaybackState();

        if (
          event.error !==
            "interrupted" &&
          event.error !==
            "canceled"
        ) {
          setPlaybackError(
            "خواندن متن با خطا متوقف شد.",
          );
        }
      };

      utteranceRef.current =
        utterance;

      speechEngine.speak(
        utterance,
      );

      setPlaybackState("playing");
      setPlaybackError(null);
    }, [
      languageCode,
      playbackRate,
      playbackState,
      resetPlaybackState,
      speechText,
      supportsSpeechSynthesis,
    ]);

  const handlePlay =
    useCallback(async (): Promise<void> => {
      if (!canUseAudio) {
        setPlaybackError(
          audioStatus === "ready"
            ? "امکان پخش صوت در این مرورگر وجود ندارد."
            : "صوت این بخش هنوز آماده نشده است.",
        );

        return;
      }

      if (usesGeneratedAudio) {
        await playGeneratedAudio();

        return;
      }

      playBrowserSpeech();
    }, [
      audioStatus,
      canUseAudio,
      playBrowserSpeech,
      playGeneratedAudio,
      usesGeneratedAudio,
    ]);

  const handlePause =
    useCallback((): void => {
      if (usesGeneratedAudio) {
        audioRef.current?.pause();
      } else if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.pause();
      }

      setPlaybackState("paused");
    }, [usesGeneratedAudio]);

  const handleStop =
    useCallback((): void => {
      if (usesGeneratedAudio) {
        const currentAudio =
          audioRef.current;

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      } else if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }

      utteranceRef.current = null;

      setPlaybackState("idle");
    }, [usesGeneratedAudio]);

  const handleRestart =
    useCallback(async (): Promise<void> => {
      handleStop();

      await new Promise<void>(
        (resolve) => {
          window.setTimeout(
            resolve,
            40,
          );
        },
      );

      await handlePlay();
    }, [
      handlePlay,
      handleStop,
    ]);

  const handleRateChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    const selectedRate =
      Number(
        event.target.value,
      ) as ReadingPlaybackRate;

    const isSupportedRate =
      READING_PLAYBACK_RATE_OPTIONS.includes(
        selectedRate,
      );

    if (!isSupportedRate) {
      return;
    }

    setPlaybackRate(
      selectedRate,
    );
  };

  return (
    <Card className="p-5 sm:p-6">
      {audioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onPlay={() => {
            setPlaybackState(
              "playing",
            );
          }}
          onPause={() => {
            setPlaybackState(
              (currentState) =>
                currentState ===
                "idle"
                  ? "idle"
                  : "paused",
            );
          }}
          onEnded={
            resetPlaybackState
          }
          onError={() => {
            setPlaybackState("idle");

            setPlaybackError(
              "فایل صوتی این بخش بارگذاری نشد.",
            );
          }}
        >
          مرورگر شما از پخش صوت
          پشتیبانی نمی‌کند.
        </audio>
      ) : null}

      <div
        className="
          flex flex-col gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="flex items-start gap-3">
          <span
            className="
              flex h-11 w-11
              shrink-0 items-center
              justify-center
              rounded-xl
              bg-violet-400/10
              text-violet-300
            "
          >
            <Volume2
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <h2 className="font-bold text-white">
              صوت بخش
            </h2>

            <p className="mt-1 text-xs leading-6 text-slate-500">
              {usesGeneratedAudio
                ? "فایل صوتی تولیدشده برای این بخش"
                : "خواندن متن با موتور صوتی مرورگر"}
            </p>

            <p
              className="
                mt-1 max-w-xl
                truncate text-xs
                text-slate-600
              "
              dir="ltr"
            >
              {title}
            </p>
          </div>
        </div>

        <div
          className="
            flex flex-wrap
            items-center gap-2
          "
        >
          {playbackState ===
          "playing" ? (
            <button
              type="button"
              onClick={handlePause}
              className="
                inline-flex min-h-11
                items-center gap-2
                rounded-xl
                bg-amber-400
                px-4 py-2.5
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-amber-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-200
              "
            >
              <Pause
                aria-hidden="true"
                className="h-4 w-4"
              />

              توقف موقت
            </button>
          ) : (
            <button
              type="button"
              disabled={!canUseAudio}
              onClick={() => {
                void handlePlay();
              }}
              className="
                inline-flex min-h-11
                items-center gap-2
                rounded-xl
                bg-cyan-400
                px-4 py-2.5
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-40
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-200
              "
            >
              <Play
                aria-hidden="true"
                className="h-4 w-4"
              />

              {playbackState ===
              "paused"
                ? "ادامه پخش"
                : "شروع پخش"}
            </button>
          )}

          <button
            type="button"
            disabled={
              playbackState === "idle"
            }
            onClick={handleStop}
            className="
              inline-flex min-h-11
              items-center gap-2
              rounded-xl border
              border-white/[0.08]
              bg-white/[0.035]
              px-3 py-2.5
              text-sm text-slate-400
              transition
              hover:bg-white/[0.07]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-35
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
            "
          >
            <Square
              aria-hidden="true"
              className="h-4 w-4"
            />

            پایان
          </button>

          <button
            type="button"
            disabled={!canUseAudio}
            onClick={() => {
              void handleRestart();
            }}
            className="
              inline-flex h-11 w-11
              items-center justify-center
              rounded-xl border
              border-white/[0.08]
              bg-white/[0.035]
              text-slate-400
              transition
              hover:bg-white/[0.07]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-35
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
            "
            aria-label="شروع مجدد صوت"
          >
            <RotateCcw
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>

          <label
            className="
              inline-flex min-h-11
              items-center gap-2
              rounded-xl border
              border-white/[0.08]
              bg-white/[0.035]
              px-3 text-xs
              text-slate-400
            "
          >
            <Gauge
              aria-hidden="true"
              className="h-4 w-4"
            />

            <span>سرعت</span>

            <select
              value={playbackRate}
              onChange={
                handleRateChange
              }
              aria-label="سرعت پخش صوت"
              className="
                bg-transparent
                text-sm font-medium
                text-white outline-none
              "
            >
              {READING_PLAYBACK_RATE_OPTIONS.map(
                (rate) => (
                  <option
                    key={rate}
                    value={rate}
                    className="
                      bg-slate-900
                      text-white
                    "
                  >
                    {rate}x
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </div>

      <div
        className={cn(
          "mt-5 rounded-xl",
          "border px-4 py-3",
          "text-xs leading-6",

          playbackState ===
            "playing"
            ? [
                "border-emerald-400/15",
                "bg-emerald-400/[0.05]",
                "text-emerald-200",
              ]
            : [
                "border-white/[0.06]",
                "bg-white/[0.02]",
                "text-slate-500",
              ],
        )}
        aria-live="polite"
      >
        {playbackState ===
        "playing"
          ? "صوت در حال پخش است."
          : playbackState ===
              "paused"
            ? "پخش صوت متوقف شده است."
            : "برای شنیدن متن، دکمه شروع پخش را انتخاب کن."}
      </div>

      {playbackError ? (
        <div
          role="alert"
          className="
            mt-4 flex items-start
            gap-2 rounded-xl
            border border-red-400/15
            bg-red-400/[0.05]
            px-4 py-3
            text-xs leading-6
            text-red-200
          "
        >
          <CircleAlert
            aria-hidden="true"
            className="
              mt-0.5 h-4 w-4
              shrink-0
            "
          />

          {playbackError}
        </div>
      ) : null}
    </Card>
  );
}