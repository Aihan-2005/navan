import Link from "next/link";

import {
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  Clapperboard,
  Clock3,
  Coffee,
  CookingPot,
  Landmark,
  Mail,
  Microscope,
  Plane,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingResourceSummary,
} from "../../types/reading.types";

type ReadingLibraryCardProps =
  Readonly<{
    resource:
      ReadingResourceSummary;
  }>;

type ResourceVisual =
  Readonly<{
    icon:
      LucideIcon;

    headerClassName:
      string;

    iconClassName:
      string;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

function getResourceVisual(
  resource:
    ReadingResourceSummary,
): ResourceVisual {
  const title =
    resource.title
      .trim()
      .toLowerCase();

  if (
    title.includes("travel") ||
    title.includes("airport")
  ) {
    return {
      icon:
        Plane,

      headerClassName:
        "bg-[#F1DDFB]",

      iconClassName:
        "text-[#8A4CFC]",
    };
  }

  if (
    title.includes("business") ||
    title.includes("email")
  ) {
    return {
      icon:
        Mail,

      headerClassName:
        "bg-[#D7EDFF]",

      iconClassName:
        "text-[#3BA5DF]",
    };
  }

  if (
    title.includes("cafe") ||
    title.includes(
      "everyday english",
    )
  ) {
    return {
      icon:
        Coffee,

      headerClassName:
        "bg-[#DDF8E8]",
 iconClassName:
        "text-[#3FBD7B]",
    };
  }

  if (
    title.includes(
      "science",
    )
  ) {
    return {
      icon:
        Microscope,

      headerClassName:
        "bg-[#FFE0E3]",

      iconClassName:
        "text-[#F46F91]",
    };
  }

  if (
    title.includes(
      "cooking",
    ) ||
    title.includes(
      "recipe",
    )
  ) {
    return {
      icon:
        CookingPot,

      headerClassName:
        "bg-[#FFF1BF]",

      iconClassName:
        "text-[#ECA33B]",
    };
  }

  if (
    title.includes(
      "historical",
    ) ||
    title.includes(
      "history",
    )
  ) {
    return { icon:
        Landmark,

      headerClassName:
        "bg-[#DDE4FF]",

      iconClassName:
        "text-[#7287F5]",
    };
  }

  if (
    title.includes(
      "family",
    )
  ) {
    return {
      icon:
        UsersRound,

      headerClassName:
        "bg-[#DDF5F2]",

      iconClassName:
        "text-[#58BDB5]",
    };
  }

  if (
    title.includes(
      "movie",
    ) ||
    title.includes(
      "film",
    )
  ) {
    return {
      icon:
        Clapperboard,

      headerClassName:
        "bg-[#D5FBF4]",

      iconClassName:
        "text-[#4BC9B9]",
    };
  }

  if (
    title.includes(
      "mental",
    ) ||
    title.includes(
      "health",
    )
  ) {
    return {
      icon:
        Brain,

      headerClassName:
        "bg-[#FBE1F0]",

      iconClassName:
        "text-[#F46BA6]",
    };
  }

  return {
    icon:
      BriefcaseBusiness,

    headerClassName:
      "bg-[#EAF1F3]",

    iconClassName:
      "text-[#64748B]",
  };
}

function getActionLabel(
  resource:
    ReadingResourceSummary,
): string {
  switch (
    resource.status
  ) {
    case "processing":
      return "در حال آماده‌سازی";

    case "coming_soon":
      return "به‌زودی";

    case "failed":
      return "در دسترس نیست";

    case "ready":
      if (
        resource.progressPercent >
        0
      ) {
        return "ادامه";
      }

      return "شروع"; default:
      return "شروع";
  }
}

export function ReadingLibraryCard({
  resource,
}: ReadingLibraryCardProps) {
  const visual =
    getResourceVisual(
      resource,
    );

  const Icon =
    visual.icon;

  const isNavigable =
    resource.status ===
      "ready" ||
    resource.status ===
      "processing";

  const actionLabel =
    getActionLabel(
      resource,
    );

  const cardContent = (
    <article
      className={cn(
        "group",
        "flex",
        "min-h-[308px]",
        "w-full",
        "flex-col",
        "overflow-hidden",
        "rounded-2xl",
        "border",
        "border-[#E0E3E5]",
        "bg-white",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        "transition-[transform,box-shadow,border-color]",
        "duration-200",

        isNavigable && [
          "hover:-translate-y-0.5",
          "hover:border-[#C8D1D3]",
          "hover:shadow-[0_5px_18px_rgba(25,28,30,0.08)]",
        ],

        !isNavigable &&
          "opacity-70",
      )} >
      <div
        className={cn(
          "relative",
          "flex",
          "h-[122px]",
          "shrink-0",
          "items-center",
          "justify-center",
          "p-4",
          visual.headerClassName,
        )}
      >
        <span
          dir="ltr"
          className="
            absolute
            right-3
            top-3
            inline-flex
            min-w-[28px]
            items-center
            justify-center
            rounded
            bg-white
            px-1.5
            py-1
            text-[10px]
            font-medium
            leading-none
            text-[#00685F]
            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
          "
        >
          {
            resource.cefrLevel
          }
        </span>

        <Icon
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
          flex
          min-h-0
          flex-1
          flex-col
          p-4
        "
      >
        <h3
          dir="ltr"
          title={
            resource.title
          }
          style={{
            fontFamily:
              "var(--font-plus-jakarta-sans)",
          }}
          className="
            min-h-6
            truncate
            text-center
            text-[16px]
            font-bold
            leading-6
            text-[#191C1E]
          "
        >
          {
            resource.title
          }
        </h3>

        <div
          className="
            mt-1
            min-h-10
          "
        >
          <p
            className="
              line-clamp-2
              text-right
              text-xs
              font-normal
              leading-5
              text-[#3D4947] "
          >
            {resource.description ??
              "متنی سطح‌بندی‌شده برای تقویت مهارت خواندن و درک مطلب."}
          </p>
        </div>

        <div
          className="
            mt-auto
            flex
            h-8
            items-center
            justify-between
            pb-3
            text-[11px]
            leading-[14px]
            text-[#3D4947]
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1
              whitespace-nowrap
            "
          >
            <BookOpenText
              aria-hidden="true"
              className="
                h-3.5
                w-3.5
              "
            />

            {numberFormatter.format(
              resource.totalSections,
            )}{" "}
            بخش
          </span>

          <span
            className="
              inline-flex
              items-center
              gap-1
              whitespace-nowrap
            "
          >
            <Clock3
              aria-hidden="true"
              className="
                h-3.5
                w-3.5
              "
            />

            {numberFormatter.format(
              resource.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>
        </div>

        <div
          className={cn(
            "mt-2",
            "flex",
            "h-9",
            "shrink-0",
            "items-center",
            "justify-center",
            "rounded-lg",
            "bg-[#F8F8F8]",
            "text-sm",
            "font-bold",
            "leading-4",
            "tracking-[0.01em]",

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
 block
        rounded-2xl
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