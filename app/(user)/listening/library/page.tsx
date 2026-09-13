import type {
  Metadata,
} from "next";

import {
  Headphones,
  Library,
  SearchCheck,
  SlidersHorizontal,
} from "lucide-react";

import {
  getListeningLibrary,
} from "../../../../features/listening/api/get-listening-library";

import {
  ListeningLibraryBrowser,
} from "../../../../features/listening/components/library/listening-library-browser";

export const metadata:
  Metadata = {
  title:
    "کتابخانه Listening",

  description:
    "تمرین‌های شنیداری در سطح‌ها، موضوع‌ها، لهجه‌ها و حالت‌های تمرینی مختلف",
};

export const dynamic =
  "force-dynamic";

export default async function ListeningLibraryPage() {
  const library =
    await getListeningLibrary();

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1280px]
        space-y-7
        pb-12
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#CBE1DD]
          bg-[linear-gradient(135deg,#EAF8F5_0%,#FFFFFF_58%,#F7F4FF_100%)]
          p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.05)]
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
            h-72
            w-72
            rounded-full
            bg-[#14B8A6]/10
            blur-3xl
          "
        />

        <div className="relative">
          <span
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#DFF4F0]
              text-[#00685F]
            "
          >
            <Library
              aria-hidden="true"
              className="h-6 w-6"
            />
          </span>

          <p
            className="
              mt-5
              text-xs
              font-black
              text-[#00685F]
            "
          >
            Listening Library
          </p>

          <h1
            className="
              mt-2
              max-w-3xl
              text-3xl
              font-black
              leading-tight
              text-[#0F172A]
              sm:text-4xl
            "
          >
            تمرینی پیدا کن که دقیقاً
            مناسب سطح و هدفت باشد
          </h1>

          <p
            className="
              mt-4
              max-w-3xl
              text-sm
              leading-8
              text-[#64748B]
              sm:text-base
            "
          >
            از پادکست، مکالمه، داستان،
            خبر و مصاحبه انتخاب کن و بعد
            حالت تمرین را بر اساس هدفت
            مشخص کن؛ از شنیدن آزاد تا
            Dictation و Shadowing.
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-2
            "
          >
            <HeroPill
              icon={
                Headphones
              }
              text={`${library.total} محتوای آماده`}
            />

            <HeroPill
              icon={
                SlidersHorizontal
              }
              text="فیلتر سطح و لهجه"
            />

            <HeroPill
              icon={
                SearchCheck
              }
              text="جست‌وجوی موضوع و واژه"
            />
          </div>
        </div>
      </section>

      <ListeningLibraryBrowser
        items={
          library.items
        }
      />
    </main>
  );
}

function HeroPill({
  icon: Icon,
  text,
}: Readonly<{
  icon:
    typeof Headphones;

  text:
    string;
}>) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#D6E5E2]
        bg-white/80
        px-3
        py-1.5
        text-[11px]
        font-medium
        text-[#52615F]
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-3.5
          w-3.5
          text-[#00685F]
        "
      />

      {text}
    </span>
  );
}