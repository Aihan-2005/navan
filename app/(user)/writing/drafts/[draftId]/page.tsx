import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  FileQuestion,
} from "lucide-react";

import {
  getWritingOverview,
} from "../../../../../features/writing";

import {
  WritingWorkspace,
} from "../../../../../features/writing/components/workspace/writing-workspace";

type WritingDraftPageProps =
  Readonly<{
    params:
      Promise<{
        draftId:
          string;
      }>;
  }>;

export const metadata: Metadata = {
  title:
    "ادامه پیش‌نویس",

  description:
    "ادامه و تحلیل پیش‌نویس Writing",
};

export default async function WritingDraftPage({
  params,
}: WritingDraftPageProps) {
  const {
    draftId,
  } =
    await params;

  const normalizedDraftId =
    decodeURIComponent(
      draftId,
    ).trim();

  if (
    !normalizedDraftId
  ) {
    return (
      <DraftNotFound />
    );
  }

  const overview =
    await getWritingOverview();

  const draft =
    overview.currentDraft.id ===
    normalizedDraftId
      ? overview.currentDraft
      : null;

  if (!draft) {
    return (
      <DraftNotFound />
    );
  }

  return (
    <WritingWorkspace
      mode="draft"
      draft={
        draft
      }
    />
  );
}

function DraftNotFound() {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-6xl
      "
      dir="rtl"
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-950/60
          p-6
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-56
            w-56
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.035]
              text-slate-400
            "
          >
            <FileQuestion
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <h1
            className="
              mt-5
              text-2xl
              font-bold
              text-white
            "
          >
            پیش‌نویس یافت نشد
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-8
              text-slate-400
            "
          >
            پیش‌نویس مورد نظر وجود ندارد یا دیگر در دسترس نیست.
          </p>

          <Link
            href="/writing"
            className="
              mt-6
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-cyan-300/20
              bg-cyan-400/10
              px-4
              text-sm
              font-semibold
              text-cyan-200
              transition
              hover:bg-cyan-400/15
            "
          >
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />

            بازگشت به Writing
          </Link>
        </div>
      </section>
    </main>
  );
}