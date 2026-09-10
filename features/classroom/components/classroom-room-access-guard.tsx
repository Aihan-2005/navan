"use client";

import Link from "next/link";

import {
  DoorOpen,
  LoaderCircle,
  LockKeyhole,
  Radio,
  RefreshCw,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  useClassroomRoomAccess,
} from "../hooks/use-classroom-active-room";

type ClassroomRoomAccessGuardProps =
  Readonly<{
    viewerId:
      string | null;

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
  viewerId,
  roomId,
  roomTitle,
  enabled = true,
  children,
}: ClassroomRoomAccessGuardProps) {
  const {
    status,
    blockingLease,
    retry,
  } =
    useClassroomRoomAccess({
      userId:
        viewerId,

      roomId,

      roomTitle,

      enabled:
        enabled &&
        Boolean(
          viewerId,
        ),
    });

  if (!enabled) {
    return children;
  }

  if (!viewerId) {
    const callbackUrl =
      `/classroom/rooms/${encodeURIComponent(
        roomId,
      )}`;

    return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-xl
          items-center
          justify-center
        "
      >
        <section
          className="
            w-full
            rounded-[24px]
            border
            border-[#E5D9C8]
            bg-[#FFFBF5]
            p-7
            text-center
            shadow-[0_10px_32px_rgba(15,23,42,0.05)]
          "
        >
          <span
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#FFF1E8]
              text-[#F97316]
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-6 w-6"
            />
          </span>

          <h1
            className="
              mt-5
              text-xl
              font-black
              text-[#172321]
            "
          >
            برای ورود به بحث آزاد وارد حساب شو
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-7
              text-[#6D7A77]
            "
          >
            حضور در اتاق، چت، دفترچه،
            میکروفون و دستیار هوشمند به
            حساب کاربری متصل هستند.
          </p>

          <Link
            href={`/login?callbackUrl=${encodeURIComponent(
              callbackUrl,
            )}`}
            className="
              mt-6
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              px-6
              text-sm
              font-black
              text-[#FFFFFF]
              transition
              hover:bg-[#005A52]
            "
          >
            ورود به حساب
          </Link>
        </section>
      </main>
    );
  }

  if (
    status ===
    "checking"
  ) {
    return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-xl
          items-center
          justify-center
        "
      >
        <section
          className="
            w-full
            rounded-[24px]
            border
            border-[#DCE7E5]
            bg-white
            p-8
            text-center
            shadow-[0_10px_32px_rgba(15,23,42,0.05)]
          "
        >
          <LoaderCircle
            aria-hidden="true"
            className="
              mx-auto
              h-8
              w-8
              animate-spin
              text-[#00685F]
            "
          />

          <h1
            className="
              mt-5
              text-lg
              font-black
              text-[#172321]
            "
          >
            در حال آماده‌سازی اتاق
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-[#6D7A77]
            "
          >
            وضعیت Session فعال این حساب
            بررسی می‌شود.
          </p>
        </section>
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
          max-w-2xl
          items-center
          justify-center
        "
      >
        <section
          className="
            w-full
            rounded-[24px]
            border
            border-[#F2D2A4]
            bg-[#FFFBF5]
            p-7
            shadow-[0_12px_36px_rgba(15,23,42,0.055)]
            sm:p-8
          "
        >
          <span
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#FFF1E8]
              text-[#F97316]
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-6 w-6"
            />
          </span>

          <h1
            className="
              mt-5
              text-2xl
              font-black
              text-[#172321]
            "
          >
            فقط یک اتاق می‌تواند فعال باشد
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-8
              text-[#6D7A77]
            "
          >
            {sameRoom
              ? "همین اتاق در یک تب یا پنجره دیگر فعال است. برای جلوگیری از چند Session هم‌زمان ورود دوم مسدود شده."
              : "در حال حاضر داخل یک اتاق دیگر هستی. ابتدا از جلسه فعلی خارج شو و بعد وارد این اتاق شو."}
          </p>

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-[#CDE4DF]
              bg-[#F1FAF8]
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#047857]
              "
            >
              <Radio
                aria-hidden="true"
                className="h-4 w-4"
              />

              جلسه فعال
            </div>

            <p
              dir="ltr"
              className="
                mt-2
                text-left
                text-base
                font-black
                text-[#172321]
              "
            >
              {blockingLease.roomTitle}
            </p>
          </div>

          <div
            className="
              mt-6
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
                bg-[#00685F]
                px-5
                text-sm
                font-black
                text-[#FFFFFF]
                transition
                hover:bg-[#005A52]
              "
            >
              <DoorOpen
                aria-hidden="true"
                className="h-4 w-4"
              />

              بازگشت به جلسه
            </Link>

            <button
              type="button"
              onClick={retry}
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D5DFDD]
                bg-white
                px-5
                text-sm
                font-bold
                text-[#52615F]
                transition
                hover:bg-[#F8FAF9]
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
                px-3
                text-sm
                font-medium
                text-[#64748B]
                transition
                hover:text-[#00685F]
              "
            >
              لیست اتاق‌ها
            </Link>
          </div>
        </section>
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