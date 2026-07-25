import Link from "next/link";
import {
  BookOpenText,
  Headphones,
  Languages,
  MessageCircleMore,
  PenLine,
  SpellCheck2,
  type LucideIcon,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import {
  QUICK_PRACTICE_ITEMS,
  type QuickPracticeItem,
} from "../constants/dashboard.constants";

import type { SkillType } from "../types/dashboard.types";

const skillIcons = {
  speaking: MessageCircleMore,
  listening: Headphones,
  reading: BookOpenText,
  writing: PenLine,
  grammar: SpellCheck2,
  vocabulary: Languages,
} satisfies Record<SkillType, LucideIcon>;

function QuickPracticeCard({
  item,
}: {
  item: QuickPracticeItem;
}) {
  const Icon = skillIcons[item.skill];

  const content = (
    <div
      className={cn(
        "relative h-full rounded-2xl border p-4",
        "transition duration-200",
        item.isAvailable
          ? "border-white/[0.07] bg-white/[0.025] hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
          : "border-white/[0.04] bg-white/[0.01] opacity-50",
      )}
    >
      {!item.isAvailable ? (
        <span
          className="
            absolute left-3 top-3 rounded-full
            bg-white/[0.05] px-2 py-0.5
            text-[9px] text-slate-500
          "
        >
          به‌زودی
        </span>
      ) : null}

      <div
        className="
          flex h-10 w-10 items-center
          justify-center rounded-xl
          bg-cyan-400/10 text-cyan-300
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-200">
        {item.title}
      </h3>

      <p className="mt-1.5 text-xs leading-6 text-slate-600">
        {item.description}
      </p>
    </div>
  );

  if (!item.href || !item.isAvailable) {
    return content;
  }

  return (
    <Link href={item.href} className="block h-full">
      {content}
    </Link>
  );
}

export function QuickPracticeGrid() {
  return (
    <Card className="p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-bold text-white">
          تمرین سریع
        </h2>

        <p className="mt-2 text-xs leading-6 text-slate-500">
          مستقیماً وارد مهارت موردنظرت شو
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {QUICK_PRACTICE_ITEMS.map((item) => (
          <QuickPracticeCard key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
}