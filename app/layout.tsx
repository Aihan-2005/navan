import type {
  Metadata,
} from "next";

import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  Vazirmatn,
} from "next/font/google";

import {
  Providers,
} from "../components/auth/providers";

import "../styles/globals.css";

const geistSans =
  Geist({
    variable:
      "--font-geist-sans",

    subsets: [
      "latin",
    ],

    display:
      "swap",
  });

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: [
      "latin",
    ],

    display:
      "swap",
  });

const vazirmatn =
  Vazirmatn({
    variable:
      "--font-vazirmatn",

    subsets: [
      "arabic",
    ],

    display:
      "swap",
  });

const plusJakartaSans =
  Plus_Jakarta_Sans({
    variable:
      "--font-plus-jakarta-sans",
 subsets: [
      "latin",
    ],

    display:
      "swap",
  });

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
      className={[
        geistSans.variable,
        geistMono.variable,
        vazirmatn.variable,
        plusJakartaSans.variable,
        "h-full",
      ].join(" ")}
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