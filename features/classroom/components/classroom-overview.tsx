"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Bot,
  CalendarClock,
  Clock3,
  FileText,
  Headphones,
  LockKeyhole,
  MessageCircleMore,
  Mic2,
  NotebookPen,
  Paperclip,
  Radio,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

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
    data: ClassroomOverviewData;
    viewerId: string | null;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const roomDateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      weekday:
        "short",

      hour:
        "2-digit",

      minute:
        "2-digit",
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

function buildLoginHref(
  callbackUrl: string,
): string {
  return `/login?callbackUrl=${encodeURIComponent(
    callbackUrl,
  )}`;
}

export function ClassroomOverview({
  data,
  viewerId,
}: ClassroomOverviewProps) {
  const router =
    useRouter();

  const {
    activeLease,
  } =
    useActiveClassroomRoom(
      viewerId,
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

  const primaryLiveRoom =
    data.liveRooms[0] ??
    null;

  function joinByCode(): void {
    const normalizedCode =
      inviteCode.trim();

    if (!normalizedCode) {
      return;
    }

    const destination =
      `/classroom/rooms/${encodeURIComponent(
        normalizedCode,
      )}`;

    if (!viewerId) {
      router.push(
        buildLoginHref(
          destination,
        ),
      );

      return;
    }

    if (activeLease) {
      setJoinError(
        "در حال حاضر داخل یک اتاق فعال هستی. ابتدا از همان جلسه خارج شو.",
      );

      return;
    }

    setJoinError(null);

    router.push(
      destination,
    );
  }

  const primaryRoomHref =
    primaryLiveRoom
      ? `/classroom/rooms/${encodeURIComponent(
          primaryLiveRoom.id,
        )}`
      : "/classroom";

  return (
    <main
      dir="rtl"
      aria-labelledby="classroom-title"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-8
        pb-14
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
          bg-[linear-gradient(120deg,#0D9488_0%,#00685F_62%,#075E57_100%)]
          px-6
          py-8
          shadow-[0_18px_48px_rgba(0,104,95,0.18)]
          sm:px-8
          lg:px-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-24
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
            -bottom-32
            right-1/3
            h-80
            w-80
            rounded-full
            bg-[#CCFBF1]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_330px]
            lg:items-center
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
                border-[#FFFFFF38]
                bg-[#FFFFFF18]
                px-3
                py-1.5
                text-xs
                font-black
                text-[#F0FDFA]
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
                    bg-[#6EE7B7]
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#6EE7B7]
                  "
                />
              </span>

              Free Discussion • Live
            </div>

            <h1
              id="classroom-title"
              className="
                mt-5
                max-w-3xl
                text-3xl
                font-black
                leading-[1.45]
                tracking-[-0.025em]
                text-[#FFFFFF]
                sm:text-[40px]
              "
            >
              انگلیسی را فقط تمرین نکن؛
              <span
                className="
                  mr-2
                  text-[#CCFBF1]
                "
              >
                واقعاً صحبت کن
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
              وارد اتاق‌های گفت‌وگوی زنده
              شو، با زبان‌آموزهای دیگر
              صحبت کن و هنگام مکالمه از
              دفترچه شخصی، چت، منابع مشترک
              و دستیار هوشمند Navan استفاده
              کن.
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
                label="گفت‌وگوی زنده"
              />

              <HeroFeature
                icon={NotebookPen}
                label="دفترچه شخصی"
              />

              <HeroFeature
                icon={Bot}
                label="دستیار هوشمند"
              />

              <HeroFeature
                icon={Paperclip}
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
                    shadow-[0_10px_24px_rgba(194,65,12,0.28)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#EA580C]
                  "
                >
                  <Radio
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  بازگشت به جلسه
                </Link>
              ) : primaryLiveRoom ? (
                <Link
                  href={
                    viewerId
                      ? primaryRoomHref
                      : buildLoginHref(
                          primaryRoomHref,
                        )
                  }
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
                    shadow-[0_10px_24px_rgba(194,65,12,0.28)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#EA580C]
                  "
                >
                  <Mic2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  شروع بحث آزاد

                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              ) : null}

              <span
                className="
                  inline-flex
                  min-h-12
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#FFFFFF38]
                  bg-[#FFFFFF14]
                  px-4
                  text-xs
                  font-medium
                  text-[#E6FFFB]
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                یک اتاق فعال برای هر حساب
              </span>
            </div>
          </div>

          <InviteCard
            inviteCode={
              inviteCode
            }
            errorMessage={
              joinError
            }
            hasActiveRoom={
              Boolean(
                activeLease,
              )
            }
            onInviteCodeChange={(
              value,
            ) => {
              setInviteCode(
                value,
              );

              setJoinError(
                null,
              );
            }}
            onJoin={
              joinByCode
            }
          />
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
        aria-labelledby="room-tools-title"
      >
        <div>
          <p
            className="
              text-xs
              font-black
              text-[#00685F]
            "
          >
            ابزارهای داخل جلسه
          </p>

          <h2
            id="room-tools-title"
            className="
              mt-2
              text-2xl
              font-black
              text-[#172321]
            "
          >
            وسط مکالمه تنها نیستی
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#6D7A77]
            "
          >
            ابزارهای کمک آموزشی طوری طراحی
            شده‌اند که بدون قطع کردن جریان
            گفتگو به کمکت بیایند.
          </p>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <ToolCard
            icon={MessageCircleMore}
            title="چت جلسه"
            description="عبارت، لینک یا پیام کوتاه را بدون قطع مکالمه با اعضا به اشتراک بگذار."
            tone="teal"
          />

          <ToolCard
            icon={NotebookPen}
            title="دفترچه شخصی"
            description="واژه‌های جدید، اشتباه‌ها و جمله‌هایی که باید دوباره تمرین کنی را ذخیره کن."
            tone="orange"
          />

          <ToolCard
            icon={Bot}
            title="دستیار AI"
            description="برای ساخت جواب، اصلاح جمله، توضیح گرامر یا پیدا کردن واژه کمک بگیر."
            tone="purple"
          />

          <ToolCard
            icon={FileText}
            title="منابع مشترک"
            description="متن، لینک، فایل و منابع مربوط به موضوع جلسه را در یک بخش نگه دار."
            tone="blue"
          />
        </div>
      </section>

      <section
        aria-labelledby="live-rooms-title"
      >
        <SectionHeading
          eyebrow="همین الان"
          title="اتاق‌های فعال"
          description="یک اتاق متناسب با سطح یا موضوعت انتخاب کن و وارد گفتگو شو."
          live
        />

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
                  viewerId={
                    viewerId
                  }
                  activeRoomId={
                    activeLease
                      ?.roomId ??
                    null
                  }
                />
              ),
            )}
          </div>
        ) : (
          <EmptyLiveRooms />
        )}
      </section>

      {data.upcomingRooms.length >
      0 ? (
        <section
          aria-labelledby="upcoming-rooms-title"
        >
          <SectionHeading
            eyebrow="برنامه جلسات"
            title="جلسه‌های آینده"
            description="موضوع جلسه را از قبل ببین و برای شرکت در گفتگو آماده شو."
          />

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
                  viewerId={
                    viewerId
                  }
                  activeRoomId={
                    activeLease
                      ?.roomId ??
                    null
                  }
                />
              ),
            )}
          </div>
        </section>
      ) : null}

      <section
        className="
          rounded-[24px]
          border
          border-[#DCE7E5]
          bg-[#F8FBFA]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >
          <HowItWorksStep
            number="۱"
            title="اتاقت را انتخاب کن"
            description="بر اساس سطح، موضوع و تعداد افراد یک اتاق مناسب پیدا کن."
          />

          <HowItWorksStep
            number="۲"
            title="وارد گفتگو شو"
            description="میکروفون، چت و موضوع پیشنهادی را آماده کن و شروع به صحبت کن."
          />

          <HowItWorksStep
            number="۳"
            title="یادگیری را ثبت کن"
            description="نکات مهم را در دفترچه نگه دار و برای چالش‌ها از دستیار AI کمک بگیر."
          />
        </div>
      </section>
    </main>
  );
}

function InviteCard({
  inviteCode,
  errorMessage,
  hasActiveRoom,
  onInviteCodeChange,
  onJoin,
}: Readonly<{
  inviteCode: string;
  errorMessage: string | null;
  hasActiveRoom: boolean;
  onInviteCodeChange: (
    value: string,
  ) => void;
  onJoin: () => void;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#FFFFFF66]
        bg-[#FFFFFFF2]
        p-5
        shadow-[0_18px_45px_rgba(0,65,59,0.18)]
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
            کد دعوت داری؟
          </h2>

          <p
            className="
              mt-1
              text-[10px]
              text-[#6D7A77]
            "
          >
            مستقیم وارد اتاق دوستت شو
          </p>
        </div>
      </div>

      <div
        dir="ltr"
        className="
          mt-5
          flex
          gap-2
        "
      >
        <input
          type="text"
          value={inviteCode}
          onChange={(event) => {
            onInviteCodeChange(
              event.target.value,
            );
          }}
          onKeyDown={(event) => {
            if (
              event.key === "Enter"
            ) {
              onJoin();
            }
          }}
          placeholder="FREE-EN-24"
          aria-label="کد دعوت اتاق"
          className="
            h-11
            min-w-0
            flex-1
            rounded-xl
            border
            border-[#CAD8D5]
            bg-[#F8FAF9]
            px-3
            text-left
            text-sm
            font-bold
            uppercase
            text-[#172321]
            outline-none
            placeholder:text-[#94A3B8]
            focus:border-[#0D9488]
            focus:ring-2
            focus:ring-[#14B8A6]/15
          "
        />

        <button
          type="button"
          onClick={onJoin}
          disabled={
            !inviteCode.trim() ||
            hasActiveRoom
          }
          className="
            h-11
            shrink-0
            rounded-xl
            bg-[#00685F]
            px-4
            text-xs
            font-black
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

      {errorMessage ? (
        <p
          role="alert"
          className="
            mt-3
            rounded-xl
            bg-[#FFF7ED]
            px-3
            py-2
            text-xs
            leading-6
            text-[#C2410C]
          "
        >
          {errorMessage}
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
          کد نمونه
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
        border-[#FFFFFF32]
        bg-[#FFFFFF15]
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
              font-black
              text-[#047857]
            "
          >
            جلسه فعال
          </p>

          <p
            dir="auto"
            className="
              mt-1
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
              text-[#64748B]
            "
          >
            برای ورود به اتاق دیگر ابتدا
            از این جلسه خارج شو.
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
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#047857]
          px-4
          text-xs
          font-black
          text-[#FFFFFF]
          transition
          hover:bg-[#036B4D]
        "
      >
        برگشت به جلسه

        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4"
        />
      </Link>
    </section>
  );
}

type StatTone =
  | "teal"
  | "purple"
  | "orange";

const statStyles:
  Record<
    StatTone,
    Readonly<{
      surface: string;
      icon: string;
      border: string;
    }>
  > = {
  teal: {
    surface:
      "bg-[#E7F4F2]",

    icon:
      "text-[#00685F]",

    border:
      "border-r-[#00685F]",
  },

  purple: {
    surface:
      "bg-[#F4EFFF]",

    icon:
      "text-[#712AE2]",

    border:
      "border-r-[#712AE2]",
  },

  orange: {
    surface:
      "bg-[#FFF1E8]",

    icon:
      "text-[#F97316]",

    border:
      "border-r-[#F97316]",
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
    statStyles[tone];

  return (
    <article
      className={cn(
        "rounded-2xl",
        "border",
        "border-[#DCE4E2]",
        "border-r-[3px]",
        "bg-[#FFFFFF]",
        "p-5",
        "shadow-[0_6px_22px_rgba(15,23,42,0.04)]",
        style.border,
      )}
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
              text-[#172321]
            "
          >
            {formatNumber(
              value,
            )}
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

type ToolTone =
  | "teal"
  | "purple"
  | "orange"
  | "blue";

const toolStyles:
  Record<
    ToolTone,
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

  blue: {
    surface:
      "bg-[#EAF2FF]",

    icon:
      "text-[#2563EB]",
  },
};

function ToolCard({
  icon: Icon,
  title,
  description,
  tone,
}: Readonly<{
  icon: LucideIcon;
  title: string;
  description: string;
  tone: ToolTone;
}>) {
  const style =
    toolStyles[tone];

  return (
    <article
      className="
        rounded-2xl
        border
        border-[#DFE7E5]
        bg-white
        p-5
        shadow-[0_5px_18px_rgba(15,23,42,0.035)]
      "
    >
      <span
        className={cn(
          "flex",
          "h-10",
          "w-10",
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

      <h3
        className="
          mt-4
          text-sm
          font-black
          text-[#172321]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-[#6D7A77]
        "
      >
        {description}
      </p>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  live = false,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  live?: boolean;
}>) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          font-black
          text-[#00685F]
        "
      >
        {live ? (
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#10B981]
            "
          />
        ) : (
          <CalendarClock
            aria-hidden="true"
            className="h-4 w-4"
          />
        )}

        {eyebrow}
      </div>

      <h2
        className="
          mt-2
          text-2xl
          font-black
          text-[#172321]
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-2
          text-sm
          leading-7
          text-[#6D7A77]
        "
      >
        {description}
      </p>
    </div>
  );
}

function RoomCard({
  room,
  viewerId,
  activeRoomId,
}: Readonly<{
  room: ClassroomRoomSummary;
  viewerId: string | null;
  activeRoomId: string | null;
}>) {
  const isLive =
    room.status ===
    "live";

  const isCurrentRoom =
    activeRoomId ===
    room.id;

  const blockedByOtherRoom =
    isLive &&
    Boolean(
      activeRoomId,
    ) &&
    !isCurrentRoom;

  const isFull =
    isLive &&
    room.participantCount >=
      room.capacity &&
    !isCurrentRoom;

  const roomHref =
    `/classroom/rooms/${encodeURIComponent(
      room.id,
    )}`;

  const destination =
    isLive &&
    !viewerId
      ? buildLoginHref(
          roomHref,
        )
      : roomHref;

  const dateLabel =
    formatRoomDate(
      isLive
        ? room.startedAt
        : room.scheduledFor,
    );

  return (
    <article
      className="
        rounded-2xl
        border
        border-[#DCE4E2]
        bg-white
        p-5
        shadow-[0_6px_22px_rgba(15,23,42,0.04)]
        transition
        hover:-translate-y-0.5
        hover:border-[#AFD2CC]
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]
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
                "font-black",

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
                : "آینده"}
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
          </div>

          <h3
            dir="ltr"
            className="
              mt-4
              truncate
              text-left
              text-lg
              font-black
              text-[#172321]
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
                border-[#E3E9E7]
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
            dateLabel ??
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
        <span
          className="
            text-[10px]
            text-[#7C8987]
          "
        >
          {isCurrentRoom
            ? "این اتاق فعال تو است"
            : blockedByOtherRoom
              ? "ابتدا از اتاق فعلی خارج شو"
              : isFull
                ? "ظرفیت اتاق تکمیل است"
                : isLive
                  ? "همین الان می‌توانی وارد شوی"
                  : "جزئیات جلسه را ببین"}
        </span>

        {blockedByOtherRoom ||
        isFull ? (
          <span
            className="
              inline-flex
              min-h-9
              items-center
              gap-2
              rounded-lg
              bg-[#F1F5F4]
              px-3
              text-xs
              font-bold
              text-[#94A3B8]
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            غیرقابل ورود
          </span>
        ) : (
          <Link
            href={destination}
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
              font-black
              text-[#00685F]
              transition
              hover:bg-[#D4ECE8]
            "
          >
            {isCurrentRoom
              ? "بازگشت"
              : isLive
                ? "ورود به گفتگو"
                : "مشاهده جلسه"}

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>
        )}
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

function HowItWorksStep({
  number,
  title,
  description,
}: Readonly<{
  number: string;
  title: string;
  description: string;
}>) {
  return (
    <article
      className="
        flex
        items-start
        gap-3
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#00685F]
          text-sm
          font-black
          text-[#FFFFFF]
        "
      >
        {number}
      </span>

      <div>
        <h3
          className="
            text-sm
            font-black
            text-[#172321]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-6
            text-[#6D7A77]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function EmptyLiveRooms() {
  return (
    <div
      className="
        mt-5
        rounded-2xl
        border
        border-dashed
        border-[#CAD8D5]
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
          h-8
          w-8
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
          mt-2
          text-xs
          text-[#7C8987]
        "
      >
        جلسه‌های آینده را بررسی کن.
      </p>
    </div>
  );
}
