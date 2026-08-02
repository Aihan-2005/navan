"use client";

import {
  BookOpenText,
  Search,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  ReadingResourceCard,
} from "../overview/reading-resource-card";

import {
  READING_RESOURCE_TYPE_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingCefrLevel,
  ReadingResourceSummary,
  ReadingResourceType,
} from "../../types/reading.types";

type ReadingLibraryProps = Readonly<{
  resources:
    readonly ReadingResourceSummary[];
}>;

type LevelFilter =
  | "all"
  | ReadingCefrLevel;

type TypeFilter =
  | "all"
  | ReadingResourceType;

const levelOptions = [
  "all",
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
] as const satisfies readonly LevelFilter[];

export function ReadingLibrary({
  resources,
}: ReadingLibraryProps) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [levelFilter, setLevelFilter] =
    useState<LevelFilter>("all");

  const [typeFilter, setTypeFilter] =
    useState<TypeFilter>("all");

  const filteredResources =
    useMemo(() => {
      const normalizedQuery =
        searchQuery
          .trim()
          .toLowerCase();

      return resources.filter(
        (resource) => {
          const matchesSearch =
            !normalizedQuery ||
            resource.title
              .toLowerCase()
              .includes(
                normalizedQuery,
              ) ||
            resource.author
              ?.toLowerCase()
              .includes(
                normalizedQuery,
              ) ||
            resource.topics.some(
              (topic) =>
                topic
                  .toLowerCase()
                  .includes(
                    normalizedQuery,
                  ),
            );

          const matchesLevel =
            levelFilter === "all" ||
            resource.cefrLevel ===
              levelFilter;

          const matchesType =
            typeFilter === "all" ||
            resource.resourceType ===
              typeFilter;

          return (
            matchesSearch &&
            matchesLevel &&
            matchesType
          );
        },
      );
    }, [
      levelFilter,
      resources,
      searchQuery,
      typeFilter,
    ]);

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="reading-library-title"
    >
      <section
        className="
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div className="flex items-center gap-2 text-cyan-300">
          <BookOpenText
            aria-hidden="true"
            className="h-5 w-5"
          />

          کتابخانه Reading
        </div>

        <h1
          id="reading-library-title"
          className="mt-3 text-3xl font-bold text-white"
        >
          منابع مناسب سطح خودت را پیدا کن
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          کتاب‌ها، داستان‌ها، مقاله‌ها و درس‌های
          سطح‌بندی‌شده را بر اساس سطح و نوع محتوا
          فیلتر کن.
        </p>
      </section>

      <Card className="p-5">
        <div
          className="
            grid gap-4
            md:grid-cols-[minmax(0,1fr)_180px_220px]
          "
        >
          <label>
            <span className="text-xs font-medium text-slate-400">
              جست‌وجو
            </span>

            <span className="relative mt-2 block">
              <Search
                aria-hidden="true"
                className="
                  absolute right-3 top-1/2
                  h-4 w-4 -translate-y-1/2
                  text-slate-600
                "
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value,
                  )
                }
                placeholder="عنوان، نویسنده یا موضوع"
                className="
                  h-11 w-full rounded-xl
                  border border-white/[0.08]
                  bg-black/15 pr-10 pl-4
                  text-sm text-slate-200
                  outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/25
                "
              />
            </span>
          </label>

          <label>
            <span className="text-xs font-medium text-slate-400">
              سطح
            </span>

            <select
              value={levelFilter}
              onChange={(event) =>
                setLevelFilter(
                  event.target
                    .value as LevelFilter,
                )
              }
              className="
                mt-2 h-11 w-full
                rounded-xl border
                border-white/[0.08]
                bg-[#0B1221] px-3
                text-sm text-slate-200
                outline-none
              "
            >
              {levelOptions.map(
                (level) => (
                  <option
                    key={level}
                    value={level}
                  >
                    {level === "all"
                      ? "همه سطح‌ها"
                      : level}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className="text-xs font-medium text-slate-400">
              نوع محتوا
            </span>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target
                    .value as TypeFilter,
                )
              }
              className="
                mt-2 h-11 w-full
                rounded-xl border
                border-white/[0.08]
                bg-[#0B1221] px-3
                text-sm text-slate-200
                outline-none
              "
            >
              <option value="all">
                همه منابع
              </option>

              {Object.entries(
                READING_RESOURCE_TYPE_LABELS,
              ).map(
                ([value, label]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </Card>

      {filteredResources.length > 0 ? (
        <section
          className="
            grid gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredResources.map(
            (resource) => (
              <ReadingResourceCard
                key={resource.id}
                resource={resource}
              />
            ),
          )}
        </section>
      ) : (
        <Card className="p-10 text-center">
          <Search
            aria-hidden="true"
            className="
              mx-auto h-10 w-10
              text-slate-600
            "
          />

          <h2 className="mt-4 text-lg font-bold text-white">
            منبعی پیدا نشد
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            عبارت جست‌وجو یا فیلترها را تغییر بده.
          </p>
        </Card>
      )}
    </main>
  );
}