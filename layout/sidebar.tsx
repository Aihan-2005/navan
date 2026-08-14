"use client";

import Link from "next/link";
import {
  Bot,
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
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  PricingModal,
  subscriptionPlans,
} from "../features/subscription";
import { cn } from "../lib/utils/cn";
import { SupportCard } from "../components/ui/support-card";

type SidebarAppearance =
  | "dark"
  | "light";

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
  appearance?: SidebarAppearance;
}>;

const PRIMARY_NAVIGATION_ITEMS = [
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
    href: "/assessment",
    icon: ClipboardCheck,
  },
  {
    label: "کلاس",
    href: "/classroom",
    icon: Bot,
  },
] satisfies readonly NavigationItem[];

const SECONDARY_NAVIGATION_ITEMS = [
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
  appearance,
  onNavigate,
}: {
  appearance: SidebarAppearance;
  onNavigate: () => void;
}) {
  if (appearance === "light") {
    return (
      <Link
        href="/dashboard"
        onClick={onNavigate}
        aria-label="رفتن به داشبورد Navan AI"
        className="
          flex items-center
          gap-2 rounded-xl
          px-2 py-1
          transition
          hover:bg-[#E4E9EA]
        "
      >
        <span
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            bg-[#009688]
            text-white
          "
        >
          <BookOpenText
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <span className="min-w-0">
          <span
            className="
              block whitespace-nowrap
              text-[27px] font-bold
              leading-8
              tracking-[-0.04em]
              text-[#00796F]
            "
            dir="ltr"
          >
            Navan AI
          </span>

          <span
            className="
              block text-right
              text-[10px]
              font-medium
              text-[#00897F]
            "
          >
            همراه زبان تو
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/dashboard"
      onClick={onNavigate}
      aria-label="رفتن به داشبورد MeowLingo AI"
      className="
        flex min-w-0
        items-center gap-3
        rounded-2xl
        px-3 py-2
        transition
        hover:bg-white/[0.04]
      "
    >
      <span
        className="
          flex h-11 w-11
          shrink-0 items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-cyan-400
          to-blue-600
          text-white
          shadow-lg
          shadow-cyan-950/30
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
            block truncate
            bg-gradient-to-l
            from-cyan-300
            to-blue-400
            bg-clip-text
            text-lg font-bold
            text-transparent
          "
        >
          MeowLingo AI
        </span>

        <span
          className="
            block truncate
            text-[11px]
            text-slate-500
          "
        >
          Your AI Language Mentor
        </span>
      </span>
    </Link>
  );
}

function NavigationLink({
  item,
  pathname,
  appearance,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  appearance: SidebarAppearance;
  onNavigate: () => void;
}) {
  const active =
    isNavigationItemActive(
      pathname,
      item,
    );

  const Icon = item.icon;

  if (appearance === "light") {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={
          active ? "page" : undefined
        }
        className={cn(
          "group relative flex",
          "min-h-11 items-center",
          "gap-3 rounded-lg",
          "px-3 py-2",
          "text-sm font-medium",
          "transition",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[#00897F]/30",
          active
            ? [
                "bg-[#D7ECEA]",
                "text-[#00897F]",
              ]
            : [
                "text-[#3D4947]",
                "hover:bg-[#E3E9EA]",
                "hover:text-[#00685F]",
              ],
        )}
      >
        {active ? (
          <span
            aria-hidden="true"
            className="
              absolute bottom-0
              right-0 top-0
              w-[3px]
              rounded-l-full
              bg-[#15B8A9]
            "
          />
        ) : null}

        <span
          className="
            flex h-8 w-8
            shrink-0 items-center
            justify-center
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-5 w-5"
          />
        </span>

        <span
          className="
            min-w-0 flex-1
            truncate
          "
        >
          {item.label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={
        active ? "page" : undefined
      }
      className={cn(
        "group relative flex",
        "min-h-12 items-center",
        "gap-3 rounded-xl",
        "px-3 py-2.5",
        "text-sm font-medium",
        "transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-cyan-300/60",
        active
          ? [
              "bg-cyan-400/[0.1]",
              "text-cyan-100",
              "shadow-lg",
              "shadow-cyan-950/20",
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
            absolute bottom-2
            right-0 top-2
            w-[3px]
            rounded-l-full
            bg-cyan-300
          "
        />
      ) : null}

      <span
        className={cn(
          "flex h-9 w-9",
          "shrink-0 items-center",
          "justify-center rounded-xl",
          "transition duration-200",
          active
            ? [
                "bg-cyan-400/10",
                "text-cyan-200",
              ]
            : [
                "bg-white/[0.025]",
                "text-slate-500",
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

      <span
        className="
          min-w-0 flex-1
          truncate
        "
      >
        {item.label}
      </span>
    </Link>
  );
}

function UpgradeToProCard({
  appearance,
  onNavigate,
  onOpenPlans,
}: {
  appearance: SidebarAppearance;
  onNavigate: () => void;
  onOpenPlans: () => void;
}) {
  if (appearance === "light") {
    return (
      <div
        className="
          mt-auto px-3
          pb-4 pt-6
        "
      >
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-gradient-to-br
            from-[#079B90]
            to-[#15B9AE]
            p-4 text-white
            shadow-[0_8px_20px_rgba(0,104,95,0.18)]
          "
        >
          <div
            className="
              flex items-center
              gap-2
            "
          >
            <Crown
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-sm font-bold
              "
            >
              نسخه حرفه‌ای
            </h2>
          </div>

          <p
            className="
              mt-2 text-[11px]
              leading-5
              text-white/90
            "
          >
            دسترسی نامحدود به تمامی درس‌ها و
            آنالیز دقیق پیشرفت با هوش مصنوعی
          </p>

          <button
            type="button"
            onClick={() => {
              onNavigate();
              onOpenPlans();
            }}
            className="
              mt-3 flex h-8
              w-full items-center
              justify-center
              rounded-md
              bg-white
              px-3
              text-xs font-bold
              text-[#00796F]
              transition
              hover:bg-[#F2FFFD]
            "
          >
            خرید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        mt-auto px-3
        pb-4 pt-6
      "
    >
      <div
        className="
          relative overflow-hidden
          rounded-2xl
          border border-violet-300/15
          bg-gradient-to-br
          from-violet-600/90
          to-blue-700/90
          p-4
          shadow-xl
          shadow-blue-950/30
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-12
            -top-12 h-32 w-32
            rounded-full
            bg-white/10 blur-2xl
          "
        />

        <div className="relative">
          <div
            className="
              flex items-center
              gap-2
            "
          >
            <span
              className="
                flex h-9 w-9
                items-center
                justify-center
                rounded-xl
                bg-white/10
                text-violet-100
              "
            >
              <Crown
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <h2
              className="
                text-sm font-bold
                text-white
              "
            >
              ارتقا به نسخه حرفه‌ای
            </h2>
          </div>

          <p
            className="
              mt-3 text-xs
              leading-6
              text-violet-100/80
            "
          >
            تحلیل پیشرفته هوش مصنوعی، تمرین
            نامحدود و برنامه‌های شخصی‌سازی‌شده را
            فعال کن.
          </p>

          <button
            type="button"
            onClick={() => {
              onNavigate();
              onOpenPlans();
            }}
            className="
              mt-4 inline-flex
              w-full items-center
              justify-center
              rounded-xl
              border border-white/15
              bg-white/15
              px-3 py-2.5
              text-xs font-bold
              text-white
              transition
              hover:bg-white/25
            "
          >
            مشاهده پلن‌ها
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  appearance = "dark",
}: SidebarProps) {
  const pathname = usePathname();

  const [
    isPricingModalOpen,
    setIsPricingModalOpen,
  ] = useState(false);

  function closeSidebar(): void {
    setIsSidebarOpen(false);
  }

  function openPricingModal(): void {
    setIsPricingModalOpen(true);
  }

  function closePricingModal(): void {
    setIsPricingModalOpen(false);
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
          "fixed inset-0 z-40",
          "bg-black/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          "lg:hidden",
          isSidebarOpen
            ? "opacity-100"
            : [
                "pointer-events-none",
                "opacity-0",
              ],
        )}
      />

      <aside
        id="application-sidebar"
        aria-label="منوی اصلی برنامه"
        dir="rtl"
        className={cn(
          "fixed inset-y-0",
          "right-0 z-50",
          "flex w-72",
          "max-w-[86vw]",
          "flex-col",
          "overflow-y-auto",
          "px-2 py-4",
          "transition-transform",
          "duration-300 ease-out",
          "lg:translate-x-0",
          appearance === "light"
            ? [
                "border-l",
                "border-[#D8DFE0]",
                "bg-[#EEF1F3]",
                "text-[#3D4947]",
                "[font-family:var(--font-vazirmatn)]",
              ]
            : [
                "border-l",
                "border-white/[0.08]",
                "bg-[#081322]/95",
                "shadow-2xl",
                "shadow-black/40",
                "backdrop-blur-xl",
              ],
          isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full",
        )}
      >
        <div
          className="
            flex items-center
            justify-between gap-3
            px-1
          "
        >
          <div
            className="
              min-w-0 flex-1
            "
          >
            <BrandLogo
              appearance={appearance}
              onNavigate={closeSidebar}
            />
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="بستن منو"
            className={cn(
              "flex h-10 w-10",
              "shrink-0 items-center",
              "justify-center",
              "rounded-xl transition",
              "lg:hidden",
              appearance === "light"
                ? [
                    "text-[#52615E]",
                    "hover:bg-[#DDE5E5]",
                  ]
                : [
                    "text-slate-400",
                    "hover:bg-white/[0.06]",
                    "hover:text-white",
                  ],
            )}
          >
            <X
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "mx-3 my-5 h-px",
            appearance === "light"
              ? "bg-[#D9E0E1]"
              : "bg-white/[0.06]",
          )}
        />

        <nav
          aria-label="بخش‌های اصلی"
          className="
            flex flex-col
            gap-1 px-2
          "
        >
          {PRIMARY_NAVIGATION_ITEMS.map(
            (item) => (
              <NavigationLink
                key={item.href}
                item={item}
                pathname={pathname}
                appearance={appearance}
                onNavigate={
                  closeSidebar
                }
              />
            ),
          )}
        </nav>

        <div
          className={cn(
            "mx-5 my-4 h-px",
            appearance === "light"
              ? "bg-[#D9E0E1]"
              : "bg-white/[0.05]",
          )}
        />

        <nav
          aria-label="تنظیمات و ابزارها"
          className="
            flex flex-col
            gap-1 px-2
          "
        >
          {SECONDARY_NAVIGATION_ITEMS.map(
            (item) => (
              <NavigationLink
                key={item.href}
                item={item}
                pathname={pathname}
                appearance={appearance}
                onNavigate={
                  closeSidebar
                }
              />
            ),
          )}
        </nav>

        {appearance === "dark" ? (
          <SupportCard />
        ) : null}

        <UpgradeToProCard
          appearance={appearance}
          onNavigate={closeSidebar}
          onOpenPlans={
            openPricingModal
          }
        />
      </aside>

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        plans={subscriptionPlans}
      />
    </>
  );
}