"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, RotateCcw, User } from "lucide-react";

const fieldLabelClass =
  "block h-4 text-right text-sm font-bold leading-4 tracking-[0.14px] text-[#3D4947]";

const fieldInputClass =
  "w-full rounded-lg border border-[#BCC9C6] bg-white text-base text-[#191C1E] outline-none transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-[#6B7280] focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.227c0-.709-.064-1.391-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.232c1.891-1.741 2.981-4.305 2.981-7.35Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.968-.895 6.619-2.423l-3.232-2.509c-.895.6-2.041.955-3.387.955-2.605 0-4.81-1.759-5.6-4.123H3.06v2.591A9.998 9.998 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.9A6.01 6.01 0 0 1 6.087 12c0-.659.114-1.3.313-1.9V7.509H3.06A9.998 9.998 0 0 0 2 12c0 1.614.386 3.141 1.06 4.491L6.4 13.9Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.964 2.995 14.696 2 12 2a9.998 9.998 0 0 0-8.94 5.509L6.4 10.1c.79-2.364 2.995-4.123 5.6-4.123Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      focusable="false"
    >
      <path d="M17.05 12.536c-.028-2.245 1.835-3.338 1.92-3.39-1.056-1.545-2.697-1.756-3.278-1.773-1.379-.145-2.716.826-3.418.826-.716 0-1.797-.812-2.963-.788-1.5.023-2.904.892-3.673 2.24-1.588 2.75-.404 6.79 1.118 9.013.762 1.09 1.652 2.308 2.817 2.265 1.14-.047 1.566-.728 2.941-.728 1.362 0 1.762.728 2.95.7 1.223-.02 1.993-1.096 2.728-2.196.882-1.25 1.237-2.48 1.251-2.543-.029-.01-2.37-.905-2.393-3.606ZM14.79 5.91c.613-.767 1.032-1.81.916-2.865-.887.04-1.996.613-2.635 1.363-.565.66-1.07 1.744-.94 2.76.997.075 2.002-.504 2.66-1.258Z" />
    </svg>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function updateField(name: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.username.trim().length < 3) {
      setError("نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("ایمیل معتبر وارد کنید.");
      return;
    }

    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    try {
      setIsLoading(true);

      /**
       * API ثبت نام پروژه بعداً می‌تواند اینجا فراخوانی شود.
       */
      router.push("/login");
    } catch (registerError) {
      console.error("Register error:", registerError);
      setError("ثبت‌نام با خطا مواجه شد.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="
        relative
        flex
        min-h-dvh
        items-center
        justify-center
        overflow-hidden
        bg-[#F7F9FB]
        py-8
        text-[#191C1E]
      "
      style={{
        fontFamily: "var(--font-vazirmatn)",
      }}
    >
      {/* Top right green glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          -top-36
          h-96
          w-96
          rounded-full
          bg-[#00837833]
          blur-[100px]
          md:-right-14
          md:-top-24
        "
      />

      {/* Bottom left purple glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-36
          -left-28
          h-96
          w-96
          rounded-full
          bg-[#8A4CFC33]
          blur-[100px]
          md:-bottom-20
          md:-left-16
        "
      />

      <div className="relative z-10 w-full max-w-[448px] px-4">
        {/* Brand */}
        <header
          className="
            mx-auto
            flex
            h-[84px]
            w-full
            max-w-[416px]
            flex-col
            items-center
            gap-2
            pb-2
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
              fontFamily: "var(--font-plus-jakarta-sans)",
            }}
          >
            Navan AI
          </div>

          <p className="h-6 text-base font-normal leading-6">
            همراه زبان تو
          </p>
        </header>

        {/* Registration card */}
        <section
          className="
            mx-auto
            box-border
            flex
            min-h-[669px]
            w-full
            max-w-[416px]
            flex-col
            gap-[23.5px]
            rounded-xl
            border
            border-[#E2E8F0CC]
            bg-[#FFFFFFE5]
            px-8
            pb-8
            pt-[23px]
            shadow-[0_4px_20px_0_#0000000A]
            backdrop-blur-[12px]
          "
        >
          <h1
            className="
              h-[30px]
              text-center
              text-[22px]
              font-bold
              leading-[30px]
              text-[#191C1E]
            "
          >
            ایجاد حساب کاربری
          </h1>

          <form
            onSubmit={handleRegister}
            noValidate
            className="
              flex
              min-h-[412px]
              w-full
              flex-col
              gap-4
            "
          >
            {/* Name */}
            <div className="flex h-[79px] flex-col gap-2">
              <label
                htmlFor="username"
                className={fieldLabelClass}
              >
                نام و نام خانوادگی
              </label>

              <div className="relative h-[55px]">
                <User
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                  strokeWidth={1.7}
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={(event) =>
                    updateField("username", event.target.value)
                  }
                  autoComplete="name"
                  disabled={isLoading}
                  placeholder="نام خود را وارد کنید"
                  className={`
                    ${fieldInputClass}
                    h-[55px]
                    py-3.5
                    pl-3
                    pr-10
                    text-right
                    leading-none
                  `}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex h-[73px] flex-col gap-2">
              <label
                htmlFor="email"
                className={fieldLabelClass}
              >
                ایمیل
              </label>

              <div className="relative h-[49px]">
                <Mail
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-[17px]
                    w-[17px]
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                  strokeWidth={1.7}
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={isLoading}
                  placeholder="name@example.com"
                  className={`
                    ${fieldInputClass}
                    h-[49px]
                    py-3.5
                    pl-3
                    pr-10
                    text-left
                    leading-[19px]
                  `}
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex h-[73px] flex-col gap-2">
              <label
                htmlFor="password"
                className={fieldLabelClass}
              >
                رمز عبور
              </label>

              <div className="relative h-[49px]">
                <Lock
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-[17px]
                    w-[17px]
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                  strokeWidth={1.7}
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  autoComplete="new-password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`
                    ${fieldInputClass}
                    h-[49px]
                    py-3.5
                    pl-10
                    pr-10
                    text-left
                    leading-[19px]
                  `}
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((visible) => !visible)
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
                    left-3
                    top-1/2
                    flex
                    h-[19px]
                    w-[19px]
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-[#6D7A77]
                    transition-colors
                    duration-300
                    ease-out
                    hover:text-[#00685F]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00685F]/25
                    disabled:cursor-not-allowed
                  "
                >
                  {showPassword ? (
                    <Eye
                      aria-hidden="true"
                      className="h-[19px] w-[19px]"
                      strokeWidth={1.7}
                    />
                  ) : (
                    <EyeOff
                      aria-hidden="true"
                      className="h-[19px] w-[19px]"
                      strokeWidth={1.7}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex h-[81px] flex-col gap-2 pb-2">
              <label
                htmlFor="confirmPassword"
                className={fieldLabelClass}
              >
                تکرار رمز عبور
              </label>

              <div className="relative h-[49px]">
                <RotateCcw
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-[17px]
                    w-[17px]
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                  strokeWidth={1.7}
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  dir="ltr"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    updateField(
                      "confirmPassword",
                      event.target.value,
                    )
                  }
                  autoComplete="new-password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`
                    ${fieldInputClass}
                    h-[49px]
                    py-3.5
                    pl-10
                    pr-10
                    text-left
                    leading-[19px]
                  `}
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                aria-live="polite"
                className="
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                h-[42px]
                w-full
                rounded-lg
                border
                border-black
                bg-[#00685F]
                px-4
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
                hover:bg-[#005F57]
                active:scale-[0.995]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
            </button>
          </form>

          {/* Divider */}
          <div
            className="
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
                border-t
                border-[#BCC9C6]
              "
            />

            <span
              className="
                h-[14px]
                w-24
                shrink-0
                px-4
                text-center
                text-xs
                font-normal
                leading-[14px]
                tracking-[0.6px]
                text-[#6D7A77]
              "
            >
              یا ثبت نام با
            </span>

            <span
              className="
                h-px
                flex-1
                border-t
                border-[#BCC9C6]
              "
            />
          </div>

          {/* Social login */}
          <div
            className="
              flex
              h-[42px]
              w-full
              gap-4
            "
            dir="rtl"
          >
            <button
              type="button"
              aria-label="ثبت نام با گوگل"
              className="
                flex
                h-[42px]
                flex-1
                items-center
                justify-center
                rounded-lg
                border
                border-[#BCC9C6]
                bg-white
                px-4
                py-2.5
                text-[#191C1E]
                transition-[border-color,box-shadow,transform]
                duration-300
                ease-out
                hover:border-[#93A6A1]
                hover:shadow-sm
                active:scale-[0.99]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#00685F]/20
              "
            >
              <GoogleIcon />
            </button>

            <button
              type="button"
              aria-label="ثبت نام با اپل"
              className="
                flex
                h-[42px]
                flex-1
                items-center
                justify-center
                rounded-lg
                border
                border-[#BCC9C6]
                bg-white
                px-4
                py-2.5
                text-[#111827]
                transition-[border-color,box-shadow,transform]
                duration-300
                ease-out
                hover:border-[#93A6A1]
                hover:shadow-sm
                active:scale-[0.99]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#00685F]/20
              "
            >
              <AppleIcon />
            </button>
          </div>

          {/* Login link */}
          <div
            className="
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
            <span>قبلاً حساب کاربری دارید؟&nbsp;</span>

            <Link
              href="/login"
              className="
                leading-4
                tracking-[0.14px]
                text-[#0D9488]
                transition-colors
                duration-300
                ease-out
                hover:text-[#00685F]
                focus-visible:rounded-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0D9488]/25
              "
            >
              وارد شوید
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}