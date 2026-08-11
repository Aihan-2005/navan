"use client";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  User,
} from "lucide-react";

import {
  signIn,
} from "next-auth/react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
  type FormEvent,
} from "react";

type RegisterFormState =
  Readonly<{
    name: string;

    identifier:
      string;

    password:
      string;

    confirmPassword:
      string;
  }>;

const INITIAL_FORM:
  RegisterFormState = {
  name: "",

  identifier: "",

  password: "",

  confirmPassword: "",
};

const fieldInputClass = `
  h-12
  w-full
  rounded-xl
  border
  border-[#BCC9C6]
  bg-white
  px-4
  text-sm
  text-[#191C1E]
  outline-none
  transition
  placeholder:text-[#87908E]
  focus:border-[#00685F]
  focus:ring-2
  focus:ring-[#00685F]/10
  disabled:cursor-not-allowed
  disabled:bg-slate-50
  disabled:opacity-70
`;

function getErrorMessage(
  payload: unknown,
): string | null {
  if (
    typeof payload !== "object" ||
    payload === null
  ) {
    return null;
  }

  if (
    "error" in payload &&
    typeof payload.error ===
      "string"
  ) {
    return payload.error;
  }

  if (
    "message" in payload &&
    typeof payload.message ===
      "string"
  ) {
    return payload.message;
  }

  return null;
}

export default function RegisterForm() {
  const router =
    useRouter();

  const [
    form,
    setForm,
  ] =
    useState<RegisterFormState>(
      INITIAL_FORM,
    );

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);

  const [
    acceptedTerms,
    setAcceptedTerms,
  ] =
    useState(false);

  function updateField(
    field:
      keyof RegisterFormState,
    value: string,
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      }),
    );

    if (error) {
      setError("");
    }
  }

  async function handleRegister(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const name =
      form.name.trim();

    const identifier =
      form.identifier.trim();

    if (
      name.length < 2
    ) {
      setError(
        "نام باید حداقل ۲ کاراکتر باشد.",
      );

      return;
    }

    if (
      identifier.length < 3
    ) {
      setError(
        "ایمیل یا شماره تلفن معتبر وارد کنید.",
      );

      return;
    }

    if (
      form.password.length <
      8
    ) {
      setError(
        "رمز عبور باید حداقل ۸ کاراکتر باشد.",
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "رمز عبور و تکرار آن یکسان نیستند.",
      );

      return;
    }

    if (!acceptedTerms) {
      setError(
        "برای ادامه باید قوانین استفاده را بپذیرید.",
      );

      return;
    }

    try {
      setIsLoading(
        true,
      );

      setError("");

      const registerResponse =
        await fetch(
          "/api/backend-auth/register",
          {
            method:
              "POST",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  name,

                  identifier,

                  password:
                    form.password,

                  passwordConfirm:
                    form.confirmPassword,
                },
              ),
          },
        );

      let registerPayload:
        unknown =
          null;

      try {
        registerPayload =
          await registerResponse.json();
      } catch {
        registerPayload =
          null;
      }

      if (
        !registerResponse.ok
      ) {
        setError(
          getErrorMessage(
            registerPayload,
          ) ??
            "ثبت‌نام انجام نشد.",
        );

        return;
      }

    

      const loginResult =
        await signIn(
          "credentials",
          {
            identifier,

            password:
              form.password,

            redirect:
              false,
          },
        );

      if (
        !loginResult ||
        loginResult.error
      ) {
        setError(
          "حساب ساخته شد، اما ورود خودکار انجام نشد. از صفحه ورود وارد حساب شوید.",
        );

        return;
      }

      router.replace(
        "/dashboard",
      );

      router.refresh();
    } catch (
      registerError
    ) {
      console.error(
        "Register error:",
        registerError,
      );

      setError(
        "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(
        false,
      );
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
        px-4
        py-10
        text-[#191C1E]
      "
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
    >
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
        "
      />

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
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-[448px]
        "
      >
        <header
          className="
            mb-7
            text-center
            text-[#00685F]
          "
        >
          <h1
            className="
              text-[34px]
              font-bold
              tracking-[-0.9px]
            "
            style={{
              fontFamily:
                "var(--font-plus-jakarta-sans)",
            }}
          >
            Navan AI
          </h1>

          <p
            className="
              mt-1
              text-base
            "
          >
            همراه زبان تو
          </p>
        </header>

        <section
          className="
            rounded-3xl
            border
            border-[#DCE5E3]
            bg-white/95
            p-6
            shadow-[0_24px_70px_rgba(0,59,54,0.08)]
            backdrop-blur
            sm:p-8
          "
        >
          <div className="text-center">
            <h2
              className="
                text-2xl
                font-bold
                text-[#263330]
              "
            >
              ساخت حساب کاربری
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#6D7A77]
              "
            >
              برای شروع مسیر یادگیری،
              اطلاعات حساب خود را وارد کنید.
            </p>
          </div>

          <form
            onSubmit={
              handleRegister
            }
            noValidate
            className="
              mt-7
              space-y-5
            "
          >
            <div>
              <label
                htmlFor="name"
                className="
                  text-sm
                  font-bold
                  text-[#3D4947]
                "
              >
                نام و نام خانوادگی
              </label>

              <div className="relative mt-2">
                <User
                  aria-hidden="true"
                  className="
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={
                    form.name
                  }
                  onChange={(
                    event,
                  ) => {
                    updateField(
                      "name",
                      event.target.value,
                    );
                  }}
                  autoComplete="name"
                  disabled={
                    isLoading
                  }
                  placeholder="مثلاً مجتبی شعبانی"
                  className={`
                    ${fieldInputClass}
                    pr-11
                  `}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="identifier"
                className="
                  text-sm
                  font-bold
                  text-[#3D4947]
                "
              >
                ایمیل یا شماره تلفن
              </label>

              <div className="relative mt-2">
                <Mail
                  aria-hidden="true"
                  className="
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  dir="ltr"
                  value={
                    form.identifier
                  }
                  onChange={(
                    event,
                  ) => {
                    updateField(
                      "identifier",
                      event.target.value,
                    );
                  }}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={
                    isLoading
                  }
                  placeholder="you@example.com"
                  className={`
                    ${fieldInputClass}
                    pr-11
                    text-left
                  `}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="
                  text-sm
                  font-bold
                  text-[#3D4947]
                "
              >
                رمز عبور
              </label>

              <div className="relative mt-2">
                <Lock
                  aria-hidden="true"
                  className="
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  dir="ltr"
                  value={
                    form.password
                  }
                  onChange={(
                    event,
                  ) => {
                    updateField(
                      "password",
                      event.target.value,
                    );
                  }}
                  autoComplete="new-password"
                  disabled={
                    isLoading
                  }
                  placeholder="••••••••"
                  className={`
                    ${fieldInputClass}
                    px-11
                    text-left
                  `}
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(
                      (current) =>
                        !current,
                    );
                  }}
                  disabled={
                    isLoading
                  }
                  aria-label={
                    showPassword
                      ? "پنهان کردن رمز عبور"
                      : "نمایش رمز عبور"
                  }
                  className="
                    absolute
                    left-3
                    top-1/2
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-[#6D7A77]
                    transition
                    hover:bg-[#EFF5F3]
                    hover:text-[#00685F]
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  ) : (
                    <Eye
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  )}
                </button>
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#7A8683]
                "
              >
                حداقل ۸ کاراکتر؛ قوانین
                نهایی رمز عبور توسط Backend
                نیز بررسی می‌شوند.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  text-sm
                  font-bold
                  text-[#3D4947]
                "
              >
                تکرار رمز عبور
              </label>

              <div className="relative mt-2">
                <Lock
                  aria-hidden="true"
                  className="
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#6D7A77]
                  "
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  dir="ltr"
                  value={
                    form.confirmPassword
                  }
                  onChange={(
                    event,
                  ) => {
                    updateField(
                      "confirmPassword",
                      event.target.value,
                    );
                  }}
                  autoComplete="new-password"
                  disabled={
                    isLoading
                  }
                  placeholder="••••••••"
                  className={`
                    ${fieldInputClass}
                    pr-11
                    text-left
                  `}
                />
              </div>
            </div>

            <label
              className="
                flex
                cursor-pointer
                items-start
                gap-3
                text-sm
                leading-6
                text-[#596562]
              "
            >
              <input
                type="checkbox"
                checked={
                  acceptedTerms
                }
                onChange={(
                  event,
                ) => {
                  setAcceptedTerms(
                    event.target.checked,
                  );

                  if (error) {
                    setError("");
                  }
                }}
                disabled={
                  isLoading
                }
                className="
                  mt-1
                  h-4
                  w-4
                  accent-[#00685F]
                "
              />

              <span>
                قوانین استفاده و سیاست
                حریم خصوصی Navan را
                می‌پذیرم.
              </span>
            </label>

            {error ? (
              <div
                role="alert"
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-red-700
                "
              >
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={
                isLoading
              }
              className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#00685F]
                px-5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-[#00574F]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#00685F]/30
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      animate-spin
                    "
                  />

                  در حال ساخت حساب...
                </>
              ) : (
                "ساخت حساب کاربری"
              )}
            </button>
          </form>

          <p
            className="
              mt-6
              text-center
              text-sm
              text-[#66726F]
            "
          >
            قبلاً حساب ساخته‌اید؟{" "}
            <Link
              href="/login"
              className="
                font-bold
                text-[#00796F]
                transition
                hover:text-[#005F57]
              "
            >
              وارد شوید
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}