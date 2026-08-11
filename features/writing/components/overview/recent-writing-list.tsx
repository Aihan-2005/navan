import Link from "next/link";
import { ArrowLeft, MessageCircleMore } from "lucide-react";

import { Card } from "../../../../components/ui/card";

import type { RecentWriting } from "../../types/writing.types";

type RecentWritingListProps = Readonly<{
  writings: readonly RecentWriting[];
}>;

export function RecentWritingList({ writings }: RecentWritingListProps) {
  return (
    <Card className="p-6" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">نوشته‌های اخیر</h3>
          <p className="mt-2 text-sm text-slate-400">
            آخرین متن‌هایی که با موفقیت تکمیل کردی.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/writing/history"
            className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
          >
            مشاهده همه
          </Link>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <MessageCircleMore aria-hidden="true" className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {writings.map((writing) => (
          <Link
            key={writing.id}
            href={`/writing/submissions/${writing.id}`}
            className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/3 p-4 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-white">{writing.title}</p>
              <p className="mt-1 text-sm text-slate-500">{writing.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                {writing.score}٪
              </span>
              <p className="text-sm text-slate-400">{writing.feedback}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
