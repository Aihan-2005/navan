import Link from "next/link";

import {
  ArrowLeft,
  AudioLines,
  BookOpenText,
  BrainCircuit,
  Clock3,
  MessageCircleMore,
  Mic2,
  MessagesSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import {
  SPEAKING_COACH_STYLE_LABELS,
  SPEAKING_DIFFICULTY_LABELS,
  SPEAKING_MODE_LABELS,
} from "../constants/speaking.constants";

import type {
  SpeakingMode,
  SpeakingScenario,
} from "../types/speaking.types";

type ScenarioCardProps = {
  scenario: SpeakingScenario;
};

const modeIcons = {
  roleplay: MessagesSquare,
  pronunciation: Mic2,
  shadowing: AudioLines,
  quick_response: BrainCircuit,
  storytelling: BookOpenText,
  debate: MessageCircleMore,
} satisfies Record<SpeakingMode, LucideIcon>;

const difficultyStyles = {
  beginner:
    "border-emerald-400/15 bg-emerald-400/10 text-emerald-200",

  intermediate:
    "border-amber-400/15 bg-amber-400/10 text-amber-200",

  advanced:
    "border-red-400/15 bg-red-400/10 text-red-200",
} satisfies Record<
  SpeakingScenario["difficulty"],
  string
>;

const numberFormatter = new Intl.NumberFormat("fa-IR");

export function ScenarioCard({
  scenario,
}: ScenarioCardProps) {
  const ModeIcon = modeIcons[scenario.mode];

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-5",
        "transition duration-300",
        scenario.isAvailable &&
          "hover:-translate-y-1 hover:border-cyan-400/20",
        !scenario.isAvailable && "opacity-60",
      )}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-44 w-44 rounded-full bg-cyan-500/10
          opacity-0 blur-3xl transition
          group-hover:opacity-100
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl bg-cyan-400/10 text-cyan-300
            "
          >
            <ModeIcon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {scenario.isFeatured ? (
              <span
                className="
                  inline-flex items-center gap-1 rounded-full
                  border border-violet-400/15
                  bg-violet-400/10 px-2.5 py-1
                  text-[10px] font-medium text-violet-200
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                پیشنهادی
              </span>
            ) : null}

            <span
              className={cn(
                "rounded-full border px-2.5 py-1",
                "text-[10px] font-medium",
                difficultyStyles[scenario.difficulty],
              )}
            >
              {
                SPEAKING_DIFFICULTY_LABELS[
                  scenario.difficulty
                ]
              }
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs font-medium text-cyan-300">
          {SPEAKING_MODE_LABELS[scenario.mode]}
        </p>

        <h3 className="mt-2 text-lg font-bold leading-8 text-white">
          {scenario.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">
          {scenario.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {scenario.focusAreas.slice(0, 3).map(
            (focusArea) => (
              <span
                key={focusArea}
                className="
                  rounded-lg bg-white/[0.04]
                  px-2.5 py-1 text-[10px] text-slate-500
                "
              >
                {focusArea}
              </span>
            ),
          )}
        </div>

        <div
          className="
            mt-5 flex items-center justify-between
            border-t border-white/[0.06] pt-4
          "
        >
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              {numberFormatter.format(
                scenario.estimatedMinutes,
              )}{" "}
              دقیقه
            </span>

            <span>{scenario.cefrLevel}</span>

            <span>
              {
                SPEAKING_COACH_STYLE_LABELS[
                  scenario.coachStyle
                ]
              }
            </span>
          </div>

          {scenario.isAvailable ? (
            <Link
              href={`/speaking/practice/${scenario.id}`}
              aria-label={`شروع تمرین ${scenario.title}`}
              className="
                inline-flex h-10 w-10 items-center
                justify-center rounded-xl
                bg-white text-slate-950
                transition hover:bg-cyan-300
              "
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          ) : (
            <span className="text-[10px] text-slate-600">
              به‌زودی
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}