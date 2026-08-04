import type { Metadata } from "next";
import type { ReactNode } from "react";

import DashboardShell from "../../components/ui/dashboard-shell";

export const metadata: Metadata = {
  title: {
    default: "پنل یادگیری",
    template: "%s | MeowLingo AI",
  },
  description:
    "پنل شخصی یادگیری زبان، تمرین مکالمه و تحلیل هوشمند مهارت‌ها",
};

type UserLayoutProps = Readonly<{
  children: ReactNode;
}>;

/**
 * Shared layout for authenticated application routes.
 *
 * All user-facing features such as dashboard, speaking,
 * listening, writing and assessments are rendered inside
 * the same application shell.
 */
export default function UserLayout({
  children,
}: UserLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}