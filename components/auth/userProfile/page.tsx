"use client";

import Link from "next/link";

import {
  Award,
} from "lucide-react";

import {
  signOut,
  useSession,
} from "next-auth/react";

type UserProfileAppearance =
  | "dark"
  | "light";

type UserProfileProps =
  Readonly<{
    appearance?:
      UserProfileAppearance;
  }>;

function getInitials(
  name?: string | null,
  email?: string | null,
): string {
  const source =
    name ||
    email ||
    "U";

  return source
    .trim()
    .slice(0, 1)
    .toUpperCase();
}


function LightProfileSkeleton() {
  return (
    <div
      className="
        flex
        h-[47.5px]
        w-[181.3667px]
        items-center
        gap-3
      "
    >
      <div
        className="
          h-10
          w-10
          shrink-0
          animate-pulse
          rounded-full
          border-2
          border-[#E0E3E5]
          bg-[#EDF1F2]
        "
      />

      <div
        className="
          flex
          h-[47.5px]
          w-[129.3667px]
          flex-col
          justify-center
          gap-0
        "
      >
        <div
          className="
            h-4
            w-20
            animate-pulse
            rounded
            bg-[#E0E3E5]
          "
        />

        <div
          className="
            mt-1
            h-3
            w-24
            animate-pulse
            rounded
            bg-[#EEE7C9]
          "
        />
      </div>
    </div>
  );
}

export default function UserProfile({
  appearance = "dark",
}: UserProfileProps) {
  const {
    data: session,
    status,
  } = useSession();

  if (
    status === "loading"
  ) {
    if (
      appearance ===
      "light"
    ) {
      return (
        <LightProfileSkeleton />
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
            h-10
            w-10
            animate-pulse
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            hidden
            h-4
            w-20
            animate-pulse
            rounded
            bg-white/10

            sm:block
          "
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
        className={`
          inline-flex
          h-10
          items-center
          justify-center
          rounded-lg
          px-4
          text-sm
          font-semibold

          ${
            appearance ===
            "light"
              ? `
                bg-[#0D9488]
                text-white
                hover:bg-[#0F766E]
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
    );
  }

  const user =
    session.user;

  const initials =
    getInitials(
      user.name,
      user.email,
    );

    

  if (
    appearance ===
    "light"
  ) {
    return (
      <Link
        href="/profile"
        dir="ltr"
        className="
          flex
          h-[47.5px]
          w-[181.3667px]
          items-center
          gap-3
          rounded-lg

          transition-opacity

          hover:opacity-80

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#14B8A6]/25
        "
      >


        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border-2
            border-[#E0E3E5]
            bg-[#EAF4F2]
            text-sm
            font-bold
            text-[#00685F]
          "
        >
          {user.image ? (
            <img
              src={
                user.image
              }
              alt={
                user.name ??
                "تصویر کاربر"
              }
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            initials
          )}
        </div>



        <div
          dir="ltr"
          className="
            flex
            h-[47.5px]
            w-[129.3667px]
            min-w-0
            flex-col
            justify-center
          "
        >
          <div
            className="
              h-6
              truncate
              text-left
              text-base
              font-normal
              leading-6
              text-[#191C1E]
            "
          >
            {user.name ||
              user.username ||
              user.email ||
              "کاربر"}
          </div>

          <div
            className="
              flex
              h-6
              items-center
              gap-1
              overflow-hidden
            "
          >
            <span
              className="
                whitespace-nowrap
                text-base
                font-normal
                leading-6
                text-[#D4AF37]
              "
            >
              GOLD LEARNER
            </span>

            <Award
              aria-hidden="true"
              className="
                h-3
                w-3
                shrink-0
                text-[#D4AF37]
              "
              strokeWidth={1.8}
            />
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
          overflow-hidden
          rounded-full
          border
          border-cyan-400/30
          bg-cyan-400/10
          text-sm
          font-bold
          text-cyan-200
        "
      >
        {user.image ? (
          <img
            src={
              user.image
            }
            alt={
              user.name ??
              "تصویر کاربر"
            }
            className="
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          initials
        )}
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
          onClick={() =>
            signOut({
              callbackUrl:
                "/login",
            })
          }
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