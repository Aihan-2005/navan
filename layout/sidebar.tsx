"use client";

import Link from "next/link";

import {
  BarChart3,
  BookMarked,
  BookOpenText,
  CalendarDays,
  ClipboardCheck,
  Crown,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Mic2,
  PenLine,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  PricingModal,
  subscriptionPlans,
} from "../features/subscription";

import {
  SupportCard,
} from "../components/ui/support-card";

import {
  cn,
} from "../lib/utils/cn";

type SidebarAppearance =
  | "dark"
  | "light";

type SidebarProps =
  Readonly<{
    isSidebarOpen: boolean;

    setIsSidebarOpen: (
      open: boolean,
    ) => void;

    appearance?:
      SidebarAppearance;
  }>;

type NavigationItem =
  Readonly<{
    label: string;
    href: string;
    icon: LucideIcon;
    exact?: boolean;
  }>;

const NAVIGATION_ITEMS =
  [
    {
      label:
        "داشبورد",

      href:
        "/dashboard",

      icon:
        LayoutDashboard,

      exact:
        true,
    },

    {
      label:
        "تمرین روزانه",

      href:
        "/daily-practice",

      icon:
        CalendarDays,
    },

    {
      label:
        "شنیداری",

      href:
        "/listening",

      icon:
        Headphones,
    },

    {
      label:
        "مکالمه",

      href:
        "/speaking",

      icon:
        Mic2,
    },

    {
      label:
        "نوشتاری",

      href:
        "/writing",

      icon:
        PenLine,
    },

    {
      label:
        "خواندن",

      href:
        "/reading",

      icon:
        BookOpenText,
    },

    {
      label:
        "واژگان",

      href:
        "/vocabulary",

      icon:
        BookMarked,
    },

    {
      label:
        "ارزیابی",

      href:
        "/assessment",

      icon:
        ClipboardCheck,
    },

    {
      label:
        "بحث آزاد",

      href:
        "/speaking/free",

      icon:
        MessageCircle,
    },

    {
      label:
        "پیشرفت من",

      href:
        "/profile",

      icon:
        BarChart3,
    },
  ] satisfies readonly NavigationItem[];

function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
): boolean {
  if (item.exact) {
    return (
      pathname ===
      item.href
    );
  }

  /*
   * /speaking/free باید فقط آیتم بحث آزاد
   * را active کند و نه هر دو مورد.
   */
  if (
    item.href ===
    "/speaking"
  ) {
    return (
      pathname ===
        "/speaking" ||
      (
        pathname.startsWith(
          "/speaking/",
        ) &&
        !pathname.startsWith(
          "/speaking/free",
        )
      )
    );
  }

  return (
    pathname ===
      item.href ||
    pathname.startsWith(
      `${item.href}/`,
    )
  );
}

function BrandLogo({
  appearance,
  onNavigate,
}: {
  appearance:
    SidebarAppearance;

  onNavigate:
    () => void;
}) {
  return (
    <Link
      href="/dashboard"
      onClick={
        onNavigate
      }
      aria-label="Navan AI"
      className={cn(
        "flex items-center gap-2",

        "rounded-xl",

        "px-2 py-1.5",

        "transition",

        appearance === "light"
          ? "hover:bg-[#E4E9EA]"
          : "hover:bg-white/[0.05]",
      )}
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
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
          dir="ltr"
          className={cn(
            "block",
            "whitespace-nowrap",
            "text-[25px]",
            "font-bold",
            "leading-7",
            "tracking-[-0.04em]",

            appearance === "light"
              ? "text-[#00796F]"
              : "text-cyan-300",
          )}
        >
          Navan AI
        </span>

        <span
          className={cn(
            "mt-0.5",
            "block",
            "text-right",
            "text-[10px]",
            "font-medium",

            appearance === "light"
              ? "text-[#00897F]"
              : "text-slate-400",
          )}
        >
          همراه زبان تو
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

  appearance:
    SidebarAppearance;

  onNavigate:
    () => void;
}) {
  const active =
    isNavigationItemActive(
      pathname,
      item,
    );

  const Icon =
    item.icon;

  return (
    <Link
      href={item.href}
      onClick={
        onNavigate
      }
      aria-current={
        active
          ? "page"
          : undefined
      }
      className={cn(
        "group",
        "relative",

        "flex",
        "h-11",
        "items-center",

        "gap-3",

        "rounded-lg",

        "px-3",

        "text-sm",
        "font-medium",

        "transition-colors",

        "focus-visible:outline-none",
        "focus-visible:ring-2",

        appearance === "light"
          ? [
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
            ]
          : [
              "focus-visible:ring-cyan-300/40",

              active
                ? [
                    "bg-cyan-400/10",
                    "text-cyan-100",
                  ]
                : [
                    "text-slate-400",
                    "hover:bg-white/[0.05]",
                    "hover:text-white",
                  ],
            ],
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute",
            "bottom-0",
            "right-0",
            "top-0",

            "w-[3px]",

            "rounded-l-full",

            appearance === "light"
              ? "bg-[#15B8A9]"
              : "bg-cyan-300",
          )}
        />
      ) : null}

      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
        "
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={1.8}
        />
      </span>

      <span
        className="
          min-w-0
          flex-1
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
  onOpenPlans,
}: {
  appearance:
    SidebarAppearance;

  onOpenPlans:
    () => void;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl",

        "p-4",

        appearance === "light"
          ? [
              "bg-gradient-to-br",
              "from-[#079B90]",
              "to-[#15B9AE]",

              "text-white",

              "shadow-[0_8px_20px_rgba(0,104,95,0.16)]",
            ]
          : [
              "border",
              "border-violet-300/15",

              "bg-gradient-to-br",
              "from-violet-600/90",
              "to-blue-700/90",

              "text-white",
            ],
      )}
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Crown
          aria-hidden="true"
          className="h-5 w-5"
        />

        <h2
          className="
            text-sm
            font-bold
          "
        >
          ارتقا به بسته پرو
        </h2>
      </div>

      <p
        className="
          mt-2
          text-[11px]
          leading-5
          text-white/90
        "
      >
        دسترسی نامحدود به تمرین‌ها،
        تحلیل هوشمند و برنامه شخصی.
      </p>

      <button
        type="button"
        onClick={
          onOpenPlans
        }
        className="
          mt-3
          flex
          h-8
          w-full
          items-center
          justify-center
          rounded-lg
          bg-white
          px-3
          text-xs
          font-bold
          text-[#00796F]
          transition
          hover:bg-[#F2FFFD]
        "
      >
        مشاهده بسته‌ها
      </button>
    </section>
  );
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  appearance = "light",
}: SidebarProps) {
  const pathname =
    usePathname();

  const [
    isPricingModalOpen,
    setIsPricingModalOpen,
  ] = useState(false);

  const closeSidebar =
    (): void => {
      setIsSidebarOpen(
        false,
      );
    };

  return (
    <>
      {/* Mobile backdrop */}

      <button
        type="button"
        aria-label="بستن منوی کناری"
        aria-hidden={
          !isSidebarOpen
        }
        tabIndex={
          isSidebarOpen
            ? 0
            : -1
        }
        onClick={
          closeSidebar
        }
        className={cn(
          "fixed",
          "inset-0",
          "z-40",

          "bg-black/40",
          "backdrop-blur-sm",

          "transition-opacity",

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
        dir="rtl"
        aria-label="منوی اصلی"
        className={cn(
          "fixed",
          "inset-y-0",
          "right-0",
          "z-50",

          "flex",
          "w-72",
          "max-w-[86vw]",
          "flex-col",

          
          "overflow-hidden",

          "border-l",

          "transition-transform",
          "duration-300",

          "lg:translate-x-0",

          appearance === "light"
            ? [
                "border-[#D8DFE0]",
                "bg-[#EEF1F3]",
                "text-[#3D4947]",
              ]
            : [
                "border-white/[0.08]",
                "bg-[#081322]/95",
                "text-white",
                "backdrop-blur-xl",
              ],

          isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full",
        )}
      >
        {/* Header */}

        <div
          className="
            flex
            h-[72px]
            shrink-0
            items-center
            justify-between
            gap-2
            px-3
          "
        >
          <BrandLogo
            appearance={
              appearance
            }
            onNavigate={
              closeSidebar
            }
          />

          <button
            type="button"
            onClick={
              closeSidebar
            }
            aria-label="بستن منو"
            className={cn(
              "flex",
              "h-9",
              "w-9",
              "items-center",
              "justify-center",

              "rounded-lg",

              "lg:hidden",

              appearance === "light"
                ? "text-[#52615E] hover:bg-[#DDE5E5]"
                : "text-slate-400 hover:bg-white/10",
            )}
          >
            <X
              className="h-5 w-5"
            />
          </button>
        </div>

        <div
          className={cn(
            "mx-4",
            "h-px",
            "shrink-0",

            appearance === "light"
              ? "bg-[#D9E0E1]"
              : "bg-white/[0.07]",
          )}
        />

        {/* Fixed navigation area */}

        <nav
          aria-label="بخش‌های اصلی"
          className="
            flex
            min-h-0
            flex-1
            flex-col
            gap-1
            overflow-y-auto
            px-4
            py-3
          "
        >
          {NAVIGATION_ITEMS.map(
            (item) => (
              <NavigationLink
                key={
                  item.href
                }
                item={item}
                pathname={
                  pathname
                }
                appearance={
                  appearance
                }
                onNavigate={
                  closeSidebar
                }
              />
            ),
          )}
        </nav>

        {/* Fixed footer cards */}

        <div
          className="
            shrink-0
            space-y-3
            border-t
            border-[#D9E0E1]
            bg-inherit
            px-4
            pb-4
            pt-3
          "
        >
          <SupportCard
            appearance={
              appearance
            }
          />

          <UpgradeToProCard
            appearance={
              appearance
            }
            onOpenPlans={() => {
              setIsPricingModalOpen(
                true,
              );
            }}
          />
        </div>
      </aside>

      <PricingModal
        isOpen={
          isPricingModalOpen
        }
        onClose={() => {
          setIsPricingModalOpen(
            false,
          );
        }}
        plans={
          subscriptionPlans
        }
      />
    </>
  );
}