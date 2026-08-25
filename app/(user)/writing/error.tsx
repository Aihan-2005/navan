"use client";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

type WritingErrorProps = Readonly<{
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}>;

export default function WritingError({
  error,
  reset,
}: WritingErrorProps) {
  return (
    <main
      dir="rtl"
      className="
        flex
        min-h-[calc(100dvh-104px)]
        w-full
        items-center
        justify-center
        bg-[#F7F9FB]
        px-4
        py-12
        [font-family:var(--font-vazirmatn)]
      "
    >
      <section
        className="
          w-full
          max-w-[520px]
          rounded-[24px]
          border
          border-[#EBEFF3]
          bg-white
          p-8
          text-center
          shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#FFF1F2]
            text-[#E11D48]
          "
        >
          <AlertCircle
            size={26}
            strokeWidth={1.8}
          />
        </div>

        <h1
          className="
            mt-5
            text-[22px]
            font-bold
            leading-8
            text-[#191C1E]
          "
        >
          مشکلی در بخش نوشتن پیش آمد
        </h1>

        <p
          className="
            mx-auto
            mt-2
            max-w-[390px]
            text-[14px]
            font-normal
            leading-6
            text-[#64748B]
          "
        >
          اطلاعات صفحه به‌درستی بارگذاری نشد. دوباره تلاش کنید.
        </p>

        {process.env.NODE_ENV === "development" &&
        error.message ? (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-[#F1F5F9]
              bg-[#F8FAFC]
              p-3
              text-right
              text-[12px]
              leading-5
              text-[#64748B]
            "
            dir="ltr"
          >
            {error.message}
          </div>
        ) : null}

        <button
          type="button"
          onClick={reset}
          className="
            mx-auto
            mt-6
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#0D9488]
            px-5
            text-[14px]
            font-bold
            text-white
            shadow-[0px_0px_15px_0px_rgba(13,148,136,0.10)]
            transition-colors
            duration-200
            hover:bg-[#0F766E]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0D9488]/30
          "
        >
          <RefreshCw
            size={16}
            strokeWidth={1.8}
          />

          تلاش مجدد
        </button>
      </section>
    </main>
  );
}