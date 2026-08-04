"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || "U";
  return source.trim().slice(0, 1).toUpperCase();
}

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
        <div className="hidden h-4 w-20 animate-pulse rounded bg-white/10 sm:block" />
      </div>
    );
  }

  if (status !== "authenticated" || !session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
      >
        ورود / ثبت‌نام
      </Link>
    );
  }

  const user = session.user;
  const initials = getInitials(user.name, user.email);

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-bold text-cyan-200">
        {initials}
      </div>

      <div className="hidden text-right sm:block">
        <div className="max-w-36 truncate text-sm font-medium text-white">
          {user.name || user.username || user.email || "کاربر"}
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-xs text-red-300 transition hover:text-red-200"
        >
          خروج
        </button>
      </div>
    </div>
  );
}