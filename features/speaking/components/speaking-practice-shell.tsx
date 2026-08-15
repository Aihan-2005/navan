"use client";

import Link from "next/link";

import {
  useCallback,
  useState,
} from "react";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Lightbulb,
  LoaderCircle,
  Mic2,
  Send,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  analyzeSpeakingTurn,
} from "../api/analyze-speaking-turn";

import {
  SPEAKING_COACH_STYLE_LABELS,
  SPEAKING_DIFFICULTY_LABELS,
  SPEAKING_MODE_LABELS,
} from "../constants/speaking.constants";

import type {
  RecordedAudio,
  SpeakingScenario,
} from "../types/speaking.types";

import type {
  SpeakingTurnAnalysis,
} from "../types/speaking-turn.types";

import {
  SpeakingTurnAnalysisPanel,
} from "./speaking-turn-analysis-panel";

import {
  VoiceRecorder,
} from "./voice-recorder";

type SpeakingPracticeShellProps =
  Readonly<{
    scenario:
      SpeakingScenario;
  }>;

export function SpeakingPracticeShell({
  scenario,}: SpeakingPracticeShellProps) {
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
    analysisError,
    setAnalysisError,
  ] =
    useState<string | null>(
      null,
    );

  const handleRecordingReady =
    useCallback(
      (
        recordedAudio:
          RecordedAudio,
      ): void => {
        setRecording(
          recordedAudio,
        );

        setAnalysisError(
          null,
        ); },
      [],
    );

  const handleRecordingCleared =
    useCallback(
      (): void => {
        setRecording(
          null,
        );

        setAnalysisError(
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
      setAnalysisError(
        "برای تحلیل قابل‌اعتمادتر حداقل ۲ ثانیه صحبت کن.",
      );

      return;
    }

    setIsAnalyzing(
      true,
    );

    setAnalysisError(
      null,
    );

    try {
      const previousAnalysis =
        analyses[
          analyses.length -
            1
        ];

      const analysis =
        await analyzeSpeakingTurn({
          recording,

          mode:   "scenario",

          scenarioId:
            scenario.id,

          turnIndex:
            analyses.length +
            1,

          previousTurnId:
            previousAnalysis
              ?.turnId ??
            null,
        });

      setAnalyses(
        (
          current,
        ) => [
          ...current,
          analysis,
        ],
      );
    } catch (
      error
    ) {
      console.error(
        "Speaking analysis failed:",
        error,
      );

      setAnalysisError(
        error instanceof
          Error
          ? error.message
          : "تحلیل پاسخ صوتی ناموفق بود.",
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
      "
      aria-labelledby="speaking-practice-title"
    >
      <Link
        href="/speaking"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-400
          transition
          hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به تمرین‌های مکالمه
      </Link>

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/15
          bg-white/[0.04]
          p-6
          sm:p-8
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
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
           <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                rounded-full
                bg-cyan-400/10
                px-3
                py-1
                text-xs
                text-cyan-200
              "
            >
              {
                SPEAKING_MODE_LABELS[
                  scenario.mode
                ]
              }
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3
                py-1
                text-xs
                text-slate-400
              "
            >
              {
                SPEAKING_DIFFICULTY_LABELS[
                  scenario.difficulty
                ]
              }
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3
                py-1
                text-xs
                text-slate-400
              "
            >
              سطح{" "} {scenario.cefrLevel}
            </span>

            {analyses.length >
            0 ? (
              <span
                className="
                  rounded-full
                  bg-violet-400/10
                  px-3
                  py-1
                  text-xs
                  text-violet-200
                "
              >
                {analyses.length}{" "}
                نوبت تحلیل‌شده
              </span>
            ) : null}
          </div>

          <h1
            id="speaking-practice-title"
            className="
              mt-5
              text-3xl
              font-bold
              text-white
              sm:text-4xl
            "
          >
            {scenario.title}
          </h1>

          <p
            className="
              mt-4
              max-w-3xl
              text-sm
              leading-8
              text-slate-400
              sm:text-base
            "
          >
            {scenario.description}
          </p>
        </div> </section>

      <div
        className="
          grid
          gap-6
          xl:grid-cols-12
        "
      >
        <div
          className="
            space-y-6
            xl:col-span-5
          "
        >
          <Card className="p-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-violet-300
              "
            >
              <Bot
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                نقش معلم هوشمند
              </span>
            </div>

            <p
              className="
                mt-4
                text-sm
                leading-8
                text-slate-300
              "
            >
              {scenario.aiRole}
            </p>

            <p
              className="
                mt-4
                text-xs
                text-slate-600
              "
            >
              سبک مربی:{"  "}
              {
                SPEAKING_COACH_STYLE_LABELS[
                  scenario.coachStyle
                ]
              }
            </p>
          </Card>

          <Card className="p-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-cyan-300
              "
            >
              <Mic2
                aria-hidden="true"
                className="h-5 w-5"
              /> <span
                className="
                  text-sm
                  font-medium
                "
              >
                مأموریت مکالمه
              </span>
            </div>

            <p
              dir="ltr"
              className="
                mt-4
                rounded-2xl
                border
                border-white/[0.06]
                bg-black/15
                p-4
                text-left
                text-sm
                leading-8
                text-slate-300
              "
            >
              {scenario.prompt}
            </p>
          </Card>

          <Card className="p-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-emerald-300
              "
            >
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                تمرکز این جلسه
              </span>
            </div>

            <ul
              className="
                mt-4 space-y-3
              "
            >
              {scenario.focusAreas.map(
                (
                  focusArea,
                ) => (
                  <li
                    key={
                      focusArea
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-slate-400
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-300
                      "
                    />

                    {focusArea}
                  </li>
                ),
              )}
            </ul>
          </Card>

          {scenario.starterPhrases.length >
          0 ? (
            <Card className="p-6">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-amber-300
                "
              >
                <Lightbulb
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  عبارت‌های پیشنهادی
                </span> </div>

              <div
                dir="ltr"
                className="
                  mt-4
                  space-y-3
                  text-left
                "
              >
                {scenario.starterPhrases.map(
                  (
                    phrase,
                  ) => (
                    <p
                      key={
                        phrase
                      }
                      className="
                        rounded-xl
                        bg-white/[0.03]
                        px-4
                        py-3
                        text-sm
                        text-slate-300
                      "
                    >
                      {phrase}
                    </p>
                  ),
                )}
              </div>
            </Card>
          ) : null}
        </div>

        <div
          className="
            space-y-6
            xl:col-span-7
          "
        >
          <VoiceRecorder
            maxDurationSeconds={
              120
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
              className=" flex
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
                  text-lg
                  font-bold
                  text-white
                "
              >
                تحلیل هوشمند
              </h2>
            </div>

            <div
              className="
                mt-5
                grid
                gap-3
                sm:grid-cols-3
              "
            >
              <PipelineStep
                number="۱"
                title="تبدیل صدا به متن"
                description="Speech-to-Text و تشخیص کلمات"
              />

              <PipelineStep
                number="۲"
                title="ارزیابی گفتار"
                description="تلفظ، روانی، گرامر و واژگان"
              />

              <PipelineStep
                number="۳"
                title="پاسخ مربی"
                description="اصلاح، توضیح و ادامه مکالمه"
              />
            </div>

            {recording ? (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-cyan-400/15
                  bg-cyan-400/[0.05]
                  p-5
                "
              ><p
                  className="
                    text-sm
                    font-medium
                    text-cyan-100
                  "
                >
                  فایل صوتی برای تحلیل آماده است
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-slate-500
                  "
                >
                  با ارسال فایل، Transcript، امتیازهای مهارتی، خطاهای قابل اصلاح، نکات تلفظ و پاسخ بعدی مربی دریافت می‌شود.
                </p>

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
                    py-2.5
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
                    ? "در حال تحلیل صدا..."
                    : "ارسال برای تحلیل AI"}
                </button>
              </div>
            ) : (
              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                ابتدا پاسخ خودت را ضبط کن. بعد از پایان ضبط دکمه تحلیل فعال می‌شود.
              </p>
            )}

            {analysisError ? (
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
                  leading-6
                  text-red-200
                "
              >
                {analysisError}
              </div>
            ) : null}
          </Card>
        </div>
      </div>

      {latestAnalysis ? (
        <SpeakingTurnAnalysisPanel
          analysis={
            latestAnalysis
          }
        />
      ) : null}
    </main>
  );
}

function PipelineStep({
  number,
  title,
  description,
}: Readonly<{
  number:
    string;

  title:
    string;

  description:
    string;
}>) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-violet-400/10
          text-xs
          font-bold
          text-violet-300
        "
      >
        {number}
      </span>

      <p
        className="
          mt-3
          text-xs
          font-bold
          text-white
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1
          text-[11px]
          leading-5
          text-slate-600
        "
      >
        {description}
      </p>
    </div>
  );
}
