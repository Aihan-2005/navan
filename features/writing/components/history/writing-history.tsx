"use client";

import { useState } from "react";

import { WritingHistoryCard } from "./writing-history-card";
import { WritingHistoryFilters } from "./writing-history-filters";

import type { WritingHistoryItem } from "../../api/get-writing-history";

type WritingHistoryProps = Readonly<{
  writings: readonly WritingHistoryItem[];
}>;

export function WritingHistory({ writings }: WritingHistoryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "exercise" | "free">("all");

  // Calculate counts for each filter
  const itemCounts = {
    all: writings.length,
    exercise: writings.filter((w) => w.mode === "exercise").length,
    free: writings.filter((w) => w.mode === "free").length,
  };

  // Filter writings based on active filter
  const filteredWritings = writings.filter((writing) => {
    if (activeFilter === "all") return true;
    return writing.mode === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">تاریخچه نوشته‌ها</h2>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            مشاهده نوشته‌های قبلی، تحلیل‌های AI، اشتباهات و اصلاحات گذشته
          </p>
        </div>

        <WritingHistoryFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          itemCounts={itemCounts}
        />
      </div>

      {filteredWritings.length === 0 ? (
        <div
          className="rounded-2xl border border-white/10 bg-slate-950/60 p-8 text-center"
          dir="rtl"
        >
          <p className="text-slate-400">هیچ نوشته‌ای در این دسته موجود نیست.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredWritings.map((writing) => (
            <WritingHistoryCard key={writing.id} writing={writing} />
          ))}
        </div>
      )}
    </div>
  );
}
