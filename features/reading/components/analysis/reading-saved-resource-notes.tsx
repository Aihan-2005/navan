"use client";

import {
  BookmarkCheck,
  BookOpenText,
  Languages,
  MessageSquareQuote,
  Trash2,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useReadingSavedItems,
} from "../../hooks/use-reading-saved-items";

import type {
  ReadingSavedItem,
  ReadingSavedItemKind,
} from "../../types/reading-note.types";

type ReadingSavedResourceNotesProps =
  Readonly<{
    resourceId: string;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const KIND_LABELS:
  Readonly<
    Record<
      ReadingSavedItemKind,
      string
    >
  > = {
  vocabulary: "واژه",

  meaning: "معنی و مفهوم",

  educational_note:
    "نکته آموزشی",

  grammar: "گرامر",

  expression: "عبارت",
};

export function ReadingSavedResourceNotes({
  resourceId,
}: ReadingSavedResourceNotesProps) {
  const {
    items,
    removeSavedItem,
  } =
    useReadingSavedItems(
      resourceId,
    );

  const {
    vocabularyItems,
    expressionItems,
    analysisItems,
  } =
    useMemo(() => {
      const vocabulary:
        ReadingSavedItem[] =
        [];

      const expressions:
        ReadingSavedItem[] =
        [];

      const analysis:
        ReadingSavedItem[] =
        [];

      for (const item of items) {
        if (
          item.kind ===
          "vocabulary"
        ) {
          vocabulary.push(
            item,
          );

          continue;
        }

        if (
          item.kind ===
          "expression"
        ) {
          expressions.push(
            item,
          );

          continue;
        }

        analysis.push(
          item,
        );
      }

      return {
        vocabularyItems:
          vocabulary,

        expressionItems:
          expressions,

        analysisItems:
          analysis,
      };
    }, [
      items,
    ]);

  return (
    <section
      aria-labelledby="saved-reading-analysis-title"
      className="
        mx-auto
        w-full
        max-w-7xl
      "
      dir="rtl"
    >
      <header
        className="
          rounded-2xl
          border
          border-[#E2E8F0]
          bg-white
          px-5
          py-5
          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[#00685F]
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#E6F2F0]
            "
          >
            <BookmarkCheck
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <span
            className="
              text-sm
              font-bold
            "
          >
            موارد ذخیره‌شده
          </span>
        </div>

        <h2
          id="saved-reading-analysis-title"
          className="
            mt-4
            text-2xl
            font-bold
            leading-9
            text-[#0F172A]
          "
        >
          مرور موارد منتخب این منبع
        </h2>

        <p
          className="
            mt-2
            max-w-3xl
            text-sm
            leading-7
            text-[#64748B]
          "
        >
          واژه‌ها، عبارت‌ها و نکاتی که هنگام مطالعه ذخیره کرده‌ای
          بدون خروج از این صفحه در دسترس هستند. برای حذف هر مورد
          از دکمه سطل زباله همان کارت استفاده کن.
        </p>

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          <CountBadge
            label="واژه"
            count={
              vocabularyItems.length
            }
          />

          <CountBadge
            label="عبارت"
            count={
              expressionItems.length
            }
          />

          <CountBadge
            label="تحلیل و نکته"
            count={
              analysisItems.length
            }
          />
        </div>
      </header>

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-2
          2xl:grid-cols-3
        "
      >
        <SavedItemsCard
          icon={Languages}
          title="واژگان ذخیره‌شده"
          description="لغت‌هایی که برای مرور بعدی انتخاب کرده‌ای."
          items={
            vocabularyItems
          }
          emptyText="هنوز واژه‌ای از این منبع ذخیره نکرده‌ای."
          tone="teal"
          onRemove={
            removeSavedItem
          }
        />

        <SavedItemsCard
          icon={
            MessageSquareQuote
          }
          title="عبارت‌های منتخب"
          description="عبارت‌ها و ترکیب‌هایی که هنگام مطالعه مهم تشخیص داده‌ای."
          items={
            expressionItems
          }
          emptyText="هنوز عبارتی از این منبع ذخیره نکرده‌ای."
          tone="violet"
          onRemove={
            removeSavedItem
          }
        />

        <SavedItemsCard
          icon={
            BookOpenText
          }
          title="تحلیل‌ها و نکات ذخیره‌شده"
          description="معنی، نکته آموزشی و نکات گرامری ذخیره‌شده."
          items={
            analysisItems
          }
          emptyText="هنوز تحلیل یا نکته‌ای از این منبع ذخیره نکرده‌ای."
          tone="slate"
          onRemove={
            removeSavedItem
          }
        />
      </div>
    </section>
  );
}

type SavedItemsCardProps =
  Readonly<{
    icon: LucideIcon;

    title: string;

    description: string;

    items:
      readonly ReadingSavedItem[];

    emptyText: string;

    tone:
      | "teal"
      | "violet"
      | "slate";

    onRemove: (
      itemId: string,
    ) => void;
  }>;

function SavedItemsCard({
  icon: Icon,
  title,
  description,
  items,
  emptyText,
  tone,
  onRemove,
}: SavedItemsCardProps) {
  const toneStyle =
    getToneStyle(
      tone,
    );

  return (
    <article
      className="
        flex
        min-h-[360px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
      "
    >
      <header
        className="
          border-b
          border-[#E2E8F0]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${toneStyle.icon}
            `}
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5"
            />
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
                items-center
                gap-2
              "
            >
              <h3
                className="
                  font-bold
                  text-[#0F172A]
                "
              >
                {title}
              </h3>

              <span
                className="
                  inline-flex
                  min-w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F1F5F9]
                  px-2
                  py-0.5
                  text-[11px]
                  font-bold
                  text-[#475569]
                "
              >
                {numberFormatter.format(
                  items.length,
                )}
              </span>
            </div>

            <p
              className="
                mt-1
                text-xs
                leading-6
                text-[#64748B]
              "
            >
              {description}
            </p>
          </div>
        </div>
      </header>

      <div
        className="
          max-h-[520px]
          flex-1
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
                <SavedItem
                  key={
                    item.id
                  }
                  item={
                    item
                  }
                  tone={
                    tone
                  }
                  onRemove={
                    onRemove
                  }
                />
              ),
            )}
          </div>
        ) : (
          <SavedItemsEmptyState
            text={
              emptyText
            }
          />
        )}
      </div>
    </article>
  );
}

function SavedItem({
  item,
  tone,
  onRemove,
}: Readonly<{
  item:
    ReadingSavedItem;

  tone:
    | "teal"
    | "violet"
    | "slate";

  onRemove: (
    itemId: string,
  ) => void;
}>) {
  const toneStyle =
    getToneStyle(
      tone,
    );

  const isEnglishContent =
    item.kind ===
      "vocabulary" ||
    item.kind ===
      "expression";

  return (
    <article
      className="
        group
        rounded-xl
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        p-4
        transition
        duration-200
        hover:border-[#CBD5E1]
        hover:bg-white
        hover:shadow-[0_4px_16px_rgba(15,23,42,0.05)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
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
              className={`
                inline-flex
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-bold
                ${toneStyle.badge}
              `}
            >
              {
                KIND_LABELS[
                  item.kind
                ]
              }
            </span>

            <span
              className="
                text-[10px]
                font-medium
                text-[#94A3B8]
              "
            >
              {item.sectionTitle}
            </span>
          </div>

          <h4
            dir={
              isEnglishContent
                ? "ltr"
                : "auto"
            }
            className={`
              mt-3
              text-base
              font-bold
              leading-7
              text-[#0F172A]
              ${
                isEnglishContent
                  ? "text-left"
                  : "text-right"
              }
            `}
          >
            {item.title}
          </h4>
        </div>

        <button
          type="button"
          onClick={() => {
            onRemove(
              item.id,
            );
          }}
          aria-label={`حذف ${item.title}`}
          title="حذف از موارد ذخیره‌شده"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-transparent
            text-[#94A3B8]
            transition
            hover:border-[#FECACA]
            hover:bg-[#FEF2F2]
            hover:text-[#DC2626]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#DC2626]/20
          "
        >
          <Trash2
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </button>
      </div>

      <p
        dir="auto"
        className="
          mt-3
          whitespace-pre-line
          text-sm
          leading-7
          text-[#475569]
        "
      >
        {item.content}
      </p>

      {item.secondaryText ? (
        <div
          className="
            mt-3
            rounded-lg
            border
            border-[#E2E8F0]
            bg-white
            px-3
            py-2.5
          "
        >
          <p
            dir={
              isEnglishContent
                ? "ltr"
                : "auto"
            }
            className={`
              whitespace-pre-line
              text-xs
              leading-6
              text-[#64748B]
              ${
                isEnglishContent
                  ? "text-left"
                  : "text-right"
              }
            `}
          >
            {
              item.secondaryText
            }
          </p>
        </div>
      ) : null}
    </article>
  );
}

function SavedItemsEmptyState({
  text,
}: Readonly<{
  text: string;
}>) {
  return (
    <div
      className="
        flex
        min-h-[210px]
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-[#CBD5E1]
        bg-[#F8FAFC]
        px-5
        py-8
        text-center
      "
    >
      <span
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#94A3B8]
          shadow-sm
        "
      >
        <BookmarkCheck
          aria-hidden="true"
          className="h-6 w-6"
        />
      </span>

      <p
        className="
          mt-4
          max-w-[240px]
          text-xs
          leading-6
          text-[#64748B]
        "
      >
        {text}
      </p>
    </div>
  );
}

function CountBadge({
  label,
  count,
}: Readonly<{
  label: string;
  count: number;
}>) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        px-3
        py-1.5
        text-xs
        font-medium
        text-[#475569]
      "
    >
      {label}

      <strong
        className="
          font-bold
          text-[#0F172A]
        "
      >
        {numberFormatter.format(
          count,
        )}
      </strong>
    </span>
  );
}

function getToneStyle(
  tone:
    | "teal"
    | "violet"
    | "slate",
) {
  switch (tone) {
    case "teal":
      return {
        icon:
          "bg-[#D6EDEB] text-[#00685F]",

        badge:
          "bg-[#D6EDEB] text-[#00685F]",
      };

    case "violet":
      return {
        icon:
          "bg-[#F3E8FF] text-[#7E22CE]",

        badge:
          "bg-[#F3E8FF] text-[#7E22CE]",
      };

    case "slate":
      return {
        icon:
          "bg-[#E2E8F0] text-[#475569]",

        badge:
          "bg-[#E2E8F0] text-[#475569]",
      };
  }
}
