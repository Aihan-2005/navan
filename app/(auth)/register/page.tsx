import type {
  Metadata,
} from "next";

import RegisterForm from "../../../components/auth/register";

export const metadata: Metadata = {
  title:
    "ثبت‌نام",

  description:
    "ساخت حساب کاربری Navan AI",
};

export default function RegisterPage() {
  return (
    <RegisterForm />
  );
}