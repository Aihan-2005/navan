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
     <div className="min-h-screen bg-[#0B1221] text-white">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex min-h-screen flex-col lg:pr-72">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 bg-[#131c2f] px-4 py-6 sm:px-6 lg:px-8 lg:pr-80 pt-20" >
          {children}
        </main>
      </div>
    </div>
  );
}
