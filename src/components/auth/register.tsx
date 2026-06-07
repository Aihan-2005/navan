"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { registerSchema, type RegisterFormData } from "../../utils/auth";
import { useRouter } from "next/navigation";

const gradientAnimation = {
  background: "linear-gradient(38deg,#041121,#041121,#103962)",
  backgroundSize: "100% 100%",
  animation: "gradientBG 15s ease infinite",
  "@keyframes gradientBG": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 100%" },
  },
};

const initialFormData: RegisterFormData = {
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 10 },
  visible: { opacity: 1, scale: 1, rotateY: 0 },
};

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
    if (fieldErrors[name as keyof RegisterFormData]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
      const errors: Partial<Record<keyof RegisterFormData, string>> = {};

      parsed.error.issues.forEach((err) => {
        const key = err.path[0] as keyof RegisterFormData | undefined;
        if (key && !errors[key]) {
          errors[key] = err.message;
        }
      });

      setFieldErrors(errors);
      setError("لطفاً خطاهای فرم را بررسی کنید.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const result = await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "ثبت‌نام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden w-full rtl"
      style={gradientAnimation as any}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.div
        className="glassmorphism-card w-full sm:max-w-sm md:max-w-md  lg:max-w-md p-8 rounded-4xl backdrop-blur-xl inset-shadow-gray-100/10
        inset-shadow-[0_10px_60px_rgba(0,0,0,0.55)] inset-20 bg-[radial-gradient(500px_circle_at_50%_1%,rgba(24,100,99,0.35),transparent_40%)] opacity-80 border-white/15 border "
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          ثبـت‌نام
        </h2>
        <p className="text-center text-white mb-8">
          حساب کاربری خود را ایجاد کنید
        </p>

        <form dir="rtl" className="space-y-3 rtl" onSubmit={handleSubmit}>
          <div>
            {" "}
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm"
            >
              نام کاربری
            </label>
            <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-1  focus-within:ring-gray-600 transition duration-300">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=""
                className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none py-1"
              />{" "}
            </div>
            {fieldErrors.username && (
              <p className="mt-1 text-sm text-red-400 text-right">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm">
              ایمیل
            </label>
            <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-1  focus-within:ring-gray-600 transition duration-300">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none py-1"
              />
            </div>

            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-400 text-right">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm">
              رمز عبور
            </label>
            <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-1  focus-within:ring-gray-600 transition duration-300">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="حداقل ۶ کاراکتر وارد کنید"
                className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none py-1"
              />
            </div>

            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-400 text-right">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm">
              تکرار رمز عبور
            </label>
            <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-1  focus-within:ring-gray-600 transition duration-300">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=""
                className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none py-1"
              />
            </div>
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400 text-right">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-800 rounded-2xl"
              />
              ذخیره اطلاعات من
            </label>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-linear-to-r from-[#002443] to-blue-800 hover:from-[#0a5984] hover:to-[#06337a] text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{}} // more style
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 8l4-3.709z"
                ></path>
              </svg>
            ) : (
              "ثبت نام"
            )}
          </motion.button>
        </form>
        <div className="flex justify-end mt-2">
          <a
            href="./login"
            className="text-sm text-white hover:text-blue-300 transition duration-300 underline-offset-3 hover:underline drop-shadow-sm"
          >
            حساب کاربری دارید؟ وارد شوید
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
