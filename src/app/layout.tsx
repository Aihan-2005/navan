import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../components/auth/providers";

import "../styles/globals.css";

// main font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// alternative
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Language Assistant",
  description: "AI powered language learning assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-primary-dark text-white dark:bg-primary-dark dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
