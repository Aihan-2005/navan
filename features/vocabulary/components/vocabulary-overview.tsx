import Link from "next/link";

import {
  ArrowLeft,
  BookMarked,
  Brain,
  CheckCircle2,
  Clock3,
  Flame,
  Layers3,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const leitnerBoxes = [
  {
    id: 1,

    title:
      "جعبه ۱",

    description:
      "مرور روزانه",

    cards:
      32,

    due:
      18,

    days:
      "هر روز",

    accent:
      "#F97316",

    background:
      "#FFF7ED",
  },

  {
    id: 2,

    title:
      "جعبه ۲",

    description:
      "در حال یادگیری",

    cards:
      24,

    due:
      8,

    days:
      "هر ۲ روز",

    accent:
      "#8A4CFC",

    background:
      "#F8F3FF",
  },

  {
    id: 3,

    title:
      "جعبه ۳",

    description:
      "تثبیت اولیه",

    cards:
      17,

    due:
      4,

    days:
      "هر ۴ روز",

    accent:
      "#4285F4",

    background:
      "#EFF6FF",
  },

  {
    id: 4,

    title:
      "جعبه ۴",

    description:
      "تثبیت قوی",

    cards:
      12,

    due:
      2,

    days:
      "هر ۸ روز",

    accent:
      "#14B8A6",

    background:
      "#EAFFFD",
  },

  {
    id: 5,

    title:
      "جعبه ۵",

    description:
      "یادگیری پایدار",

    cards:
      9,

    due:
      0,

    days:
      "هر ۱۶ روز",

    accent:
      "#0D9488",

    background:
      "#F0FDFA",
  },
] as const;

const stats = [
  {
    id:
      "total",

    label:
      "کل واژه‌ها",

    value:
      "۹۴",

    description:
      "در جعبه لایتنر",

    icon:
      BookMarked,

    accent:
      "#14B8A6",

    background:
      "#EAFFFD",
  },

  {
    id:
      "due",

    label:
      "مرور امروز",

    value:
      "۳۲",

    description:
      "واژه آماده مرور",

    icon:
      RotateCcw,

    accent:
      "#F97316",

    background:
      "#FFF7ED",
  },

  {
    id:
      "mastered",

    label:
      "تسلط",

    value:
      "۷۸٪",

    description:
      "روند بسیار خوب",

    icon:
      Brain,

    accent:
      "#712AE2",

    background:
      "#F8F3FF",
  },
] as const;

export function VocabularyOverview() {
  const dueCount =
    leitnerBoxes.reduce(
      (
        total,
        box,
      ) =>
        total +
        box.due,
      0,
    );

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        flex
        w-full
        max-w-[1120px]
        flex-col
        gap-7
        pb-10
      "
    >
      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-[#BFD8D4]
          bg-[linear-gradient(135deg,#F0FDFA_0%,#D9F3EF_55%,#C4EBE5_100%)]
          p-7
          shadow-[0_8px_30px_rgba(0,104,95,0.07)]
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -left-12
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#14B8A6]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
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
                border-[#14B8A6]/20
                bg-white/60
                px-3
                py-1.5
                text-xs
                font-bold
                text-[#00685F]
              "
            >
              <Sparkles
                className="h-4 w-4"
              />

              سیستم مرور هوشمند
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-black
                leading-[1.5]
                text-[#173330]
              "
            >
              جعبه لایتنر واژگان
            </h1>

            <p
              className="
                mt-2
                max-w-[620px]
                text-sm
                leading-7
                text-[#52615E]
              "
            >
              واژه‌ها را در زمان مناسب مرور کن تا
              به حافظه بلندمدت منتقل شوند.
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            <button
              type="button"
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#A8C4C0]
                bg-white
                px-5
                text-sm
                font-bold
                text-[#00685F]
                transition
                hover:bg-[#F7FBFA]
              "
            >
              <Plus
                className="h-4 w-4"
              />

              افزودن واژه
            </button>

            <Link
              href="/vocabulary/review"
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0D9488]
                px-6
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-[#0F766E]
              "
            >
              شروع مرور

              <ArrowLeft
                className="h-4 w-4"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section
        aria-label="آمار واژگان"
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >
        {stats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <article
                key={
                  stat.id
                }
                className="
                  flex
                  min-h-[128px]
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-[#BCC9C6]
                  bg-white
                  p-5
                  shadow-[0_4px_18px_rgba(0,0,0,0.035)]
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      font-bold
                      text-[#3D4947]
                    "
                  >
                    {stat.label}
                  </p>

                  <strong
                    className="
                      mt-1
                      block
                      text-2xl
                      font-black
                    "
                    style={{
                      color:
                        stat.accent,
                    }}
                  >
                    {stat.value}
                  </strong>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#6D7A77]
                    "
                  >
                    {
                      stat.description
                    }
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                  "
                  style={{
                    backgroundColor:
                      stat.background,
                    color:
                      stat.accent,
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                  />
                </div>
              </article>
            );
          },
        )}
      </section>

      {/* Leitner header */}

      <section>
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-[22px]
                font-black
                text-[#191C1E]
              "
            >
              جعبه‌های لایتنر
            </h2>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-[#6D7A77]
              "
            >
              هرچه یک واژه را بهتر یاد بگیری،
              به جعبه بالاتر منتقل می‌شود.
            </p>
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#FFF7ED]
              px-4
              py-2
              text-sm
              font-bold
              text-[#F97316]
            "
          >
            <Flame
              className="h-4 w-4"
            />

            {dueCount} واژه برای مرور
          </div>
        </div>

        {/* Boxes */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {leitnerBoxes.map(
            (box) => (
              <article
                key={
                  box.id
                }
                className="
                  group
                  relative
                  min-h-[220px]
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#BCC9C6]
                  p-5
                  transition
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
                "
                style={{
                  backgroundColor:
                    box.background,
                }}
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -left-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    opacity-10
                  "
                  style={{
                    backgroundColor:
                      box.accent,
                  }}
                />

                <div
                  className="
                    relative
                    flex
                    h-full
                    flex-col
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/70
                      "
                      style={{
                        color:
                          box.accent,
                      }}
                    >
                      <Layers3
                        className="h-5 w-5"
                      />
                    </div>

                    <span
                      className="
                        rounded-full
                        bg-white/70
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-[#52615E]
                      "
                    >
                      {box.days}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-black
                      text-[#191C1E]
                    "
                  >
                    {box.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#6D7A77]
                    "
                  >
                    {box.description}
                  </p>

                  <div
                    className="
                      mt-auto
                      flex
                      items-end
                      justify-between
                      pt-5
                    "
                  >
                    <div>
                      <strong
                        className="
                          text-2xl
                          font-black
                        "
                        style={{
                          color:
                            box.accent,
                        }}
                      >
                        {box.cards}
                      </strong>

                      <span
                        className="
                          mr-1
                          text-[10px]
                          text-[#6D7A77]
                        "
                      >
                        واژه
                      </span>
                    </div>

                    {box.due > 0 ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-white/80
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                        "
                        style={{
                          color:
                            box.accent,
                        }}
                      >
                        <Clock3
                          className="h-3 w-3"
                        />

                        {box.due} مرور
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          font-bold
                          text-[#0D9488]
                        "
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5"
                        />

                        تکمیل
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Review CTA */}

      <section
        className="
          flex
          flex-col
          gap-5
          rounded-2xl
          border
          border-[#BCC9C6]
          bg-white
          p-6
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#E6F6F4]
              text-[#0D9488]
            "
          >
            <RotateCcw
              className="h-6 w-6"
            />
          </div>

          <div>
            <h2
              className="
                text-base
                font-black
                text-[#191C1E]
              "
            >
              آماده مرور امروز هستی؟
            </h2>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#6D7A77]
              "
            >
              امروز {dueCount} واژه منتظر مرور تو هستند.
            </p>
          </div>
        </div>

        <Link
          href="/vocabulary/review"
          className="
            inline-flex
            h-10
            items-center
            justify-center
            rounded-lg
            bg-[#0D9488]
            px-6
            text-sm
            font-bold
            text-white
            transition
            hover:bg-[#0F766E]
          "
        >
          شروع مرور واژه‌ها
        </Link>
      </section>
    </main>
  );
}