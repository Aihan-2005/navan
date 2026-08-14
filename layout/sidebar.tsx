"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useState,
} from "react";

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

import {
  cn,
} from "../lib/utils/cn";

import {
  PricingModal,
  subscriptionPlans,
} from "../features/subscription";

import {
  SupportCard,
} from "../components/ui/support-card";

import type {
  DashboardAppearance,
} from "../components/ui/dashboard-shell";

type NavigationItem =
  Readonly<{
    label: string;
    href: string;

    icon:
      LucideIcon;

    exact?: boolean;
  }>;

type SidebarProps =
  Readonly<{
    appearance?:
      DashboardAppearance;

    isSidebarOpen:
      boolean;

    setIsSidebarOpen:
      (
        open: boolean,
      ) => void;
  }>;

const primaryNavigationItems =
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
        "مکالمه",

      href:
        "/speaking",

      icon:
        Mic2,
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
        "نوشتن",

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
        "ارزیابی‌ها",

      href:
        "/assessment",

      icon:
        ClipboardCheck,
    },

    {
      label:
        "کلاس",

      href:
        "/classroom",

      icon:
        Bot,
    },
  ] satisfies
    readonly NavigationItem[];

const secondaryNavigationItems =
  [
    {
      label:
        "تنظیمات",

      href:
        "/settings",

      icon:
        Settings,
    },
  ] satisfies
    readonly NavigationItem[];

function isNavigationItemActive(
  pathname:
    string,

  item:
    NavigationItem,
): boolean {
  if (
    item.exact
  ) {
    return (
      pathname ===
      item.href
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
}: Readonly<{
  appearance:
    DashboardAppearance;

  onNavigate:
    () => void;
}>) {
  const isLight =
    appearance ===
    "light";

  return (
    <Link
      href="/dashboard"
      onClick={
        onNavigate
      }
      aria-label={
        isLight
          ? "رفتن به داشبورد Navan AI"
          : "رفتن به داشبورد MeowLingo AI"
      }
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2",
        "transition",
        "focus-visible:outline-none",
        "focus-visible:ring-2",

        isLight
          ? [
              "hover:bg-white/70",
              "focus-visible:ring-[#7CC5BE]",
            ]
          : [
              "hover:bg-white/[0.04]",
              "focus-visible:ring-cyan-300/60",
            ],
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",

          isLight
            ? [
                "bg-[#008378]",
                "text-white",
                "shadow-[0_4px_12px_rgba(0,104,95,0.18)]",
              ]
            : [
                "bg-gradient-to-br",
                "from-cyan-400",
                "to-blue-600",
                "text-white",
                "shadow-lg",
                "shadow-cyan-950/30",
              ],
        )}
      >
        <Languages
          aria-hidden="true"
          className="h-6 w-6"
        />
      </span>

      <span className="min-w-0">
        <span
          className={cn(
            "block truncate text-lg font-bold",

            isLight
              ? "text-[#00796F]"
              : [
                  "bg-gradient-to-l",
                  "from-cyan-300",
                  "to-blue-400",
                  "bg-clip-text",
                  "text-transparent",
                ],
          )}
        >
          {isLight
            ? "Navan AI"
            : "MeowLingo AI"}
        </span>

        <span
          className={cn(
            "block truncate text-[11px]",

            isLight
              ? "text-[#6D7A77]"
              : "text-slate-500",
          )}
        >
          {isLight
            ? "همراه زبان تو"
            : "Your AI Language Mentor"}
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
}: Readonly<{
  item:
    NavigationItem;

  pathname:
    string;

  appearance:
    DashboardAppearance;

  onNavigate:
    () => void;
}>) {
  const active =
    isNavigationItemActive(
      pathname,
      item,
    );

  const isLight =
    appearance ===
    "light";

  const Icon =
    item.icon;

  return (
    <Link
      href={
        item.href
      }
      onClick={
        onNavigate
      }
      aria-current={
        active
          ? "page"
          : undefined
      }
      className={cn(
        "group relative flex min-h-11 items-center gap-3",
        "rounded-lg px-3 py-2",
        "text-sm font-medium transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2",

        isLight
          ? [
              "focus-visible:ring-[#9BCBC6]",

              active
                ? [
                    "bg-[#D6EDEB]",
                    "text-[#008378]",
                  ]
                : [
                    "text-[#596562]",
                    "hover:bg-white/70",
                    "hover:text-[#00685F]",
                  ],
            ]
          : [
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
            ],
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-2 right-0 top-2 w-[3px] rounded-l-full",

            isLight
              ? "bg-[#0D9488]"
              : "bg-cyan-300",
          )}
        />
      ) : null}

      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          "transition duration-200",

          isLight
            ? active
              ? "text-[#008378]"
              : "text-[#6D7A77]"
            : active
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
          className="h-[18px] w-[18px]"
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
  onNavigate,
  onOpenPlans,
}: Readonly<{
  appearance:
    DashboardAppearance;

  onNavigate:
    () => void;

  onOpenPlans:
    () => void;
}>) {
  const isLight =
    appearance ===
    "light";

  return (
    <div
      className="
        mt-auto
        px-3
        pb-4
        pt-6
      "
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-4",

          isLight
            ? [
                "border",
                "border-[#24A89B]",
                "bg-[#12A99B]",
                "shadow-[0_8px_22px_rgba(0,131,120,0.18)]",
              ]
            : [
                "border",
                "border-violet-300/15",
                "bg-gradient-to-br",
                "from-violet-600/90",
                "to-blue-700/90",
                "shadow-xl",
                "shadow-blue-950/30",
              ],
        )}
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-white/10
            blur-2xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-white/15
                text-white
              "
            >
              <Crown
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <h2
              className="
                text-sm
                font-bold
                text-white
              "
            >
              نسخه حرفه‌ای
            </h2>
          </div>

          <p
            className="
              mt-3
              text-xs
              leading-6
              text-white/80
            "
          >
            دسترسی نامحدود به تمامی درس‌ها و تحلیل دقیق‌تر پیشرفت با هوش مصنوعی
          </p>

          <button
            type="button"
            onClick={() => {
              onNavigate();
              onOpenPlans();
            }}
            className={cn(
              "mt-4 inline-flex w-full items-center justify-center",
              "rounded-lg px-3 py-2.5 text-xs font-bold transition",
              "focus-visible:outline-none focus-visible:ring-2",

              isLight
                ? [
                    "bg-white",
                    "text-[#00796F]",
                    "hover:bg-[#F3FFFD]",
                    "focus-visible:ring-white/70",
                  ]
                : [
                    "border",
                    "border-white/15",
                    "bg-white/15",
                    "text-white",
                    "hover:bg-white/25",
                    "focus-visible:ring-white/70",
                  ],
            )}
          >
            خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  appearance = "dark",
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname =
    usePathname();

  const [
    isPricingModalOpen,
    setIsPricingModalOpen,
  ] =
    useState(false);

  const isLight =
    appearance ===
    "light";

  function closeSidebar(): void {
    setIsSidebarOpen(
      false,
    );
  }

  function openPricingModal(): void {
    setIsPricingModalOpen(
      true,
    );
  }

  function closePricingModal(): void {
    setIsPricingModalOpen(
      false,
    );
  }

  return (
    <>
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
          "fixed inset-0 z-40 backdrop-blur-sm",
          "transition-opacity duration-300 lg:hidden",

          isLight
            ? "bg-slate-950/20"
            : "bg-black/60",

          isSidebarOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        id="application-sidebar"
        aria-label="منوی اصلی برنامه"
        dir="rtl"
        className={cn(
          "fixed inset-y-0 right-0 z-50",
          "flex w-72 max-w-[86vw] flex-col",
          "overflow-y-auto px-2 py-4",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",

          isLight
            ? [
                "border-l",
                "border-[#DCE5E3]",
                "bg-[#F0F3F5]/98",
                "shadow-[-4px_0_20px_rgba(15,23,42,0.03)]",
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
            flex
            items-center
            justify-between
            gap-3
            px-1
          "
        >
          <div
            className="
              min-w-0
              flex-1
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
          </div>

          <button
            type="button"
            onClick={
              closeSidebar
            }
            aria-label="بستن منو"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              "transition focus-visible:outline-none focus-visible:ring-2 lg:hidden",

              isLight
                ? [
                    "text-[#6D7A77]",
                    "hover:bg-white",
                    "hover:text-[#00685F]",
                    "focus-visible:ring-[#9BCBC6]",
                  ]
                : [
                    "text-slate-400",
                    "hover:bg-white/[0.06]",
                    "hover:text-white",
                    "focus-visible:ring-cyan-300/60",
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

            isLight
              ? "bg-[#DCE5E3]"
              : "bg-white/[0.06]",
          )}
        />

        <nav
          aria-label="بخش‌های اصلی"
          className="
            flex
            flex-col
            gap-1
            px-2
          "
        >
          {primaryNavigationItems.map(
            (item) => (
              <NavigationLink
                key={
                  item.href
                }
                item={
                  item
                }
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

        <div
          className={cn(
            "mx-5 my-4 h-px",

            isLight
              ? "bg-[#DCE5E3]"
              : "bg-white/[0.05]",
          )}
        />

        <nav
          aria-label="تنظیمات و ابزارها"
          className="
            flex
            flex-col
            gap-1
            px-2
          "
        >
          {secondaryNavigationItems.map(
            (item) => (
              <NavigationLink
                key={
                  item.href
                }
                item={
                  item
                }
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

        {!isLight ? (
          <SupportCard />
        ) : null}

        <UpgradeToProCard
          appearance={
            appearance
          }
          onNavigate={
            closeSidebar
          }
          onOpenPlans={
            openPricingModal
          }
        />
      </aside>

      <PricingModal
        isOpen={
          isPricingModalOpen
        }
        onClose={
          closePricingModal
        }
        plans={
          subscriptionPlans
        }
      />
    </>
  );
}