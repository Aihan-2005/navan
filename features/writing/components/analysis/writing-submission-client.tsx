"use client";

import Link from "next/link";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  RecentWriting,
} from "../../types/writing.types";

import {
  readWritingSubmission,
} from "../../utils/writing-submission-storage";

import {
  WritingAnalysisView,
} from "./writing-analysis-view";

type WritingSubmissionClientProps =
  Readonly<{
    submissionId:
      string;

    fallbackSubmission?:
      RecentWriting;
  }>;

export function WritingSubmissionClient({
  submissionId,
  fallbackSubmission,
}: WritingSubmissionClientProps) {
  const [
    submission,
    setSubmission,
  ] =
    useState<RecentWriting | null>(
      fallbackSubmission ??
      null,
    );

  const [
    isReady,
    setIsReady,
  ] =
    useState(
      Boolean(
        fallbackSubmission,
      ),
    );

  useEffect(() => {
    const localSubmission =
      readWritingSubmission(
        submissionId,
      );

    if (
      localSubmission
    ) {
      setSubmission(
        localSubmission,
      );
    } else if (
      fallbackSubmission
    ) {
      setSubmission(
        fallbackSubmission,
      );
    } else {
      setSubmission(
        null,
      );
    }

    setIsReady(
      true,
    );
  }, [
    fallbackSubmission,
    submissionId,
  ]);

  if (
    !isReady
  ) {
    return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-6xl
          items-center
          justify-center
        "
      >
        <div
          className="
            text-center
          "
        >
          <LoaderCircle
            aria-hidden="true"
            className="
              mx-auto
              h-7
              w-7
              animate-spin
              text-cyan-300
            "
          />

          <p
            className="
              mt-4
              text-sm
              text-slate-500
            "
          >
            در حال بارگذاری تحلیل...
          </p>
        </div>
      </main>
    );
  }

  if (
    !submission
  ) {
    return (
      <main
        className="
          mx-auto
          w-full
          max-w-6xl
          space-y-6
        "
        dir="rtl"
      >
        <section
          className="
            rounded-3xl
            border
            border-white/10
            bg-slate-950/60
            p-6
          "
        >
          <h1
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            نوشته یافت نشد
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-8
              text-slate-400
            "
          >
            نتیجه این نوشته در مرورگر فعلی یا تاریخچه Mock پیدا نشد.
          </p>

          <Link
            href="/writing"
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-300/20
              bg-cyan-400/10
              px-4
              py-3
              text-sm
              font-semibold
              text-cyan-200
              transition
              hover:bg-cyan-400/15
            "
          >
            بازگشت به Writing
          </Link>
        </section>
      </main>
    );
  }

  return (
    <WritingAnalysisView
      submission={
        submission
      }
    />
  );
}