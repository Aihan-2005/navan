import type { LucideIcon } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type ListeningStatCardProps = Readonly<{
  title: string;
  value: string;
  description: string;

  icon: LucideIcon;

  tone?: "orange" | "violet" | "emerald" | "gray";
}>;

const toneStyles = {
  orange: "border-[#F97316]",
  violet: "border-[##712AE2]",
  emerald: "border-[#00685F]",
  gray: "border-[#545C72]",
} as const;

export function ListeningStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "orange",
}: ListeningStatCardProps) {
  const borderColor = toneStyles[tone];
  const iconColorMap = {
   orange: "border-[#F97316]",
  violet: "border-[##712AE2]",
  emerald: "border-[#00685F]",
  gray: "border-[#545C72]",
  };

  return (
    <Card
      className={cn(
        "border-l-4 bg-white px-5 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        borderColor,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-right">
          <p className="text-sm text-[#64748b]">{title}</p>

          <p className="mt-1 text-2xl font-bold text-[#0f172a]">{value}</p>
        </div>

        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
            "bg-current/10 border-current/10",
            iconColorMap[tone],
          )}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
