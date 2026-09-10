import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  CalendarClock,
  Clock3,
  UsersRound,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  ClassroomLiveRoom,
  ClassroomRoomAccessGuard,
  getClassroomRoom,
} from "../../../../../features/classroom";

import type {
  ClassroomRoom,
} from "../../../../../features/classroom";

import {
  getOptionalSession,
} from "../../../../../lib/auth/get-optional-session";

type ClassroomRoomPageProps =
  Readonly<{
    params:
      Promise<{
        roomId:
          string;
      }>;
  }>;

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      weekday:
        "long",

      day:
        "numeric",

      month:
        "long",

      hour:
        "2-digit",

      minute:
        "2-digit",
    },
  );

export async function generateMetadata({
  params,
}: ClassroomRoomPageProps): Promise<Metadata> {
  const {
    roomId,
  } =
    await params;

  const room =
    await getClassroomRoom(
      roomId,
    );

  if (!room) {
    return {
      title:
        "اتاق پیدا نشد",
    };
  }

  return {
    title:
      `${room.title} | بحث آزاد`,

    description:
      room.description,
  };
}

export default async function ClassroomRoomPage({
  params,
}: ClassroomRoomPageProps) {
  const {
    roomId,
  } =
    await params;

  const [
    room,
    session,
  ] =
    await Promise.all([
      getClassroomRoom(
        roomId,
      ),

      getOptionalSession(),
    ]);

  if (!room) {
    notFound();
  }

  if (
    room.status ===
    "scheduled"
  ) {
    return (
      <ScheduledRoomView
        room={room}
      />
    );
  }

  const viewerId =
    session?.user?.id ??
    session?.user?.email ??
    null;

  const viewerName =
    session?.user?.name ??
    session?.user?.email ??
    "زبان‌آموز";

  return (
    <ClassroomRoomAccessGuard
      viewerId={viewerId}
      roomId={room.id}
      roomTitle={
        room.title
      }
    >
      <ClassroomLiveRoom
        room={room}
        viewer={
          viewerId
            ? {
                id:
                  viewerId,

                name:
                  viewerName,
              }
            : null
        }
      />
    </ClassroomRoomAccessGuard>
  );
}

function ScheduledRoomView({
  room,
}: Readonly<{
  room: ClassroomRoom;
}>) {
  if (!room) {
    return null;
  }

  const scheduledDate =
    room.scheduledFor
      ? dateFormatter.format(
          new Date(
            room.scheduledFor,
          ),
        )
      : "زمان دقیق اعلام نشده";

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-3xl
        pb-12
      "
    >
      <section
        className="
          rounded-[28px]
          border
          border-[#DCE7E5]
          bg-white
          p-6
          shadow-[0_12px_36px_rgba(15,23,42,0.05)]
          sm:p-8
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#F4EFFF]
            text-[#712AE2]
          "
        >
          <CalendarClock
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <p
          className="
            mt-5
            text-xs
            font-black
            text-[#712AE2]
          "
        >
          جلسه آینده
        </p>

        <h1
          dir="ltr"
          className="
            mt-2
            text-left
            text-2xl
            font-black
            text-[#172321]
          "
        >
          {room.title}
        </h1>

        <p
          className="
            mt-2
            font-bold
            text-[#00685F]
          "
        >
          {room.topic}
        </p>

        <p
          className="
            mt-4
            text-sm
            leading-8
            text-[#64748B]
          "
        >
          {room.description}
        </p>

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
          "
        >
          <div
            className="
              rounded-xl
              bg-[#F8FAF9]
              p-4
            "
          >
            <Clock3
              aria-hidden="true"
              className="
                h-4
                w-4
                text-[#00685F]
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-[#64748B]
              "
            >
              زمان برگزاری
            </p>

            <p
              className="
                mt-1
                text-sm
                font-black
                text-[#172321]
              "
            >
              {scheduledDate}
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-[#F8FAF9]
              p-4
            "
          >
            <UsersRound
              aria-hidden="true"
              className="
                h-4
                w-4
                text-[#712AE2]
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-[#64748B]
              "
            >
              ظرفیت
            </p>

            <p
              className="
                mt-1
                text-sm
                font-black
                text-[#172321]
              "
            >
              {room.participantCount}
              {" / "}
              {room.capacity}
              {" نفر"}
            </p>
          </div>
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
            href="/classroom"
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              px-5
              text-sm
              font-black
              text-[#FFFFFF]
            "
          >
            بازگشت به بحث آزاد
          </Link>
        </div>
      </section>
    </main>
  );
}