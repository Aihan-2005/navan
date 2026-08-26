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

function resolveDashboardAppearance(
  pathname: string,
): DashboardAppearance {
  /*
   * تمام صفحات Reading باید Light باشند:
   *
   * /reading
   * /reading/library
   * /reading/resources/...
   * /reading/resources/.../sections/...
   */
  if (
    isRouteWithin(
      pathname,
      "/reading",
    )
  ) {
    return "light";
  }

  /*
   * فعلاً فقط Overview بخش Writing
   * مطابق Figma تم روشن دارد.
   *
   * صفحات داخلی Writing تا زمانی که
   * طراحی‌شان migrate نشده، Dark می‌مانند.
   */
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

  const isLight =
    appearance === "light";

  const closeSidebar =
    useCallback((): void => {
      setIsSidebarOpen(false);
    }, []);

  /*
   * بعد از تغییر route، منوی موبایل
   * نباید باز باقی بماند.
   */
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  /*
   * بستن Sidebar با Escape.
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

  /*
   * هنگام باز بودن Sidebar موبایل،
   * scroll صفحه اصلی قفل می‌شود.
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
