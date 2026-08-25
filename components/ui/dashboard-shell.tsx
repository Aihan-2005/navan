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
 * Returns true when pathname is either exactly the route root
 * or one of its nested/dynamic routes.
 *
 * Examples:
 *
 * /reading
 * /reading/library
 * /reading/resources/:resourceId
 * /reading/resources/:resourceId/sections/:sectionId
 */
function isRouteWithin(
  pathname: string,
  rootPath: string,
): boolean {
  return (
    pathname === rootPath ||
    pathname.startsWith(
      `${rootPath}/`,
    )
  );
}

/**
 * Reading is now a completely light experience.
 *
 * Important:
 * Do not maintain a list of individual Reading routes here.
 * Reading contains dynamic resource/section routes and every
 * nested route should receive the same light Header/Sidebar.
 *
 * Writing overview is currently light as well.
 * Nested Writing pages remain unchanged until their visual
 * system is intentionally migrated.
 */
function resolveDashboardAppearance(
  pathname: string,
): DashboardAppearance {
  if (
    isRouteWithin(
      pathname,
      "/reading",
    )
  ) {
    return "light";
  }

  if (pathname === "/writing") {
    return "light";
  }

  return "dark";
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname =
    usePathname();

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

  /**
   * A route change must never leave the mobile drawer open.
   */
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  /**
   * Close mobile navigation with Escape.
   */
  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ): void {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    closeSidebar,
    isSidebarOpen,
  ]);

  /**
   * Lock background scrolling while the mobile sidebar
   * is visible.
   */
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

  const isLight =
    appearance === "light";

  return (
    <div
      dir="rtl"
      data-dashboard-appearance={
        appearance
      }
      className={cn(
        "min-h-dvh",
        isLight
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

          "px-4",
          "pb-16",

          "sm:px-6",

          "lg:mr-72",
          "lg:px-8",

          isLight
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