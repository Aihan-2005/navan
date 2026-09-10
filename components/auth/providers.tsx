"use client";

import type {
  Session,
} from "next-auth";

import {
  SessionProvider,
} from "next-auth/react";

import type {
  ReactNode,
} from "react";

type ProvidersProps =
  Readonly<{
    children: ReactNode;
    session: Session | null;
  }>;

export function Providers({
  children,
  session,
}: ProvidersProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}