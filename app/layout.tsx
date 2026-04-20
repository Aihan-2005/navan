import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Language Assistant!", 
  description: "Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-full`}
    >
      
      <body className="min-h-full flex flex-col bg-primary-dark text-white dark:bg-primary-dark dark:text-white">
        {children}
      </body>
    </html>
  );
}
