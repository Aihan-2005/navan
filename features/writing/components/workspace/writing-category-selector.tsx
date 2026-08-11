"use client";

import { useState } from "react";
import { ArrowLeft, PenTool, ArrowLeft as ArrowIcon } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";
import { WRITING_CATEGORIES } from "../../constants/writing.constants";
import { WritingWorkspace } from "./writing-workspace";

type WritingCategorySelectorProps = Readonly<{
  onCategorySelect: (category: string) => void;
}>;

export function WritingCategorySelector({
  onCategorySelect,
}: WritingCategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      dir="rtl"
    >
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))]
          px-6 py-8 shadow-2xl
          sm:px-8 sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-24 -top-24
            h-72 w-72 rounded-full
            bg-cyan-500/20 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-28 right-12
            h-72 w-72 rounded-full
            bg-violet-500/15 blur-3xl
          "
        />

        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-cyan-300">
            <PenTool aria-hidden="true" className="h-4 w-4" />
            نوشتن آزاد
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            موضوع نوشته خودت را انتخاب کن
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            قبل از شروع نوشتن، دسته‌بندی موضوع را انتخاب کن تا راهنمایی‌های
            مناسب‌تری دریافت کنی.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white">انتخاب دسته‌بندی</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            دسته‌بندی که به موضوع نوشته‌ات نزدیک‌تر است را انتخاب کن.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {WRITING_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.value;

            return (
              <Card
                key={category.value}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden p-5",
                  "transition duration-300",
                  "hover:-translate-y-1 hover:border-cyan-400/20",
                  isSelected
                    ? "border-cyan-400/30 bg-cyan-400/5"
                    : "border-white/10 bg-white/[0.02]",
                )}
                dir="rtl"
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute -left-20 -top-20
                    h-44 w-44 rounded-full bg-cyan-500/10
                    opacity-0 blur-3xl transition
                    group-hover:opacity-100
                  "
                />

                <div className="relative flex h-full flex-col">
                  <h3 className="text-lg font-bold leading-8 text-white">
                    {category.label}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">
                    {category.description}
                  </p>

                  <div
                    className="
                      mt-5 flex items-center justify-between
                      border-t border-white/[0.06] pt-4
                    "
                  >
                    {isSelected ? (
                      <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        انتخاب شده
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">برای انتخاب کلیک کن</span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCategorySelect(category.value)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 transition hover:bg-cyan-300"
                      aria-label={`انتخاب ${category.label}`}
                    >
                      <ArrowIcon aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {selectedCategory !== "all" && (
        <section className="flex justify-center">
          <button
            type="button"
            onClick={() => onCategorySelect(selectedCategory)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            شروع نوشتن
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
        </section>
      )}
    </main>
  );
}
