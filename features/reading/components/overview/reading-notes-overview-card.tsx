"use client";

import Link from "next/link";

import {
  BookmarkCheck,
  BookOpenText,
  Languages,
  Sparkles,
} from "lucide-react";

import {
  useReadingSavedItems,
} from "../../hooks/use-reading-saved-items";

import type {
  ReadingSavedItemKind,
} from "../../types/reading-note.types";

function getKindLabel(
  kind:
    ReadingSavedItemKind,
): string {
  switch (
    kind
  ) {
    case "vocabulary":
      return "واژه";

    case "meaning":
      return "معنی و مفهوم";

    case "educational_note":
      return "نکته آموزشی";

    case "grammar":
      return "گرامر";

    case "expression":
      return "عبارت کاربردی";
  }
}

export function ReadingNotesOverviewCard() {
  const {
    items,
  } =
    useReadingSavedItems();

  const vocabularyCount =
    items.filter(
      (
        item,
      ) =>
        item.kind ===
        "vocabulary",
    ).length;

  const analysisCount =
    items.length -
    vocabularyCount;

  const latestItems =
    items.slice(
      0,
      6,
    );

  return (
    <section
      aria-labelledby="reading-notes-title"
      className="
        rounded-3xl
        border
        border-[#E2E8F0]
        bg-white/80
        p-5
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        backdrop-blur-xl
        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-[#00685F]
            "
          >
            <BookmarkCheck
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-xs
                font-bold
              "
            >
              Saved Learning
            </span>
          </div>

          <h2
            id="reading-notes-title"
            className="
              mt-2
              text-xl
              font-bold
              text-[#191C1E]
            "
          >
            یادداشت‌ها
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            واژه‌ها، نکات گرامری، معنی‌ها و عبارت‌هایی که هنگام مطالعه برای مرور بعدی ذخیره کرده‌ای.
          </p>
        </div>

        <div
          className="
            flex
            gap-2
          "
        >
          <div
            className="
              rounded-xl
              border
              border-[#DDE7E5]
              bg-[#F7FBFA]
              px-3
              py-2
            "
          >
            <p
              className="
                text-[10px]
                text-[#64748B]
              "
            >
              واژگان
            </p>

            <p
              className="
                mt-1
                text-lg
                font-bold
                text-[#00685F]
              "
            >
              {vocabularyCount}
            </p>
          </div>

          <div
            className="
              rounded-xl
              border
              border-[#E8E1F6]
              bg-[#FAF8FE]
              px-3
              py-2
            "
          >
            <p
              className="
                text-[10px]
                text-[#64748B]
              "
            >
              تحلیل‌ها
            </p>

            <p
              className="
                mt-1
                text-lg
                font-bold
                text-[#712AE2]
              "
            >
              {analysisCount}
            </p>
          </div>
        </div>
      </div>

      {latestItems.length >
      0 ? (
        <div
          className="
            mt-5
            grid
            gap-3
            md:grid-cols-2
          "
        >
          {latestItems.map(
            (
              item,
            ) => (
              <Link
                key={
                  item.id
                }
                href={
                  item.href
                }
                className="
                  group
                  rounded-2xl
                  border
                  border-[#E2E8F0]
                  bg-[#F8FAFC]
                  p-4
                  transition
                  hover:border-[#00685F]/25
                  hover:bg-[#F4FBF9]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D6EDEB]
                      text-[#00685F]
                    "
                  >
                    {item.kind ===
                    "vocabulary" ? (
                      <Languages
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : item.kind ===
                      "expression" ? (
                      <Sparkles
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : (
                      <BookOpenText
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    )}
                  </span>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-[#00685F]
                        "
                      >
                        {getKindLabel(
                          item.kind,
                        )}
                      </span>

                      <span
                        className="
                          text-[10px]
                          text-[#94A3B8]
                        "
                      >
                        {item.resourceTitle}
                      </span>
                    </div>

                    <p
                      className="
                        mt-1
                        truncate
                        text-sm
                        font-bold
                        text-[#191C1E]
                        transition
                        group-hover:text-[#00685F]
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        mt-1
                        line-clamp-2
                        text-xs
                        leading-5
                        text-[#64748B]
                      "
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-dashed
            border-[#CBD5E1]
            bg-[#F8FAFC]
            px-5
            py-6
            text-center
          "
        >
          <BookmarkCheck
            aria-hidden="true"
            className="
              mx-auto
              h-6
              w-6
              text-[#94A3B8]
            "
          />

          <p
            className="
              mt-3
              text-sm
              font-medium
              text-[#475569]
            "
          >
            هنوز یادداشتی ذخیره نکرده‌ای.
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-6
              text-[#94A3B8]
            "
          >
            هنگام مطالعه روی آیکون Bookmark هر تحلیل بزن تا اینجا برای مرور بعدی ذخیره شود.
          </p>
        </div>
      )}
    </section>
  );
}