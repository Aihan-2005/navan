"use client";

import {
  ChevronDown,
  ChevronUp,
  LifeBuoy,
  Mail,
  MessageCircle,
} from "lucide-react";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  cn,
} from "../../lib/utils/cn";

type SupportCardProps = {
  appearance?:
    | "light"
    | "dark";
};

const supportLinks = [
  {
    id:
      "telegram",

    label:
      "تلگرام",

    value:
      "@NavanSupport",

    href:
      "https://t.me/NavanSupport",

    icon:
      MessageCircle,
  },

  {
    id:
      "email",

    label:
      "ایمیل",

    value:
      "support@navan.ai",

    href:
      "mailto:support@navan.ai",

    icon:
      Mail,
  },
] as const;

export function SupportCard({
  appearance = "light",
}: SupportCardProps) {
  const [
    isExpanded,
    setIsExpanded,
  ] = useState(false);

  const isLight =
    appearance === "light";

  return (
    <section
      className={cn(
        "overflow-hidden",

        "rounded-2xl",

        "border",

        isLight
          ? [
              "border-[#BCC9C6]",
              "bg-white",
              "text-[#191C1E]",
            ]
          : [
              "border-cyan-300/15",
              "bg-cyan-600/20",
              "text-white",
            ],
      )}
    >
      <button
        type="button"
        onClick={() => {
          setIsExpanded(
            (current) =>
              !current,
          );
        }}
        aria-expanded={
          isExpanded
        }
        className={cn(
          "flex",
          "w-full",
          "items-center",
          "justify-between",
          "gap-3",

          "p-3",

          "text-right",

          "transition-colors",

          isLight
            ? "hover:bg-[#F7F9FB]"
            : "hover:bg-white/5",
        )}
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className={cn(
              "flex",
              "h-9",
              "w-9",
              "items-center",
              "justify-center",
              "rounded-xl",

              isLight
                ? [
                    "bg-[#E6F6F4]",
                    "text-[#00897F]",
                  ]
                : [
                    "bg-white/10",
                    "text-cyan-200",
                  ],
            )}
          >
            <LifeBuoy
              className="h-5 w-5"
            />
          </span>

          <div>
            <h2
              className="
                text-sm
                font-bold
              "
            >
              پشتیبانی
            </h2>

            <p
              className={cn(
                "mt-0.5",
                "text-[10px]",

                isLight
                  ? "text-[#6D7A77]"
                  : "text-cyan-100/70",
              )}
            >
              نیاز به کمک داری؟
            </p>
          </div>
        </div>

        {isExpanded ? (
          <ChevronUp
            className="h-4 w-4"
          />
        ) : (
          <ChevronDown
            className="h-4 w-4"
          />
        )}
      </button>

      {isExpanded ? (
        <div
          className={cn(
            "space-y-2",
            "border-t",
            "p-3",

            isLight
              ? "border-[#E0E3E5]"
              : "border-white/10",
          )}
        >
          {supportLinks.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <Link
                  key={
                    item.id
                  }
                  href={
                    item.href
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "flex",
                    "items-center",
                    "gap-2",

                    "rounded-lg",

                    "px-2",
                    "py-2",

                    "text-[11px]",

                    isLight
                      ? [
                          "bg-[#F7F9FB]",
                          "text-[#3D4947]",
                          "hover:bg-[#EDF3F2]",
                        ]
                      : [
                          "bg-white/5",
                          "text-cyan-50",
                          "hover:bg-white/10",
                        ],
                  )}
                >
                  <Icon
                    className="h-4 w-4"
                  />

                  <span>
                    {item.label}
                  </span>

                  <span
                    className="
                      mr-auto
                      truncate
                      text-[10px]
                      opacity-70
                    "
                  >
                    {item.value}
                  </span>
                </Link>
              );
            },
          )}
        </div>
      ) : null}
    </section>
  );
}