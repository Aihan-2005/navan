import type {
  LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

type ReadingStatTone =
  | "teal"
  | "violet"
  | "slate"
  | "orange"
  | "emerald";

type ReadingStatCardProps =
  Readonly<{
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    tone?: ReadingStatTone;
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
      "border-x-[#64748B]",
    iconWrapper:
      "bg-[#E2E8F0] text-[#475569]",
  },

  orange: {
    border:
      "border-x-[#F97316]",
    iconWrapper:
      "bg-[#FFF7ED] text-[#EA580C]",
  },

  emerald: {
    border:
      "border-x-[#059669]",
    iconWrapper:
      "bg-[#D1FAE5] text-[#047857]",
  },
} satisfies Record<
  ReadingStatTone,
  {
    border: string;
    iconWrapper: string;
  }
>;

export function ReadingStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "teal",
}: ReadingStatCardProps) {
  const selectedTone =
    toneStyles[tone];

  return (
    <article
      className={cn(
        "flex",
        "min-h-[106px]",
        "items-center",
        "gap-4",
        "rounded-[24px]",
        "border",
        "border-y-[#E2E8F0]",
        "border-x-4",
        "bg-white",
        "px-5",
        "py-5",
        "shadow-[0_2px_8px_rgba(15,23,42,0.055)]",
        "transition",
        "duration-200",
        "hover:-translate-y-0.5",
        "hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
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
          strokeWidth={1.9}
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
            font-medium
            leading-5
            text-[#475569]
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

        <span className="sr-only">
          {description}
        </span>
      </div>
    </article>
  );
}