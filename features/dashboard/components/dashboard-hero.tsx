import {
  Sparkles,
} from "lucide-react";

import type {
  DashboardUser,
} from "../types/dashboard.types";

type DashboardHeroProps = {
  user: DashboardUser;
};

export function DashboardHero({
  user,
}: DashboardHeroProps) {
  return (
    <section
      dir="rtl"
      className="
        relative
        flex
        h-[192px]
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        bg-[linear-gradient(90deg,#E6FFFA_0%,#14B8A6_100%)]
        p-8
        shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute
          -top-[42px]
          right-[190px]
          h-[120px]
          w-[120px]
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          relative
          z-10
          flex
          w-[436px]
          flex-col
          gap-[7px]
        "
      >
        <div
          className="
            inline-flex
            h-[26px]
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/40
            bg-white/20
            px-3
            py-1
          "
        >
          <Sparkles
            className="
              h-[13px]
              w-[13px]
              text-[#F97316]
            "
          />

          <span
            className="
              text-xs
              font-bold
              leading-4
              text-[#004D40]
            "
          >
            برنامه اختصاصی برای{" "}
            {user.firstName}
          </span>
        </div>

        <h1
          className="
            pt-[4px]
            text-base
            font-bold
            leading-6
            text-[#004D40]
          "
        >
          سلام {user.firstName}! خوش اومدی
        </h1>

        <p
          className="
            max-w-[448px]
            text-sm
            font-medium
            leading-[22.75px]
            text-[#004D40CC]
          "
        >
          امروز روی تقویت مهارت مکالمه تمرکز
          می‌کنیم. تو فقط ۲ درس تا رسیدن به
          سطح پیشرفته فاصله داری.
        </p>
      </div>

      <button
        type="button"
        className="
          relative
          z-10
          flex
          h-12
          w-[179px]
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#F97316]
          px-8
          text-base
          font-bold
          leading-6
          text-white
          shadow-md
          transition-colors
          hover:bg-[#EA580C]
        "
      >
        شروع جلسه امروز
      </button>
    </section>
  );
}