"use client";

import type {
  ReactNode,
} from "react";

import {
  SessionProvider,
} from "next-auth/react";

type ProvidersProps =
  Readonly<{
    children: ReactNode;
  }>;

export function Providers({
  children,
}: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}