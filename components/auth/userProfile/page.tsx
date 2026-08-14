"use client";

import Link from "next/link";
import {
  signOut,
  useSession,
} from "next-auth/react";

type UserProfileAppearance =
  | "dark"
  | "light";

type UserProfileProps = Readonly<{
  appearance?: UserProfileAppearance;
}>;

function getInitials(
  name?: string | null,
  email?: string | null,
): string {
  const source =
    name || email || "U";

  return source
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
  } = useSession();

  if (status === "loading") {
    return (
      <div
        className="
          flex items-center gap-3
        "
      >
        <div
          className={`
            h-10 w-10 animate-pulse
            rounded-full
            ${ appearance === "light"
                ? "bg-[#DDE5E4]"
                : "bg-white/10"
            }
          `}
        />

        <div
          className={`
            hidden h-4 w-20
            animate-pulse rounded
            sm:block
            ${
              appearance === "light"
                ? "bg-[#DDE5E4]"
                : "bg-white/10"
            }
          `}
        />
      </div>
    );
  }

  if (
    status !== "authenticated" ||
    !session?.user
  ) {
    return (
      <Link
        href="/login"
        className={`
          rounded-xl px-4 py-2
          text-sm font-semibold
          transition
          ${
            appearance === "light"
              ? `
                bg-[#00897F]
                text-white
                hover:bg-[#00776E]
              `
              : `
                bg-cyan-600
                text-white
                hover:bg-cyan-500
              `
          }
        `}
      >
        ورود / ثبت‌نام
      </Link>
    );  }

  const user = session.user;

  const initials = getInitials(
    user.name,
    user.email,
  );

  if (appearance === "light") {
    return (
      <div
        className="
          flex items-center gap-2.5
          [font-family:var(--font-vazirmatn)]
        "
        dir="ltr"
      >
        <div
          className="
            flex h-10 w-10
            shrink-0 items-center
            justify-center
            rounded-full
            border border-[#CBD7D5]
            bg-[#E4F1EF]
            text-sm font-bold
            text-[#00685F]
          "
        >
          {initials}
        </div>

        <div
          className="
            hidden min-w-0
            text-left sm:block
          "
        >
          <div
            className="
              max-w-36 truncate
              text-sm font-medium
              text-[#191C1E]
            "
          >
            {user.name ||
              user.username ||
              user.email ||"کاربر"}
          </div>

          <button
            type="button"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="
              mt-0.5 block
              text-[10px]
              font-medium
              uppercase
              tracking-[0.05em]
              text-[#B28300]
              transition
              hover:text-[#8A6500]
            "
          >
            خروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex items-center gap-3
      "
    >
      <div
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-cyan-400/30
          bg-cyan-400/10
          text-sm font-bold
          text-cyan-200
        "
      >
        {initials}
      </div>

      <div
        className="hidden text-right
          sm:block
        "
      >
        <div
          className="
            max-w-36 truncate
            text-sm font-medium
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
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="
            text-xs text-red-300
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