import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  Headphones,
  Languages,
  MessageSquareText,
  Mic2,
  Sparkles,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../../components/ui/card";

type TutorSessionPageProps = Readonly<{
  params: Promise<{
    sessionId: string;
  }>;
}>;

function normalizeSessionId(
  sessionId: string,
): string {
  return sessionId.trim();
}

function formatSessionId(
  sessionId: string,
): string {
  if (sessionId.length <= 24) {
    return sessionId;
  }

  return `${sessionId.slice(
    0,
    12,
  )}…${sessionId.slice(-8)}`;
}

export async function generateMetadata({
  params,
}: TutorSessionPageProps): Promise<Metadata> {
  const { sessionId } = await params;

  const normalizedSessionId =
    normalizeSessionId(sessionId);

  return {
    title: normalizedSessionId
      ? "جلسه مدرس هوشمند"
      : "AI Tutor",

    description:
      "جلسه تعاملی با مدرس هوشمند MeowLingo برای تمرین و یادگیری زبان",
  };
}

export default async function TutorSessionPage({
  params,
}: TutorSessionPageProps) {
  const { sessionId } = await params;

  const normalizedSessionId =
    normalizeSessionId(sessionId);

  const displaySessionId =
    formatSessionId(
      normalizedSessionId,
    );

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
      aria-labelledby="tutor-session-title"
    >
      <Link
        href="/dashboard"
        className="
          inline-flex items-center
          gap-2 text-sm
          text-slate-400
          transition
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-300
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به داشبورد
      </Link>

      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-28 right-10
            h-64 w-64
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative flex
            flex-col gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                flex flex-wrap
                items-center gap-2
              "
            >
              <span
                className="
                  inline-flex
                  items-center gap-1.5
                  rounded-full
                  bg-cyan-400/10
                  px-3 py-1
                  text-xs
                  text-cyan-200
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                AI Tutor
              </span>

              <span
                className="
                  inline-flex
                  items-center gap-1.5
                  rounded-full
                  bg-emerald-400/10
                  px-3 py-1
                  text-xs
                  text-emerald-300
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-emerald-300
                  "
                />

                جلسه آماده است
              </span>
            </div>

            <p
              className="
                mt-5 text-sm
                font-medium
                text-cyan-300
              "
            >
              مدرس شخصی زبان
            </p>

            <h1
              id="tutor-session-title"
              className="
                mt-2 text-3xl
                font-bold leading-tight
                text-white
                sm:text-4xl
              "
            >
              جلسه یادگیری با مدرس هوشمند
            </h1>

            <p
              className="
                mt-4 max-w-3xl
                text-sm leading-8
                text-slate-400
              "
            >
              در این فضا می‌توانی درباره
              گرامر، واژگان، مکالمه، خواندن
              و شنیدار سؤال بپرسی و مسیر
              یادگیری مرحله‌ای دریافت کنی.
            </p>
          </div>

          <div
            className="
              shrink-0 rounded-2xl
              border
              border-white/[0.07]
              bg-black/15
              px-4 py-3
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-600
              "
            >
              Session ID
            </p>

            <code
              dir="ltr"
              title={normalizedSessionId}
              className="
                mt-1 block
                font-mono text-xs
                text-slate-300
              "
            >
              {displaySessionId}
            </code>
          </div>
        </div>
      </section>

      <section
        className="
          grid gap-6
          xl:grid-cols-12
        "
      >
        <div
          className="
            space-y-6
            xl:col-span-8
          "
        >
          <Card
            className="
              min-h-[430px]
              overflow-hidden
            "
          >
            <div
              className="
                flex items-center
                justify-between gap-4
                border-b
                border-white/[0.06]
                px-5 py-4
                sm:px-6
              "
            >
              <div
                className="
                  flex items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <BrainCircuit
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>

                <div>
                  <h2
                    className="
                      text-sm font-bold
                      text-white
                    "
                  >
                    MeowLingo Tutor
                  </h2>

                  <p
                    className="
                      mt-0.5 text-xs
                      text-slate-600
                    "
                  >
                    مدرس هوشمند شخصی تو
                  </p>
                </div>
              </div>

              <span
                className="
                  rounded-full
                  bg-emerald-400/10
                  px-2.5 py-1
                  text-[10px]
                  font-medium
                  text-emerald-300
                "
              >
                Online
              </span>
            </div>

            <div
              className="
                flex min-h-[280px]
                items-center
                justify-center
                p-6
              "
            >
              <div
                className="
                  max-w-xl
                  text-center
                "
              >
                <div
                  className="
                    mx-auto flex
                    h-16 w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400/15
                    to-violet-400/15
                    text-cyan-200
                  "
                >
                  <MessageSquareText
                    aria-hidden="true"
                    className="h-7 w-7"
                  />
                </div>

                <h2
                  className="
                    mt-5 text-xl
                    font-bold text-white
                  "
                >
                  جلسه Tutor آماده توسعه است
                </h2>

                <p
                  className="
                    mt-3 text-sm
                    leading-8
                    text-slate-500
                  "
                >
                  ساختار Route و رابط جلسه
                  اکنون آماده است. در مرحله
                  توسعه Tutor، تاریخچه پیام‌ها،
                  ارسال پیام، پاسخ AI و Context
                  آموزشی به همین Workspace
                  متصل خواهند شد.
                </p>
              </div>
            </div>

            <div
              className="
                border-t
                border-white/[0.06]
                p-4 sm:p-5
              "
            >
              <div
                className="
                  flex items-end gap-3
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-3
                "
              >
                <div
                  className="
                    min-h-12 flex-1
                    px-2 py-3
                    text-sm
                    text-slate-600
                  "
                >
                  قابلیت ارسال پیام در مرحله
                  بعد Tutor فعال می‌شود...
                </div>

                <button
                  type="button"
                  disabled
                  className="
                    inline-flex h-11 w-11
                    shrink-0 items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.05]
                    text-slate-600
                    disabled:cursor-not-allowed
                  "
                  aria-label="ارسال پیام"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 rotate-180"
                  />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <aside
          className="
            space-y-5
            xl:col-span-4
          "
        >
          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-violet-300
              "
            >
              <Target
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-bold
                  text-white
                "
              >
                موضوع جلسه
              </h2>
            </div>

            <p
              className="
                mt-4 text-sm
                leading-7
                text-slate-500
              "
            >
              می‌توانی Tutor را برای هر یک
              از مهارت‌های اصلی زبان استفاده
              کنی.
            </p>

            <div
              className="
                mt-5 grid
                grid-cols-2 gap-2
              "
            >
              <Link
                href="/speaking"
                className="
                  flex items-center
                  gap-2 rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-3
                  text-xs
                  text-slate-400
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <Mic2
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    text-cyan-300
                  "
                />

                مکالمه
              </Link>

              <Link
                href="/listening"
                className="
                  flex items-center
                  gap-2 rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-3
                  text-xs
                  text-slate-400
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <Headphones
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    text-violet-300
                  "
                />

                شنیداری
              </Link>

              <Link
                href="/reading"
                className="
                  flex items-center
                  gap-2 rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-3
                  text-xs
                  text-slate-400
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <BookOpenText
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    text-emerald-300
                  "
                />

                خواندن
              </Link>

              <div
                className="
                  flex items-center
                  gap-2 rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-3
                  text-xs
                  text-slate-500
                "
              >
                <Languages
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    text-amber-300
                  "
                />

                واژگان
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-cyan-300
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-bold
                  text-white
                "
              >
                Tutor چگونه کمک می‌کند؟
              </h2>
            </div>

            <ul
              className="
                mt-5 space-y-4
              "
            >
              {[
                "توضیح مفاهیم به‌صورت مرحله‌ای",
                "اصلاح خطا بدون دادن پاسخ مستقیم",
                "ساخت مثال متناسب با سطح زبان",
                "پیشنهاد تمرین بعدی بر اساس ضعف‌ها",
              ].map((item) => (
                <li
                  key={item}
                  className="
                    flex items-start
                    gap-3 text-sm
                    leading-7
                    text-slate-400
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mt-2.5 h-1.5 w-1.5
                      shrink-0
                      rounded-full
                      bg-cyan-300
                    "
                  />

                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </section>
    </main>
  );
}