"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { loginSchema } from "../../libs/auth";
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 10 },
  visible: { opacity: 1, scale: 1, rotateY: 0 },
};

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validation = loginSchema.safeParse({
      username: username,
      email: username,
      password: password,
    });

    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message ||
        "اطلاعات نامعتبر است، در صورت نداشتن حساب کاربری ثبت نام کنید";
      setError(firstError);
      setIsLoading(false);
      return;
    }

    // Api
    try {
      const response = await axios.post("/libs/api", {
        username: validation.data.username,
        email: validation.data.email,
        password: validation.data.password,
      });

      console.log("Login successful:", response.data);

      // Redirect after successful login
      router.push("/dashboard");
    } catch (err: any) {
      // نمایش خطای سرور
      const message = err.response?.data?.message || "خطا در ارتباط با سرور";
      setError(message);
      console.error("Login error:", err.response?.data || err.message);
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
      {/* login card */}
      <motion.div
        className="glassmorphism-card w-full sm:max-w-sm md:max-w-md lg:max-w-md p-8 rounded-4xl backdrop-blur-xl inset-shadow-gray-100/10
        inset-shadow-[0_10px_60px_rgba(0,0,0,0.55)] inset-20 bg-[radial-gradient(500px_circle_at_50%_1%,rgba(24,100,99,0.35),transparent_40%)] opacity-80 border-white/15 border"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div dir="rtl" className="text-center mb-8 rtl">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            به دنیای زبان خوش اومدی!
          </h1>
          <p className="text-white text-opacity-80">
            برای ادامه وارد حساب کاربری خود شوید
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-3" dir="rtl">
            {/* فیلد نام کاربری / ایمیل */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm"
              >
                نام کاربری / ایمیل
              </label>
              <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-2 focus-within:ring-gray-800 transition duration-300">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none text-sm py-1"
                  placeholder="نام کاربری یا ایمیل"
                />
              </div>
            </div>

            {/* Pass Field*/}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm"
              >
                رمز عبور
              </label>
              <div className="flex items-center rounded-xl bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-2 focus-within:ring-gray-800 transition duration-300 mb-6">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none text-sm py-1"
                  placeholder="رمز عبور"
                />
              </div>
            </div>

            {/* error display :) */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
  
            {/* forgot pass :)*/}
            <div className="flex justify-start">
              <Link
                href="/forgot-password" // PLS REPLACE THE REAL PATH
                className="text-sm text-white hover:text-blue-400 transition duration-300  drop-shadow-sm space-y-0"
              >
                فراموشی رمز عبور؟
              </Link>
            </div>
            <div className="flex justify-start">
              <Link
                href="./register"
                className="text-sm text-white hover:text-blue-400 transition duration-300  drop-shadow-sm"
              >
                حساب کاربری ندارید؟ ثبت نام کنید
              </Link>
            </div>

            {/* Login button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-gray-800 to-[#004D61] hover:from-gray-700 hover:to-[#004D69] text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                "ورود"
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm mb-4">
            یا از طریق گوگل وارد شوید
          </p>
          <div className="flex justify-center space-x-4">
            {/* دکمه گوگل */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-300"
              // onClick={handleGoogleLogin} // API گوگل
            >
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* add svg :) */}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
