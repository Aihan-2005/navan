import { BookOpenText, Flame, Sparkles, TimerReset } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import type { WritingOverviewStats } from "../../types/writing.types";

type Props = Readonly<{ stats: WritingOverviewStats }> ;
const numberFormatter = new Intl.NumberFormat("fa-IR");

export function WritingStatCards({ stats }: Props) {
  const items = [
    ["تعداد نوشته‌ها", numberFormatter.format(stats.totalWritings), BookOpenText, "#00685F"],
    ["واژگان تولید شده", numberFormatter.format(stats.weeklyWords), Sparkles, "#712AE2"],
    ["میانگین امتیاز", `${numberFormatter.format(stats.averageScore)}%`, TimerReset, "#00685F"],
    ["تداوم تمرین", `${numberFormatter.format(stats.currentStreak)} روز`, Flame, "#F97316"],
  ] as const;

  return <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" dir="rtl">
    {items.map(([title,value,Icon,color]) => (
      <Card key={title} className="h-[104px] rounded-3xl border border-[#BCC9C6]/30 bg-white/70 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{backgroundColor:`${color}20`, color}}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-[#3D4947]">{title}</p>
            <p className="mt-1 text-xl font-bold text-[#0F172A]">{value}</p>
          </div>
        </div>
      </Card>
    ))}
  </section>;
}