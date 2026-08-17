import {
  ArrowLeftRight,
  Lightbulb,
} from "lucide-react";

import type {
  WritingAnalysisIssue,
} from "../../types/writing.types";

type WritingIssueCardProps =
  Readonly<{
    issue:
      WritingAnalysisIssue;
  }>;

export function WritingIssueCard({
  issue,
}: WritingIssueCardProps) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              font-semibold
              text-white
            "
          >
            {issue.title}
          </p>

          {issue.category ? (
            <p
              dir="ltr"
              className="
                mt-1
                text-left
                text-[10px]
                uppercase
                tracking-wide
                text-slate-600
              "
            >
              {issue.category}
            </p>
          ) : null}
        </div>

        <span
          className="
            rounded-full
            border
            border-cyan-300/20
            bg-cyan-400/10
            px-2.5
            py-1
            text-[11px]
            font-semibold
            text-cyan-200
          "
        >
          {issue.severity}
        </span>
      </div>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-slate-400
        "
      >
        {issue.description}
      </p>

      {issue.originalText &&
      issue.correctedText ? (
        <div
          className="
            mt-4
            grid
            gap-3
            md:grid-cols-[1fr_auto_1fr]
            md:items-center
          "
          dir="ltr"
        >
          <div
            className="
              rounded-xl
              border
              border-red-400/10
              bg-red-400/[0.035]
              p-3
              text-left
              text-sm
              text-red-100/80
            "
          >
            {issue.originalText}
          </div>

          <ArrowLeftRight
            aria-hidden="true"
            className="
              mx-auto
              h-4
              w-4
              text-slate-600
            "
          />

          <div
            className="
              rounded-xl
              border
              border-emerald-400/10
              bg-emerald-400/[0.035]
              p-3
              text-left
              text-sm
              text-emerald-100/80
            "
          >
            {issue.correctedText}
          </div>
        </div>
      ) : null}

      {issue.explanation ? (
        <p
          className="
            mt-3
            text-xs
            leading-6
            text-slate-500
          "
        >
          {issue.explanation}
        </p>
      ) : null}

      <div
        className="
          mt-4
          flex
          items-start
          gap-2
          rounded-xl
          border
          border-cyan-400/10
          bg-cyan-400/[0.035]
          p-3
        "
      >
        <Lightbulb
          aria-hidden="true"
          className="
            mt-1
            h-4
            w-4
            shrink-0
            text-cyan-300
          "
        />

        <p
          className="
            text-sm
            leading-6
            text-cyan-100/80
          "
        >
          {issue.suggestion}
        </p>
      </div>
    </article>
  );
}