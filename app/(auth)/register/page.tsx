import {
  Inter,
  Plus_Jakarta_Sans,
  Vazirmatn,
} from "next/font/google";

import RegisterForm from "../../../components/auth/register";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "ثبت‌نام",
};

export default function RegisterPage() {
  return (
    <div
      className={`
        ${vazirmatn.variable}
        ${plusJakartaSans.variable}
        ${inter.variable}
      `}
    >
      <RegisterForm />
    </div>
  );
}