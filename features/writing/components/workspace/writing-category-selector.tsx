"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Check,
  PenTool,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  WRITING_CATEGORIES,
  type WritingCategoryId,
} from "../../constants/writing.constants";

type WritingCategorySelectorProps =
  Readonly<{
    onCategorySelect: (
      category: string,
    ) => void;
  }>;

export function WritingCategorySelector({
  onCategorySelect,
}: WritingCategorySelectorProps) {
  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] =
    useState<
      WritingCategoryId | null
    >(null);

  const selectedCategory =
    useMemo(
      () =>
        WRITING_CATEGORIES.find(
          (category) =>
            category.id ===
            selectedCategoryId,
        ) ?? null,
      [selectedCategoryId],
    );

  function handleConfirm():
    void {
    if (!selectedCategory) {
      return;
    }

    /**
     * WritingWorkspace در حال حاضر category را
     * به‌عنوان label نمایشی استفاده می‌کند.
     *
     * بنابراین title فارسی را می‌فرستیم، نه id انگلیسی.
     */
    onCategorySelect(
      selectedCategory.title,
    );
  }

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
      "
      dir="rtl"
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/15
          bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))]
          px-6
          py-8
          shadow-2xl
          sm:px-8
          sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-28
            right-12
            h-72
            w-72
            rounded-full
            bg-violet-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-cyan-300
            "
          >
            <PenTool
              aria-hidden="true"
              className="h-4 w-4"
            />

            نوشتن آزاد
          </div>

          <h1
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              text-white
              sm:text-4xl
            "
          >
            موضوع نوشته خودت را انتخاب کن
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-8
              text-slate-300
              sm:text-base
            "
          >
            قبل از شروع نوشتن، دسته‌بندی موضوع را انتخاب کن تا
            راهنمایی‌های مناسب‌تری دریافت کنی.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="writing-category-title"
      >
        <div className="mb-5">
          <h2
            id="writing-category-title"
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            انتخاب دسته‌بندی
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-slate-500
            "
          >
            دسته‌بندی که به موضوع نوشته‌ات نزدیک‌تر است را انتخاب
            کن.
          </p>
        </div>

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {WRITING_CATEGORIES.map(
            (category) => {
              const isSelected =
                selectedCategoryId ===
                category.id;

              return (
                <Card
                  key={category.id}
                  className={cn(
                    "group",
                    "relative",
                    "h-full",
                    "overflow-hidden",
                    "p-0",

                    "transition",
                    "duration-300",

                    "hover:-translate-y-1",
                    "hover:border-cyan-400/20",

                    isSelected
                      ? [
                          "border-cyan-400/35",
                          "bg-cyan-400/[0.07]",
                          "shadow-[0_16px_40px_rgba(34,211,238,0.08)]",
                        ]
                      : [
                          "border-white/10",
                          "bg-white/[0.02]",
                        ],
                  )}
                  dir="rtl"
                >
                  <button
                    type="button"
                    aria-pressed={
                      isSelected
                    }
                    onClick={() => {
                      setSelectedCategoryId(
                        category.id,
                      );
                    }}
                    className="
                      relative
                      flex
                      h-full
                      w-full
                      flex-col
                      p-5
                      text-right
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-cyan-300/30
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -left-20
                        -top-20
                        h-44
                        w-44
                        rounded-full
                        bg-cyan-500/10
                        opacity-0
                        blur-3xl
                        transition
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        h-full
                        w-full
                        flex-col
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div className="min-w-0">
                          <h3
                            className="
                              text-lg
                              font-bold
                              leading-8
                              text-white
                            "
                          >
                            {category.title}
                          </h3>
                        </div>

                        <span
                          className={cn(
                            `
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              transition
                            `,
                            isSelected
                              ? [
                                  "border-cyan-300/30",
                                  "bg-cyan-400",
                                  "text-slate-950",
                                ]
                              : [
                                  "border-white/10",
                                  "bg-white/[0.04]",
                                  "text-transparent",
                                ],
                          )}
                        >
                          <Check
                            aria-hidden="true"
                            className="h-4 w-4"
                            strokeWidth={2.4}
                          />
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          flex-1
                          text-sm
                          leading-7
                          text-slate-400
                        "
                      >
                        {category.description}
                      </p>

                      <div
                        className="
                          mt-5
                          flex
                          min-h-10
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-white/[0.06]
                          pt-4
                        "
                      >
                        {isSelected ? (
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              font-medium
                              text-cyan-300
                            "
                          >
                            <span
                              className="
                                h-2
                                w-2
                                rounded-full
                                bg-cyan-400
                              "
                            />

                            انتخاب شده
                          </div>
                        ) : (
                          <span
                            className="
                              text-xs
                              text-slate-500
                            "
                          >
                            برای انتخاب کلیک کن
                          </span>
                        )}

                        <span
                          className={cn(
                            `
                              inline-flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              transition
                            `,
                            isSelected
                              ? [
                                  "bg-cyan-400",
                                  "text-slate-950",
                                ]
                              : [
                                  "bg-white",
                                  "text-slate-950",
                                  "group-hover:bg-cyan-300",
                                ],
                          )}
                        >
                          <ArrowLeft
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                </Card>
              );
            },
          )}
        </div>
      </section>

      <section
        className="
          flex
          min-h-[52px]
          items-center
          justify-center
        "
      >
        {selectedCategory ? (
          <button
            type="button"
            onClick={
              handleConfirm
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-cyan-300/20
              bg-cyan-400/10
              px-6
              py-3
              text-sm
              font-semibold
              text-cyan-200
              transition
              hover:border-cyan-300/30
              hover:bg-cyan-400/15
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/30
            "
          >
            شروع نوشتن
            درباره «
            {selectedCategory.title}
            »

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        ) : (
          <p
            className="
              text-xs
              text-slate-500
            "
          >
            برای ادامه ابتدا یک دسته‌بندی انتخاب کن.
          </p>
        )}
      </section>
    </main>
  );
}