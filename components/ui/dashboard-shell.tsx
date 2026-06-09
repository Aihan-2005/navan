"use client";

import { useState } from "react";
import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#041121] text-white">
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="min-h-screen px-4 pb-8 pt-24 lg:mr-72 lg:px-8">
        {children}
      </main>
    </div>
  );
}