"use client";

import type { WritingHistoryItem } from "../../api/get-writing-history";

type WritingHistoryFiltersProps = Readonly<{
  activeFilter: "all" | "exercise" | "free";
  onFilterChange: (filter: "all" | "exercise" | "free") => void;
  itemCounts: {
    all: number;
    exercise: number;
    free: number;
  };
}>;

export function WritingHistoryFilters({
  activeFilter,
  onFilterChange,
  itemCounts,
}: WritingHistoryFiltersProps) {
  const filters = [
    { id: "all" as const, label: "همه", count: itemCounts.all },
    { id: "exercise" as const, label: "تمرین", count: itemCounts.exercise },
    { id: "free" as const, label: "نوشتن آزاد", count: itemCounts.free },
  ];

  return (
    <div className="flex flex-wrap gap-2" dir="rtl">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition
            ${
              activeFilter === filter.id
                ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-200"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }
          `}
          aria-label={`فیلتر: ${filter.label} (${filter.count} مورد)`}
        >
          {filter.label}
          <span
            className={`
              rounded-full px-2 py-0.5 text-xs
              ${
                activeFilter === filter.id
                  ? "bg-cyan-400/20 text-cyan-100"
                  : "bg-white/10 text-slate-500"
              }
            `}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}
