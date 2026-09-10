"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Bot,
  CalendarClock,
  Clock3,
  DoorOpen,
  Headphones,
  LockKeyhole,
  MessageCircleMore,
  Mic2,
  NotebookPen,
  Plus,
  Radio,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useSession,
} from "next-auth/react";

import {
  useState,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  useActiveClassroomRoom,
} from "../hooks/use-classroom-active-room";

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

const roomDateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

function formatNumber(
  value: number,
): string {
  return numberFormatter.format(
    value,
  );
}

function formatRoomDate(
  value: string | null,
): string | null {
  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null;
  }

  return roomDateFormatter.format(
    date,
  );
}

export function ClassroomOverview({
  data,
}: ClassroomOverviewProps) {
  const router =
    useRouter();

  const {
    data: session,
    status: sessionStatus,
  } =
    useSession();

  const userId =
    session?.user?.id ??
    session?.user?.email ??
    null;

  const {
    activeLease,
  } =
    useActiveClassroomRoom(
      userId,
    );

  const [
    inviteCode,
    setInviteCode,
  ] =
    useState("");

  const [
    joinError,
    setJoinError,
  ] =
    useState<string | null>(
      null,
    );

  const isSessionStateLoading =
    sessionStatus ===
    "loading";

  const hasActiveClass =
    Boolean(activeLease);

  function joinByCode(): void {
    const normalizedCode =
      inviteCode
        .trim();

    if (
      !normalizedCode ||
      isSessionStateLoading
    ) {
      return;
    }

    if (activeLease) {
      setJoinError(
        "در حال حاضر یک اتاق فعال داری. ابتدا از اتاق فعلی خارج شو.",
      );

      return;
    }

    setJoinError(null);

    router.push(
      `/classroom/rooms/${encodeURIComponent(
        normalizedCode,
      )}`,
    );
  }

  return (
    <main
      dir="rtl"
      aria-labelledby="classroom-title"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-8
        pb-12
        [font-family:var(--font-vazirmatn)]
      "
    >
      {activeLease ? (
        <ActiveRoomBanner
          roomId={
            activeLease.roomId
          }
          roomTitle={
            activeLease.roomTitle
          }
        />
      ) : null}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-[linear-gradient(105deg,#0D9488_0%,#00685F_100%)]
          px-6
          py-7
          shadow-[0_14px_36px_rgba(0,104,95,0.16)]
          sm:px-8
          sm:py-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-28
            h-72
            w-72
            rounded-full
            bg-[#5EEAD4]/20
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-28
            right-1/3
            h-72
            w-72
            rounded-full
            bg-[#99F6E4]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            grid
            gap-8
            xl:grid-cols-[minmax(0,1fr)_350px]
            xl:items-center
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
                border-[#FFFFFF33]
                bg-[#FFFFFF1A]
                px-3
                py-1.5
                text-xs
                font-bold
                text-[#F0FDFA]
              "
            >
              <Radio
                aria-hidden="true"
                className="h-4 w-4"
              />

              Free Discussion • Live
            </div>

            <h1
              id="classroom-title"
              className="
                mt-5
                max-w-3xl
                text-[30px]
                font-black
                leading-[1.4]
                tracking-[-0.025em]
                text-[#FFFFFF]
                sm:text-[38px]
              "
            >
              بحث آزاد آنلاین؛
              <span
                className="
                  mr-2
                  text-[#CCFBF1]
                "
              >
                واقعی صحبت کن
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-[680px]
                text-sm
                leading-8
                text-[#E6FFFB]
                sm:text-base
              "
            >
              با زبان‌آموزهای دیگر وارد
              گفت‌وگوی زنده شو، میکروفونت
              را روشن کن، یادداشت بردار و
              هر جا در ساخت جمله یا پاسخ
              دادن گیر کردی از دستیار
              هوشمند جلسه کمک بگیر.
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              <HeroFeature
                icon={Mic2}
                label="مکالمه زنده"
              />

              <HeroFeature
                icon={NotebookPen}
                label="دفترچه شخصی"
              />

              <HeroFeature
                icon={Bot}
                label="دستیار AI"
              />

              <HeroFeature
                icon={Sparkles}
                label="منابع مشترک"
              />
            </div>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              {activeLease ? (
                <Link
                  href={`/classroom/rooms/${encodeURIComponent(
                    activeLease.roomId,
                  )}`}
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#F97316]
                    px-6
                    text-sm
                    font-black
                    text-[#FFFFFF]
                    shadow-[0_8px_20px_rgba(194,65,12,0.24)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#EA580C]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFFFFF99]
                  "
                >
                  <DoorOpen
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  بازگشت به اتاق فعال
                </Link>
              ) : (
                <Link
                  href="/classroom/rooms/english-free-talk"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#F97316]
                    px-6
                    text-sm
                    font-black
                    text-[#FFFFFF]
                    shadow-[0_8px_20px_rgba(194,65,12,0.24)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#EA580C]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFFFFF99]
                  "
                >
                  <Mic2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  ورود به اتاق تمرینی
                </Link>
              )}

              <span
                className="
                  inline-flex
                  min-h-12
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#FFFFFF33]
                  bg-[#FFFFFF14]
                  px-4
                  text-xs
                  font-medium
                  text-[#E6FFFB]
                "
              >
                <LockKeyhole
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                هر حساب فقط یک اتاق هم‌زمان
              </span>
            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#FFFFFF55]
              bg-[#FFFFFFF2]
              p-5
              shadow-[0_16px_36px_rgba(0,68,62,0.16)]
              backdrop-blur
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E7F4F2]
                  text-[#00685F]
                "
              >
                <MessageCircleMore
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </span>

              <div>
                <h2
                  className="
                    text-sm
                    font-black
                    text-[#172321]
                  "
                >
                  پیوستن با کد دعوت
                </h2>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-[#6D7A77]
                  "
                >
                  کد اتاق دوستت را وارد کن
                </p>
              </div>
            </div>

            <div
              className="
                mt-5
                flex
                gap-2
              "
              dir="ltr"
            >
              <input
                type="text"
                value={inviteCode}
                disabled={
                  hasActiveClass ||
                  isSessionStateLoading
                }
                onChange={(event) => {
                  setInviteCode(
                    event.target.value,
                  );

                  setJoinError(null);
                }}
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    joinByCode();
                  }
                }}
                aria-label="کد دعوت اتاق"
                placeholder="FREE-EN-24"
                className="
                  h-11
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-[#CBD8D5]
                  bg-[#F8FAF9]
                  px-4
                  text-left
                  text-sm
                  font-medium
                  uppercase
                  text-[#172321]
                  outline-none
                  placeholder:text-[#94A3B8]
                  focus:border-[#0D9488]
                  focus:ring-2
                  focus:ring-[#14B8A6]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-45
                "
              />

              <button
                type="button"
                onClick={joinByCode}
                disabled={
                  !inviteCode.trim() ||
                  hasActiveClass ||
                  isSessionStateLoading
                }
                className="
                  inline-flex
                  h-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#00685F]
                  px-4
                  text-sm
                  font-bold
                  text-[#FFFFFF]
                  transition
                  hover:bg-[#005A52]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                ورود
              </button>
            </div>

            {joinError ? (
              <p
                role="alert"
                className="
                  mt-3
                  rounded-lg
                  bg-[#FFF7ED]
                  px-3
                  py-2
                  text-xs
                  leading-6
                  text-[#C2410C]
                "
              >
                {joinError}
              </p>
            ) : null}

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                gap-3
                rounded-xl
                bg-[#F0F7F5]
                px-3
                py-2.5
              "
            >
              <span
                className="
                  text-[10px]
                  text-[#6D7A77]
                "
              >
                کد تست فعلی
              </span>

              <code
                dir="ltr"
                className="
                  text-xs
                  font-black
                  tracking-wide
                  text-[#00685F]
                "
              >
                FREE-EN-24
              </code>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="آمار بحث آزاد"
        className="
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        <StatCard
          icon={Radio}
          label="اتاق زنده"
          value={
            data.stats.activeRooms
          }
          tone="teal"
        />

        <StatCard
          icon={UsersRound}
          label="زبان‌آموز آنلاین"
          value={
            data.stats.onlineLearners
          }
          tone="purple"
        />

        <StatCard
          icon={Headphones}
          label="جلسه این هفته"
          value={
            data.stats.sessionsThisWeek
          }
          tone="orange"
        />
      </section>

      <section
        aria-labelledby="live-rooms-title"
      >
        <div
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#0D9B69]
              "
            >
              <span
                className="
                  relative
                  flex
                  h-2.5
                  w-2.5
                "
              >
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[#10B981]
                    opacity-40
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#10B981]
                  "
                />
              </span>

              در حال برگزاری
            </div>

            <h2
              id="live-rooms-title"
              className="
                mt-2
                text-xl
                font-black
                text-[#191C1E]
                sm:text-2xl
              "
            >
              اتاق‌های فعال
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-7
                text-[#6D7A77]
              "
            >
              وارد یکی از گفت‌وگوهای در
              حال اجرا شو و مستقیم شروع به
              صحبت کن.
            </p>
          </div>
        </div>

        {data.liveRooms.length >
        0 ? (
          <div
            className="
              mt-5
              grid
              gap-5
              lg:grid-cols-2
            "
          >
            {data.liveRooms.map(
              (room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  activeRoomId={
                    activeLease?.roomId ??
                    null
                  }
                />
              ),
            )}
          </div>
        ) : (
          <EmptyRoomsState />
        )}
      </section>

      {data.upcomingRooms.length >
      0 ? (
        <section
          aria-labelledby="upcoming-rooms-title"
          className="
            rounded-2xl
            border
            border-[#E1E8E6]
            bg-[#FAFCFB]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                flex
                h-10
                w-10
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

            <div>
              <h2
                id="upcoming-rooms-title"
                className="
                  text-lg
                  font-black
                  text-[#191C1E]
                "
              >
                جلسه‌های آینده
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#6D7A77]
                "
              >
                اتاق‌هایی که برای زمان
                دیگری برنامه‌ریزی شده‌اند.
              </p>
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
            {data.upcomingRooms.map(
              (room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  activeRoomId={
                    activeLease?.roomId ??
                    null
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

function HeroFeature({
  icon: Icon,
  label,
}: Readonly<{
  icon: LucideIcon;
  label: string;
}>) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#FFFFFF30]
        bg-[#FFFFFF14]
        px-3
        py-1.5
        text-[11px]
        font-medium
        text-[#E6FFFB]
      "
    >
      <Icon
        aria-hidden="true"
        className="h-3.5 w-3.5"
      />

      {label}
    </span>
  );
}

function ActiveRoomBanner({
  roomId,
  roomTitle,
}: Readonly<{
  roomId: string;
  roomTitle: string;
}>) {
  return (
    <section
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-[#B9E5D2]
        bg-[#ECFDF5]
        p-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#D1FAE5]
            text-[#047857]
          "
        >
          <Radio
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <div>
          <p
            className="
              text-xs
              font-bold
              text-[#047857]
            "
          >
            یک اتاق برای حساب تو فعال است
          </p>

          <p
            dir="auto"
            className="
              mt-1
              text-base
              font-black
              text-[#172321]
            "
          >
            {roomTitle}
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-6
              text-[#5F706C]
            "
          >
            برای ورود به اتاق دیگری ابتدا
            باید از جلسه فعلی خارج شوی.
          </p>
        </div>
      </div>

      <Link
        href={`/classroom/rooms/${encodeURIComponent(
          roomId,
        )}`}
        className="
          inline-flex
          min-h-10
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#047857]
          px-4
          text-xs
          font-bold
          text-[#FFFFFF]
          transition
          hover:bg-[#036B4D]
        "
      >
        <DoorOpen
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به اتاق
      </Link>
    </section>
  );
}

type StatTone =
  | "teal"
  | "purple"
  | "orange";

const statToneClasses:
  Record<
    StatTone,
    Readonly<{
      surface: string;
      icon: string;
    }>
  > = {
  teal: {
    surface:
      "bg-[#E7F4F2]",
    icon:
      "text-[#00685F]",
  },

  purple: {
    surface:
      "bg-[#F4EFFF]",
    icon:
      "text-[#712AE2]",
  },

  orange: {
    surface:
      "bg-[#FFF1E8]",
    icon:
      "text-[#F97316]",
  },
};

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: Readonly<{
  icon: LucideIcon;
  label: string;
  value: number;
  tone: StatTone;
}>) {
  const style =
    statToneClasses[tone];

  return (
    <article
      className="
        rounded-2xl
        border
        border-[#DCE4E2]
        bg-[#FFFFFF]
        p-5
        shadow-[0_5px_18px_rgba(15,23,42,0.035)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-xs
              text-[#6D7A77]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-black
              text-[#191C1E]
            "
          >
            {formatNumber(value)}
          </p>
        </div>

        <span
          className={cn(
            "flex",
            "h-11",
            "w-11",
            "items-center",
            "justify-center",
            "rounded-xl",
            style.surface,
            style.icon,
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>
      </div>
    </article>
  );
}

function RoomCard({
  room,
  activeRoomId,
}: Readonly<{
  room:
    ClassroomRoomSummary;

  activeRoomId:
    string | null;
}>) {
  const isLive =
    room.status === "live";

  const isCurrentActiveRoom =
    isLive &&
    activeRoomId === room.id;

  const isBlockedByActiveRoom =
    isLive &&
    Boolean(activeRoomId) &&
    !isCurrentActiveRoom;

  const roomTime =
    formatRoomDate(
      isLive
        ? room.startedAt
        : room.scheduledFor,
    );

  return (
    <article
      className={cn(
        "group",
        "rounded-2xl",
        "border",
        "border-[#DCE4E2]",
        "bg-[#FFFFFF]",
        "p-5",
        "shadow-[0_5px_20px_rgba(15,23,42,0.035)]",
        "transition",
        "duration-200",

        isBlockedByActiveRoom
          ? "opacity-65"
          : [
              "hover:-translate-y-0.5",
              "hover:border-[#ABD4CE]",
              "hover:shadow-[0_10px_28px_rgba(15,23,42,0.065)]",
            ],
      )}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className={cn(
                "rounded-full",
                "px-2.5",
                "py-1",
                "text-[10px]",
                "font-bold",

                isLive
                  ? [
                      "bg-[#ECFDF5]",
                      "text-[#047857]",
                    ]
                  : [
                      "bg-[#F1F5F4]",
                      "text-[#64748B]",
                    ],
              )}
            >
              {isLive
                ? "زنده"
                : "زمان‌بندی‌شده"}
            </span>

            <span
              dir="ltr"
              className="
                rounded-full
                bg-[#F4EFFF]
                px-2.5
                py-1
                text-[10px]
                font-black
                text-[#712AE2]
              "
            >
              {room.cefrLevel}
            </span>

            {room.visibility ===
            "private" ? (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-[#FFF7ED]
                  px-2.5
                  py-1
                  text-[10px]
                  font-medium
                  text-[#C2410C]
                "
              >
                <LockKeyhole
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                خصوصی
              </span>
            ) : null}

            {isCurrentActiveRoom ? (
              <span
                className="
                  rounded-full
                  bg-[#E7F4F2]
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  text-[#00685F]
                "
              >
                اتاق فعال تو
              </span>
            ) : null}
          </div>

          <h3
            dir="auto"
            className="
              mt-4
              text-lg
              font-black
              leading-7
              text-[#191C1E]
            "
          >
            {room.title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              font-bold
              text-[#00685F]
            "
          >
            {room.topic}
          </p>
        </div>

        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#E7F4F2]
            text-[#00685F]
          "
        >
          <Mic2
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>
      </div>

      <p
        className="
          mt-4
          text-sm
          leading-7
          text-[#65726F]
        "
      >
        {room.description}
      </p>

      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-2
        "
      >
        {room.tags.map(
          (tag) => (
            <span
              key={tag}
              className="
                rounded-lg
                border
                border-[#E2E8E6]
                bg-[#F8FAF9]
                px-2.5
                py-1
                text-[10px]
                text-[#65726F]
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
          grid
          gap-2
          rounded-xl
          bg-[#F8FAF9]
          p-3
          sm:grid-cols-3
        "
      >
        <RoomMeta
          icon={UsersRound}
          text={`${formatNumber(
            room.participantCount,
          )}/${formatNumber(
            room.capacity,
          )} نفر`}
        />

        <RoomMeta
          icon={MessageCircleMore}
          text={`میزبان: ${room.hostName}`}
        />

        <RoomMeta
          icon={Clock3}
          text={
            roomTime ??
            (
              isLive
                ? "در حال برگزاری"
                : "زمان نامشخص"
            )
          }
        />
      </div>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3
          border-t
          border-[#E7ECEB]
          pt-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {isBlockedByActiveRoom ? (
          <span
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-medium
              text-[#C2410C]
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            ابتدا از اتاق فعلی خارج شو
          </span>
        ) : (
          <span
            className="
              text-[10px]
              text-[#7C8987]
            "
          >
            {isLive
              ? "می‌توانی همین الان وارد گفتگو شوی"
              : "برای مشاهده جزئیات جلسه وارد شو"}
          </span>
        )}

        {!isBlockedByActiveRoom ? (
          <Link
            href={`/classroom/rooms/${encodeURIComponent(
              room.id,
            )}`}
            className="
              inline-flex
              min-h-9
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#E7F4F2]
              px-3
              text-xs
              font-bold
              text-[#00685F]
              transition
              hover:bg-[#D4ECE8]
            "
          >
            {isCurrentActiveRoom
              ? "بازگشت به اتاق"
              : isLive
                ? "ورود به گفتگو"
                : "مشاهده جلسه"}

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function RoomMeta({
  icon: Icon,
  text,
}: Readonly<{
  icon: LucideIcon;
  text: string;
}>) {
  return (
    <span
      className="
        flex
        min-w-0
        items-center
        gap-2
        text-[10px]
        text-[#65726F]
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-3.5
          w-3.5
          shrink-0
          text-[#00685F]
        "
      />

      <span className="truncate">
        {text}
      </span>
    </span>
  );
}

function EmptyRoomsState() {
  return (
    <div
      className="
        mt-5
        rounded-2xl
        border
        border-dashed
        border-[#C9D5D2]
        bg-[#FAFCFB]
        px-5
        py-10
        text-center
      "
    >
      <MessageCircleMore
        aria-hidden="true"
        className="
          mx-auto
          h-7
          w-7
          text-[#94A3B8]
        "
      />

      <h3
        className="
          mt-3
          text-sm
          font-black
          text-[#334155]
        "
      >
        فعلاً اتاق زنده‌ای وجود ندارد
      </h3>

      <p
        className="
          mx-auto
          mt-2
          max-w-md
          text-xs
          leading-6
          text-[#7C8987]
        "
      >
        کمی بعد دوباره بررسی کن یا وارد
        اتاق تمرینی فعلی شو.
      </p>
    </div>
  );
}

 