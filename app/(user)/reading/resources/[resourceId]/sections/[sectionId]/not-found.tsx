import Link from "next/link";

import {
  ArrowRight,
  BookOpenText,
  Library,
  LockKeyhole,
} from "lucide-react";

export default function ReadingSectionNotFound() {
  return (
    <main
      className="
        mx-auto flex
        min-h-[65vh]
        w-full max-w-3xl
        items-center
        justify-center
        px-4 py-10
      "
    >
      <section
        className="
          relative w-full
          overflow-hidden
          rounded-3xl border
          border-white/[0.08]
          bg-white/[0.035]
          p-7 text-center
          shadow-2xl
          shadow-black/10
          sm:p-12
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24 right-0
            h-56 w-56
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto flex
              h-16 w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-amber-400/15
              bg-amber-400/10
              text-amber-300
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-7 w-7"
            />
          </div>

          <p
            className="
              mt-6 text-sm
              font-medium
              text-cyan-300
            "
          >
            Reading Workspace
          </p>

          <h1
            className="
              mt-2 text-2xl
              font-bold
              text-white
              sm:text-3xl
            "
          >
            این بخش در دسترس نیست
          </h1>

          <p
            className="
              mx-auto mt-4
              max-w-xl
              text-sm leading-8
              text-slate-500
            "
          >
            ممکن است شناسه بخش معتبر نباشد،
            منبع حذف شده باشد یا هنوز مرحله
            قبلی مطالعه را کامل نکرده باشی.
          </p>

          <div
            className="
              mx-auto mt-7
              grid max-w-xl
              gap-3
              text-right
              sm:grid-cols-2
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
              "
            >
              <BookOpenText
                aria-hidden="true"
                className="
                  h-5 w-5
                  text-cyan-300
                "
              />

              <p
                className="
                  mt-3 text-sm
                  font-medium
                  text-white
                "
              >
                ادامه مسیر مطالعه
              </p>

              <p
                className="
                  mt-1 text-xs
                  leading-6
                  text-slate-600
                "
              >
                ابتدا Sectionهای باز قبلی
                را کامل کن.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
              "
            >
              <Library
                aria-hidden="true"
                className="
                  h-5 w-5
                  text-violet-300
                "
              />

              <p
                className="
                  mt-3 text-sm
                  font-medium
                  text-white
                "
              >
                انتخاب منبع دیگر
              </p>

              <p
                className="
                  mt-1 text-xs
                  leading-6
                  text-slate-600
                "
              >
                می‌توانی یک متن دیگر از
                کتابخانه انتخاب کنی.
              </p>
            </div>
          </div>

          <div
            className="
              mt-8 flex
              flex-col
              justify-center gap-3
              sm:flex-row
            "
          >
            <Link
              href="/reading"
              className="
                inline-flex min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-cyan-400
                px-5 py-2.5
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-cyan-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-200
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />

              بازگشت به Reading
            </Link>

            <Link
              href="/reading/library"
              className="
                inline-flex min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.04]
                px-5 py-2.5
                text-sm font-medium
                text-slate-300
                transition
                hover:bg-white/[0.08]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-300
              "
            >
              <Library
                aria-hidden="true"
                className="h-4 w-4"
              />

              کتابخانه
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}