import type { Metadata } from "next";

import {
  Inter,
  Plus_Jakarta_Sans,
  Vazirmatn,
} from "next/font/google";

import LoginForm from "../../../components/auth/login";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری Navan AI",
};

type LoginPageProps = Readonly<{
  searchParams: Promise<{
    callbackUrl?: string | string[] | undefined;
  }>;
}>;

function sanitizeCallbackUrl(
  callbackUrl: string | string[] | undefined,
): string {
  const value = Array.isArray(callbackUrl)
    ? callbackUrl[0]
    : callbackUrl;

  if (!value) {
    return "/dashboard";
  }

  const normalizedValue = value.trim();

  if (
    !normalizedValue.startsWith("/") ||
    normalizedValue.startsWith("//")
  ) {
    return "/dashboard";
  }

  return normalizedValue;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const resolvedSearchParams = await searchParams;

  const callbackUrl = sanitizeCallbackUrl(
    resolvedSearchParams.callbackUrl,
  );

  return (
    <div
      className={`
        ${vazirmatn.variable}
        ${plusJakartaSans.variable}
        ${inter.variable}
      `}
    >
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}