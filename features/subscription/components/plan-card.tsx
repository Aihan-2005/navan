"use client";

import { CheckCircle2 } from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";
import type { SubscriptionPlan } from "../types/plans";

type PlanCardProps = Readonly<{
  plan: SubscriptionPlan;
}>;

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col p-6 text-right",
        plan.featured
          ? "border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-500/10"
          : "bg-slate-900/70",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">{plan.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {plan.description}
          </p>
        </div>

        {plan.badge ? (
          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <p className="text-3xl font-black text-white">{plan.price}</p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          "mt-8 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
          plan.featured
            ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            : "border border-white/10 bg-white/[0.06] text-slate-100 hover:bg-white/[0.12]",
        )}
      >
        انتخاب این پلن
      </button>
    </Card>
  );
}
