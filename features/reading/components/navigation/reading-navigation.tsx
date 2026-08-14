"use client";

import Link from "next/link";
import {
  BookOpenText,
  LibraryBig,
  Plus,
  UploadCloud,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "../../../../lib/utils/cn";

const STANDARD_NAVIGATION_ITEMS = [
  {
    href: "/reading",
    label: "نمای کلی",
    icon: BookOpenText,
    exact: true,
  },
  {
    href: "/reading/library",
    label: "کتابخانه",
    icon: LibraryBig,
    exact: false,
  },
  {
    href: "/reading/upload",
    label: "آپلود منبع",
    icon: UploadCloud,
    exact: false,
  },
] as const;

const LIBRARY_TABS = [
  {
    href: "/reading",
    label: "مطالعه من",
  },
  {
    href: "/reading/library",
    label: "کتابخانه",
  },
  {
    href: "/reading/upload",
    label: "منابع من",
  },
] as const;

function isRouteActive(
  pathname: string,
  href: string,
  exact = false,
): boolean {
  if (exact) {
    return pathname === href;
  }
return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function LibraryNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="منوی بخش خواندن"
      className="
        mx-auto mb-6
        w-full max-w-[936px]
        [font-family:var(--font-vazirmatn)]
      "
    >
      <div
        className="
          flex min-h-11
          items-end justify-between
          gap-4
          border-b border-[#BCC9C6]
        "
      >
        <div
          className="
            flex min-w-0
            items-end gap-5
            sm:gap-8
          "
        >
          {LIBRARY_TABS.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={cn(
                  "relative inline-flex h-11",
                  "items-center whitespace-nowrap",
                  "px-1 text-sm font-medium",
                  "transition-colors",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[#00897F]/30",
                  active? "text-[#00685F]"
                    : [
                        "text-[#3D4947]",
                        "hover:text-[#00685F]",
                      ],
                )}
              >
                {item.label}

                {active ? (
                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-0
                      bottom-0 h-0.5
                      rounded-full
                      bg-[#00897F]
                    "
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <Link
          href="/reading/upload"
          className="
            mb-2 inline-flex
            h-7 shrink-0
            items-center justify-center
            gap-1 rounded-lg
            bg-[#DCEFED]
            px-3
            text-xs font-medium
            text-[#00685F]
            transition
            hover:bg-[#CFE8E5]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#00897F]/30
          "
        >
          <Plus
            aria-hidden="true"
            className="h-3.5 w-3.5"
          />

          <span className="hidden sm:inline">
            افزودن منبع
          </span>
        </Link>
      </div>
    </nav>
  );
}

function StandardReadingNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="منوی بخش خواندن"
      className="
        mx-auto mb-6 grid
        w-full max-w-7xl
        grid-cols-3 gap-2
        rounded-2xl
        border border-white/[0.07]
        bg-white/[0.025] p-2
      "
    >
      {STANDARD_NAVIGATION_ITEMS.map(
        (item) => {
          const active =
            isRouteActive(
              pathname,
              item.href,
              item.exact,
            );

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                active
                  ? "page"
                  : undefined
              } className={cn(
                "inline-flex min-h-12",
                "items-center justify-center",
                "gap-2 rounded-xl px-3",
                "text-sm font-medium",
                "transition",
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
                {item.label}
              </span>
            </Link>
          );
        },
      )}
    </nav>
  );
}

export function ReadingNavigation() {
  const pathname = usePathname();

  if (pathname === "/reading/library") {
    return <LibraryNavigation />;
  }

  return <StandardReadingNavigation />;
}