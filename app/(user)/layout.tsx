import type {
  Metadata,
} from "next";

import {
  connection,
} from "next/server";

import type {
  ReactNode,
} from "react";

import {
  Providers,
} from "../../components/auth/providers";

import DashboardShell from "../../components/ui/dashboard-shell";

import {
  getOptionalSession,
} from "../../lib/auth/get-optional-session";

export const metadata:
  Metadata = {
  title: {
    default:
      "پنل یادگیری",

    template:
      "%s | Navan AI",
  },

  description:
    "پنل شخصی یادگیری زبان، تمرین مکالمه و تحلیل هوشمند مهارت‌ها",
};

type UserLayoutProps =
  Readonly<{
    children:
      ReactNode;
  }>;

export default async function UserLayout({
  children,
}: UserLayoutProps) {

  
  await connection();

  const session =
    await getOptionalSession();

  return (
    <Providers
      session={
        session
      }
    >
      <DashboardShell>
        {children}
      </DashboardShell>
    </Providers>
  );
}