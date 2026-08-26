import type { LucideIcon } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type ListeningStatCardProps = Readonly<{
  title: string;
  value: string;
  icon: LucideIcon;
  tone?: "slate" | "violet" | "teal" | "orange";
}>;

const toneStyles = {
  slate: "h-[106px] text-[#545C72]",
  violet: "h-[98px] text-[#712AE2]",
  teal: "h-[98px] text-[#00685F]",
  orange: "h-[106px] text-[#F97316]",
} as const;

export function ListeningStatCard({
  title,
  value,
  icon: Icon,
  tone = "orange",
}: ListeningStatCardProps) {
  return (
    <Card
      className={cn(
        "relative flex items-center overflow-hidden rounded-[24px] border-0 bg-white/70 px-6 py-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px]",
        toneStyles[tone],
      )}
    >
      <span className="absolute inset-x-3 top-0 h-px rounded-full bg-current" aria-hidden="true" />
      <span className="absolute inset-x-3 bottom-0 h-px rounded-full bg-current" aria-hidden="true" />
      <span className="absolute inset-y-3 right-0 w-1 rounded-full bg-current" aria-hidden="true" />
      <span className="absolute inset-y-3 left-0 w-1 rounded-full bg-current" aria-hidden="true" />

      <div className="relative z-10 flex w-full items-center justify-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-current/10">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>

        <div className="min-w-0 text-right">
          <p className="text-sm leading-6 text-[#64748B]">{title}</p>
          <p className="mt-1 whitespace-nowrap text-2xl font-bold leading-8 text-[#0F172A]">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}