import Link from "next/link";

import {
  AlignLeft,
  CheckCircle2,
  FileText,
  FileType2,
  Image as ImageIcon,
  Link2,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingMyResourceItem,
  ReadingMyResourceSourceKind,
} from "../../types/reading-my-resources.types";

type ReadingMyResourceCardProps =
  Readonly<{
    resource:
      ReadingMyResourceItem;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );const sourceMeta:
  Record<
    ReadingMyResourceSourceKind,
    {
      label: string;

      icon:
        LucideIcon;

      className:
        string;
    }
  > = {
    pdf: {
      label:
        "PDF",

      icon:
        FileText,

      className:
        "border-[#008378]/20 bg-[#008378]/10 text-[#00685F]",
    },

    docx: {
      label:
        "DOCX",

      icon:
        FileType2, className:
        "border-[#2563EB]/20 bg-[#2563EB]/10 text-[#2563EB]",
    },

    link: {
      label:
        "لینک",

      icon:
        Link2,

      className:
        "border-[#6C748B]/20 bg-[#6C748B]/10 text-[#6C748B]",
    },

    text: {
      label:
        "متن",

      icon:
        AlignLeft,

      className:
        "border-[#8A4CFC]/20 bg-[#8A4CFC]/10 text-[#712AE2]",
    },

    image: {
      label:
        "تصویر",
icon:
        ImageIcon,

      className:
        "border-[#F97316]/20 bg-[#FFF7ED] text-[#F97316]",
    },
  };

function formatRelativeDate(
  dateValue:
    string,
): string {
  const date =
    new Date(
      dateValue,
    );

  const now =
    new Date();

  const differenceMs =
    Math.max(
      0,
      now.getTime() -
        date.getTime(),
    );

  const days =
    Math.floor(
      differenceMs /
      86_400_000,
    );

  if (days === 0) {
    return "امروز";
  }

  if (days === 1) {
    return "دیروز";
  }

  if (days < 7) {
    return `${numberFormatter.format(
      days,
    )} روز پیش`;
  }

  if (days < 14) {
    return "هفته پیش";
  }

  if (days < 21) {
    return "۲ هفته پیش";
  }

  return `${numberFormatter.format(
    Math.floor(
      days / 7,
    ),
  )} هفته پیش`;
}function getActivityLabel(
  resource:
    ReadingMyResourceItem,
): string {
  if (
    resource.progressPercent >=
      100 &&
    resource.completedAt
  ) {
    return `تکمیل شده: ${formatRelativeDate(
      resource.completedAt,
    )}`;
  }

  return `آپلود شده: ${formatRelativeDate(
    resource.uploadedAt,
  )}`;
}

export function ReadingMyResourceCard({
  resource,
}: ReadingMyResourceCardProps) {
  const source =
    sourceMeta[
      resource.sourceKind
    ];

  const SourceIcon =
    source.icon;
const isCompleted =
    resource.progressPercent >=
    100;

  const isProcessing =
    resource.status ===
    "processing";

  const progressColor =
    isCompleted
      ? "bg-[#22C55E]"
      : "bg-[#00685F]";

  const actionLabel =
    isProcessing
      ? "در حال تحلیل"
      : isCompleted
        ? "مرور مجدد"
        : resource.progressPercent >
            0
          ? "ادامه مطالعه"
          : "شروع مطالعه";

  const actionClassName =
    isProcessing
      ? `
        border
        border-[#008378]/20
        bg-[#008378]/10
        text-[#00685F]
      `: isCompleted
        ? `
          border-2
          border-[#BCC9C6]
          bg-white
          text-[#3D4947]
          hover:border-[#008378]
          hover:text-[#00685F]
        `
        : `
          bg-[#00685F]
          text-white
          shadow-[0_1px_2px_rgba(0,0,0,0.05)]
          hover:bg-[#005B53]
        `;

  const actionContent = (
    <>
      {actionLabel}
    </>
  );

  return (
    <article
      className="
        flex
        min-h-[298px]
        flex-col
        rounded-2xl
        border
        border-[#BCC9C6]/30
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
      "
    >
      <div
        className="
          flex
          min-h-6
          items-start
          justify-between
          gap-3
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
            className={cn(
              "inline-flex",
              "h-6",
              "items-center",
              "gap-1.5",
              "rounded",
              "border",
              "px-2",
              "text-xs",
              "font-medium",
              "leading-[14px]",
              "tracking-[0.05em]",
              source.className,
            )}
          >
            <SourceIcon
              aria-hidden="true"
              className="h-3 w-3"
            />

            {source.label}
          </span>

          {!isCompleted ? (
            <span
              dir="ltr"
              className="
                inline-flex
                h-6
                items-center
                rounded
                bg-[#ECEEF0]
                px-2
                text-xs
                font-medium
                leading-[14px]
                tracking-[0.05em]
                text-[#3D4947]
              "
            >
              {
                resource.cefrLevel
              }
            </span>
          ) : null}
        </div>

        {isCompleted ? (
          <CheckCircle2
            aria-label="تکمیل شده"
            className="
              h-5
              w-5
              shrink-0
              text-[#22C55E]
            "
          />
        ) : (
          <span
            aria-hidden="true"
            className="
              h-[22px]
              w-1
              rounded-full
              bg-[#E0E3E5]
            "
          /> )}
      </div>

      <div
        className="
          mt-4
          min-h-[68px]
        "
      >
        <h2
          dir="ltr"
          style={{
            fontFamily:
              "var(--font-plus-jakarta-sans)",
          }}
          className="
            max-w-[220px]
            text-right
            text-[22px]
            font-bold
            leading-[30px]
            text-[#191C1E]
          "
        >
          {resource.title}
        </h2>
      </div>

      <p
        className="
          mt-2min-h-5
          text-sm
          font-normal
          leading-5
          text-[#3D4947]
        "
      >
        {getActivityLabel(
          resource,
        )}
      </p>

      <div
        className="
          mt-auto
          pt-6
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            text-xs
            leading-[14px]
          "
        >
          <span
            className="
              font-normal
              tracking-[0.05em]
              text-[#3D4947]
            "
          >
            پیشرفت
          </span>

          <span
            className={cn(
              "font-bold",
              "tracking-[0.05em]",

              isCompleted
                ? "text-[#16A34A]"
                : "text-[#00685F]",
            )}
          >
            {numberFormatter.format(
              resource.progressPercent,
            )}
            ٪
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={`پیشرفت ${resource.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={
            resource.progressPercent
          }
          className="
            mt-2
            h-2
            overflow-hidden
            rounded-full
            bg-[#E0E3E5]
          "
        >
          <div
            className={cn(
              "h-full",
              "rounded-full",
              "transition-[width]",
              "duration-500",
              progressColor,
            )}
            style={{
              width:
                `${resource.progressPercent}%`,
            }}
          />
        </div>

        {resource.href ? (
          <Link
            href={
              resource.href}
            className={cn(
              "mt-4",
              "inline-flex",
              "h-9",
              "w-full",
              "items-center",
              "justify-center",
              "rounded-lg",
              "text-sm",
              "font-bold",
              "leading-4",
              "tracking-[0.01em]",
              "transition",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#00685F]/20",
              actionClassName,
            )}
          >
            {actionContent}
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={cn(
              "mt-4",
              "inline-flex",
              "h-9",
              "w-full",
              "cursor-default",
"items-center",
              "justify-center",
              "rounded-lg",
              "text-sm",
              "font-bold",
              "leading-4",
              "tracking-[0.01em]",
              actionClassName,
            )}
          >
            {actionContent}
          </span>
        )}
      </div>
    </article>
  );
}