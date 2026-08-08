import {
  CheckCircle2,
  ListOrdered,
  SpellCheck2,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import type {
  ListeningScoreBreakdown,
} from "../../types/listening.types";

type ListeningScoreOverviewProps =
  Readonly<{
    score: ListeningScoreBreakdown;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const scoreItems = [
  {
    key: "overall",
    label: "امتیاز کلی",
    icon: Target,
  },
  {
    key: "wordAccuracy",
    label: "دقت واژگان",
    icon: CheckCircle2,
  },
  {
    key: "sequenceAccuracy",
    label: "ترتیب جملات",
    icon: ListOrdered,
  },
  {
    key: "spellingAccuracy",
    label: "املای کلمات",
    icon: SpellCheck2,
  },
] as const;

function getScoreDescription(
  score: number,
): string {
  if (score >= 90) {
    return "عالی";
  }

  if (score >= 80) {
    return "خیلی خوب";
  }

  if (score >= 70) {
    return "خوب";
  }

  return "نیازمند تمرین";
}

export function ListeningScoreOverview({
  score,
}: ListeningScoreOverviewProps) {
  return (
    <section
      aria-label="امتیازهای تمرین شنیداری"
      className="
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {scoreItems.map(
        (item) => {
          const Icon = item.icon;

          const value =
            score[item.key];

          return (
            <Card
              key={item.key}
              className="p-5"
            >
              <div
                className="
                  flex items-start
                  justify-between gap-4
                "
              >
                <span
                  className="
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>

                <span
                  className="
                    rounded-full
                    bg-white/[0.04]
                    px-2.5 py-1
                    text-[10px]
                    text-slate-500
                  "
                >
                  {getScoreDescription(
                    value,
                  )}
                </span>
              </div>

              <p
                className="
                  mt-5 text-xs
                  text-slate-500
                "
              >
                {item.label}
              </p>

              <p
                className="
                  mt-1 text-3xl
                  font-bold text-white
                "
              >
                {numberFormatter.format(
                  value,
                )}
                <span
                  className="
                    mr-1 text-base
                    font-medium
                    text-slate-600
                  "
                >
                  ٪
                </span>
              </p>

              <div
                className="
                  mt-4 h-1.5
                  overflow-hidden
                  rounded-full
                  bg-white/[0.05]
                "
              >
                <div
                  className="
                    h-full rounded-full
                    bg-cyan-400
                  "
                  style={{
                    width: `${value}%`,
                  }}
                />
              </div>
            </Card>
          );
        },
      )}
    </section>
  );
}