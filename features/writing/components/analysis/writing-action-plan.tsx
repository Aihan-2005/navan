import {
  Clock3,
  ListChecks,
} from "lucide-react";

import type {
  WritingAnalysisResult,
} from "../../types/writing.types";

type WritingActionPlanProps =
  Readonly<{
    analysis:
      WritingAnalysisResult;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function WritingActionPlan({
  analysis,
}: WritingActionPlanProps) {
  const actionPlan =
    analysis.actionPlan ??
    [];

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-950/60
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <ListChecks
          aria-hidden="true"
          className="
            h-5
            w-5
            text-emerald-300
          "
        />

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          برنامه تمرین بعدی
        </h2>
      </div>

      {actionPlan.length >
      0 ? (
        <div
          className="
            mt-5
            space-y-3
          "
        >
          {[...actionPlan]
            .sort(
              (
                first,
                second,
              ) =>
                first.priority -
                second.priority,
            )
            .map(
              (
                item,
              ) => (
                <article
                  key={
                    item.id
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-400/10
                        text-xs
                        font-bold
                        text-emerald-300
                      "
                    >
                      {numberFormatter.format(
                        item.priority,
                      )}
                    </span>

                    <div className="flex-1">
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-2
                        "
                      >
                        <h3
                          className="
                            font-semibold
                            text-white
                          "
                        >
                          {item.title}
                        </h3>

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1
                            text-[10px]
                            text-slate-600
                          "
                        >
                          <Clock3
                            aria-hidden="true"
                            className="h-3 w-3"
                          />

                          {numberFormatter.format(
                            item.estimatedMinutes,
                          )}{" "}
                          دقیقه
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          text-xs
                          leading-6
                          text-slate-500
                        "
                      >
                        {item.description}
                      </p>

                      <span
                        dir="ltr"
                        className="
                          mt-3
                          inline-block
                          rounded-lg
                          bg-cyan-400/[0.05]
                          px-2
                          py-1
                          text-[10px]
                          text-cyan-300
                        "
                      >
                        {item.focus}
                      </span>
                    </div>
                  </div>
                </article>
              ),
            )}
        </div>
      ) : (
        <p
          className="
            mt-4
            text-sm
            leading-8
            text-slate-400
          "
        >
          {analysis.nextPractice}
        </p>
      )}
    </div>
  );
}