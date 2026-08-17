"use client";

import Link from "next/link";

import {
  DoorOpen,
  LoaderCircle,
  LockKeyhole,
  Radio,
  RefreshCw,
} from "lucide-react";

import {
  useSession,
} from "next-auth/react";

import type {
  ReactNode,
} from "react";

import {
  Card,
} from "../../../components/ui/card";

import {
  useClassroomRoomAccess,
} from "../hooks/use-classroom-active-room";

type ClassroomRoomAccessGuardProps =
  Readonly<{
    roomId:
      string;

    roomTitle:
      string;

    enabled?:
      boolean;

    children:
      ReactNode;
  }>;

export function ClassroomRoomAccessGuard({
  roomId,
  roomTitle,
  enabled =
    true,
  children,}: ClassroomRoomAccessGuardProps) {
  const {
    data:
      session,

    status:
      sessionStatus,
  } =
    useSession();

  const userId =
    session?.user?.id ??
    session?.user?.email ??
    null;

  const {
    status,
    blockingLease,
    retry,
  } =
    useClassroomRoomAccess({
      userId,

      roomId,

      roomTitle,

      enabled:
        enabled &&
        sessionStatus ===
          "authenticated",
    });

  if (
    !enabled
  ) {
    return children;
  }

  if (
    sessionStatus ===
      "loading" ||
    (
      sessionStatus ===
        "authenticated" &&
      status ===
        "checking"
    )
  ) {return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-3xl
          items-center
          justify-center
        "
      >
        <Card
          className="
            w-full
            p-8
            text-center
          "
        >
          <LoaderCircle
            aria-hidden="true"
            className="
              mx-auto
              h-7
              w-7
              animate-spin
              text-violet-300
            "
          />

          <h1
            className="
              mt-5
              text-lg
              font-bold
              text-white
            "
          >
            در حال بررسی وضعیت کلاس
          </h1>

          <p
            className="
              mt-2
              text-sm
     leading-7
              text-slate-500
            "
          >
            بررسی می‌کنیم که Session فعال دیگری برای این حساب وجود نداشته باشد.
          </p>
        </Card>
      </main>
    );
  }

  if (
    sessionStatus !==
      "authenticated" ||
    !userId
  ) {
    return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-3xl
          items-center
          justify-center
        "
      >
        <Card
          className="
            w-full
            p-8
            text-center
          "
        >
          <LockKeyhole
            aria-hidden="true"
            className="
              mx-auto
              h-8
              w-8
              text-amber-300
            "
          />

           <h1
            className="
              mt-5
              text-xl
              font-bold
              text-white
            "
          >
            برای ورود به کلاس باید وارد حساب شوید
          </h1>

          <Link
            href="/login"
            className="
              mt-6
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              bg-violet-400
              px-5
              text-sm
              font-bold
              text-slate-950
              transition
              hover:bg-violet-300
            "
          >
            ورود به حساب
          </Link>
        </Card>
      </main>
    );
  }

  if (
    status ===
      "blocked" &&
    blockingLease
  ) {
    const sameRoom =
      blockingLease.roomId ===
      roomId;

    return (
      <main
        className="
           mx-auto
          flex
          min-h-[65vh]
          w-full
          max-w-3xl
          items-center
          justify-center
        "
      >
        <Card
          className="
            relative
            w-full
            overflow-hidden
            border-amber-400/15
            p-7
            sm:p-9
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-amber-400/[0.07]
              blur-3xl
            "
          />

          <div className="relative">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-amber-300/15
                bg-amber-400/[0.07]
                text-amber-300
              "
            >
                 <LockKeyhole
                aria-hidden="true"
                className="h-6 w-6"
              />
            </div>

            <h1
              className="
                mt-6
                text-2xl
                font-bold
                text-white
              "
            >
              فقط یک کلاس می‌تواند هم‌زمان فعال باشد
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-8
                text-slate-400
              "
            >
              {sameRoom
                ? "همین کلاس برای حساب شما در یک پنجره یا تب دیگر فعال است. برای جلوگیری از ایجاد چند Session هم‌زمان، ورود دوم مسدود شده است."
                : "حساب شما در حال حاضر داخل یک کلاس دیگر حضور دارد. ابتدا باید از کلاس فعال خارج شوید و بعد وارد کلاس جدید شوید."}
            </p>

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2text-xs
                  text-emerald-300
                "
              >
                <Radio
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                کلاس فعال
              </div>

              <p
                dir="ltr"
                className="
                  mt-2
                  text-left
                  text-lg
                  font-bold
                  text-white
                "
              >
                {
                  blockingLease.roomTitle
                }
              </p>
            </div>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                href={`/classroom/rooms/${encodeURIComponent(
                  blockingLease.roomId,
                )}`}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-violet-400
                  px-5text-sm
                  font-bold
                  text-slate-950
                  transition
                  hover:bg-violet-300
                "
              >
                <DoorOpen
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                بازگشت به کلاس فعال
              </Link>

              <button
                type="button"
                onClick={
                  retry
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-5
                  text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <RefreshCw
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                بررسی دوباره
              </button>

              <Link
                 href="/classroom"
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-xl
                  px-4
                  text-sm
                  text-slate-500
                  transition
                  hover:text-white
                "
              >
                بازگشت به لیست کلاس‌ها
              </Link>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  if (
    status !==
    "granted"
  ) {
    return null;
  }

  return children;
}