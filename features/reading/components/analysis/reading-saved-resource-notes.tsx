"use client";

import Link from "next/link";

import {
  BookmarkCheck,
  BookOpenText,
  Languages,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  useReadingSavedItems,
} from "../../hooks/use-reading-saved-items";

import type {
  ReadingSavedItem,
} from "../../types/reading-note.types";

type ReadingSavedResourceNotesProps =
  Readonly<{
    resourceId:
      string;
  }>;

export function ReadingSavedResourceNotes({
  resourceId,
}: ReadingSavedResourceNotesProps) {
  const {
    items,
  } =
    useReadingSavedItems(
      resourceId,
    );

  const vocabularyItems =
    items.filter(
      (
        item,
      ) =>
        item.kind ===
        "vocabulary",
    );

  const analysisItems =
    items.filter(
      (
        item,
      ) =>
        item.kind !==
        "vocabulary",
    );

  return (
    <section
      aria-labelledby="saved-reading-analysis-title"
      className="
        mx-auto
        w-full
        max-w-7xl
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-cyan-300
        "
      >
        <BookmarkCheck
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span
          className="
            text-sm
            font-medium
          "
        >
          Saved from this resource
        </span>
      </div>

      <h2
        id="saved-reading-analysis-title"
        className="
          mt-2
          text-2xl
          font-bold
          text-white
        "
      >
        موارد ذخیره‌شده این منبع
      </h2>

      <p
        className="
          mt-2
          max-w-3xl
          text-sm
          leading-7
          text-slate-500
        "
      >
        فقط تحلیل‌ها و واژه‌هایی که هنگام مطالعه خودت علامت زده‌ای اینجا باقی می‌مانند.
      </p>

      <div
        className="
          mt-6
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        <SavedItemsCard
          icon={
            Languages
          }
          title="واژگان ذخیره‌شده"
          description="لغت‌هایی که برای مرور بعدی انتخاب کرده‌ای."
          items={
            vocabularyItems
          }
          emptyText="هنوز واژه‌ای از این منبع ذخیره نکرده‌ای."
        />

        <SavedItemsCard
          icon={
            BookOpenText
          }
          title="تحلیل‌ها و نکات ذخیره‌شده"
          description="معنی، نکته آموزشی، گرامر و عبارت‌های مهم."
          items={
            analysisItems
          }
          emptyText="هنوز تحلیل یا نکته‌ای از این منبع ذخیره نکرده‌ای."
        />
      </div>
    </section>
  );
}

function SavedItemsCard({
  icon: Icon,
  title,
  description,
  items,
  emptyText,
}: Readonly<{
  icon:
    typeof Languages;

  title:
    string;

  description:
    string;

  items:
    readonly ReadingSavedItem[];

  emptyText:
    string;
}>) {
  return (
    <Card
      className="
        overflow-hidden
      "
    >
      <div
        className="
          border-b
          border-white/[0.06]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-violet-300
          "
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h3
            className="
              font-bold
              text-white
            "
          >
            {title}
          </h3>
        </div>

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-slate-500
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          max-h-[520px]
          overflow-y-auto
          p-4
          sm:p-5
        "
      >
        {items.length >
        0 ? (
          <div
            className="
              space-y-3
            "
          >
            {items.map(
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
                    block
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                    transition
                    hover:border-cyan-400/15
                    hover:bg-white/[0.045]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <p
                      className="
                        min-w-0
                        truncate
                        text-sm
                        font-bold
                        text-slate-200
                      "
                    >
                      {item.title}
                    </p>

                    <span
                      className="
                        shrink-0
                        text-[10px]
                        text-slate-700
                      "
                    >
                      {item.sectionTitle}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      line-clamp-3
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {item.content}
                  </p>

                  {item.secondaryText ? (
                    <p
                      dir={
                        item.kind ===
                        "vocabulary" ||
                        item.kind ===
                        "expression"
                          ? "ltr"
                          : "auto"
                      }
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-6
                        text-slate-600
                      "
                    >
                      {
                        item.secondaryText
                      }
                    </p>
                  ) : null}
                </Link>
              ),
            )}
          </div>
        ) : (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-white/[0.08]
              px-4
              py-8
              text-center
            "
          >
            <BookmarkCheck
              aria-hidden="true"
              className="
                mx-auto
                h-6
                w-6
                text-slate-700
              "
            />

            <p
              className="
                mt-3
                text-xs
                leading-6
                text-slate-600
              "
            >
              {emptyText}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}