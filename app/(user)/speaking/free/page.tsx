"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  LoaderCircle,
  Send,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  analyzeSpeakingTurn,
} from "../../../../features/speaking/api/analyze-speaking-turn";

import {
  SpeakingTurnAnalysisPanel,
} from "../../../../features/speaking/components/speaking-turn-analysis-panel";

import {
  VoiceRecorder,
} from "../../../../features/speaking/components/voice-recorder";

import type {
  RecordedAudio,
} from "../../../../features/speaking/types/speaking.types";

import type {
  SpeakingTurnAnalysis,
} from "../../../../features/speaking/types/speaking-turn.types";

export default function FreeSpeakingPage() {
  const [
    recording,
    setRecording,
  ] =
    useState<RecordedAudio | null>(
      null,
    );

  const [
    analyses,
    setAnalyses,
  ] =
    useState<SpeakingTurnAnalysis[]>(
      [],
    );

  const [
    isAnalyzing,
    setIsAnalyzing,
  ] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const handleRecordingReady =
    useCallback(
      (
        recordedAudio:
          RecordedAudio,
      ) => {
        setRecording(
          recordedAudio,
        );

        setErrorMessage(
          null,
        );
      },
      [],
    );

  const handleRecordingCleared =
    useCallback(
      () => {
        setRecording(
          null,
        );

        setErrorMessage(
          null,
        );
      },
      [],
    );

  async function handleAnalyze(): Promise<void> {
    if (
      !recording ||
      isAnalyzing
    ) {
      return;
    }

    if (
      recording.durationSeconds <
      2
    ) {
      setErrorMessage(
        "حداقل ۲ ثانیه صحبت کن تا پاسخ قابل تحلیل باشد.",
      );

      return;
    }

    setIsAnalyzing(
      true,
    );

    setErrorMessage(
      null,
    );

    try {
      const previous =
        analyses[
          analyses.length -
            1
        ];

      const result =
        await analyzeSpeakingTurn({
          recording,

          mode:
            "free",

          scenarioId:
            null,

          turnIndex:
            analyses.length +
            1,

          previousTurnId:
            previous?.turnId ??
            null,
        });

      setAnalyses(
        (
          current,
        ) => [
          ...current,
          result,
        ],
      );
    } catch (
      error
    ) {
      console.error(
        "Free speaking analysis failed:",
        error,
      );

      setErrorMessage(
        error instanceof
          Error
          ? error.message
          : "تحلیل مکالمه ناموفق بود.",
      );
    } finally {
      setIsAnalyzing(
        false,
      );
    }
  }

  const latestAnalysis =
    analyses.length >
    0
      ? analyses[
          analyses.length -
            1
        ]
      : null;

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
        px-6
        py-8
        sm:px-8
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/15
          bg-slate-950/80
          p-8
          shadow-2xl
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            max-w-3xl
          "
        >
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-300
            "
          >
            گفت‌وگوی آزاد
          </p>

          <h1
            className="
              mt-4
              text-3xl
              font-bold
              text-white
              sm:text-4xl
            "
          >
            درباره هر موضوعی که دوست داری صحبت کن
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-slate-400
            "
          >
            صدایت را ضبط کن. بعد از پایان ضبط، سیستم Transcript، روانی، تلفظ، گرامر، واژگان و ساختار پاسخ را بررسی می‌کند و مربی AI برای ادامه مکالمه پاسخ می‌دهد.
          </p>
        </div>
      </section>

      <section
        className="
          rounded-3xl
          border
          border-white/[0.06]
          bg-slate-950/80
          p-6
          shadow-lg
        "
      >
        <div
          className="
            grid
            gap-6
            xl:grid-cols-[1.8fr_1fr]
          "
        >
          <div className="space-y-6">
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-cyan-300
                  "
                >
                  ضبط آزاد
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-400
                  "
                >
                  بدون متن اجباری؛ طبیعی صحبت کن و سعی کن ایده‌ات را کامل توضیح بدهی.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.05]
                  px-4
                  py-2
                  text-xs
                  text-slate-300
                "
              >
                نوبت{" "}
                {analyses.length +
                  1}
              </div>
            </div>

            <VoiceRecorder
              maxDurationSeconds={
                300
              }
              minimumUsefulDurationSeconds={
                2
              }
              onRecordingReady={
                handleRecordingReady
              }
              onRecordingCleared={
                handleRecordingCleared
              }
            />

            <Card className="p-6">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-violet-300
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                <h2
                  className="
                    font-bold
                    text-white
                  "
                >
                  تحلیل گفت‌وگوی آزاد
                </h2>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                برخلاف Scenario، اینجا AI روی کیفیت کلی بیان، پیوستگی ایده‌ها، طبیعی بودن زبان و توانایی ادامه گفتگو تمرکز می‌کند.
              </p>

              {recording ? (
                <button
                  type="button"
                  disabled={
                    isAnalyzing ||
                    recording.durationSeconds <
                      2
                  }
                  onClick={() => {
                    void handleAnalyze();
                  }}
                  className="
                    mt-5
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-violet-400
                    px-5
                    text-sm
                    font-bold
                    text-slate-950
                    transition
                    hover:bg-violet-300
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isAnalyzing ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="
                        h-4 w-4
                        animate-spin
                      "
                    />
                  ) : (
                    <Send
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  )}

                  {isAnalyzing
                    ? "در حال تحلیل..."
                    : "تحلیل و دریافت پاسخ AI"}
                </button>
              ) : (
                <p
                  className="
                    mt-5
                    text-xs
                    text-slate-600
                  "
                >
                  بعد از ضبط، دکمه تحلیل فعال می‌شود.
                </p>
              )}

              {errorMessage ? (
                <div
                  role="alert"
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-red-400/15
                    bg-red-400/[0.05]
                    px-4
                    py-3
                    text-sm
                    text-red-200
                  "
                >
                  {errorMessage}
                </div>
              ) : null}
            </Card>
          </div>

          <Card
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-slate-950/90
              p-6
              shadow-lg
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-cyan-300
                  "
                >
                  موضوع روزانه
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-400
                  "
                >
                  چند سؤال برای شروع مکالمه.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-cyan-400/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-cyan-200
                "
              >
                تمرین سریع
              </div>
            </div>

            <div
              className="
                mt-6
                space-y-4
              "
            >
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.05]
                  p-4
                  text-sm
                  text-slate-200
                "
              >
                <p
                  className="
                    font-semibold
                    text-white
                  "
                >
                  پیشنهاد برای شروع:
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-slate-300
                  "
                >
                  درباره هدف‌های شخصی، اتفاق مهم امروز یا چیزی که این هفته یاد گرفته‌ای صحبت کن.
                </p>
              </div>

              <div
                className="
                  space-y-3
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.05]
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                  "
                >
                  Start with:
                </p>

                <div
                  dir="ltr"
                  className="
                    space-y-3
                    text-sm
                    text-slate-200
                  "
                >
                  <p
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/80
                      px-4
                      py-3
                    "
                  >
                    • What mattered most to you today?
                  </p>

                  <p
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/80
                      px-4
                      py-3
                    "
                  >
                    • What did you enjoy doing today?
                  </p>

                  <p
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/80
                      px-4
                      py-3
                    "
                  >
                    • What would you like to improve this week?
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {latestAnalysis ? (
        <SpeakingTurnAnalysisPanel
          analysis={
            latestAnalysis
          }
        />
      ) : null}
    </main>
  );}