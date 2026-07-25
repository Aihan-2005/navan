import type { LucideIcon } from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

type OverviewStatCardTone =
  | "cyan"
  | "violet"
  | "amber";

type OverviewStatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone?: OverviewStatCardTone;
};

const toneClassNames: Record<
  OverviewStatCardTone,
  {
    iconWrapper: string;
    icon: string;
  }
> = {
  cyan: {
    iconWrapper: "bg-cyan-400/10",
    icon: "text-cyan-300",
  },

  violet: {
    iconWrapper: "bg-violet-400/10",
    icon: "text-violet-300",
  },

  amber: {
    iconWrapper: "bg-amber-400/10",
    icon: "text-amber-300",
  },
};

export function OverviewStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "cyan",
}: OverviewStatCardProps) {
  const toneClasses = toneClassNames[tone];

  return (
    <Card className="p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/15">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-white">
            {value}
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            toneClasses.iconWrapper,
          )}
        >
          <Icon
            aria-hidden="true"
            className={cn("h-5 w-5", toneClasses.icon)}
          />
        </div>
      </div>
    </Card>
  );
}