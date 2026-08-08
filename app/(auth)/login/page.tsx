import type {
  Metadata,
} from "next";

import LoginForm from "../../../components/auth/login";

export const metadata: Metadata = {
  title: "ورود",
  description:
    "ورود به حساب کاربری MeowLingo",
};

type LoginPageProps = Readonly<{
  searchParams: Promise<{
    callbackUrl?:
      | string
      | string[]
      | undefined;
  }>;
}>;



function sanitizeCallbackUrl(
  callbackUrl:
    | string
    | string[]
    | undefined,
): string {
  const value =
    Array.isArray(callbackUrl)
      ? callbackUrl[0]
      : callbackUrl;

  if (!value) {
    return "/dashboard";
  }

  const normalizedValue =
    value.trim();

  if (
    !normalizedValue.startsWith(
      "/",
    ) ||
    normalizedValue.startsWith(
      "//",
    )
  ) {
    return "/dashboard";
  }

  return normalizedValue;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const callbackUrl =
    sanitizeCallbackUrl(
      resolvedSearchParams.callbackUrl,
    );

  return (
    <LoginForm
      callbackUrl={callbackUrl}
    />
  );
}