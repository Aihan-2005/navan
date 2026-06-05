"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../../../components/auth/login"), {
  ssr: false,
  loading: () => <p>Loading Login form...</p>,
});

export default function Page() {
  return (
    <div className="flex items-center justify-center sm:min-h-screen bg-gray-900">
      <LoginForm />
    </div>
  );
}
