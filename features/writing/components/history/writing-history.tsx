import {
  History,
  PenLine,
} from "lucide-react";

import Link from "next/link";

import type {
  RecentWriting,
} from "../../types/writing.types";

import {
  WritingHistoryCard,
} from "./writing-history-card";

type WritingHistoryProps =
  Readonly<{
    writings:
      readonly RecentWriting[];
  }>;

export function WritingHistory({
  writings,
}: WritingHistoryProps) {
  if (writings.length === 0) {
    return (
      <EmptyWritingHistory />
    );
  }

  return (
    <section
      aria-label="تاریخچه نوشته‌ها"
      dir="rtl"
      className="
        space-y-4
      "
    >
      {writings.map(
        (writing) => (
          <WritingHistoryCard
            key={writing.id}
            writing={writing}
          />
        ),
      )}
    </section>
  );
}

function EmptyWritingHistory() {
  return (
    <section
      dir="rtl"
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-950/50
        px-6
        py-12
        text-center
      "
    >
      <span
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.04]
          text-slate-400
        "
      >
        <History
          aria-hidden="true"
          className="h-6 w-6"
        />
      </span>

      <h2
        className="
          mt-5
          text-lg
          font-bold
          text-white
        "
      >
        هنوز نوشته‌ای ثبت نشده
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-md
          text-sm
          leading-7
          text-slate-400
        "
      >
        بعد از ثبت و تحلیل اولین نوشته،
        نتیجه و بازخورد آن در تاریخچه
        نمایش داده می‌شود.
      </p>

      <Link
        href="/writing/new"
        className="
          mt-6
          inline-flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-400
          px-5
          text-sm
          font-bold
          text-slate-950
          transition
          hover:bg-cyan-300
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-300/30
        "
      >
        <PenLine
          aria-hidden="true"
          className="h-4 w-4"
        />

        شروع نوشته جدید
      </Link>
    </section>
  );
}