"use client";

import Link from "next/link";
import {
  BookOpenText,
  LibraryBig,
  UploadCloud,
} from "lucide-react";
import {
  usePathname,
} from "next/navigation";

import {
  cn,
} from "../../../../lib/utils/cn";

const navigationItems = [
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

export function ReadingNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="منوی بخش خواندن"
      className="
        mx-auto mb-6 grid w-full max-w-7xl
        grid-cols-3 gap-2 rounded-2xl
        border border-white/[0.07]
        bg-white/[0.025] p-2
      "
    >
      {navigationItems.map(
        (item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`,
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
              }
              className={cn(
                "inline-flex min-h-12 items-center",
                "justify-center gap-2 rounded-xl",
                "px-3 text-sm font-medium",
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