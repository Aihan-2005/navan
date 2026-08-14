"use client";

import Link from "next/link";

import {
  BookOpenText,
  LibraryBig,
  Plus,
  UploadCloud,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  cn,
} from "../../../../lib/utils/cn";

const standardNavigationItems =
  [
    {
      href:
        "/reading",

      label:
        "نمای کلی",
      icon:
        BookOpenText,

      exact:
        true,
    },

    {
      href:
        "/reading/library",

      label:
        "کتابخانه",

      icon:
        LibraryBig,

      exact:
        false,
    },

    {
      href:
        "/reading/upload",

      label:
        "آپلود منبع",

      icon:
        UploadCloud,

      exact:
        false,
    },
  ] as const;

const overviewTabs =
  [
    {
      href:
        "/reading",

      label:
        "مطالعه من",

      exact:
        true,
    },

    {
      href:
        "/reading/library",

      label:
        "کتابخانه",

      exact:
        false,
    },

    {
      href:
        "/reading/upload",

      label:
        "منابع من",

      exact:
        false,
    },
  ] as const;

export function ReadingNavigation() {
  const pathname =
    usePathname();

  const isOverview =
    pathname ===
    "/reading";

  if (isOverview) {
    return (
      <nav
        aria-label="منوی بخش خواندن"
        className="
          mx-auto
          mb-8
          flex
          w-full
          max-w-[936px]
          items-end
        justify-between
          gap-5
          border-b
          border-[#BCC9C6]
          pb-2
        "
      >
        <div
          className="
            flex
            min-w-0
            items-end
            gap-4
            overflow-x-auto
            sm:gap-6
          "
        >
           {overviewTabs.map(
            (item) => {
              const active =
                item.exact
                  ? pathname ===
                    item.href
                  : pathname ===
                      item.href ||
                    pathname.startsWith(
                      `${item.href}/`,
                    );

              return (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={cn(
                    "relative shrink-0 px-1 pb-2 text-sm font-bold",
                    "tracking-[0.01em] transition",

                    active
                      ? "text-[#00685F]"
                      : [
                        "text-[#3D4947]",
                        "hover:text-[#00685F]",
                      ],
                  )}
                >
                  {
                    item.label
                  }

                  {active ? (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        -bottom-[9px]
                        inset-x-0
                        h-0.5
                        rounded-full
                        bg-[#00685F]
                      "
                    />
                  ) : null}
                </Link>
              );
            },
          )}
        </div>

        <Link
          href="/reading/upload"
          className="
            inline-flex
            h-8
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-[#00685F]/10
            px-4
    text-sm
            font-semibold
            text-[#00685F]
            transition
            hover:bg-[#00685F]/15
          "
        >
          <Plus
            aria-hidden="true"
            className="
              h-3.5
              w-3.5
            "
          />

          <span
            className="
              hidden
              sm:inline
            "
          >
            افزودن منبع
          </span>
        </Link>
      </nav>
    );
  }

  return (
    <nav
      aria-label="منوی بخش خواندن"
      className="
        mx-auto
        mb-6
        grid
        w-full
        max-w-7xl
        grid-cols-3
        gap-2
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-2
      "
    >
      {standardNavigationItems.map(
        (item) => {
          const active =
            item.exact
              ? pathname ===
              item.href
              : pathname ===
              item.href ||
              pathname.startsWith(
                `${item.href}/`,
              );

          const Icon =
            item.icon;

          return (
            <Link
              key={
                item.href
              }
              href={
                item.href
              }
              aria-current={
                active
                  ? "page"
                  : undefined
              }
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2",
                "rounded-xl px-3 text-sm font-medium transition",

                active
                  ? [
                    "bg-cyan-400/10",
                    "text-cyan-200",
                  ]
                  : [
                    "text-slate-500",
                    "hover:bg-white/[0.04]",
                    "hover:text-slate-300",
                  ],
              )}
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span className="truncate">
                {
                  item.label
                }
              </span>
            </Link>
          );
        },
      )}
    </nav>);
}


