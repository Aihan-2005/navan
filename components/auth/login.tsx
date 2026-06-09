"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!identifier.trim()) {
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
        identifier: identifier.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("ایمیل/نام کاربری یا رمز عبور اشتباه است.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("خطا در ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#041121] px-4 py-10 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">ورود به حساب</h1>
          <p className="mt-2 text-sm text-slate-300">
            برای ادامه وارد حساب کاربری خود شوید.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-sm font-medium text-white"
            >
              ایمیل یا نام کاربری
            </label>

            <input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (error) setError("");
              }}
              autoComplete="username"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-cyan-400"
              placeholder="admin@test.com یا admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-white"
            >
              رمز عبور
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-cyan-400"
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-slate-300 hover:text-white">
            فراموشی رمز عبور؟
          </Link>

          <Link href="/register" className="text-cyan-300 hover:text-cyan-200">
            ساخت حساب جدید
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
          تست موقت:
          <div className="mt-1 text-left" dir="ltr">
            admin@test.com / 123456
          </div>
        </div>
      </motion.div>
    </main>
  );
}