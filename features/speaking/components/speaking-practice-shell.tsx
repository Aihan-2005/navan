"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Lightbulb,
  Mic2,
  Sparkles,
} from "lucide-react";

import { Card } from "../../../components/ui/card";

import {
  SPEAKING_COACH_STYLE_LABELS,
  SPEAKING_DIFFICULTY_LABELS,
  SPEAKING_MODE_LABELS,
} from "../constants/speaking.constants";

import type {
  RecordedAudio,
  SpeakingScenario,
} from "../types/speaking.types";

import { VoiceRecorder } from "./voice-recorder";

type SpeakingPracticeShellProps = {
  scenario: SpeakingScenario;
};

export function SpeakingPracticeShell({
  scenario,
}: SpeakingPracticeShellProps) {
  const [recording, setRecording] =
    useState<RecordedAudio | null>(null);

  const handleRecordingReady =
    useCallback(
      (recordedAudio: RecordedAudio): void => {
        setRecording(recordedAudio);
      },
      [],
    );

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="speaking-practice-title"
    >
      <Link
        href="/speaking"
        className="
          inline-flex items-center gap-2
          text-sm text-slate-400
          transition hover:text-white
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
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-white/[0.04] p-6
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-24 -top-24
            h-64 w-64 rounded-full
            bg-cyan-500/15 blur-3xl
          "
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full bg-cyan-400/10
                px-3 py-1 text-xs text-cyan-200
              "
            >
              {SPEAKING_MODE_LABELS[scenario.mode]}
            </span>

            <span
              className="
                rounded-full bg-white/[0.05]
                px-3 py-1 text-xs text-slate-400
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
                rounded-full bg-white/[0.05]
                px-3 py-1 text-xs text-slate-400
              "
            >
              سطح {scenario.cefrLevel}
            </span>
          </div>

          <h1
            id="speaking-practice-title"
            className="
              mt-5 text-3xl font-bold text-white
              sm:text-4xl
            "
          >
            {scenario.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
            {scenario.description}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-5">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-violet-300">
              <Bot
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span className="text-sm font-medium">
                نقش معلم هوشمند
              </span>
            </div>

            <p className="mt-4 text-sm leading-8 text-slate-300">
              {scenario.aiRole}
            </p>

            <p className="mt-4 text-xs text-slate-600">
              سبک مربی:{" "}
              {
                SPEAKING_COACH_STYLE_LABELS[
                  scenario.coachStyle
                ]
              }
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <Mic2
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span className="text-sm font-medium">
                مأموریت مکالمه
              </span>
            </div>

            <p
              dir="ltr"
              className="
                mt-4 rounded-2xl
                border border-white/[0.06]
                bg-black/15 p-4
                text-left text-sm leading-8
                text-slate-300
              "
            >
              {scenario.prompt}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span className="text-sm font-medium">
                تمرکز این جلسه
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {scenario.focusAreas.map(
                (focusArea) => (
                  <li
                    key={focusArea}
                    className="
                      flex items-center gap-3
                      text-sm text-slate-400
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-1.5 w-1.5 rounded-full
                        bg-emerald-300
                      "
                    />

                    {focusArea}
                  </li>
                ),
              )}
            </ul>
          </Card>

          {scenario.starterPhrases.length > 0 ? (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-amber-300">
                <Lightbulb
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                <span className="text-sm font-medium">
                  عبارت‌های پیشنهادی
                </span>
              </div>

              <div
                dir="ltr"
                className="mt-4 space-y-3 text-left"
              >
                {scenario.starterPhrases.map(
                  (phrase) => (
                    <p
                      key={phrase}
                      className="
                        rounded-xl bg-white/[0.03]
                        px-4 py-3 text-sm
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

        <div className="space-y-6 xl:col-span-7">
          <VoiceRecorder
            maxDurationSeconds={120}
            onRecordingReady={
              handleRecordingReady
            }
          />

          <Card className="p-6">
            <div className="flex items-center gap-2 text-violet-300">
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2 className="text-lg font-bold text-white">
                تحلیل هوشمند
              </h2>
            </div>

            {recording ? (
              <div
                className="
                  mt-5 rounded-2xl
                  border border-cyan-400/15
                  bg-cyan-400/[0.05]
                  px-5 py-5
                "
              >
                <p className="text-sm font-medium text-cyan-100">
                  فایل صوتی برای تحلیل آماده است
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  در مرحله بعد، این فایل به API بک‌اند
                  ارسال می‌شود و Transcript، امتیاز تلفظ،
                  روانی، گرامر و پیشنهادهای اصلاحی دریافت
                  خواهد شد.
                </p>

                <button
                  type="button"
                  disabled
                  className="
                    mt-5 inline-flex cursor-not-allowed
                    items-center justify-center
                    rounded-xl bg-white/[0.05]
                    px-5 py-2.5 text-sm
                    font-semibold text-slate-600
                  "
                >
                  ارسال برای تحلیل AI
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-slate-500">
                ابتدا پاسخ خودت را ضبط کن تا امکان ارسال برای
                تحلیل هوشمند فعال شود.
              </p>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}