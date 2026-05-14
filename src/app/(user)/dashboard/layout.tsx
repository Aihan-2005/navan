// src/app/(dashboard)/layout.tsx
"use client";

import Sidebar from "../../../components/ui/sidebar";
import Header from "../../../components/ui/header";
import { useState } from "react";
// import { usePathname } from "next/navigation";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // برای موبایل

  return (
    <div className="flex h-screen overflow-hidden" >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Dashboard Content */}
        <main className="p-6 lg:p-8 flex-1 bg-[#232525]">
          {children}
        </main>
      </div>
    </div>
  );
}
