import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BrainCircuit,
  CircleAlert,
  Lightbulb,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import {
  DASHBOARD_INSIGHT_LABELS,
  DASHBOARD_SKILL_LABELS,
} from "../constants/dashboard.constants";

import type { AIInsight, InsightType } from "../types/dashboard.types";

type AIInsightCardProps = {
  insight: AIInsight | null;
};

const insightStyles = {
  weakness: {
    icon: TriangleAlert,
    iconClassName: "text-amber-300",
    iconWrapperClassName: "bg-amber-400/10",
  },

  recommendation: {
    icon: Lightbulb,
    iconClassName: "text-cyan-300",
    iconWrapperClassName: "bg-cyan-400/10",
  },

  achievement: {
    icon: Award,
    iconClassName: "text-emerald-300",
    iconWrapperClassName: "bg-emerald-400/10",
  },

  warning: {
    icon: CircleAlert,
    iconClassName: "text-red-300",
    iconWrapperClassName: "bg-red-400/10",
  },

  motivation: {
    icon: Sparkles,
    iconClassName: "text-violet-300",
    iconWrapperClassName: "bg-violet-400/10",
  },
} satisfies Record<
  InsightType,
  {
    icon: LucideIcon;
    iconClassName: string;
    iconWrapperClassName: string;
  }
>;

export function AIInsightCard({ insight }: AIInsightCardProps) {
  if (!insight) {
    return (
      <Card className="h-full p-5 sm:p-6">
        <div
          className="
            flex h-full min-h-64 flex-col
            items-center justify-center text-center
          "
        >
          <BrainCircuit
            aria-hidden="true"
            className="h-10 w-10 text-slate-700"
          />

          <h2 className="mt-4 text-base font-semibold text-slate-300">
            هنوز تحلیل جدیدی وجود ندارد
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-600">
            بعد از انجام چند تمرین، معلم هوشمند پیشنهادهای شخصی ارائه می‌کند.
          </p>
        </div>
      </Card>
    );
  }

  const insightStyle = insightStyles[insight.type];
  const InsightIcon = insightStyle.icon;

  return (
    <Card className="relative h-full overflow-hidden p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-24 -top-24
          h-56 w-56 rounded-full
          bg-violet-500/10 blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              insightStyle.iconWrapperClassName,
            )}
          >
            <InsightIcon
              aria-hidden="true"
              className={cn("h-5 w-5", insightStyle.iconClassName)}
            />
          </div>

          <span
            className="
              rounded-full border border-white/[0.06]
              bg-white/[0.03] px-2.5 py-1
              text-[10px] text-slate-400
            "
          >
            {DASHBOARD_INSIGHT_LABELS[insight.type]}
          </span>
        </div>

        <h2 className="mt-5 text-lg font-bold leading-8 text-white">
          {insight.title}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
          {insight.description}
        </p>

        {insight.relatedSkill ? (
          <p className="mt-4 text-xs text-slate-600">
            مهارت مرتبط:{" "}
            <span className="text-slate-400">
              {DASHBOARD_SKILL_LABELS[insight.relatedSkill]}
            </span>
          </p>
        ) : null}

        {insight.actionHref && insight.actionLabel ? (
          <Link
            href={insight.actionHref}
            className="
              mt-6 inline-flex w-fit items-center
              justify-center gap-2 rounded-xl
              bg-white px-4 py-2.5
              text-sm font-bold text-slate-950
              transition hover:bg-slate-200
            "
          >
            {insight.actionLabel}

            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
