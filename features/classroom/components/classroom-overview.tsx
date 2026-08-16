"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CalendarClock,
  Copy,
  Headphones,
  LockKeyhole,
  MessageCircleMore,
  Mic2,
  Plus,
  Radio,
  UsersRound,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  Card,
} from "../../../components/ui/card";

import type {
  ClassroomOverview as ClassroomOverviewData,
  ClassroomRoomSummary,
} from "../types/classroom.types";

type ClassroomOverviewProps =
  Readonly<{
    data:
      ClassroomOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function ClassroomOverview({
  data,
}: ClassroomOverviewProps) {
  const router =
    useRouter();

  const [
    inviteCode,
    setInviteCode,
  ] =
    useState("");

  function joinByCode(): void {
    const normalizedCode =
      inviteCode.trim();

    if (!normalizedCode) {
      return;
    }

    router.push(
 `/classroom/rooms/${encodeURIComponent(
        normalizedCode,
      )}`,
    );
  }

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-8
      "
      aria-labelledby="classroom-title"
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-violet-400/15
          bg-white/[0.035]
          p-6
          sm:p-8
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
            bg-violet-500/15
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-28
            right-20
            h-64
            w-64
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

         <div
          className="
            relative
            grid
            gap-8
            xl:grid-cols-[1fr_360px]
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-400/15
                bg-violet-400/[0.07]
                px-3
                py-1.5
                text-xs
                text-violet-200
              "
            >
              <MessageCircleMore
                aria-hidden="true"
                className="h-4 w-4"
              />

              گفت‌وگوی زنده با زبان‌آموزها
            </div>

            <h1
              id="classroom-title"
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                text-white
                sm:text-4xl
              "
            >
              اتاق گفتگو
            </h1>

             <p
              className="
                mt-4
                max-w-3xl
                text-sm
                leading-8
                text-slate-400
                sm:text-base
              "
            >
              اتاق بساز، دوستانت را دعوت کن و در یک فضای زنده با میکروفون، چت، یادداشت و منابع مشترک مکالمه تمرین کن.
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                href="/classroom/rooms/english-free-talk"
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
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
                <Plus
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                ساخت اتاق آزمایشی
              </Link>

              <span
                className="
                  inline-flex
                  min-h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.07]
bg-white/[0.025]
                  px-4
                  text-xs
                  text-slate-500
                "
              >
                <Radio
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    text-emerald-300
                  "
                />

                زیرساخت Real-time در مرحله بعد
              </span>
            </div>
          </div>

          <Card
            className="
              border-white/[0.07]
              bg-black/15
              p-5
            "
          >
            <h2
              className="
                text-sm
                font-bold
                text-white
              "
            >
              پیوستن با کد دعوت
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-slate-500
              "
            >
              کد اتاقی که دوستت برایت فرستاده وارد کن.
            </p>

            <div
              className="
                mt-4
                flex
                gap-2
              "
              dir="ltr"
            >
              <input
                                type="text"
value={
                  inviteCode
                }
                onChange={(
                  event,
                ) => {
                  setInviteCode(
                    event.target.value,
                  );
                }}
                onKeyDown={(
                  event,
                ) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    joinByCode();
                  }
                }}
                placeholder="FREE-EN-24"
                className="
                  h-11
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  px-4
                  text-left
                  text-sm
                  uppercase
                  text-white
                  outline-none
                  placeholder:text-slate-700
                  focus:border-violet-300/30
                  focus:ring-2
                  focus:ring-violet-400/10
                "
              />

              <button
                type="button"
                onClick={
                  joinByCode
                }
                disabled={
                  !inviteCode.trim()
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                                    rounded-xl
bg-white/[0.08]
                  px-4
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-white/[0.12]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                ورود
              </button>
            </div>

            <div
              className="
                mt-5
                rounded-xl
                border
                border-white/[0.05]
                bg-white/[0.02]
                p-3
                text-xs
                leading-6
                text-slate-600
              "
            >
              کد تست فعلی:{" "}
              <code
                dir="ltr"
                className="
                  text-violet-300
                "
              >
                FREE-EN-24
              </code>
            </div>
          </Card>
        </div>
      </section>

      <section
        className="
          grid
          gap-4
          md:grid-cols-3  "
      >
        <StatCard
          icon={
            Radio
          }
          label="اتاق زنده"
          value={
            data.stats.activeRooms
          }
        />

        <StatCard
          icon={
            UsersRound
          }
          label="زبان‌آموز آنلاین"
          value={
            data.stats.onlineLearners
          }
        />

        <StatCard
          icon={
            Headphones
          }
          label="جلسه این هفته"
          value={
            data.stats.sessionsThisWeek
          }
        />
      </section>

      <section>
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-emerald-300
              "
            >
              <Radio
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span className="text-xs">
                Live now
              </span>  </div>

            <h2
              className="
                mt-2
                text-xl
                font-bold
                text-white
              "
            >
              اتاق‌های فعال
            </h2>
          </div>
        </div>

        <div
          className="
            mt-5
            grid
            gap-5
            lg:grid-cols-2
          "
        >
          {data.liveRooms.map(
            (
              room,
            ) => (
              <RoomCard
                key={
                  room.id
                }
                room={
                  room
                }
              />
            ),
          )}
        </div>
      </section>

      {data.upcomingRooms.length >
      0 ? (
        <section><div
            className="
              flex
              items-center
              gap-2
              text-slate-500
            "
          >
            <CalendarClock
              aria-hidden="true"
              className="h-4 w-4"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              جلسه‌های آینده
            </h2>
          </div>

          <div
            className="
              mt-5
              grid
              gap-5
              lg:grid-cols-2
            "
          >
            {data.upcomingRooms.map(
              (
                room,
              ) => (
                <RoomCard
                  key={
                    room.id
                  }
                  room={
                    room
                  }
                />
              ),
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function StatCard({
  icon: Icon,
  label, value,
}: Readonly<{
  icon:
    typeof Radio;

  label:
    string;

  value:
    number;
}>) {
  return (
    <Card className="p-5">
      <Icon
        aria-hidden="true"
        className="
          h-5
          w-5
          text-violet-300
        "
      />

      <p
        className="
          mt-4
          text-xs
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-2xl
          font-bold
          text-white
        "
      >
        {numberFormatter.format(
          value,
        )}
      </p>
    </Card>
  );
}


function RoomCard({
  room,
}: Readonly<{
  room:
    ClassroomRoomSummary;
}>) {
  const isLive =
    room.status ===
    "live";

  return (
    <Card
      className="
        group
        p-5
        transition
        hover:border-violet-400/15
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className={
                isLive
                  ? "rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300"
                  : "rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-slate-400"
              }
            >
              {isLive
                ? "زنده"
                : "زمان‌بندی‌شده"}
            </span>

            <span
              className="
                rounded-full
                bg-violet-400/10
                px-2.5
                py-1
                text-[10px]
                text-violet-300
              "
              dir="ltr"
            >
                 {room.cefrLevel}
            </span>

            {room.visibility ===
            "private" ? (
              <LockKeyhole
                aria-label="اتاق خصوصی"
                className="
                  h-3.5
                  w-3.5
                  text-slate-500
                "
              />
            ) : null}
          </div>

          <h3
            dir="ltr"
            className="
              mt-4
              text-left
              text-lg
              font-bold
              text-white
            "
          >
            {room.title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-violet-200
            "
          >
            {room.topic}
          </p>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-violet-400/10
            text-violet-300
          "
        >
          <Mic2
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>

      <p
        className="
          mt-4
          text-sm
          leading-7
          text-slate-500
        "
      >
        {room.description}
      </p>

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        {room.tags.map(
          (
            tag,
          ) => (
            <span
              key={
                tag
              }
              className="
                rounded-lg
                border
                border-white/[0.05]
                bg-white/[0.025]
                px-2.5
                py-1
                text-[10px]
                text-slate-500
              "
            >
              {tag}
            </span>
          ),
        )}
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-4
     border-t
          border-white/[0.05]
          pt-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-slate-500
          "
        >
          <UsersRound
            aria-hidden="true"
            className="h-4 w-4"
          />

          {numberFormatter.format(
            room.participantCount,
          )}
          /
          {numberFormatter.format(
            room.capacity,
          )}
        </div>

        <Link
          href={`/classroom/rooms/${room.id}`}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-violet-300
            transition
            group-hover:text-violet-200
          "
        >
          {isLive
            ? "ورود به اتاق"
            : "مشاهده جلسه"}

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </Card>  );
}