import Link from "next/link";
import { ArrowLeft, Mic2 } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";
import { SPEAKING_COACH_STYLE_LABELS } from "../constants/speaking.constants";

const numberFormatter = new Intl.NumberFormat("fa-IR");

type CoachStyle = "supportive" | "balanced" | "strict";

type FreeSpeakingCardProps = {
  estimatedMinutes?: number;
  cefrLevel?: string;
  coachStyle?: CoachStyle;
  focusAreas?: string[];
  isFeatured?: boolean;
  isAvailable?: boolean;
};

export function FreeSpeakingCard({
  estimatedMinutes = 10,
  cefrLevel = "همه ی سطح ها",
  coachStyle = "supportive",
  focusAreas = ["موضوع آزاد", "روان صحبت کردن", "استفاده از مهارت های مکالمه"],
  isFeatured = false,
  isAvailable = true,
}: FreeSpeakingCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-5",
        "transition duration-300",
        isAvailable && "hover:-translate-y-1 hover:border-cyan-400/20",
        !isAvailable && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Mic2 aria-hidden="true" className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-cyan-300">گفت‌وگوی آزاد</p>

        <h3 className="mt-2 text-lg font-bold leading-8 text-white">
          گفت‌وگوی آزاد
        </h3>

        <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">
          درباره هر موضوعی که دوست داری صحبت کن و بازخورد دریافت کن.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {focusAreas?.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-lg bg-white/4 px-2.5 py-1 text-[10px] text-slate-500"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4 text-xs text-slate-500">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            {numberFormatter.format(estimatedMinutes)} دقیقه
          </span>

          <span>{cefrLevel}</span>

          <span>{SPEAKING_COACH_STYLE_LABELS[coachStyle]}</span>
        </div>

        <Link
          href="/speaking/free"
          aria-label="شروع گفت‌وگوی آزاد"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 transition hover:bg-cyan-300"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}