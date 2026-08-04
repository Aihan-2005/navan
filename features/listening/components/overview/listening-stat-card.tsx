import type { LucideIcon } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type ListeningStatCardProps = Readonly<{
  title: string;
  value: string;
  description: string;

  icon: LucideIcon;

  tone?: "cyan" | "violet" | "emerald" | "amber";
}>;

const toneStyles = {
  cyan: {
    iconWrapper:
      "bg-cyan-400/10 text-cyan-300",

    glow:
      "bg-cyan-500/10",
  },

  violet: {
    iconWrapper:
      "bg-violet-400/10 text-violet-300",

    glow:
      "bg-violet-500/10",
  },

  emerald: {
    iconWrapper:
      "bg-emerald-400/10 text-emerald-300",

    glow:
      "bg-emerald-500/10",
  },

  amber: {
    iconWrapper:
      "bg-amber-400/10 text-amber-300",

    glow:
      "bg-amber-500/10",
  },
} as const;

export function ListeningStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "cyan",
}: ListeningStatCardProps) {
  const selectedTone =
    toneStyles[tone];

  return (
    <Card className="relative overflow-hidden p-5">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -left-14 -top-14",
          "h-32 w-32 rounded-full blur-3xl",
          selectedTone.glow,
        )}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 shrink-0",
            "items-center justify-center rounded-xl",
            selectedTone.iconWrapper,
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>
    </Card>
  );
}