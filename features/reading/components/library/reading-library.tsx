"use client";

import {
  Search,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type {
  ReadingCefrLevel,
  ReadingResourceSummary,
  ReadingResourceType,
} from "../../types/reading.types";

import {
  ReadingLibraryCard,
} from "./reading-library-card";

type ReadingLibraryProps =
  Readonly<{
    resources:
    readonly ReadingResourceSummary[];
  }>;
type LevelFilter =
  | "all"
  | ReadingCefrLevel;

type TypeFilter =
  | "all"
  | ReadingResourceType;

type TypeFilterOption =
  Readonly<{
    value:
    TypeFilter;

    label:
    string;
  }>;

const LEVEL_OPTIONS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
] as const satisfies readonly ReadingCefrLevel[];

const TYPE_OPTIONS = [
  {
    value: "all",

    label:
      "همه",
  },

  {
    value:
      "short_story",

    label:
      "داستان",
  },

  {
    value:
      "book",

    label:
      "کتاب",
  },

  {
    value:
      "article",

    label:
      "مقاله",
  },

  {
    value:
      "lesson",

    label:
      "درس",
  },
] as const satisfies readonly TypeFilterOption[];

function normalizeSearchValue(
  value: string,
): string {
  return value
    .trim()
    .toLocaleLowerCase(
      "fa-IR",
    );
}

export function ReadingLibrary({
  resources,
}: ReadingLibraryProps) {
  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");

  const [
    levelFilter,
    setLevelFilter,
  ] = useState<LevelFilter>(
    "all",
  );

  const [
    typeFilter,
    setTypeFilter,
  ] =
    useState<TypeFilter>(
      "all",
    );

  const filteredResources =
    useMemo(
      () => {
        const normalizedQuery =
          normalizeSearchValue(
            searchQuery,
          );

        return resources.filter(
          (resource) => {
            const searchableValues =
              [
                resource.title,

                resource.author ??
                "",

                resource.description ??
                "",

                ...resource.topics,
              ];

            const matchesSearch =
              normalizedQuery.length ===
              0 ||
              searchableValues.some(
                (value) =>
                  normalizeSearchValue(
                    value,
                  ).includes(
                    normalizedQuery,
                  ),
              );

            const matchesLevel =
              levelFilter ===
              "all" ||
              resource.cefrLevel ===
              levelFilter;

            const matchesType =
              typeFilter ===
              "all" ||
              resource.resourceType ===
              typeFilter;

            return (
              matchesSearch &&
              matchesLevel &&
              matchesType
            );
          },
        );
      },
      [
        levelFilter,
        resources,
        searchQuery,
        typeFilter,
      ],
    );

  function toggleLevel(
    level:
      ReadingCefrLevel,
  ): void {
    setLevelFilter(
      (currentLevel) =>
        currentLevel === level
          ? "all"
          : level,
    );
  }

  return (
    <main
      aria-labelledby="reading-library-title"
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
      className="
        mx-auto
        w-full
        max-w-[936px]
        pb-8
        text-[#191C1E]
      "
    >
      <header
        className="
          min-h-[72px]
          pb-2
        "
      >
        <h1
          id="reading-library-title"
          className="text-right
            text-[28px]
            font-bold
            leading-9
            tracking-[-0.01em]
            text-[#191C1E]
          "
        >
          کتابخانه
        </h1>

        <p
          className="
            mt-2
            text-right
            text-base
            font-normal
            leading-6
            text-[#3D4947]
          "
        >
          مجموعه‌ای از متن‌ها و داستان‌های سطح‌بندی‌شده
        </p>
      </header>

      <section
        aria-label="فیلترهای کتابخانه"
        className="
          mt-2
          flex min-h-[38px]
          flex-wrap
          items-center
          gap-2
        "
      >
        <label
          className="
            relative
            block
            h-8
            w-full
            shrink-0
            sm:w-[158px]
          "
        >
          <span className="sr-only">
            جستجو در کتابخانه
          </span>

          <Search
            aria-hidden="true"
            strokeWidth={1.8}
            className="
              pointer-events-none absolute
              right-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-[#3D4947]
            "
          />

          <input
            type="search"
            value={
              searchQuery
            }
            onChange={(
              event,
            ) => {
              setSearchQuery(
                event.target.value,
              );
            }}
            placeholder="جستجو..."
            className="
              h-full
              w-full
              rounded-lg
              border
              border-[#BCC9C6]bg-[#F4F6F7]
              py-1.5
              pr-9
              pl-3
              text-right
              text-xs
              font-normal
              text-[#191C1E]
              outline-none
              transition
              placeholder:text-[#6B7280]
              focus:border-[#00897F]
              focus:ring-2
              focus:ring-[#00897F]/10
            "
          />
        </label>

        <div
          aria-label="نوع محتوا"
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {TYPE_OPTIONS.map(
            (option) => {
              const active =
                typeFilter === option.value;

              return (
                <button
                  key={
                    option.value
                  }
                  type="button"
                  aria-pressed={
                    active
                  }
                  onClick={() => {
                    setTypeFilter(
                      option.value,
                    );
                  }}
                  className={`
                    inline-flex
                    h-7
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-4
                    text-xs
                    font-medium
                    leading-[14px]
                    tracking-[0.05em]
                    transition
                    ${active
                      ? `
                          border-[#191C1E]
                          bg-[#191C1E]
                          text-white
                        `
                      : `
                          border-[#BCC9C6]
                          bg-[#ECEEF0]
                          text-[#3D4947]
                          hover:border-[#8EA19D]
                          hover:bg-[#E5E9EA]
                        `
                    }
                  `}
                >
                  {
                    option.label
                  }
                </button>
              );
            },
          )}
        </div>

        <span
          aria-hidden="true"
          className="
            mx-1
        hidden
            h-7
            w-px
            shrink-0
            bg-[#D4DCDA]
            lg:block
          "
        />

        <div
          aria-label="سطح زبان"
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {LEVEL_OPTIONS.map(
            (level) => {
              const active =
                levelFilter ===
                level;

              return (
                <button
                  key={
                    level
                  }
                  type="button"
                  dir="ltr"
                  aria-pressed={
                    active
                  }
                  onClick={() => {
                    toggleLevel(
                      level,
                    );
                  }}
                  className={`
                    inline-flex
                    h-7
                    min-w-[36px]
                    items-center
                    justify-center
                    rounded-md
                    border
                    px-2
                    text-[11px]
                    font-medium
                    leading-[14px]
                    tracking-[0.05em]
                    transition
                    ${active
                      ? `
                          border-[#00685F]
                          bg-[#00685F]
                          text-white
                        `
                      : `
                          border-[#00685F33]
                          bg-[#00685F1A]
                          text-[#00685F]
                          hover:bg-[#00685F26]
                        `
                    }
                  `}
                >
                  {level}
                </button>
              );
            },
          )}
        </div>
      </section>

      {filteredResources.length >
        0 ? (
        <section
          aria-label="منابع کتابخانه"
          className="
            mt-6
            grid
            grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
            gap-6
          "
        >
          {filteredResources.map(
            (resource) => (
              <ReadingLibraryCard
                key={
                  resource.id
                }
                resource={
                  resource
                }
              />
            ),
          )}
        </section>
      ) : (
        <section
          className="
            mt-8
            flex
            min-h-56
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-[#BCC9C6]
            bg-white/60
            px-6
            text-center
            "
        >
          <Search
            aria-hidden="true"
            className="
              h-9
              w-9
              text-[#84918F]
            "
          />

          <h2
            className="
              mt-4
              text-lg
              font-bold
              text-[#191C1E]
            "
          >
            منبعی پیدا نشد
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-[#687573]
            "
          >            جستجو یا فیلتر انتخاب‌شده را تغییر بده.
          </p>
        </section>
      )}
    </main>
  );
}