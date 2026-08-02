import {
  Check,
  Circle,
  Route,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingLearningJourney,
} from "../../types/reading.types";

type ReadingLearningJourneyCardProps =
  Readonly<{
    journey: ReadingLearningJourney;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const stepStyles = {
  completed: {
    icon: Check,

    wrapper:
      "border-emerald-400/15 bg-emerald-400/[0.05]",

    iconWrapper:
      "bg-emerald-400/10 text-emerald-300",

    title:
      "text-emerald-100",
  },

  active: {
    icon: Sparkles,

    wrapper:
      "border-cyan-400/20 bg-cyan-400/[0.06]",

    iconWrapper:
      "bg-cyan-400/10 text-cyan-300",

    title:
      "text-cyan-100",
  },

  upcoming: {
    icon: Circle,

    wrapper:
      "border-white/[0.06] bg-white/[0.02]",

    iconWrapper:
      "bg-white/[0.04] text-slate-600",

    title:
      "text-slate-300",
  },
} as const;

export function ReadingLearningJourneyCard({
  journey,
}: ReadingLearningJourneyCardProps) {
  return (
    <Card className="relative overflow-hidden p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-56 w-56 rounded-full
          bg-violet-500/10 blur-3xl
        "
      />

      <div className="relative">
        <div className="flex items-center gap-2 text-violet-300">
          <Route
            aria-hidden="true"
            className="h-5 w-5"
          />

          <span className="text-sm font-medium">
            مسیر یادگیری هوشمند
          </span>
        </div>

        <h2 className="mt-2 text-xl font-bold text-white">
          {journey.title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          {journey.description}
        </p>

        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {journey.steps.map((step) => {
            const selectedStyle =
              stepStyles[step.status];

            const StepIcon =
              selectedStyle.icon;

            return (
              <li
                key={step.id}
                className={cn(
                  "rounded-2xl border p-4",
                  selectedStyle.wrapper,
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0",
                      "items-center justify-center rounded-xl",
                      selectedStyle.iconWrapper,
                    )}
                  >
                    <StepIcon
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600">
                      مرحله{" "}
                      {numberFormatter.format(
                        step.order,
                      )}
                    </p>

                    <h3
                      className={cn(
                        "mt-1 text-sm font-bold",
                        selectedStyle.title,
                      )}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Card>
  );
}