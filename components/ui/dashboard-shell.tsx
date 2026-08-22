"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

type DashboardShellProps = Readonly<{
  children: ReactNode;
}>;

/**
 * Interactive shell used by authenticated application routes.
 *
 * Responsibilities:
 * - Rendering the shared header and sidebar
 * - Managing the mobile sidebar state
 * - Locking body scroll while the mobile sidebar is open
 * - Closing the sidebar with the Escape key
 */
export default function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const closeSidebar = useCallback((): void => {
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    function handleEscapeKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeSidebar, isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isSidebarOpen]);

  return (
    <div dir="rtl" className="min-h-dvh bg-[#F7F9FB] text-white">
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main
        id="main-content"
        className="
          min-h-dvh
          bg-[#F7F9FB]
          px-4 pb-10 pt-24
          sm:px-6
          lg:mr-72 lg:px-8
        "
      >
        {children}
      </main>
    </div>
  );
}
