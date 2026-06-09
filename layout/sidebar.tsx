"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  name: string;
  href: string;
  iconPath: string;
};

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    iconPath:
      "M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Z",
  },
  {
    name: "Speaking",
    href: "/dashboard/speaking",
    iconPath:
      "M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4Zm7-4a7 7 0 0 1-14 0M12 17v4m-4 0h8",
  },
  {
    name: "Writing",
    href: "/dashboard/writing",
    iconPath:
      "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Zm12-12 2 2",
  },
  {
    name: "Listening",
    href: "/dashboard/listening",
    iconPath:
      "M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-7h4M4 12v4a3 3 0 0 0 3 3h1v-7H4",
  },
  {
    name: "Exam",
    href: "/dashboard/exam",
    iconPath:
      "M7 3h10a2 2 0 0 1 2 2v16l-4-2-3 2-3-2-4 2V5a2 2 0 0 1 2-2Zm3 6h6M10 13h6",
  },
  {
    name: "Online Class",
    href: "/dashboard/online-class",
    iconPath:
      "M4 6h16v10H4V6Zm4 14h8m-4-4v4m-5-8 3-3 3 3 4-4",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
  return (
    <Link href="/" className="mb-8 flex items-center gap-3 px-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22d3ee,#2563eb)] shadow-lg shadow-cyan-500/20">
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
        <h1 className="bg-[linear-gradient(to_right,#67e8f9,#60a5fa)] bg-clip-text text-xl font-bold text-transparent">
          MeowLingo AI
        </h1>
        <p className="text-xs text-gray-400">Your AI Language Mentor</p>
      </div>
    </Link>
  );
}

function UpgradeToPro() {
  return (
    <div className="mt-auto px-4 py-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#7c3aed,#2563eb)] p-4 shadow-xl shadow-blue-950/30">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent)]" />

        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-purple-200"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12 3 2.4 5 5.6.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.6 8 12 3Z"
              />
            </svg>

            <h3 className="text-base font-semibold text-white">
              Upgrade to Pro
            </h3>
          </div>

          <p className="mb-4 text-xs leading-6 text-gray-200">
            Unlock advanced AI feedback, unlimited practice and smart exam
            plans.
          </p>

          <Link
            href="/dashboard/billing"
            className="block w-full rounded-xl bg-white/15 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/25"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="بستن منو"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-l border-white/10 bg-[#0B1221] px-2 py-4 pt-[5.5rem] shadow-2xl shadow-black/30 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="ltr"
      >
        <Logo />

        <nav className="flex flex-1 flex-col gap-1 px-2">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "border-r-[3px] border-cyan-300 bg-cyan-400/10 text-cyan-200 shadow-lg shadow-cyan-950/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                }`}
              >
                <svg
                  className={`h-5 w-5 shrink-0 ${
                    active ? "text-cyan-200" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.iconPath}
                  />
                </svg>

                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <UpgradeToPro />
      </aside>
    </>
  );
}