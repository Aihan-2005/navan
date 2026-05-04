"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { loginSchema, type LoginSchemaType } from "../../utils/auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


const gradientAnimation = {
  background: "linear-gradient(9deg, #242424, #0a0a0a, #004D61)",
  backgroundSize: "200% 200%",
  animation: "gradientBG 15s ease infinite",
  "@keyframes gradientBG": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
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

    // ZOD VALIDATION:
    const validation = loginSchema.safeParse({
      username: username, 
      email: username, 
      password: password, 
    });

    if (!validation.success) {
      // zod
      const firstError =
        validation.error.issues[0]?.message || "اطلاعات نامعتبر است";
      setError(firstError);
      setIsLoading(false);
      return;
    }

    // Api
    try {
      const response = await axios.post("", {
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
        className="glassmorphism-card w-full sm:max-w-sm p-8 rounded-xl shadow-xl"
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
          <div className="space-y-6">
            {/* فیلد نام کاربری / ایمیل */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-1 tracking-wide drop-shadow-sm"
              >
                نام کاربری / ایمیل
              </label>
              <div className="flex items-center rounded-lg bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-2 focus-within:ring-blue-800 transition duration-300">
                <svg
                  className="w-5 h-5 text-white/70 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <input
                  type="text"
                  id="username" // ID همچنان username است
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none text-lg py-1"
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
              <div className="flex items-center rounded-lg bg-white/5 backdrop-blur border border-white/20 p-2 focus-within:ring-2 focus-within:ring-blue-800 transition duration-300">
                <svg
                  className="w-5 h-5 text-white/70 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-white placeholder-white/70 outline-none focus:outline-none text-lg py-1"
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
            <div className="flex justify-end">
              <a
                href="/forgot-password" // PLS REPLACE THE REAL PATH
                className="text-sm text-white hover:text-blue-300 transition duration-300 underline-offset-2 hover:underline drop-shadow-sm"
              >
                فراموشی رمز عبور؟
              </a>
            </div>

            {/* Login button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-gray-800 to-[#004D61] hover:from-gray-700 hover:to-[#004D69] text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* بخش ورود با شبکه‌های اجتماعی */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm mb-4">
            یا از طریق گوگل وارد شوید
          </p>
          <div className="flex justify-center space-x-4">
            {/* دکمه گوگل */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-300"
              // onClick={handleGoogleLogin} // API گوگل را اینجا اضافه کنید
            >
              {/* آیکون گوگل (می‌توانید SVG واقعی را قرار دهید) */}
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.27v2.77h3.57c1.08-1 1.67-2.38 1.67-3.98s-.59-2.98-1.67-3.98z" />
                <path d="M12 21c2.15 0 3.96-.7 5.42-2.03l-3.57-2.77c-.49.34-.99.56-1.7.68v-4.26H4.53v2.77c.71.28 1.21.78 1.67 1.37h3.57v2.77s1.08 1.18 3.57 1.18z" />
                <path d="M8.3 17.82c-.25-.69-.38-1.44-.38-2.22s.13-1.53.38-2.22V10.06H4.53v2.77C3.44 13.73 3 15.03 3 16.34s.44 2.6 1.53 3.57H8.3z" />
                <path d="M12 6.75c1.27 0 2.44.43 3.35 1.33l3.67-3.67C17.07 4.22 14.59 3 12 3 9.07 3 6.05 4.42 4.53 6.06l3.67 3.67c.91-.9 2.08-1.33 3.35-1.33z" />
              </svg>
            </motion.button>

            {/* دکمه فیسبوک (یا هر سرویس دیگر) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-300"
              // onClick={handleFacebookLogin} // API فیسبوک را اینجا اضافه کنید
            >
              {/* آیکون فیسبوک (می‌توانید SVG واقعی را قرار دهید) */}
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.684 9.111 8.537 9.998V15H7v-3h3.537V8.5c0-3.256 2.064-5 4.949-5C15.493 3.5 17 4.01 17 4.01V7h-3c-2.054 0-2.949 1.216-2.949 2.718V12h4.617C19.764 12 22 11.568 22 12z"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
