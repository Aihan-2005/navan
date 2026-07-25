import type { ReactNode } from "react";

import DashboardShell from "../../components/ui/dashboard-shell";

type DashboardLayoutProps = Readonly<{
  children: ReactNode;
}>;

/**
 * Shared layout for all routes nested under `/dashboard`.
 *
 * This component intentionally remains a Server Component.
 * Interactive layout behavior is delegated to DashboardShell.
 */
export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}