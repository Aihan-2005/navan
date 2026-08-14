"use client";

import Link from "next/link";

import {
  Bell,
  Menu,
  Search,
  Settings,
} from "lucide-react";

import UserProfile from "../components/auth/userProfile/page";

import type {
  DashboardAppearance,
} from "../components/ui/dashboard-shell";

type HeaderProps =
  Readonly<{
    appearance?:
      DashboardAppearance;

    setIsSidebarOpen:
      (
        open: boolean,
      ) =>void;
  }>;

export default function Header({
  appearance = "dark",
  setIsSidebarOpen,
}: HeaderProps) {
  if (
    appearance ===
    "light"
  ) {
    return (
      <header
        dir="rtl"
        className="
          fixed
          left-0
          right-0
          top-0
          z-[80]
          h-16
          border-b
          border-[#DCE5E3]
          bg-white/95
          px-4
          backdrop-blur-xl
          sm:px-6
          lg:right-72
          lg:px-8"
      >
        <div
          className="
            mx-auto
            flex
            h-full
            w-full
            max-w-[1000px]
            items-center
            gap-4
          "
        >
          <button
            type="button"
            onClick={() => {
              setIsSidebarOpen(
                true,
              );
            }}
            aria-label="باز کردن منو"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-[#596562]
              transitionhover:bg-[#EFF5F3]
              hover:text-[#00685F]
              lg:hidden
            "
          >
            <Menu
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>

          <div
            className="
              hidden
              min-w-0
              flex-1
              justify-center
              md:flex
            "
          >
            <label
              className="
                flex
                h-9
                w-full
                max-w-[430px]
                items-center
                gap-2
                rounded-full
                borderborder-[#E2E8F0]
                bg-[#F8FAFC]
                px-4
                text-[#64748B]
                transition
                focus-within:border-[#9BCBC6]
                focus-within:bg-white
              "
            >
              <Search
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  shrink-0
                "
              />

              <input
                type="search"
                aria-label="جستجو"
                placeholder="جستجوی درس، کلمات یا تمرین‌ها..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-xs
                  text-[#334155]
                  outline-none
                  placeholder:text-[#94A3B8]
                "/>
            </label>
          </div>

          <div
            className="
              mr-auto
              flex
              shrink-0
              items-center
              gap-1
              sm:gap-2
            "
          >
            <button
              type="button"
              aria-label="اعلان‌ها"
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-[#596562]
                transition
                hover:bg-[#EFF5F3]
                hover:text-[#00685F]
              ">
              <Bell
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[9px]
                  top-[8px]
                  h-2
                  w-2
                  rounded-full
                  border-2
                  border-white
                  bg-red-500
                "
              />
            </button>

            <Link
              href="/settings"
              aria-label="تنظیمات"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-[#596562]
                transition
                hover:bg-[#EFF5F3]
                hover:text-[#00685F]
                sm:flex
              "
            >
              <Settings
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
            </Link>

            <UserProfile
              appearance="light"
            />
          </div>
        </div>
      </header>);
  }

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-[80]
        border-b
        border-white/10
        bg-[#0B1221]/85
        px-4
        py-4
        backdrop-blur-lg
        lg:px-8
      "
      dir="rtl"
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-x-4
          "
        >
          <button
            type="button"
            className="
              -m-2.5
              rounded-lg
              p-2.5
              text-gray-300
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
            onClick={() => {
              setIsSidebarOpen(
                true,
              );
            }}
            aria-label="باز کردن منو"
          >
            <Menu
              aria-hidden="true"
              className="h-6 w-6"
            />
          </button>
 <Link
            href="/"
            className="
              hidden
              items-center
              gap-3
              lg:flex
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[linear-gradient(135deg,#22d3ee,#2563eb)]
                shadow-lg
                shadow-cyan-500/20
              "
            >
              <Search
                aria-hidden="true"
                className="
                  h-5
                  w-5
                  text-white
                "  />
            </div>

            <div>
              <div
                className="
                  bg-[linear-gradient(to_right,#67e8f9,#60a5fa)]
                  bg-clip-text
                  text-lg
                  font-bold
                  text-transparent
                "
              >
                MeowLingo AI
              </div>

              <div
                className="
                  text-xs
                  text-slate-400
                "
              >
                Your AI Language Mentor
              </div>
            </div>
          </Link>
        </div>

        <div
          className="
    flex
            items-center
            gap-x-2
            sm:gap-x-4
          "
        >
          <button
            type="button"
            className="
              rounded-xl
              p-2.5
              text-gray-300
              transition
              hover:bg-white/10
              hover:text-white
            "
            aria-label="اعلان‌ها"
          >
            <Bell
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>

          <Link
            href="/settings"
            className="
              rounded-xl
              p-2.5
              text-gray-300
              transition
              hover:bg-white/10
              hover:text-white
            "
            aria-label="تنظیمات"
          >
            <Settings
              aria-hidden="true"
              className="h-5 w-5"
            />
          </Link>

          <UserProfile />
        </div>
      </div>
    </header>
  );
}