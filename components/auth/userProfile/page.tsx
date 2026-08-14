"use client";

import Link from "next/link";

import {
  signOut,
  useSession,
} from "next-auth/react";

import {
  cn,
} from "../../../lib/utils/cn";

type UserProfileProps =
  Readonly<{
    appearance?:
      "light" | "dark";
  }>;

function getInitials(
  name?:
    string | null,

  email?:
    string | null,
): string {
  const source =
    name ||
    email ||
    "U"; return source
    .trim()
    .slice(0, 1)
    .toUpperCase();
}

export default function UserProfile({
  appearance = "dark",
}: UserProfileProps) {
  const {
    data: session,
    status,
  } =
    useSession();

  const isLight =
    appearance === "light";

  if (
    status === "loading"
  ) {
    return (
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className={cn(
            "h-9 w-9 animate-pulse rounded-full",

            isLight
              ? "bg-[#E2E8F0]"
              : "bg-white/10",
          )}
        />

        <div
          className={cn(
            "hidden h-4 w-20 animate-pulse rounded sm:block",

            isLight
              ? "bg-[#E2E8F0]"
              : "bg-white/10",
          )}
        />
      </div>
    );
  }

  if (
    status !==
      "authenticated" ||
    !session?.user
  ) {
    return (
      <Link
        href="/login"
        className={cn(
          "rounded-xl px-4 py-2 text-sm font-semibold transition",

          isLight
            ? [
                "bg-[#00685F]",
                "text-white",
                "hover:bg-[#00584F]",
              ]
            : [
                "bg-cyan-600",
                "text-white",
                "hover:bg-cyan-500",
              ],
        )}
      >
        ورود / ثبت‌نام
      </Link>
    );
  }

  const user =
    session.user;

  const initials = getInitials(
      user.name,
      user.email,
    );

  if (isLight) {
    return (
      <Link
        href="/profile"
        className="
          flex
          items-center
          gap-2.5
          rounded-xl
          px-1
          py-1
          transition
          hover:bg-[#F1F5F9]
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#191C1E]
            text-xs
            font-bold
            text-white
            shadow-sm
          "
        >
          {initials}
        </div>

        <div
          className="
            hidden
            min-w-0
            text-right
            sm:block
          "
        >
          <div
            className="
              max-w-32
              truncate
              text-xs
              font-semibold
              text-[#263330]
            "
          >
            {user.name ||
              user.username ||
              user.email ||
              "کاربر"}
          </div>

          <div
            dir="ltr"
            className="
              mt-0.5
              text-[9px]
              font-semibold
              tracking-wide
              text-[#D89B16]
            "
          >
            GOLD LEARNER
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-cyan-400/30
          bg-cyan-400/10
          text-sm
          font-bold
          text-cyan-200
        "
      >
        {initials}
      </div>

      <div
        className="
          hidden
          text-right
          sm:block
        "
      >
        <div
          className="
            max-w-36
            truncate
            text-sm
            font-medium
            text-white
          "
        >
          {user.name ||
            user.username ||
            user.email ||
            "کاربر"}
        </div>

        <button
          type="button"
          onClick={() => {
            void signOut({
              callbackUrl:
                "/login",
            });
          }}
          className="
            text-xs
            text-red-300
            transition
            hover:text-red-200
          "
        >
          خروج
        </button>
      </div>
    </div>
  );
}