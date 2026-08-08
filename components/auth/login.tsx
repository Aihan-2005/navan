"use client";

import Link from "next/link";

import {
  useState,
  type FormEvent,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  signIn,
} from "next-auth/react";

import {
  useRouter,
} from "next/navigation";

type LoginFormProps = Readonly<{
  callbackUrl?: string;
}>;

function getSafeCallbackUrl(
  callbackUrl: string | undefined,
): string {
  if (!callbackUrl) {
    return "/dashboard";
  }

  const normalizedValue =
    callbackUrl.trim();

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

export default function LoginForm({
  callbackUrl = "/dashboard",
}: LoginFormProps) {
  const router =
    useRouter();

  const [
    identifier,
    setIdentifier,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const safeCallbackUrl =
    getSafeCallbackUrl(
      callbackUrl,
    );

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setError("");

    const normalizedIdentifier =
      identifier.trim();

    if (!normalizedIdentifier) {
      setError(
        "ایمیل یا نام کاربری را وارد کنید.",
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      );

      return;
    }

    try {
      setIsLoading(true);

      const result =
        await signIn(
          "credentials",
          {
            identifier:
              normalizedIdentifier,

            password,

            redirect: false,
          },
        );

      if (
        !result ||
        result.error
      ) {
        setError(
          "ایمیل/نام کاربری یا رمز عبور اشتباه است.",
        );

        return;
      }

      router.replace(
        safeCallbackUrl,
      );

      router.refresh();
    } catch (loginError) {
      console.error(
        "Login error:",
        loginError,
      );

      setError(
        "خطا در ارتباط با سرور. دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    if (error) {
      setError("");
    }
  }

  return (
    <main
      dir="rtl"
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-[#041121]
        px-4 py-10
        text-white
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          w-full max-w-md
          rounded-4xl border
          border-white/15
          bg-white/10
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <div className="mb-8 text-center">
          <h1
            className="
              text-3xl font-bold
            "
          >
            ورود به حساب
          </h1>

          <p
            className="
              mt-2 text-sm
              text-slate-300
            "
          >
            برای ادامه وارد حساب
            کاربری خود شوید.
          </p>
        </div>

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor="identifier"
              className="
                mb-1 block
                text-sm font-medium
                text-white
              "
            >
              ایمیل یا نام کاربری
            </label>

            <input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={(
                event,
              ) => {
                setIdentifier(
                  event.target.value,
                );

                clearError();
              }}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              disabled={isLoading}
              aria-invalid={
                Boolean(error)
              }
              className="
                w-full rounded-xl
                border
                border-white/15
                bg-white/5
                px-4 py-3
                text-white
                outline-none
                transition
                placeholder:text-white/40
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              placeholder="admin@test.com یا admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="
                mb-1 block
                text-sm font-medium
                text-white
              "
            >
              رمز عبور
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(
                event,
              ) => {
                setPassword(
                  event.target.value,
                );

                clearError();
              }}
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={
                Boolean(error)
              }
              className="
                w-full rounded-xl
                border
                border-white/15
                bg-white/5
                px-4 py-3
                text-white
                outline-none
                transition
                placeholder:text-white/40
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>

          {error ? (
            <p
              role="alert"
              aria-live="polite"
              className="
                rounded-xl border
                border-red-400/20
                bg-red-500/10
                px-4 py-3
                text-center
                text-sm
                text-red-300
              "
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-xl
              bg-cyan-500
              px-6 py-3
              text-sm font-bold
              text-white
              transition
              hover:bg-cyan-400
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#041121]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading
              ? "در حال ورود..."
              : "ورود"}
          </button>
        </form>

        <div
          className="
            mt-6 flex
            items-center
            justify-between
            gap-4 text-sm
          "
        >
          <Link
            href="/forgot-password"
            className="
              text-slate-300
              transition
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
            "
          >
            فراموشی رمز عبور؟
          </Link>

          <Link
            href="/register"
            className="
              text-cyan-300
              transition
              hover:text-cyan-200
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
            "
          >
            ساخت حساب جدید
          </Link>
        </div>

        {process.env.NODE_ENV !==
        "production" ? (
          <div
            className="
              mt-6 rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              p-4 text-sm
              text-cyan-100
            "
          >
            <p>
              حساب تست توسعه:
            </p>

            <div
              className="
                mt-1 text-left
                font-mono text-xs
              "
              dir="ltr"
            >
              admin@test.com /
              123456
            </div>
          </div>
        ) : null}
      </motion.div>
    </main>
  );
}