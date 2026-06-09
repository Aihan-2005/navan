// src/components/ui/Header.tsx
"use client";

// import Image from "next/image";
import UserProfile from "../app/(user)/profile/page";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  const { data: session, status } = useSession(); // Client's login status

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated" && session?.user;
  return (
    <header
      className="fixed inset-x-0 top-0 z-80 bg-[#0B1221]/85 backdrop-blur-lg border-b border-white/10 px-6 lg:px-8 py-4 flex items-center justify-between"
      dir="rtl"
    >
      <div className="flex items-center gap-x-4">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Link href="/" className="lg:flex hidden items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l3 3m0 0l3-3m-3 3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400">
            Meowlingo AI
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-x-4">
        <button type="button" className="p-2.5 text-gray-400 hover:text-white">
          <span className="sr-only">View notifications</span>
          <div className="icon w-6 h-6 bg-gray-500/40 rounded" />
        </button>
        <button type="button" className="p-2.5 text-gray-400 hover:text-white">
          <span className="sr-only">Settings</span>
          <div className="icon w-6 h-6 bg-gray-500/40 rounded" />
        </button>

        {isLoading && (
          <div className="h-8 w-8 rounded-full bg-gray-600 animate-pulse"></div>
        )}

        {!isLoading &&
          (isLoggedIn ? (
            <UserProfile />
          ) : (
            <Link
              href="../api/auth/login"
              className="text-sm font-semibold leading-6 text-white bg-cyan-600 px-3 py-1.5 rounded-md hover:bg-cyan-700"
            >
              ورود / ثبت‌نام
            </Link>
          ))}
      </div>
    </header>
  );
}
