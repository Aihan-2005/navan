import Link from "next/link";
import {
  PenLine,
} from "lucide-react";

export function WritingHero() {
  return (
    <section
      className="
        relative
        min-h-[256px]
        overflow-hidden
        rounded-2xl
        border
        border-[#BCC9C633]
        bg-white
        p-6
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        sm:p-8
      "
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-14
          top-1/2
          h-64
          w-64
          -translate-y-1/2
          rounded-full
          bg-[#00685F0D]
          blur-[64px]
        "
      />

      <div
        className="
          relative
          flex
          min-h-[192px]
          flex-col
          justify-between
          gap-8
          md:flex-row
          md:items-center
        "
      >
        <div
          className="
            w-full
            max-w-[518px]
            text-right
          "
        >
          <h1
            id="writing-page-title"
            className="
              text-[30px]
              font-bold
              leading-[1.4]
              tracking-[-0.72px]
              text-[#191C1E]
              sm:text-[36px]
              sm:leading-[45px]
            "
          >
            متن‌های خودت را بنویس و{" "}
            <span className="text-[#00685F]">
              بازخورد آنی
            </span>
          </h1>

          <p
            className="
              mt-3
              max-w-[518px]
              text-[16px]
              font-normal
              leading-7
              text-[#3D4947]
              sm:text-[18px]
            "
          >
            مهارت‌های نوشتاری خود را با تمرین‌های هدفمند و
            تحلیل‌های دقیق هوش مصنوعی بهبود ببخشید.
          </p>
        </div>

        <Link
          href="/writing/new"
          aria-label="شروع نوشتن"
          className="
            group
            mx-auto
            flex
            h-36
            w-36
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#00685F0D]
            transition
            duration-300
            hover:bg-[#00685F14]
            md:mx-0
            lg:h-64
            lg:w-64
          "
        >
          <span
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-[#F2F4F6]
              text-[#00685F]
              shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
              transition
              duration-300
              group-hover:scale-105
              group-hover:bg-[#E8EFEE]
            "
          >
            <PenLine
              aria-hidden="true"
              className="h-10 w-10"
              strokeWidth={1.8}
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
