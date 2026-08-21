import type {
  LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

type ReadingStatCardProps =
  Readonly<{
    title:
      string;

    value:
      string;

    description:
      string;

    icon:
      LucideIcon;

    tone?:
      | "teal"
      | "violet"
      | "slate"
      | "orange";
  }>;

const toneStyles = {
  teal: {
    border:
      "border-x-[#00685F]",

    iconWrapper:
      "bg-[#D6EDEB] text-[#00685F]",
  },

  violet: {
    border:
      "border-x-[#712AE2]",

    iconWrapper:
      "bg-[#E7DDF8] text-[#712AE2]",
  },

  slate: {
    border:
      "border-x-[#6D7A77]",

    iconWrapper:
      "bg-[#6C748B]/20 text-[#6C748B]",
  },

  orange: {
    border:
      "border-x-[#F97316]",

    iconWrapper:
      "bg-[#FFF7ED] text-[#F97316]",
  },
} as const;

export function ReadingStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone =
    "teal",
}: ReadingStatCardProps) {
  const selectedTone =
    toneStyles[
      tone
    ];

  return (
    <article
      className={cn(
        "flex",
        "min-h-[118px]",
        "items-center",
        "gap-4",
        "rounded-[24px]",
        "border",
        "border-y-[#E2E8F0]",
        "border-x-4",
        "bg-white/80",
        "px-5",
        "py-5",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        "backdrop-blur-xl",
        selectedTone.border,
      )}
    >
      <div
        className={cn(
          "flex",
          "h-12",
          "w-12",
          "shrink-0",
          "items-center",
          "justify-center",
          "rounded-full",
          selectedTone.iconWrapper,
        )}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </div>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            whitespace-nowrap
            text-sm
            font-normal
            leading-5
            text-[#64748B]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            whitespace-nowrap
             text-2xl
            font-bold
            leading-8
            text-[#0F172A]
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            text-[11px]
            leading-4
            text-[#94A3B8]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}