import Link from "next/link";
import {
  ArrowLeft,
  FileText,
} from "lucide-react";

import {
  Progress,
} from "../../../../components/ui/progress";

import type {
  WritingDraft,
} from "../../types/writing.types";

type ContinueDraftCardProps =
  Readonly<{
    draft: WritingDraft;
  }>;

const persianNumberFormatter =
  new Intl.NumberFormat("fa-IR");

const englishNumberFormatter =
  new Intl.NumberFormat("en-US");

export function ContinueDraftCard({
  draft,
}: ContinueDraftCardProps) {
  const progress =
    Math.min(
      100,
      Math.max(
        0,
        draft.progressPercent ?? 0,
      ),
    );

  return (
    <article
      className="
        flex
        min-h-[270px]
        h-full
        flex-col
        justify-between
        rounded-3xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
      "
      dir="rtl"
    >
      <div>
        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-xs
                font-normal
                leading-4
                text-[#0D9488]
              "
            >
              ادامه‌ی نوشته
            </p>

            <h3
              className="
                mt-1
                text-xl
                font-bold
                leading-7
                text-[#0F172A]
              "
            >
              {draft.title}
            </h3>
          </div>

          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F0FDFA]
              text-[#0F766E]
            "
          >
            <FileText
              aria-hidden="true"
              className="h-6 w-6"
              strokeWidth={1.7}
            />
          </span>
        </div>

        <p
          className="
            mt-4
            max-w-[512px]
            text-sm
            font-normal
            leading-[22.75px]
            text-[#475569]
          "
        >
          {draft.excerpt}
        </p>
      </div>

      <div className="mt-5">
        <div
          className="
            mb-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >
          <span
            className="
              text-xs
              font-normal
              leading-4
              text-[#64748B]
            "
          >
            پیشرفت
          </span>

          <span
            className="
              text-xs
              font-normal
              leading-4
              text-[#334155]
            "
          >
            {englishNumberFormatter.format(
              draft.wordCount,
            )}{" "}
            کلمه • بروزرسانی{" "}
            {draft.updatedAt}
          </span>
        </div>

        <Progress
          value={progress}
          label={`پیشرفت ${draft.title}`}
          className="
            h-1.5
            bg-[#F1F5F9]
          "
          indicatorClassName="
            bg-none
            bg-[#14B8A6]
          "
        />

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-4
            pt-2
          "
        >
          <span
            className="
              text-xs
              font-bold
              leading-4
              text-[#334155]
            "
          >
            {persianNumberFormatter.format(
              progress,
            )}
            ٪
          </span>

          <Link
            href={`/writing/drafts/${draft.id}`}
            className="
              inline-flex
              min-h-9
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#F0FDFA]
              px-5
              py-2
              text-sm
              font-bold
              leading-5
              text-[#0F766E]
              transition
              hover:bg-[#CCFBF1]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0D9488]/30
            "
          >
            ادامه دادن

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

