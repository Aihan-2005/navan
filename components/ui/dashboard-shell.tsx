"use client";

import {
  usePathname,
} from "next/navigation";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

import {
  cn,
} from "../../lib/utils/cn";

type DashboardShellProps =
  Readonly<{
    children: ReactNode;
  }>;

export type DashboardAppearance =
  | "dark"
  | "light";

/**
 * فقط routeهایی که واقعاً UI روشن دارند
 * باید اینجا قرار بگیرند.
 *
 * Reading Resource Detail و Reading Workspace
 * عمداً داخل این لیست نیستند چون UI آن‌ها dark است.
 */
const LIGHT_DASHBOARD_ROUTES =
  new Set<string>([
    "/writing",

    "/reading",
    "/reading/library",
    "/reading/resources",
    "/reading/upload",
  ]);

function resolveDashboardAppearance(
  pathname: string,
): DashboardAppearance {
  return LIGHT_DASHBOARD_ROUTES.has(
    pathname,
  )
    ? "light"
    : "dark";
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname = usePathname();

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(false);

  const appearance =
    resolveDashboardAppearance(
      pathname,
    );

  const closeSidebar =
    useCallback((): void => {
      setIsSidebarOpen(false);
    }, []);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    function handleEscapeKey(
      event: KeyboardEvent,
    ): void {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [
    closeSidebar,
    isSidebarOpen,
  ]);

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.removeProperty(
        "overflow",
      );

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.removeProperty(
        "overflow",
      );
    };
  }, [isSidebarOpen]);

  return (
    <div
      dir="rtl"
      data-dashboard-appearance={
        appearance
      }
      className={cn(
        "min-h-dvh",
        appearance === "light"
          ? [
              "bg-[#F7F9FB]",
              "text-[#191C1E]",
            ]
          : [
              "bg-[#041121]",
              "text-white",
            ],
      )}
    >
      <Header
        appearance={appearance}
        setIsSidebarOpen={
          setIsSidebarOpen
        }
      />

      <Sidebar
        appearance={appearance}
        isSidebarOpen={
          isSidebarOpen
        }
        setIsSidebarOpen={
          setIsSidebarOpen
        }
      />

      <main
        id="main-content"
        className={cn(
          "min-h-dvh",
          "px-4 pb-16",
          "sm:px-6",
          "lg:mr-72 lg:px-8",
          appearance === "light"
            ? [
                "bg-[#F7F9FB]",
                "pt-[104px]",
              ]
            : [
                "bg-[#041121]",
                "pt-24",
              ],
        )}
      >
        {children}
      </main>
    </div>
  );
}