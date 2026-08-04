import { BookOpenText, Flame, Sparkles, TimerReset } from "lucide-react";

import { Card } from "../../../../components/ui/card";

import type { WritingOverviewStats } from "../../types/writing.types";

type WritingStatCardProps = Readonly<{
  stats: WritingOverviewStats;
}>;

const numberFormatter = new Intl.NumberFormat("fa-IR");

export function WritingStatCards({ stats }: WritingStatCardProps) {
  return (
    <section
      aria-label="آمار نوشتن"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      dir="rtl"
    >
      <WritingStatItem
        title="تعداد نوشته‌ها"
        value={numberFormatter.format(stats.totalWritings)}
        description="کل متن‌های ثبت‌شده"
        icon={BookOpenText}
      />

      <WritingStatItem
        title="واژه‌های این هفته"
        value={`${numberFormatter.format(stats.weeklyWords)} کلمه`}
        description="میزان تولید محتوا"
        icon={Sparkles}
      />

      <WritingStatItem
        title="میانگین امتیاز"
        value={`${numberFormatter.format(stats.averageScore)}٪`}
        description="ارزیابی اخیر"
        icon={TimerReset}
      />

      <WritingStatItem
        title="تداوم تمرین"
        value={`${numberFormatter.format(stats.currentStreak)} روز`}
        description="روزهای متوالی"
        icon={Flame}
      />
    </section>
  );
}

type WritingStatItemProps = Readonly<{
  title: string;
  value: string;
  description: string;
  icon: typeof BookOpenText;
}>;

function WritingStatItem({
  title,
  value,
  description,
  icon: Icon,
}: WritingStatItemProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-3 text-2xl font-bold text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-600">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
