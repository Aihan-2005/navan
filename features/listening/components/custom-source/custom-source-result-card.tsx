import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  TriangleAlert,
} from "lucide-react";

import {
  CUSTOM_AUDIO_STATUS_LABELS,
} from "../../constants/listening-custom-source.constants";

import type {
  CustomListeningSourceResult,
} from "../../types/listening-custom-source.types";

type CustomSourceResultCardProps =
  Readonly<{
    result: CustomListeningSourceResult;
  }>;

export function CustomSourceResultCard({
  result,
}: CustomSourceResultCardProps) {
  const isReady =
    result.status === "ready" &&
    result.contentId !== null;

  return (
    <div
      className="
        mt-5 rounded-2xl
        border border-emerald-400/15
        bg-emerald-400/[0.045]
        p-5
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl bg-emerald-400/10
            text-emerald-300
          "
        >
          {isReady ? (
            <CheckCircle2
              aria-hidden="true"
              className="h-5 w-5"
            />
          ) : (
            <Clock3
              aria-hidden="true"
              className="h-5 w-5"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-emerald-100">
            {result.title}
          </p>

          <p className="mt-1 text-xs text-emerald-200/70">
            {
              CUSTOM_AUDIO_STATUS_LABELS[
                result.status
              ]
            }
          </p>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            فایل یا لینک ثبت شده و ساخت Transcript مرجع
            در Backend انجام می‌شود.
          </p>
        </div>
      </div>

      {result.warnings.length > 0 ? (
        <div
          className="
            mt-4 rounded-xl
            border border-amber-400/15
            bg-amber-400/[0.04]
            px-4 py-3
          "
        >
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
            <TriangleAlert
              aria-hidden="true"
              className="h-4 w-4"
            />

            نکات پردازش
          </div>

          <ul className="mt-2 space-y-1.5">
            {result.warnings.map(
              (warning) => (
                <li
                  key={warning}
                  className="text-xs leading-6 text-amber-100/60"
                >
                  • {warning}
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}

      {isReady ? (
        <Link
          href={`/listening/practice/${result.contentId}`}
          className="
            mt-5 inline-flex min-h-10
            items-center justify-center gap-2
            rounded-xl bg-cyan-400
            px-4 py-2 text-xs
            font-bold text-slate-950
            transition hover:bg-cyan-300
          "
        >
          شروع تمرین

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      ) : null}
    </div>
  );
}