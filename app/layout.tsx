import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  Providers,
} from "../components/auth/providers";

import "../styles/globals.css";

export const metadata:
  Metadata = {
  title: {
    default:
      "Language Assistant",

    template:
      "%s | Language Assistant",
  },

  description:
    "AI powered language learning assistant",
};

type RootLayoutProps =
  Readonly<{
    children: ReactNode;
  }>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full"
    >
      <body
        className="
          min-h-full
          bg-[#041121]
          font-sans
          text-white
          antialiased
        "
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}