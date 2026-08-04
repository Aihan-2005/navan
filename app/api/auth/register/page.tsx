"use client";

import dynamic from "next/dynamic";

const RegisterForm = dynamic(
  () => import("../../../../components/auth/register"),
  {
    ssr: false,
    loading: () => <p>Loading Register form...</p>,
  },
);

export default function Page() {
  return <RegisterForm />;
}
