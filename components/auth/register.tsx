import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  function updateField(name: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.username.trim().length < 3) {
      setError("نام کاربری باید حداقل ۳ کاراکتر باشد.");
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
       * بعداً اینجا باید API واقعی ثبت‌نام وصل شود:
       * await fetch("/api/register", ...)
       */

      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError("ثبت‌نام با خطا مواجه شد.");
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
          <h1 className="text-3xl font-bold">ثبت‌نام</h1>
          <p className="mt-2 text-sm text-slate-300">
            حساب کاربری جدید بسازید.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            placeholder="نام کاربری"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="ایمیل"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="رمز عبور"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
          />

          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            placeholder="تکرار رمز عبور"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
          />

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
            {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
            حساب دارید؟ وارد شوید
          </Link>
        </div>
      </motion.div>
    </main>
  );
}