"use client";

import {
  Filter,
  Headphones,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  LISTENING_ACCENT_LABELS,
  LISTENING_CONTENT_TYPE_LABELS,
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../constants/listening.constants";

import type {
  ListeningLibrarySort,
} from "../../types/listening-catalog.types";

import type {
  CefrLevel,
  ListeningAccent,
  ListeningContentSummary,
  ListeningContentType,
  ListeningPracticeMode,
} from "../../types/listening.types";

import {
  ListeningContentCard,
} from "../overview/listening-content-card";

type ListeningLibraryBrowserProps =
  Readonly<{
    items:
      readonly ListeningContentSummary[];
  }>;

type SelectableLevel =
  | CefrLevel
  | "all";

type SelectableAccent =
  | ListeningAccent
  | "all";

type SelectableContentType =
  | ListeningContentType
  | "all";

type SelectablePracticeMode =
  | ListeningPracticeMode
  | "all";

const LEVELS:
  readonly CefrLevel[] = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
  ];

const ACCENTS:
  readonly ListeningAccent[] = [
    "american",
    "british",
    "australian",
    "canadian",
    "mixed",
    "unknown",
  ];

const CONTENT_TYPES:
  readonly ListeningContentType[] = [
    "podcast",
    "conversation",
    "story",
    "news",
    "interview",
    "lecture",
    "exam",
    "custom",
  ];

const PRACTICE_MODES:
  readonly ListeningPracticeMode[] = [
    "listen_only",
    "full_dictation",
    "guided_dictation",
    "fill_in_the_blank",
    "comprehension",
    "shadowing",
  ];

const SORT_LABELS:
  Record<
    ListeningLibrarySort,
    string
  > = {
  recommended:
    "پیشنهادی",

  duration_asc:
    "کوتاه‌ترین",

  duration_desc:
    "طولانی‌ترین",

  level_asc:
    "سطح آسان‌تر",

  accuracy_desc:
    "بهترین عملکرد",
};

const LEVEL_ORDER:
  Record<
    CefrLevel,
    number
  > = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

export function ListeningLibraryBrowser({
  items,
}: ListeningLibraryBrowserProps) {
  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    level,
    setLevel,
  ] =
    useState<SelectableLevel>(
      "all",
    );

  const [
    accent,
    setAccent,
  ] =
    useState<SelectableAccent>(
      "all",
    );

  const [
    contentType,
    setContentType,
  ] =
    useState<SelectableContentType>(
      "all",
    );

  const [
    practiceMode,
    setPracticeMode,
  ] =
    useState<SelectablePracticeMode>(
      "all",
    );

  const [
    sort,
    setSort,
  ] =
    useState<ListeningLibrarySort>(
      "recommended",
    );

  const filteredItems =
    useMemo(
      () => {
        const normalizedSearch =
          search
            .trim()
            .toLocaleLowerCase(
              "fa",
            );

        const result =
          items.filter(
            (item) => {
              if (
                normalizedSearch
              ) {
                const searchable =
                  [
                    item.title,

                    item.description ??
                      "",

                    ...item.topics,

                    ...item.vocabularyPreview,
                  ]
                    .join(
                      " ",
                    )
                    .toLocaleLowerCase(
                      "fa",
                    );

                if (
                  !searchable.includes(
                    normalizedSearch,
                  )
                ) {
                  return false;
                }
              }

              if (
                level !==
                  "all" &&
                item.cefrLevel !==
                  level
              ) {
                return false;
              }

              if (
                accent !==
                  "all" &&
                item.accent !==
                  accent
              ) {
                return false;
              }

              if (
                contentType !==
                  "all" &&
                item.contentType !==
                  contentType
              ) {
                return false;
              }

              if (
                practiceMode !==
                  "all" &&
                !item
                  .availablePracticeModes
                  .includes(
                    practiceMode,
                  )
              ) {
                return false;
              }

              return true;
            },
          );

        return [
          ...result,
        ].sort(
          (
            first,
            second,
          ) => {
            switch (
              sort
            ) {
              case "duration_asc":
                return (
                  first.durationSeconds -
                  second.durationSeconds
                );

              case "duration_desc":
                return (
                  second.durationSeconds -
                  first.durationSeconds
                );

              case "level_asc":
                return (
                  LEVEL_ORDER[
                    first.cefrLevel
                  ] -
                  LEVEL_ORDER[
                    second.cefrLevel
                  ]
                );

              case "accuracy_desc":
                return (
                  (
                    second.bestAccuracyScore ??
                    -1
                  ) -
                  (
                    first.bestAccuracyScore ??
                    -1
                  )
                );

              case "recommended":
              default:
                if (
                  first.isFeatured !==
                  second.isFeatured
                ) {
                  return first.isFeatured
                    ? -1
                    : 1;
                }

                return (
                  first.estimatedPracticeMinutes -
                  second.estimatedPracticeMinutes
                );
            }
          },
        );
      },
      [
        accent,
        contentType,
        items,
        level,
        practiceMode,
        search,
        sort,
      ],
    );

  const activeFilterCount =
    [
      level !==
        "all",
      accent !==
        "all",
      contentType !==
        "all",
      practiceMode !==
        "all",
      Boolean(
        search.trim(),
      ),
    ].filter(
      Boolean,
    ).length;

  function resetFilters(): void {
    setSearch(
      "",
    );

    setLevel(
      "all",
    );

    setAccent(
      "all",
    );

    setContentType(
      "all",
    );

    setPracticeMode(
      "all",
    );

    setSort(
      "recommended",
    );
  }

  return (
    <section
      aria-labelledby="listening-library-browser-title"
      className="space-y-6"
    >
      <div
        className="
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-5
          shadow-[0_6px_22px_rgba(15,23,42,0.04)]
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-end
          "
        >
          <div
            className="
              min-w-0
              flex-1
            "
          >
            <label
              htmlFor="listening-library-search"
              className="
                text-xs
                font-bold
                text-[#334155]
              "
            >
              جست‌وجو در کتابخانه
            </label>

            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="
                  absolute
                  right-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#94A3B8]
                "
              />

              <input
                id="listening-library-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(
                    event.target.value,
                  );
                }}
                placeholder="موضوع، واژه، عنوان..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#D8E2E0]
                  bg-[#F8FAF9]
                  pr-10
                  pl-4
                  text-sm
                  text-[#0F172A]
                  outline-none
                  transition
                  placeholder:text-[#94A3B8]
                  focus:border-[#0D9488]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#14B8A6]/10
                "
              />
            </div>
          </div>

          <FilterSelect
            label="سطح"
            value={level}
            onChange={(
              value,
            ) => {
              setLevel(
                value as
                  SelectableLevel,
              );
            }}
          >
            <option value="all">
              همه سطح‌ها
            </option>

            {LEVELS.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </FilterSelect>

          <FilterSelect
            label="لهجه"
            value={accent}
            onChange={(
              value,
            ) => {
              setAccent(
                value as
                  SelectableAccent,
              );
            }}
          >
            <option value="all">
              همه لهجه‌ها
            </option>

            {ACCENTS.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {
                    LISTENING_ACCENT_LABELS[
                      item
                    ]
                  }
                </option>
              ),
            )}
          </FilterSelect>
        </div>

        <div
          className="
            mt-4
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <FilterSelect
            label="نوع محتوا"
            value={
              contentType
            }
            onChange={(
              value,
            ) => {
              setContentType(
                value as
                  SelectableContentType,
              );
            }}
          >
            <option value="all">
              همه محتواها
            </option>

            {CONTENT_TYPES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {
                    LISTENING_CONTENT_TYPE_LABELS[
                      item
                    ]
                  }
                </option>
              ),
            )}
          </FilterSelect>

          <FilterSelect
            label="حالت تمرین"
            value={
              practiceMode
            }
            onChange={(
              value,
            ) => {
              setPracticeMode(
                value as
                  SelectablePracticeMode,
              );
            }}
          >
            <option value="all">
              همه حالت‌ها
            </option>

            {PRACTICE_MODES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {
                    LISTENING_PRACTICE_MODE_LABELS[
                      item
                    ]
                  }
                </option>
              ),
            )}
          </FilterSelect>

          <FilterSelect
            label="مرتب‌سازی"
            value={sort}
            onChange={(
              value,
            ) => {
              setSort(
                value as
                  ListeningLibrarySort,
              );
            }}
          >
            {Object.entries(
              SORT_LABELS,
            ).map(
              ([
                value,
                label,
              ]) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ),
            )}
          </FilterSelect>

          <div
            className="
              flex
              items-end
            "
          >
            <button
              type="button"
              onClick={
                resetFilters
              }
              disabled={
                activeFilterCount ===
                  0 &&
                sort ===
                  "recommended"
              }
              className="
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D8E2E0]
                bg-white
                px-4
                text-xs
                font-bold
                text-[#52615F]
                transition
                hover:bg-[#F8FAF9]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />

              پاک‌کردن فیلترها
            </button>
          </div>
        </div>

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-[#E7ECEB]
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-[#64748B]
            "
          >
            <SlidersHorizontal
              aria-hidden="true"
              className="h-4 w-4"
            />

            {
              filteredItems.length
            }{" "}
            تمرین پیدا شد
          </div>

          {activeFilterCount >
          0 ? (
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-[#E7F4F2]
                px-3
                py-1
                text-[10px]
                font-bold
                text-[#00685F]
              "
            >
              <Filter
                aria-hidden="true"
                className="h-3 w-3"
              />

              {
                activeFilterCount
              }{" "}
              فیلتر فعال
            </span>
          ) : null}
        </div>
      </div>

      {filteredItems.length >
      0 ? (
        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredItems.map(
            (content) => (
              <ListeningContentCard
                key={
                  content.id
                }
                content={
                  content
                }
              />
            ),
          )}
        </div>
      ) : (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-[#C9D6D3]
            bg-[#FAFCFB]
            px-6
            py-14
            text-center
          "
        >
          <Headphones
            aria-hidden="true"
            className="
              mx-auto
              h-9
              w-9
              text-[#94A3B8]
            "
          />

          <h2
            id="listening-library-browser-title"
            className="
              mt-4
              text-base
              font-black
              text-[#334155]
            "
          >
            تمرینی با این فیلترها پیدا نشد
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#64748B]
            "
          >
            فیلترها را تغییر بده یا
            جست‌وجو را پاک کن.
          </p>
        </div>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: Readonly<{
  label:
    string;

  value:
    string;

  onChange:
    (
      value:
        string,
    ) => void;

  children:
    React.ReactNode;
}>) {
  return (
    <div>
      <label
        className="
          text-xs
          font-bold
          text-[#334155]
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => {
          onChange(
            event.target.value,
          );
        }}
        className="
          mt-2
          h-11
          w-full
          min-w-[150px]
          rounded-xl
          border
          border-[#D8E2E0]
          bg-[#F8FAF9]
          px-3
          text-sm
          text-[#334155]
          outline-none
          transition
          focus:border-[#0D9488]
          focus:bg-white
          focus:ring-2
          focus:ring-[#14B8A6]/10
        "
      >
        {children}
      </select>
    </div>
  );
}

