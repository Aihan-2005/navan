// src/components/ui/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// placeholders for SVGs or actual icons
const Logo = () => (
  <Link href="/" className="flex items-center gap-2 mb-8 px-4 lg:hidden">
    <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center ">
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
    <div>
      <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400 ">
        MeowLingo AI
      </h1>
      <p className="text-xs text-gray-400">Your AI Language Mentor</p>
    </div>
  </Link>
);

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: "" },
  { name: "Speaking", href: "/dashboard/speaking", icon: "" },
  { name: "Writing", href: "/dashboard/writing", icon: "" },
  { name: "Listening", href: "/dashboard/listening", icon: "" },
  { name: "Exam", href: "/dashboard/exam", icon: "" },
  { name: "Online Class", href: "/dashboard/onlineClass", icon: "" },
];

// Placeholder for Upgrade to Pro card
const UpgradeToPro = () => (
  <div className="mt-auto px-4 py-6 space-y-4">
    <div className="relative rounded-lg bg-linear-to-br from-purple-600 to-blue-500 p-4 shadow-lg">
      <div className="absolute inset-0 rounded-lg bg-white/5 ring-1 ring-white/10"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/40 via-black/0 to-transparent rounded-b-lg"></div>
      <div className="relative">
        <div className="flex items-center mb-2">
          <svg
            className="h-6 w-6 text-purple-300 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 21h.75L9 18l3.75 3 .75-.75V4.875c0-.621.504-1.125 1.125-1.125H20.25c.621 0 1.125.504 1.125 1.125V21h-.75L15 18l-3.75 3-.75-.75V6.75a.75.75 0 01.75-.75H10.5a.75.75 0 00-.75.75v7.5"
            />
          </svg>
          <h3 className="text-lg font-semibold text-white">Upgrade to Pro</h3>
        </div>
        <p className="text-xs text-gray-300 mb-3">
          Unlock advanced AI feedback, unlimited practice & more.
        </p>
        <button className="w-full px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-600 shadow-md hover:shadow-xl transition-shadow">
          Upgrade Now
        </button>
      </div>
    </div>
  </div>
);

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`pt-22 fixed inset-y-0 right-0 z-50 w-64 lg:w-72 flex flex-col overflow-y-auto px-2 py-4 bg-[#0B1221] border-l border-white/15  transform-gpu will-change-transform lg:translate-x-0 lg:transition-none ${
          isSidebarOpen
            ? "translate-x-0 opacity-100 transition-all duration-300 ease-out"
            : "translate-x-full opacity-100 transition-all duration-300 ease-in"
        }`}
      >
        <Logo/>

        <nav className="flex flex-1 flex-col">
          {navigationItems.map((item) => (
            <Link
              dir="rtl"
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-x-3 px-3 lg:py-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-md border-r-3 "
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <svg
                className={`h-6 w-6 ${pathname === item.href ? "text-cyan-300" : "text-gray-400"}`}
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="..."
                />
              </svg>
              <span className="flex-1">{item.name}</span>
            </Link>
          ))}
        </nav>

        <UpgradeToPro />
      </aside>
    </>
  );
}
