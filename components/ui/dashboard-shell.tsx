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
  "/dashboard",
  "/daily-practice",
  "/listening",
  "/speaking",
  "/writing",
  "/reading",
  "/vocabulary",
  "/assessment",
  "/profile",
] as const;

const WIDE_CONTENT_NAMESPACES = [
  "/dashboard",
  "/reading",
  "/writing",
  "/vocabulary",
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
  const isLightRoute =
    LIGHT_SHELL_NAMESPACES.some(
      (rootPath) =>
        isRouteWithin(
          pathname,
          rootPath,
        ),
    );

  return isLightRoute
    ? "light"
    : "dark";
}

function isWideContentRoute(
  pathname: string,
): boolean {
  return WIDE_CONTENT_NAMESPACES.some(
    (rootPath) =>
      isRouteWithin(
        pathname,
        rootPath,
      ),
  );
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

  const useWideContent =
    isWideContentRoute(
      pathname,
    );

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

    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (
        event.key ===
        "Escape"
      ) {
        closeSidebar();
      }
    };

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
      if (previousOverflow) {
        document.body.style.overflow =
          previousOverflow;
      } else {
        document.body.style.removeProperty(
          "overflow",
        );
      }
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
              "bg-white",
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

      <div
        id="main-content"
        className={cn(
          "min-h-dvh",

          /*
           * Mobile horizontal spacing.
           */
          "px-3",
          "pb-16",
          "pt-24",

          "sm:px-4",

          /*
           * Sidebar is 288px.
           * Previous horizontal padding was 32px.
           * It is intentionally reduced to 16-20px.
           */
          "lg:mr-72",
          "lg:px-4",

          "xl:px-5",

          isLight
            ? "bg-white"
            : "bg-[#041121]",

          /*
           * Reading / Writing currently contain
           * max-w-[936px] containers.
           *
           * Override their outer page container here
           * so we do not have to duplicate width logic
           * in every feature page.
           */
          useWideContent && [
            "[&>main]:!max-w-[1120px]",
            "[&>nav]:!max-w-[1120px]",
          ],
        )}
      >
        {children}
      </div>
    </div>
  );
}