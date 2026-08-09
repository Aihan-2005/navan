"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormProps = Readonly<{
  callbackUrl?: string;
}>;

function getSafeCallbackUrl(
  callbackUrl: string | undefined,
): string {
  if (!callbackUrl) {
    return "/dashboard";
  }

  const normalizedValue = callbackUrl.trim();

  if (
    !normalizedValue.startsWith("/") ||
    normalizedValue.startsWith("//")
  ) {
    return "/dashboard";
  }

  return normalizedValue;
}

const inputClassName = `
  h-full
  w-full
  rounded-lg
  border
  border-[#BCC9C6]
  bg-white
  text-[14px]
  font-normal
  text-[#191C1E]
  outline-none
  transition-[border-color,box-shadow]
  duration-300
  ease-out
  placeholder:text-[#3D494766]
  focus:border-[#00685F]
  focus:ring-2
  focus:ring-[#00685F]/10
  disabled:cursor-not-allowed
  disabled:bg-slate-50
  disabled:opacity-70
`;

export default function LoginForm({
  callbackUrl = "/dashboard",
}: LoginFormProps) {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

  function clearError() {
    if (error) {
      setError("");
    }
  }

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setError("");

    const normalizedIdentifier = identifier.trim();

    if (!normalizedIdentifier) {
      setError("ایمیل یا نام کاربری را وارد کنید.");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        identifier: normalizedIdentifier,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError(
          "ایمیل/نام کاربری یا رمز عبور اشتباه است.",
        );
        return;
      }

      router.replace(safeCallbackUrl);
      router.refresh();
    } catch (loginError) {
      console.error("Login error:", loginError);

      setError(
        "خطا در ارتباط با سرور. دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-dvh
        overflow-hidden
        bg-[#F7F9FB]
        px-4
        py-8
        text-[#191C1E]
        sm:py-12
      "
      style={{
        fontFamily: "var(--font-vazirmatn)",
      }}
    >
      {/* Green glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-36
          h-96
          w-96
          rounded-full
          bg-[#00837833]
          blur-[100px]
          sm:-right-20
          sm:-top-28
        "
      />

      {/* Purple glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-96
          w-96
          rounded-full
          bg-[#8A4CFC33]
          blur-[100px]
          sm:-bottom-28
          sm:-left-20
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[458px]
          flex-col
          items-center
        "
      >
        {/* Brand */}
        <header
          className="
            flex
            h-[76px]
            w-full
            flex-col
            items-center
            justify-start
            gap-2
            text-center
            text-[#00685F]
          "
        >
          <div
            className="
              h-11
              text-[36px]
              font-bold
              leading-[44px]
              tracking-[-0.9px]
            "
            style={{
              fontFamily:
                "var(--font-plus-jakarta-sans)",
            }}
          >
            Navan AI
          </div>

          <p
            className="
              h-6
              text-base
              font-normal
              leading-6
            "
          >
            همراه زبان تو
          </p>
        </header>

        {/* 24px between logo section and login content */}
        <section
          className="
            mt-6
            flex
            min-h-[466px]
            w-full
            max-w-[458px]
            items-start
            justify-center
            px-0
            sm:px-1
          "
        >
          <div
            className="
              flex
              w-full
              max-w-[448px]
              flex-col
              items-center
              pt-5
              sm:pt-6
            "
          >
            <div
              className="
                flex
                w-full
                max-w-[366px]
                flex-col
              "
            >
              {/* Welcome title */}
              <h1
                className="
                  min-h-5
                  w-full
                  text-center
                  text-[20px]
                  font-bold
                  leading-7
                  text-[#3D4947]
                  sm:text-[22px]
                "
              >
                به پلتفرم آموزش هوشمند زبان خوش آمدید.
              </h1>

              <form
                onSubmit={handleLogin}
                noValidate
                className="
                  mt-8
                  flex
                  w-full
                  flex-col
                  gap-6
                "
              >
                {/* Identifier */}
                <div
                  className="
                    flex
                    h-[75px]
                    w-full
                    flex-col
                    gap-2
                  "
                >
                  <label
                    htmlFor="identifier"
                    className="
                      h-4
                      text-right
                      text-sm
                      font-bold
                      leading-4
                      tracking-[0.14px]
                      text-[#191C1E]
                    "
                  >
                    ایمیل یا نام کاربری
                  </label>

                  <div
                    className="
                      relative
                      h-[51px]
                      w-full
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        right-0
                        top-0
                        z-10
                        flex
                        h-full
                        w-[38px]
                        items-center
                        justify-center
                        pr-3
                      "
                    >
                      <UserRound
                        aria-hidden="true"
                        className="
                          h-[14px]
                          w-[14px]
                          text-[#6D7A77]
                        "
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      value={identifier}
                      onChange={(event) => {
                        setIdentifier(event.target.value);
                        clearError();
                      }}
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={false}
                      disabled={isLoading}
                      aria-invalid={Boolean(error)}
                      placeholder="ایمیل خود را وارد کنید"
                      className={`
                        ${inputClassName}
                        px-3
                        pr-10
                        text-right
                        leading-none
                      `}
                    />
                  </div>
                </div>

                {/* Password */}
                <div
                  className="
                    flex
                    h-[70px]
                    w-full
                    flex-col
                    gap-2
                  "
                >
                  {/* Label + forgot password */}
                  <div
                    className="
                      flex
                      h-4
                      w-full
                      items-center
                      justify-between
                    "
                  >
                    <label
                      htmlFor="password"
                      className="
                        h-4
                        text-right
                        text-sm
                        font-bold
                        leading-4
                        tracking-[0.14px]
                        text-[#191C1E]
                      "
                    >
                      رمز عبور
                    </label>

                    <Link
                      href="/forgot-password"
                      className="
                        text-xs
                        font-normal
                        leading-[14px]
                        text-[#0D9488]
                        transition-colors
                        duration-300
                        ease-out
                        hover:text-[#00685F]
                        focus-visible:rounded-sm
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#0D9488]/20
                      "
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </Link>
                  </div>

                  <div
                    className="
                      relative
                      h-[46px]
                      w-full
                    "
                  >
                    {/* Lock icon */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        right-0
                        top-0
                        z-10
                        flex
                        h-full
                        w-[38px]
                        items-center
                        justify-center
                        pr-3
                      "
                    >
                      <Lock
                        aria-hidden="true"
                        className="
                          h-[18px]
                          w-[14px]
                          text-[#6D7A77]
                        "
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      dir="ltr"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearError();
                      }}
                      autoComplete="current-password"
                      disabled={isLoading}
                      aria-invalid={Boolean(error)}
                      placeholder="••••••••"
                      className={`
                        ${inputClassName}
                        h-[46px]
                        px-10
                        text-left
                        leading-[17px]
                      `}
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    />

                    {/* Password visibility */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      disabled={isLoading}
                      aria-label={
                        showPassword
                          ? "پنهان کردن رمز عبور"
                          : "نمایش رمز عبور"
                      }
                      aria-pressed={showPassword}
                      className="
                        absolute
                        left-0
                        top-0
                        z-10
                        flex
                        h-full
                        w-[38px]
                        items-center
                        justify-center
                        pl-3
                        text-[#6D7A77]
                        transition-colors
                        duration-300
                        ease-out
                        hover:text-[#00685F]
                        focus-visible:outline-none
                        focus-visible:text-[#00685F]
                        disabled:cursor-not-allowed
                      "
                    >
                      {showPassword ? (
                        <Eye
                          aria-hidden="true"
                          className="
                            h-[17px]
                            w-[19px]
                          "
                          strokeWidth={1.7}
                        />
                      ) : (
                        <EyeOff
                          aria-hidden="true"
                          className="
                            h-[17px]
                            w-[19px]
                          "
                          strokeWidth={1.7}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    flex
                    h-10
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#00685F]
                    py-3
                    text-center
                    text-sm
                    font-bold
                    leading-4
                    tracking-[0.14px]
                    text-white
                    shadow-[0_1px_2px_0_#0000000D]
                    transition-[background-color,transform,opacity]
                    duration-300
                    ease-out
                    hover:bg-[#005D55]
                    active:scale-[0.995]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00685F]/25
                    focus-visible:ring-offset-2
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isLoading ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="
                          h-3
                          w-3
                          animate-spin
                          rounded-full
                          border-2
                          border-white/40
                          border-t-white
                        "
                      />

                      <span>در حال ورود...</span>
                    </>
                  ) : (
                    "ورود به حساب کاربری"
                  )}
                </button>
              </form>

              {/* Error */}
              {error ? (
                <p
                  role="alert"
                  aria-live="polite"
                  className="
                    mt-3
                    w-full
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-3
                    py-2
                    text-center
                    text-xs
                    leading-5
                    text-red-700
                  "
                >
                  {error}
                </p>
              ) : null}

              {/* Divider */}
              <div
                className="
                  mt-6
                  flex
                  h-[14px]
                  w-full
                  items-center
                "
                aria-hidden="true"
              >
                <span
                  className="
                    h-px
                    flex-1
                    bg-[#BCC9C6]
                  "
                />

                <span
                  className="
                    h-[14px]
                    shrink-0
                    bg-[#F7F9FB]
                    px-2
                    text-center
                    text-xs
                    font-normal
                    leading-[14px]
                    tracking-[0.6px]
                    text-[#3D4947]
                  "
                >
                  یا
                </span>

                <span
                  className="
                    h-px
                    flex-1
                    bg-[#BCC9C6]
                  "
                />
              </div>

              {/* Register */}
              <div
                className="
                  mt-6
                  flex
                  h-5
                  w-full
                  items-center
                  justify-center
                  text-center
                  text-sm
                  font-normal
                  leading-5
                  text-[#3D4947]
                "
              >
                <span>
                  حساب کاربری ندارید؟&nbsp;
                </span>

                <Link
                  href="/register"
                  className="
                    font-bold
                    leading-4
                    tracking-[0.14px]
                    text-[#00685F]
                    transition-colors
                    duration-300
                    ease-out
                    hover:text-[#0D9488]
                    focus-visible:rounded-sm
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00685F]/20
                  "
                >
                  ایجاد حساب جدید
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}