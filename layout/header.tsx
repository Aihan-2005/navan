"use client";

import Link from "next/link";
import UserProfile from "../components/auth/userProfile/page";

type HeaderProps = {
  setIsSidebarOpen: (open: boolean) => void;
};

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-[#0B1221]/85 px-4 py-4 backdrop-blur-lg lg:px-8"
      dir="rtl"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            className="-m-2.5 rounded-lg p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="باز کردن منو"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>

          <Link href="/" className="hidden items-center gap-3 lg:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22d3ee,#2563eb)] shadow-lg shadow-cyan-500/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m0-12c-2.8 0-5 1.4-5 3.2S9.2 12.5 12 12.5m0-6.5c2.8 0 5 1.4 5 3.2s-2.2 3.3-5 3.3m0 0c-2.8 0-5 1.4-5 3.2S9.2 19 12 19m0-6.5c2.8 0 5 1.4 5 3.2S14.8 19 12 19"
                />
              </svg>
            </div>

            <div>
              <div className="bg-[linear-gradient(to_right,#67e8f9,#60a5fa)] bg-clip-text text-lg font-bold text-transparent">
                MeowLingo AI
              </div>
              <div className="text-xs text-slate-400">
                Your AI Language Mentor
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <button
            type="button"
            className="rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white"
            aria-label="اعلان‌ها"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0m6 0H9"
              />
            </svg>
          </button>

          <Link
            href="/settings"
            className="rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white"
            aria-label="تنظیمات"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.3 4.3 11 2h2l.7 2.3a8 8 0 0 1 1.5.6l2.1-1.1 1.4 1.4-1.1 2.1c.3.5.5 1 .6 1.5L20.5 9v2l-2.3.7a8 8 0 0 1-.6 1.5l1.1 2.1-1.4 1.4-2.1-1.1c-.5.3-1 .5-1.5.6L13 18.5h-2l-.7-2.3a8 8 0 0 1-1.5-.6l-2.1 1.1-1.4-1.4 1.1-2.1a8 8 0 0 1-.6-1.5L3.5 11V9l2.3-.7c.1-.5.3-1 .6-1.5L5.3 4.7l1.4-1.4 2.1 1.1c.5-.3 1-.5 1.5-.6Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
              />
            </svg>
          </Link>

          <UserProfile />
        </div>
      </div>
    </header>
  );
}