import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Target,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  WritingAnalysisResult,
  WritingFeedbackPoint,
} from "../../types/writing.types";

type WritingAiDiagnosisPanelProps =
  Readonly<{
    analysis: WritingAnalysisResult;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function WritingAiDiagnosisPanel({
  analysis,
}: WritingAiDiagnosisPanelProps) {
  const coach = analysis.aiCoach;

  const strengths =
    analysis.strengths ??
    createFallbackStrengths(
      analysis,
    );

  const priorities =
    analysis.priorities ??
    createFallbackPriorities(
      analysis,
    );

  return (
    <section
      aria-label="تحلیل عمیق نوشته"
      className="space-y-6"
      dir="rtl"
    >
      {analysis.engine ===
      "mock" ? (
        <div
          className="
            rounded-xl
            border
            border-amber-400/15
            bg-amber-400/[0.04]
            px-4
            py-3
            text-xs
            leading-6
            text-amber-200
          "
        >
          تحلیل فعلی با موتور آزمایشی
          Frontend تولید شده است. ساختار
          داده برای اتصال AI واقعی آماده
          است.
        </div>
      ) : null}

      {coach ? (
        <article
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-violet-400/15
            bg-slate-950/60
            p-6
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
                flex-col
                gap-6
                lg:flex-row
                lg:items-start
                lg:justify-between
              "
            >
              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-violet-300
                  "
                >
                  <BrainCircuit
                    aria-hidden="true"
                    className="h-5 w-5"
                  />

                  <span className="text-sm">
                    مربی Writing
                  </span>
                </div>

                <h2
                  className="
                    mt-3
                    max-w-3xl
                    text-xl
                    font-bold
                    leading-8
                    text-white
                  "
                >
                  {coach.headline}
                </h2>

                <p
                  className="
                    mt-4
                    max-w-3xl
                    text-sm
                    leading-8
                    text-slate-400
                  "
                >
                  {coach.diagnosis}
                </p>
              </div>

              <div
                className="
                  shrink-0
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  سطح تخمینی
                </p>

                <strong
                  dir="ltr"
                  className="
                    mt-1
                    block
                    text-3xl
                    text-white
                  "
                >
                  {
                    coach
                      .estimatedCefrLevel
                  }
                </strong>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-slate-500
                  "
                >
                  اطمینان{" "}
                  {numberFormatter.format(
                    Math.round(
                      coach.confidencePercent,
                    ),
                  )}
                  ٪
                </p>
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                gap-3
                md:grid-cols-2
              "
            >
              <DiagnosisBox
                label="تمرکز بعدی"
                value={
                  coach.nextFocus
                }
              />

              <DiagnosisBox
                label="هدف جلسه بعد"
                value={
                  coach.nextSessionGoal
                }
              />
            </div>

            <p
              className="
                mt-5
                rounded-xl
                bg-violet-400/[0.05]
                px-4
                py-3
                text-xs
                leading-7
                text-violet-200
              "
            >
              {coach.encouragement}
            </p>
          </div>
        </article>
      ) : (
        <article
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
              text-cyan-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              تحلیل هوشمند
            </h2>
          </div>

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
        </article>
      )}

      {analysis.documentStats ? (
        <DocumentStats
          analysis={analysis}
        />
      ) : null}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <FeedbackPanel
          icon={CheckCircle2}
          title="نقاط قوت"
          items={strengths}
          tone="success"
          emptyText="نقطه قوت مشخصی ثبت نشده است."
        />

        <FeedbackPanel
          icon={Target}
          title="اولویت‌های بهبود"
          items={priorities}
          tone="warning"
          emptyText="اولویت مشخصی برای بهبود ثبت نشده است."
        />
      </div>

      {analysis.taskAchievement ? (
        <TaskAchievementCard
          analysis={analysis}
        />
      ) : null}

      {analysis.errorPatterns &&
      analysis.errorPatterns.length >
        0 ? (
        <ErrorPatternsCard
          analysis={analysis}
        />
      ) : null}
    </section>
  );
}

function DiagnosisBox({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <p
        className="
          text-xs
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-medium
          leading-7
          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}

function DocumentStats({
  analysis,
}: Readonly<{
  analysis: WritingAnalysisResult;
}>) {
  const stats =
    analysis.documentStats;

  if (!stats) {
    return null;
  }

  const items = [
    {
      label: "کلمه",
      value:
        numberFormatter.format(
          stats.wordCount,
        ),
    },
    {
      label: "جمله",
      value:
        numberFormatter.format(
          stats.sentenceCount,
        ),
    },
    {
      label: "پاراگراف",
      value:
        numberFormatter.format(
          stats.paragraphCount,
        ),
    },
    {
      label:
        "میانگین طول جمله",
      value: `${numberFormatter.format(
        stats.averageSentenceLength,
      )} کلمه`,
    },
    {
      label: "تنوع واژگان",
      value: `${numberFormatter.format(
        stats.uniqueWordRatio,
      )}٪`,
    },
    {
      label:
        "تراکم واژگانی",
      value: `${numberFormatter.format(
        stats.lexicalDensity,
      )}٪`,
    },
  ];

  return (
    <article
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
          text-cyan-300
        "
      >
        <BarChart3
          aria-hidden="true"
          className="h-5 w-5"
        />

        <h2
          className="
            text-lg
            font-bold
            text-white
          "
        >
          ساختار نوشته
        </h2>
      </div>

      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              p-4
            "
          >
            <p
              className="
                text-xs
                text-slate-500
              "
            >
              {item.label}
            </p>

            <strong
              className="
                mt-2
                block
                text-lg
                text-white
              "
            >
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function TaskAchievementCard({
  analysis,
}: Readonly<{
  analysis: WritingAnalysisResult;
}>) {
  const task =
    analysis.taskAchievement;

  if (!task) {
    return null;
  }

  return (
    <article
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
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-cyan-300
          "
        >
          <Target
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h2
            className="
              text-lg
              font-bold
              text-white
            "
          >
            پاسخ به موضوع
          </h2>
        </div>

        <strong
          className="
            text-xl
            text-white
          "
        >
          {numberFormatter.format(
            task.score,
          )}
          ٪
        </strong>
      </div>

      <p
        className="
          mt-4
          text-sm
          leading-8
          text-slate-400
        "
      >
        {task.summary}
      </p>

      <div
        className="
          mt-5
          grid
          gap-4
          lg:grid-cols-2
        "
      >
        <PointList
          title="موارد پوشش داده‌شده"
          items={
            task.coveredPoints
          }
          emptyText="مورد مشخصی ثبت نشده است."
        />

        <PointList
          title="موارد قابل توسعه"
          items={
            task.missingPoints
          }
          emptyText="مورد مهمی برای توسعه باقی نمانده است."
        />
      </div>
    </article>
  );
}

function ErrorPatternsCard({
  analysis,
}: Readonly<{
  analysis: WritingAnalysisResult;
}>) {
  const patterns =
    analysis.errorPatterns;

  if (
    !patterns ||
    patterns.length === 0
  ) {
    return null;
  }

  return (
    <article
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
          text-amber-300
        "
      >
        <AlertTriangle
          aria-hidden="true"
          className="h-5 w-5"
        />

        <h2
          className="
            text-lg
            font-bold
            text-white
          "
        >
          الگوهای قابل بهبود
        </h2>
      </div>

      <div
        className="
          mt-5
          grid
          gap-4
          md:grid-cols-2
        "
      >
        {patterns.map(
          (pattern) => (
            <article
              key={pattern.id}
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
                  items-center
                  justify-between
                  gap-3
                "
              >
                <h3
                  className="
                    font-semibold
                    text-white
                  "
                >
                  {pattern.title}
                </h3>

                <span
                  className="
                    rounded-full
                    bg-amber-400/[0.08]
                    px-2
                    py-1
                    text-[10px]
                    text-amber-300
                  "
                >
                  ×
                  {numberFormatter.format(
                    pattern.occurrenceCount,
                  )}
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-xs
                  leading-6
                  text-slate-500
                "
              >
                {
                  pattern.explanation
                }
              </p>

              <p
                className="
                  mt-3
                  rounded-xl
                  bg-cyan-400/[0.05]
                  px-3
                  py-2
                  text-xs
                  leading-6
                  text-cyan-200
                "
              >
                {
                  pattern.recommendation
                }
              </p>
            </article>
          ),
        )}
      </div>
    </article>
  );
}

type FeedbackPanelProps =
  Readonly<{
    icon: LucideIcon;

    title: string;

    items:
      readonly WritingFeedbackPoint[];
 tone:
      | "success"
      | "warning";

    emptyText: string;
  }>;

function FeedbackPanel({
  icon: Icon,
  title,
  items,
  tone,
  emptyText,
}: FeedbackPanelProps) {
  const isSuccess =
    tone === "success";

  return (
    <article
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-950/60
        p-6
      "
    >
      <div
        className={`
          flex
          items-center
          gap-2
          ${
            isSuccess
              ? "text-emerald-300"
              : "text-amber-300"
          }
        `}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />

        <h2
          className="
            text-lg
            font-bold
            text-white
          "
        >
          {title}
        </h2>
      </div>

      {items.length > 0 ? (
        <div
          className="
            mt-5
            space-y-3
          "
        >
          {items.map(
            (item) => (
              <article
                key={item.id}
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-slate-400
                  "
                >
                  {
                    item.description
                  }
                </p>

                {item.evidence ? (
                  <p
                    dir="auto"
                    className="
                      mt-3
                      rounded-lg
                      bg-white/[0.035]
                      px-3
                      py-2
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {item.evidence}
                  </p>
                ) : null}
              </article>
            ),
          )}
        </div>
      ) : (
        <p
          className="
            mt-4
            text-sm
            leading-7
            text-slate-500
          "
        >
          {emptyText}
        </p>
      )}
    </article>
  );
}

function PointList({
  title,
  items,
  emptyText,
}: Readonly<{
  title: string;

  items:
    readonly string[];

  emptyText: string;
}>) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <p
        className="
          text-sm
          font-semibold
          text-white
        "
      >
        {title}
      </p>

      {items.length > 0 ? (
        <ul
          className="
            mt-3
            space-y-2
          "
        >
          {items.map((item) => (
            <li
              key={item}
              className="
                flex
                items-start
                gap-2
                text-xs
                leading-6
                text-slate-400
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-2.5
                  h-1
                  w-1
                  shrink-0
                  rounded-full
                  bg-cyan-300
                "
              />

              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="
            mt-3
            text-xs
            leading-6
            text-slate-500
          "
        >
          {emptyText}
        </p>
      )}
    </div>
  );
}

function createFallbackStrengths(
  analysis: WritingAnalysisResult,
): readonly WritingFeedbackPoint[] {
  return [
    analysis.grammar,
    analysis.vocabulary,
    analysis.coherence,
    analysis.clarity,
    analysis.tone,
  ]
    .slice()
    .sort(
      (first, second) =>
        second.score -
        first.score,
    )
    .slice(0, 2)
    .map(
      (metric, index) => ({
        id:
          `fallback-strength-${index}`,

        title: metric.label,

        description:
          metric.detail,

        evidence:
          `امتیاز ${numberFormatter.format(
            metric.score,
          )}٪`,
      }),
    );
}

function createFallbackPriorities(
  analysis: WritingAnalysisResult,
): readonly WritingFeedbackPoint[] {
  return [
    analysis.grammar,
    analysis.vocabulary,
    analysis.coherence,
    analysis.clarity,
    analysis.tone,
  ]
    .slice()
    .sort(
      (first, second) =>
        first.score -
        second.score,
    )
    .slice(0, 2)
    .map(
      (metric, index) => ({
        id:
          `fallback-priority-${index}`,

        title: metric.label,

        description:
          metric.detail,

        evidence:
          `امتیاز ${numberFormatter.format(
            metric.score,
          )}٪`,
      }),
    );
}