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


const LIGHT_SHELL_NAMESPACES = [
  "/daily-practice",
  "/reading",
  "/speaking",
  "/listening",
] as const;

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
  const belongsToLightNamespace =
    LIGHT_SHELL_NAMESPACES.some(
      (rootPath) =>
        isRouteWithin(
          pathname,
          rootPath,
        ),
    );

  if (
    belongsToLightNamespace
  ) {
    return "light";
  }


  if (
    pathname === "/writing"
  ) {
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

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ): void {
      if (
        event.key ===
        "Escape"
      ) {
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

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.removeProperty(
        "overflow",
      );

      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      if (
        previousOverflow
      ) {
        document.body.style.overflow =
          previousOverflow;

        return;
      }

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
        appearance={
          appearance
        }
        setIsSidebarOpen={
          setIsSidebarOpen
        }
      />

      <Sidebar
        appearance={
          appearance
        }
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