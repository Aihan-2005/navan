import Link from "next/link";
import {
  ArrowLeft,
  AudioLines,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";

import { Card } from "../../../components/ui/card";

export function AITutorCTA() {
  return (
    <Card
      className="
        relative overflow-hidden
        border-cyan-400/15 p-5 sm:p-6
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

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-24 -right-24
          h-56 w-56 rounded-full
          bg-blue-500/15 blur-3xl
        "
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div
            className="
              flex h-12 w-12 items-center
              justify-center rounded-2xl
              bg-cyan-400/10 text-cyan-300
            "
          >
            <MessageCircleMore
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <Sparkles
            aria-hidden="true"
            className="h-5 w-5 text-cyan-300/50"
          />
        </div>

        <h2 className="mt-5 text-xl font-bold text-white">
          با معلم هوشمند تمرین کن
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          درباره هر موضوعی گفتگو کن و بازخورد فوری درباره گرامر،
          واژگان و مکالمه دریافت کن.
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <AudioLines
            aria-hidden="true"
            className="h-4 w-4 text-cyan-300"
          />

          مکالمه متنی و صوتی
        </div>

        <Link
          href="/dashboard/onlineClass"
          className="
            mt-6 inline-flex w-full items-center
            justify-center gap-2 rounded-xl
            bg-cyan-400 px-4 py-2.5
            text-sm font-bold text-slate-950
            transition hover:bg-cyan-300
          "
        >
          شروع گفت‌وگو

          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}