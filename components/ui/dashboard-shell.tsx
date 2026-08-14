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

type DashboardShellProps =
  Readonly<{
    children:
      ReactNode;
  }>;

export type DashboardAppearance =
  | "dark"
  | "light";

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname =
    usePathname();

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] =
    useState(false);

  /**
   * فعلاً فقط صفحه Overview بخش Reading
   * بر اساس UI جدید Figma روشن می‌شود.
   *
   * Resource / Upload / Library تا زمانی
   * که UI خودشان بازطراحی نشده، Dark
   * باقی می‌مانند.
   */
  const appearance:
    DashboardAppearance =
      pathname === "/reading"
        ? "light"
        : "dark";

  const closeSidebar =
    useCallback(
      (): void => {
        setIsSidebarOpen(
          false,
        );
      },
      [],
    );

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    function handleEscapeKey(
      event:
        KeyboardEvent,
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
  }, [
    isSidebarOpen,
  ]);

  return (
    <div
      dir="rtl"
      data-dashboard-appearance={
        appearance
      }
      className={
        appearance ===
        "light"
          ? `
            min-h-dvh
            bg-[#F7F9FB]
            text-[#191C1E]
          `
          : `
            min-h-dvh
            bg-[#041121]
            text-white
          `
      }
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
        className={
          appearance ===
          "light"
            ? `
              min-h-dvh
              px-4
              pb-20
              pt-20
              sm:px-6
              lg:mr-72
              lg:px-8
              lg:pt-20
            `
            : `
              min-h-dvh
              px-4
              pb-10
              pt-24
              sm:px-6
              lg:mr-72
              lg:px-8
            `
        }
      >
        {children}
      </main>
    </div>
  
  );
}