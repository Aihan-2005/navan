"use client";

import Link from "next/link";
import {
  usePathname,
} from "next/navigation";
import {
  Bot,
  BookOpenCheck,
  BookOpenText,
  ClipboardCheck,
  Crown,
  Headphones,
  Languages,
  LayoutDashboard,
  Mic2,
  PenLine,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../lib/utils/cn";

type NavigationItem = Readonly<{
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}>;

type SidebarProps = Readonly<{
  isSidebarOpen: boolean;

  setIsSidebarOpen: (
    open: boolean,
  ) => void;
}>;

const primaryNavigationItems = [
  {
    label: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "مکالمه",
    href: "/speaking",
    icon: Mic2,
  },
  {
    label: "شنیداری",
    href: "/listening",
    icon: Headphones,
  },
  {
    label: "خواندن",
    href: "/reading",
    icon: BookOpenText,
  },
  {
    label: "نوشتن",
    href: "/writing",
    icon: PenLine,
  },
  {
    label: "ارزیابی‌ها",
    href: "/assessments",
    icon: ClipboardCheck,
  },
  {
    label: "معلم هوشمند",
    href: "/tutor",
    icon: Bot,
  },
] satisfies readonly NavigationItem[];

const secondaryNavigationItems = [
  {
    label: "مرور آموخته‌ها",
    href: "/review",
    icon: BookOpenCheck,
  },
  {
    label: "تنظیمات",
    href: "/settings",
    icon: Settings,
  },
] satisfies readonly NavigationItem[];

function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
): boolean {
  if (item.exact) {
    return pathname === item.href;
  }

  return (
    pathname === item.href ||
    pathname.startsWith(
      `${item.href}/`,
    )
  );
}

function BrandLogo({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <Link
      href="/dashboard"
      onClick={onNavigate}
      aria-label="رفتن به داشبورد MeowLingo AI"
      className="
        flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2
        transition hover:bg-white/[0.04]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/60
      "
    >
      <span
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600
          text-white shadow-lg shadow-cyan-950/30
        "
      >
        <Languages
          aria-hidden="true"
          className="h-6 w-6"
        />
      </span>

      <span className="min-w-0">
        <span
          className="
            block truncate bg-gradient-to-l
            from-cyan-300 to-blue-400 bg-clip-text
            text-lg font-bold text-transparent
          "
        >
          MeowLingo AI
        </span>

        <span className="block truncate text-[11px] text-slate-500">
          Your AI Language Mentor
        </span>
      </span>
    </Link>
  );
}

function NavigationLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active =
    isNavigationItemActive(
      pathname,
      item,
    );

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={
        active ? "page" : undefined
      }
      className={cn(
        "group relative flex min-h-12 items-center gap-3",
        "rounded-xl px-3 py-2.5",
        "text-sm font-medium transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-cyan-300/60",

        active
          ? [
              "bg-cyan-400/[0.1] text-cyan-100",
              "shadow-lg shadow-cyan-950/20",
            ]
          : [
              "text-slate-400",
              "hover:bg-white/[0.04]",
              "hover:text-slate-100",
            ],
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="
            absolute bottom-2 right-0 top-2
            w-[3px] rounded-l-full bg-cyan-300
          "
        />
      ) : null}

      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center",
          "rounded-xl transition duration-200",

          active
            ? "bg-cyan-400/10 text-cyan-200"
            : [
                "bg-white/[0.025] text-slate-500",
                "group-hover:bg-white/[0.06]",
                "group-hover:text-slate-200",
              ],
        )}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </span>

      <span className="min-w-0 flex-1 truncate">
        {item.label}
      </span>
    </Link>
  );
}

function UpgradeToProCard({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <div className="mt-auto px-3 pb-4 pt-6">
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-violet-300/15
          bg-gradient-to-br from-violet-600/90 to-blue-700/90
          p-4 shadow-xl shadow-blue-950/30
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-12 -top-12
            h-32 w-32 rounded-full bg-white/10 blur-2xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-0 bottom-0
            h-1/2 bg-gradient-to-t from-black/30 to-transparent
          "
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-white/10 text-violet-100
              "
            >
              <Crown
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <h2 className="text-sm font-bold text-white">
              ارتقا به نسخه حرفه‌ای
            </h2>
          </div>

          <p className="mt-3 text-xs leading-6 text-violet-100/80">
            تحلیل پیشرفته هوش مصنوعی، تمرین نامحدود و
            برنامه‌های شخصی‌سازی‌شده را فعال کن.
          </p>

          <Link
            href="/billing"
            onClick={onNavigate}
            className="
              mt-4 inline-flex w-full items-center justify-center
              rounded-xl border border-white/15 bg-white/15
              px-3 py-2.5 text-xs font-bold text-white
              transition hover:bg-white/25
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/70
            "
          >
            مشاهده پلن‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  function closeSidebar(): void {
    setIsSidebarOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label="بستن منوی کناری"
        aria-hidden={!isSidebarOpen}
        tabIndex={
          isSidebarOpen ? 0 : -1
        }
        onClick={closeSidebar}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300 lg:hidden",

          isSidebarOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        id="application-sidebar"
        aria-label="منوی اصلی برنامه"
        className={cn(
          "fixed inset-y-0 right-0 z-50",
          "flex w-72 max-w-[86vw] flex-col",
          "overflow-y-auto border-l border-white/[0.08]",
          "bg-[#081322]/95 px-2 py-4",
          "shadow-2xl shadow-black/40 backdrop-blur-xl",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",

          isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full",
        )}
        dir="rtl"
      >
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="min-w-0 flex-1">
            <BrandLogo
              onNavigate={closeSidebar}
            />
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="بستن منو"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl text-slate-400 transition
              hover:bg-white/[0.06] hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/60
              lg:hidden
            "
          >
            <X
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mx-3 my-5 h-px bg-white/[0.06]"
        />

        <nav
          aria-label="بخش‌های اصلی"
          className="flex flex-col gap-1 px-2"
        >
          {primaryNavigationItems.map(
            (item) => (
              <NavigationLink
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={closeSidebar}
              />
            ),
          )}
        </nav>

        <div className="mx-5 my-4 h-px bg-white/[0.05]" />

        <nav
          aria-label="تنظیمات و ابزارها"
          className="flex flex-col gap-1 px-2"
        >
          {secondaryNavigationItems.map(
            (item) => (
              <NavigationLink
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={closeSidebar}
              />
            ),
          )}
        </nav>

        <UpgradeToProCard
          onNavigate={closeSidebar}
        />
      </aside>
    </>
  );
}