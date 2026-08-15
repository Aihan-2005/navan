import type {
  Metadata,
} from "next";

import {
  Providers,
} from "../components/auth/providers";

import "../styles/globals.css";

export const metadata: Metadata = {
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
    children:
      React.ReactNode;
  }>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
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