import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  Layers3,
  Settings2,
  Sparkles,
} from "lucide-react";

import type {
  AssessmentCefrLevel,
} from "../../types/assessment-question.types";

type CustomAssessmentCardProps =
  Readonly<{
    currentCefrLevel:
      AssessmentCefrLevel | null;
  }>;

export function CustomAssessmentCard({
  currentCefrLevel,
}: CustomAssessmentCardProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#C9E1DD]
        bg-[linear-gradient(135deg,#F0FAF8_0%,#FFFFFF_60%,#F7FCFB_100%)]
        p-6
        shadow-[0_12px_36px_rgba(0,104,95,0.05)]
        sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#14B8A6]/10
          blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#00685F]
          "
        >
          <Settings2
            aria-hidden="true"
            className="h-5 w-5"
          />

          آزمون سفارشی
        </div>

        <h2
          className="
            mt-3
            text-2xl
            font-black
            text-[#0F172A]
          "
        >
          آزمون دلخواه خودت را بساز
        </h2>

        <p
          className="
            mt-3
            max-w-3xl
            text-sm
            leading-8
            text-[#64748B]
          "
        >
          یک یا چند مهارت را انتخاب کن و
          سطح، تعداد سؤال، زمان و میزان
          شخصی‌سازی را مشخص کن. این گزینه
          برای زمانی مناسب است که دقیقاً
          می‌دانی روی چه چیزی می‌خواهی
          سنجیده شوی.
        </p>

        <div
          className="
            mt-5
            grid
            gap-3
            sm:grid-cols-3
          "
        >
          <Feature
            icon={Layers3}
            title="چند مهارته"
            description="Reading، Listening، Speaking و مهارت‌های دیگر"
          />

          <Feature
            icon={BrainCircuit}
            title="سطح هوشمند"
            description={
              currentCefrLevel
                ? `شروع پیشنهادی از سطح ${currentCefrLevel}`
                : "تشخیص خودکار سطح شروع"
            }
          />

          <Feature
            icon={Sparkles}
            title="شخصی‌سازی"
            description="قابل اتصال به Question Generator و سابقه کاربر"
          />
        </div>

        <Link
          href="/assessment/custom"
          className="
            mt-6
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
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#14B8A6]/30
          "
        >
          تنظیم آزمون دلخواه

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </section>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: Readonly<{
  icon: typeof Layers3;
  title: string;
  description: string;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#D8E7E4]
        bg-white
        p-4
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-[#E7F4F2]
          text-[#00685F]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-4 w-4"
        />
      </span>

      <p
        className="
          mt-3
          text-sm
          font-black
          text-[#0F172A]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1
          text-xs
          leading-6
          text-[#64748B]
        "
      >
        {description}
      </p>
    </div>
  );
}