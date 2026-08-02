import Link from "next/link";
import {
  BookOpenText,
  BookText,
  Clock3,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LibraryBig,
  Newspaper,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  READING_RESOURCE_STATUS_LABELS,
  READING_RESOURCE_TYPE_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingResourceSummary,
  ReadingResourceType,
} from "../../types/reading.types";

type ReadingResourceCardProps = Readonly<{
  resource: ReadingResourceSummary;
}>;

const resourceTypeIcons = {
  book: LibraryBig,
  graded_reader: GraduationCap,
  short_story: BookText,
  article: Newspaper,
  lesson: BookOpenText,
  image_text: ImageIcon,
  document: FileText,
} satisfies Record<
  ReadingResourceType,
  LucideIcon
>;

const statusStyles = {
  ready:
    "border-emerald-400/15 bg-emerald-400/10 text-emerald-200",

  processing:
    "border-amber-400/15 bg-amber-400/10 text-amber-200",

  coming_soon:
    "border-white/[0.07] bg-white/[0.04] text-slate-500",

  failed:
    "border-red-400/15 bg-red-400/10 text-red-200",
} as const;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function ReadingResourceCard({
  resource,
}: ReadingResourceCardProps) {
  const ResourceIcon =
    resourceTypeIcons[
      resource.resourceType
    ];

  const isNavigable =
    resource.status === "ready" ||
    resource.status === "processing";

  const card = (
    <Card
      className={cn(
        "group relative flex h-full flex-col",
        "overflow-hidden p-5",
        "transition duration-300",

        isNavigable && [
          "hover:-translate-y-1",
          "hover:border-cyan-400/20",
          "hover:bg-cyan-400/[0.035]",
        ],

        !isNavigable &&
          "opacity-70",
      )}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-20 -top-20
          h-44 w-44 rounded-full
          bg-cyan-500/10
          opacity-0 blur-3xl
          transition group-hover:opacity-100
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl bg-cyan-400/10
              text-cyan-300
            "
          >
            <ResourceIcon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {resource.isFeatured ? (
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full border
                  border-violet-400/15
                  bg-violet-400/10
                  px-2.5 py-1 text-[10px]
                  font-medium text-violet-200
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                پیشنهادی
              </span>
            ) : null}

            <span
              className={cn(
                "rounded-full border px-2.5 py-1",
                "text-[10px] font-medium",

                statusStyles[
                  resource.status
                ],
              )}
            >
              {
                READING_RESOURCE_STATUS_LABELS[
                  resource.status
                ]
              }
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs font-medium text-cyan-300">
          {
            READING_RESOURCE_TYPE_LABELS[
              resource.resourceType
            ]
          }
        </p>

        <h3
          className="
            mt-2 text-lg font-bold
            leading-8 text-white
          "
          dir="ltr"
        >
          {resource.title}
        </h3>

        {resource.author ? (
          <p
            className="mt-1 text-xs text-slate-600"
            dir="ltr"
          >
            {resource.author}
          </p>
        ) : null}

        {resource.description ? (
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
            {resource.description}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {resource.topics
            .slice(0, 3)
            .map((topic) => (
              <span
                key={topic}
                className="
                  rounded-lg bg-white/[0.04]
                  px-2.5 py-1 text-[10px]
                  text-slate-500
                "
              >
                {topic}
              </span>
            ))}
        </div>

        <div
          className="
            mt-5 flex flex-wrap
            items-center gap-4
            border-t border-white/[0.06]
            pt-4 text-xs text-slate-500
          "
        >
          <span className="flex items-center gap-1.5">
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {numberFormatter.format(
              resource.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>

          <span>
            سطح {resource.cefrLevel}
          </span>

          <span>
            {numberFormatter.format(
              resource.totalSections,
            )}{" "}
            بخش
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              پیشرفت
            </span>

            <span className="text-xs font-semibold text-slate-300">
              {numberFormatter.format(
                resource.progressPercent,
              )}
              ٪
            </span>
          </div>

          <Progress
            value={
              resource.progressPercent
            }
            label={`پیشرفت ${resource.title}`}
          />
        </div>

        <div
          className="
            mt-5 rounded-xl
            border border-white/[0.06]
            bg-white/[0.025]
            px-4 py-3 text-center
            text-xs font-medium
            text-cyan-300
          "
        >
          {resource.status ===
          "processing"
            ? "مشاهده وضعیت پردازش"
            : isNavigable
              ? "مشاهده جزئیات"
              : "فعلاً در دسترس نیست"}
        </div>
      </div>
    </Card>
  );

  if (!isNavigable) {
    return card;
  }

  return (
    <Link
      href={`/reading/resources/${resource.id}`}
      aria-label={`مشاهده ${resource.title}`}
      className="
        block h-full rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/60
      "
    >
      {card}
    </Link>
  );
}