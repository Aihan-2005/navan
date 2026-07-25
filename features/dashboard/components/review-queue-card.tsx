import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  Languages,
  ShieldAlert,
  SpellCheck2,
} from "lucide-react";

import { Card } from "../../../components/ui/card";

import type { ReviewQueue } from "../types/dashboard.types";

type ReviewQueueCardProps = {
  queue: ReviewQueue;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function ReviewQueueCard({
  queue,
}: ReviewQueueCardProps) {
  const hasReviews = queue.totalItems > 0;

  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-300">
            <BrainCircuit
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              مرورهای امروز
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {formatNumber(queue.totalItems)} مورد
          </h2>
        </div>

        <div
          className="
            flex items-center gap-1.5 rounded-xl
            bg-white/[0.04] px-3 py-2
            text-xs text-slate-400
          "
        >
          <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
          {formatNumber(queue.estimatedMinutes)} دقیقه
        </div>
      </div>

      {hasReviews ? (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Languages
                aria-hidden="true"
                className="h-4 w-4 text-cyan-300"
              />
              واژگان
            </div>

            <span className="text-sm font-semibold text-white">
              {formatNumber(queue.vocabularyCount)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <SpellCheck2
                aria-hidden="true"
                className="h-4 w-4 text-violet-300"
              />
              نکات گرامری
            </div>

            <span className="text-sm font-semibold text-white">
              {formatNumber(queue.grammarCount)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldAlert
                aria-hidden="true"
                className="h-4 w-4 text-amber-300"
              />
              اشتباهات پرتکرار
            </div>

            <span className="text-sm font-semibold text-white">
              {formatNumber(queue.mistakeCount)}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-emerald-400/[0.05] px-4 py-5 text-center">
          <p className="text-sm font-medium text-emerald-200">
            همه مرورهای امروز انجام شده‌اند
          </p>
        </div>
      )}

      {queue.href ? (
        <Link
          href={queue.href}
          className="
            mt-6 inline-flex w-full items-center
            justify-center gap-2 rounded-xl
            bg-violet-400 px-4 py-2.5
            text-sm font-bold text-slate-950
            transition hover:bg-violet-300
          "
        >
          شروع مرور

          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="
            mt-6 inline-flex w-full cursor-not-allowed
            items-center justify-center rounded-xl
            border border-white/[0.06]
            bg-white/[0.03] px-4 py-2.5
            text-sm font-medium text-slate-600
          "
        >
          بخش مرور به‌زودی فعال می‌شود
        </button>
      )}
    </Card>
  );
}