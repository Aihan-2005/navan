import Link from "next/link";
import {
  BookOpenText,
  BookText,
  Clock3,
  FileText,
  GraduationCap,
  ImageIcon,
  LibraryBig,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

import type {
  ReadingResourceSummary,
  ReadingResourceType,
} from "../../types/reading.types";

type ReadingLibraryCardProps = Readonly<{
  resource: ReadingResourceSummary;
}>;

type ResourceVisual = Readonly<{
  icon: LucideIcon;
  surfaceClassName: string;
  iconClassName: string;
}>;

const RESOURCE_VISUALS: Record<
  ReadingResourceType,
  ResourceVisual
> = {
  book: {
    icon: LibraryBig,
    surfaceClassName: "bg-[#FFE3E5]",
    iconClassName: "text-[#FF6B86]",
  },
  graded_reader: {
    icon: GraduationCap,
    surfaceClassName: "bg-[#E5F8EC]",
    iconClassName: "text-[#56C887]",
  },
  short_story: {
    icon: BookText,
    surfaceClassName: "bg-[#F3E8FF]",
    iconClassName: "text-[#9166E8]",
  },
  article: {
    icon: Newspaper,
    surfaceClassName: "bg-[#E0F2FE]",
    iconClassName: "text-[#4EAFE0]",
  },
  lesson: {
    icon: BookOpenText,
    surfaceClassName: "bg-[#FFF1C2]",
    iconClassName: "text-[#E89A38]",
  },
  image_text: {
    icon: ImageIcon,
    surfaceClassName: "bg-[#DDF8F3]",
    iconClassName: "text-[#55BDB5]",
  },
  document: {
    icon: FileText,
    surfaceClassName: "bg-[#E5EAFF]",
    iconClassName: "text-[#7D86EA]",
  },
};

const numberFormatter = new Intl.NumberFormat(
  "fa-IR",
);

function getActionLabel(
  status: ReadingResourceSummary["status"],
): string {
  switch (status) {
    case "ready":
      return "شروع";

    case "processing":
      return "در حال آماده‌سازی";

    case "coming_soon":
      return "به‌زودی";

    case "failed":
      return "در دسترس نیست";

    default:
      return "شروع";
  }
}

function LibraryCardContent({
  resource,
}: ReadingLibraryCardProps) {
  const visual =
    RESOURCE_VISUALS[resource.resourceType];

  const Icon = visual.icon;
  const isReady = resource.status === "ready";

  return (
    <article
      className="
        flex h-[330px] min-w-0 flex-col
        overflow-hidden rounded-2xl
        border border-[#E0E3E5]
        bg-white
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        transition-[transform,box-shadow,border-color]
        duration-200
        group-hover:-translate-y-0.5
        group-hover:border-[#C8D2D0]
        group-hover:shadow-[0_8px_24px_rgba(25,28,30,0.08)]
      "
    >
      <div
        className={`
          relative h-32 shrink-0
          ${visual.surfaceClassName}
        `}
      >
        <span
          className="
            absolute right-3 top-3 z-10
            inline-flex h-[22px]
            min-w-[28px] items-center
            justify-center rounded-md
            bg-white/90 px-1.5
            text-[10px] font-medium
            leading-none tracking-[0.04em]
            text-[#00685F]
            shadow-[0_1px_2px_rgba(0,0,0,0.04)]
          "
          dir="ltr"
        >
          {resource.cefrLevel}
        </span>

        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={2}
            className={`
              h-10 w-10
              ${visual.iconClassName}
            `}
          />
        </div>
      </div>

      <div
        className="
          flex min-h-0 flex-1
          flex-col p-5"
          >
           <h2
          className="
            truncate text-center
            text-[18px] font-bold
            leading-7 text-[#191C1E]
          "
          dir="ltr"
          title={resource.title}
        >
          {resource.title}
        </h2>

        <p
          className="
            mt-1 min-h-10
            overflow-hidden
            text-right text-sm
            leading-5 text-[#3D4947]
            [display:-webkit-box]
            [-webkit-box-orient:vertical]
            [-webkit-line-clamp:2]
          "
        >
          {resource.description ??
            "متنی سطح‌بندی‌شده برای تقویت مهارت خواندن و درک مطلب."}
        </p>

        <div
          className="
            mt-auto flex h-8
            items-end justify-between
            border-0 pb-1
            text-[11px]
            text-[#3D4947]
          "
        >
          <span
            className="
              inline-flex items-center gap-1
              whitespace-nowrap
            "
          >
            <BookOpenText
              aria-hidden="true"
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />

            {numberFormatter.format(
              resource.totalSections,
            )}{" "}
            بخش
          </span>

          <span
           className="
              inline-flex items-center gap-1
              whitespace-nowrap
            "
          >
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />

            {numberFormatter.format(
              resource.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>
        </div>

        <div
          className={`
            mt-3 flex h-9 shrink-0
            items-center justify-center
            rounded-lg bg-[#F8F8F8]
            px-3 text-center
            text-sm font-bold
            leading-4 tracking-[0.01em]
            ${
              isReady
                ? "text-[#E65100]"
                : "text-[#8A9492]"
            }
          `}
        >
          {getActionLabel(resource.status)}
        </div>
      </div>
    </article>
  );
}

export function ReadingLibraryCard({
  resource,
}: ReadingLibraryCardProps) {
  if (resource.status !== "ready") {
    return (
      <div
        className="group"
aria-disabled="true"
      >
        <LibraryCardContent
          resource={resource}
        />
      </div>
    );
  }

  return (
    <Link
      href={`/reading/resources/${resource.id}`}
      className="
        group block rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#00897F]
        focus-visible:ring-offset-2
      "
    >
      <LibraryCardContent resource={resource} />
    </Link>
  );
}