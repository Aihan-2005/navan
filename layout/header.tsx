"use client";

import Link from "next/link";

import {
  Bell,
  Languages,
  Menu,
  Settings,
} from "lucide-react";

import UserProfile from "../components/auth/userProfile/page";

type HeaderAppearance =
  | "dark"
  | "light";

type HeaderProps =
  Readonly<{
    setIsSidebarOpen: (
      open: boolean,
    ) => void;

    appearance?:
      HeaderAppearance;
  }>;

function LightHeader({
  setIsSidebarOpen,
}: Pick<
  HeaderProps,
  "setIsSidebarOpen"
>) {
  return (
    <header
      dir="rtl"
      className="
        fixed
        left-0
        right-0
        top-0
        z-[80]
        h-20
        border-b
        border-[#D9E1E0]
        bg-[#F7F9FB]/95
        px-4
        backdrop-blur-lg
        sm:px-6
        lg:right-72
        lg:px-8
        [font-family:var(--font-vazirmatn)]
      "
    >
      <div
        dir="ltr"
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[936px]
          items-center
          justify-between
          gap-4
        "
      >
        <div
          dir="rtl"
          className="
            flex
            items-center
            gap-2
          "
        >
          <UserProfile
            appearance="light"
          />

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
              text-[#3D4947]
              transition
              duration-200
              hover:bg-[#E9EEEF]
              hover:text-[#00685F]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#00897F]/25
            "
          >
            <Bell
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />

            <span
              aria-hidden="true"
              className="
                absolute
                right-[9px]
                top-[8px]
                h-1.5
                w-1.5
                rounded-full
                bg-[#E64B4B]
              "
            />
          </button>
        </div>

        <div
          dir="rtl"
          className="
            flex
            items-center
            justify-end
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
              items-center
              justify-center
              rounded-xl
              text-[#3D4947]
              transition
              duration-200
              hover:bg-[#E9EEEF]
              hover:text-[#00685F]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#00897F]/25
              lg:hidden
            "
          >
            <Menu
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function DarkHeader({
  setIsSidebarOpen,
}: Pick<
  HeaderProps,
  "setIsSidebarOpen"
>) {
  return (
    <header
      dir="rtl"
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
              -m-2.5
              rounded-lg
              p-2.5
              text-gray-300
              transition
              duration-200
              hover:bg-white/10
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/40
              lg:hidden
            "
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
              rounded-xl
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/40
              lg:flex
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
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                text-white
                shadow-lg
                shadow-cyan-500/20
              "
            >
              <Languages
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <span>
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-300
                  to-blue-400
                  bg-clip-text
                  text-lg
                  font-bold
                  text-transparent
                "
              >
                MeowLingo AI
              </span>

              <span
                className="
                  block
                  text-xs
                  text-slate-400
                "
              >
                Your AI Language Mentor
              </span>
            </span>
          </Link>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-4
          "
        >
          <button
            type="button"
            aria-label="اعلان‌ها"
            className="
              rounded-xl
              p-2.5
              text-gray-300
              transition
              duration-200
              hover:bg-white/10
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/40
            "
          >
            <Bell
              aria-hidden="true"
              className="h-5 w-5"
            />
          </button>

          <Link
            href="/settings"
            aria-label="تنظیمات"
            className="
              rounded-xl
              p-2.5
              text-gray-300
              transition
              duration-200
              hover:bg-white/10
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/40
            "
          >
            <Settings
              aria-hidden="true"
              className="h-5 w-5"
            />
          </Link>

          <UserProfile
            appearance="dark"
          />
        </div>
      </div>
    </header>
  );
}

export default function Header({
  setIsSidebarOpen,
  appearance = "dark",
}: HeaderProps) {
  if (appearance === "light") {
    return (
      <LightHeader
        setIsSidebarOpen={
          setIsSidebarOpen
        }
      />
    );
  }

  return (
    <DarkHeader
      setIsSidebarOpen={
        setIsSidebarOpen
      }
    />
  );
}