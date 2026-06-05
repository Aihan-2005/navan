"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const isLoggedIn = true;
  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-500/40 animate-pulse" />
    );
  }
  const user = {
    name: "Nazanin",
    image: "/avatar-placeholder.png",
  };

  if (!isLoggedIn) {
    return (
      <button className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition">
        ورود
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <img
        src={user.image || "/avatar-placeholder.png"}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Name */}
      <div className="text-sm">
        <div>{user.name}</div>
        <button
          onClick={() => signOut()}
          className="text-xs text-red-400 hover:text-red-500"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
