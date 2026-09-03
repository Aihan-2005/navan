import {
  Flame,
  Timer,
  TrendingUp,
} from "lucide-react";

import {
  cn,
} from "../../../lib/utils/cn";

type OverviewStatCardProps = {
  title: string;

  value: string;

  subtitle: string;

  progress: number;

  variant:
    | "teal"
    | "purple"
    | "orange";
};

const variantConfig = {
  teal: {
    value:
      "text-[#14B8A6]",

    progress:
      "bg-[#14B8A6]",

    iconWrapper:
      "rounded-2xl bg-[#14B8A61A]",

    icon:
      "text-[#14B8A6]",
  },

  purple: {
    value:
      "text-[#712AE2]",

    progress:
      "bg-[#8A4CFC]",

    iconWrapper:
      "rounded-full bg-[#E0D3F4]",

    icon:
      "text-[#712AE2]",
  },

  orange: {
    value:
      "text-[#F97316]",

    progress:
      "bg-[#F97316]",

    iconWrapper:
      "rounded-full bg-[#FFF7ED]",

    icon:
      "text-[#F97316]",
  },
} as const;

function StatIcon({
  variant,
}: {
  variant:
    | "teal"
    | "purple"
    | "orange";
}) {
  if (
    variant ===
    "purple"
  ) {
    return (
      <Timer
        aria-hidden="true"
        className="h-[26px] w-[23px]"
        strokeWidth={2}
      />
    );
  }

  if (
    variant ===
    "orange"
  ) {
    return (
      <Flame
        aria-hidden="true"
        className="h-[23px] w-[21px]"
        strokeWidth={2}
      />
    );
  }

  return (
    <TrendingUp
      aria-hidden="true"
      className="h-[25px] w-[25px]"
      strokeWidth={2}
    />
  );
}

export function OverviewStatCard({
  title,
  value,
  subtitle,
  progress,
  variant,
}: OverviewStatCardProps) {
  const config =
    variantConfig[variant];

  const safeProgress =
    Math.min(
      100,
      Math.max(
        0,
        progress,
      ),
    );

  return (
    <article
      dir="rtl"
      className="
        flex
        h-[145px]
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        px-6
        py-7
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <div
        className="
          flex
          h-[87px]
          w-[160px]
          flex-col
          gap-1
        "
      >
        <h2
          className="
            text-base
            font-bold
            leading-6
            text-[#3D4947]
          "
        >
          {title}
        </h2>

        <strong
          className={cn(
            `
              text-base
              font-black
              leading-6
            `,
            config.value,
          )}
        >
          {value}
        </strong>

        <div
          className="
            mt-auto
            h-2
            w-[160px]
            overflow-hidden
            rounded-full
            bg-[#ECEEF0]
          "
        >
          <div
            className={cn(
              "h-full rounded-full",
              config.progress,
            )}
            style={{
              width:
                `${safeProgress}%`,
            }}
          />
        </div>

        <p
          className="
            text-[10px]
            font-normal
            leading-[15px]
            text-[#6D7A77]
          "
        >
          {subtitle}
        </p>
      </div>

      <div
        className={cn(
          `
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
          `,
          config.iconWrapper,
          config.icon,
        )}
      >
        <StatIcon
          variant={variant}
        />
      </div>
    </article>
  );
}