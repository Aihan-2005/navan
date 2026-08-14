import Link from "next/link";
import {
  BookOpen,
  BookOpenText,
  BookText,
  Clock3,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingResourceSummary,
  ReadingResourceType,
} from "../../types/reading.types";

type ReadingLibraryCardProps = Readonly<{
  resource: ReadingResourceSummary;
}>;

type ResourceVisual = Readonly<{
  icon: LucideIcon;
  headerClassName: string;
  iconClassName: string;
}>;const resourceVisuals = {
  book: {
    icon: BookOpen,
    headerClassName: "bg-[#FFF1BF]",
    iconClassName: "text-[#ECA33B]",
  },

  graded_reader: {
    icon: GraduationCap,
    headerClassName: "bg-[#E2EEFF]",
    iconClassName: "text-[#7692F3]",
  },

  short_story: {
    icon: BookText,
    headerClassName: "bg-[#F3E8FF]",
    iconClassName: "text-[#9567E8]",
  },

  article: {
    icon: Newspaper,
    headerClassName: "bg-[#FFE4E7]",
    iconClassName: "text-[#F46F91]",
  },

  lesson: {
    icon: BookOpenText,
    headerClassName: "bg-[#DDF8E8]",
    iconClassName: "text-[#5BCB8A]",
  },
image_text: {
    icon: ImageIcon,
    headerClassName: "bg-[#DFF3FF]",
    iconClassName: "text-[#55ACE0]",
  },

  document: {
    icon: FileText,
    headerClassName: "bg-[#DDF5F2]",
    iconClassName: "text-[#58BDB5]",
  },
} satisfies Record<
  ReadingResourceType,
  ResourceVisual
>;

const persianNumberFormatter =
  new Intl.NumberFormat("fa-IR");

function getActionLabel(
  resource: ReadingResourceSummary,
): string {
  if (resource.status === "processing") {
    return "در حال آماده‌سازی";
  }

  if (
    resource.status === "coming_soon"
  ) {
    return "به‌زودی";
  }if (resource.status === "failed") {
    return "در دسترس نیست";
  }

  if (resource.progressPercent > 0) {
    return "ادامه";
  }

  return "شروع";
}

export function ReadingLibraryCard({
  resource,
}: ReadingLibraryCardProps) {
  const visual =
    resourceVisuals[resource.resourceType];

  const ResourceIcon = visual.icon;

  const isNavigable =
    resource.status === "ready" ||
    resource.status === "processing";

  const actionLabel =
    getActionLabel(resource);

  const cardContent = (
    <article className={cn(
        "group flex h-[330px] w-full",
        "flex-col overflow-hidden",
        "rounded-2xl border",
        "border-[#E0E3E5]",
        "bg-white",
        "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
        "transition-[transform,box-shadow,border-color]",
        "duration-200",
        isNavigable && [
          "hover:-translate-y-0.5",
          "hover:border-[#C8D1D3]",
          "hover:shadow-[0_5px_18px_rgba(25,28,30,0.08)]",
        ],
        !isNavigable &&
          "opacity-70",
      )}
    >
      <div
        className={cn(
          "relative flex h-32 shrink-0",
          "items-center justify-center",
          "p-4",
          visual.headerClassName,
        )}
      >
        <span
          className="
            absolute right-4 top-4
            inline-flex min-w-[26px]
          items-center justify-center
            rounded-md bg-white
            px-1.5 py-1
            text-[10px] font-medium
            leading-none text-[#00685F]
            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
          "
          dir="ltr"
        >
          {resource.cefrLevel}
        </span>

        <ResourceIcon
          aria-hidden="true"
          strokeWidth={2}
          className={cn(
            "h-10 w-10",
            visual.iconClassName,
          )}
        />
      </div>

      <div
        className="
          flex min-h-0 flex-1
          flex-col p-5
        "
      >
        <h3
          className="  min-h-7 truncate
            text-center text-[18px]
            font-bold leading-7
            text-[#191C1E]
          "
          dir={
            resource.languageCode === "fa"
              ? "rtl"
              : "ltr"
          }
          title={resource.title}
        >
          {resource.title}
        </h3>

        <div className="mt-1 min-h-10">
          {resource.description ? (
            <p
              className="
                line-clamp-2
                text-right text-sm
                font-normal leading-5
                text-[#3D4947]
              "
            >
              {resource.description}
            </p>
          ) : (
            <p
              className="
                 text-right text-sm
                leading-5 text-[#77807E]
              "
            >
              توضیحات این منبع به‌زودی
              اضافه می‌شود.
            </p>
          )}
        </div>

        <div
          className="
            mt-auto flex h-8
            items-center justify-between
            border-b border-transparent
            pb-4 text-xs
            leading-[14px]
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
              className="h-[15px] w-[15px]"
              strokeWidth={1.8}
            />

            {persianNumberFormatter.format(
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
              className="h-[14px] w-[14px]"
              strokeWidth={1.8}
            />

            {persianNumberFormatter.format(
              resource.estimatedMinutes,
          )}{" "}
            دقیقه
          </span>
        </div>

        <div
          className={cn(
            "mt-4 flex h-9 shrink-0",
            "items-center justify-center",
            "rounded-lg bg-[#F8F8F8]",
            "text-sm font-bold",
            "leading-4 tracking-[0.14px]",
            isNavigable
              ? "text-[#E65100]"
              : "text-[#9DA4A3]",
          )}
        >
          {actionLabel}
        </div>
      </div>
    </article>
  );

  if (!isNavigable) {
    return cardContent;
  }

  return (
    <Link
       href={`/reading/resources/${resource.id}`}
      aria-label={`${actionLabel} ${resource.title}`}
      className="
        block rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#00685F]/40
        focus-visible:ring-offset-2
      "
    >
      {cardContent}
    </Link>
  );
}