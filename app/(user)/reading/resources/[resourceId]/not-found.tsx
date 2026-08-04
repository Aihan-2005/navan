import Link from "next/link";
import {
  BookOpenText,
} from "lucide-react";

export default function ReadingResourceNotFound() {
  return (
    <main
      className="
        mx-auto flex min-h-[60vh]
        w-full max-w-2xl
        items-center justify-center
      "
    >
      <section
        className="
          w-full rounded-3xl border
          border-white/[0.08]
          bg-white/[0.035]
          p-8 text-center sm:p-12
        "
      >
        <div
          className="
            mx-auto flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-cyan-400/10
            text-cyan-300
          "
        >
          <BookOpenText
            aria-hidden="true"
            className="h-8 w-8"
          />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-white">
          منبع Reading پیدا نشد
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          این منبع حذف شده، هنوز آماده نیست یا شناسه آن
          معتبر نیست.
        </p>

        <Link
          href="/reading/library"
          className="
            mt-7 inline-flex min-h-11
            items-center justify-center
            rounded-xl bg-cyan-400
            px-5 py-2.5 text-sm
            font-bold text-slate-950
            transition hover:bg-cyan-300
          "
        >
          بازگشت به کتابخانه
        </Link>
      </section>
    </main>
  );
}