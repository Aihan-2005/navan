import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import type {
  WritingAnalysisMetric,
  WritingAnalysisResult,
  WritingParagraphRole,
} from "../../types/writing.types";

type WritingAiDiagnosisPanelProps =
  Readonly<{
    analysis:
      WritingAnalysisResult;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

function getParagraphRoleLabel(
  role:
    WritingParagraphRole,
): string {
  switch (
    role
  ) {
    case "introduction":
      return "مقدمه";

    case "body":
      return "بدنه";

    case "conclusion":
      return "جمع‌بندی";

    case "single":
      return "پاراگراف اصلی";

    case "other":
      return "بخش دیگر";
  }
}

export function WritingAiDiagnosisPanel({
  analysis,
}: WritingAiDiagnosisPanelProps) {
  const strengths =
    analysis.strengths ??
    createLegacyStrengths(
      analysis,
    );

  const priorities =
    analysis.priorities ??
    createLegacyPriorities(
      analysis,
    );

  return (
    <section
      aria-label="تحلیل عمیق نوشته"
      className="space-y-6"
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
          تحلیل این مرحله با Engine آزمایشی Frontend تولید شده است. Contract برای اتصال AI واقعی آماده است و Backend بعداً همین ساختار را با `engine: "ai"` برمی‌گرداند.
        </div>
      ) : null}

      {analysis.aiCoach ? (
        <Card
          className="
            relative
            overflow-hidden
            border-violet-400/15
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
              <div>
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

                  مربی Writing
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
                  {
                    analysis.aiCoach
                      .headline
                  }
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
                  {
                    analysis.aiCoach
                      .diagnosis
                  }
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
                  className="
                    mt-1
                    block
                    text-3xl
                    text-white
                  "
                >
                  {
                    analysis.aiCoach
                      .estimatedCefrLevel
                  }
                </strong>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-slate-600
                  "
                >
                  اطمینان{" "}
                  {numberFormatter.format(
                    Math.round(
                      analysis.aiCoach
                        .confidencePercent,
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
                  analysis.aiCoach
                    .nextFocus
                }
              />

              <DiagnosisBox
                label="هدف جلسه بعد"
                value={
                  analysis.aiCoach
                    .nextSessionGoal
                }
              />
            </div>

            <p
              className="
                mt-5
                rounded-xl
                bg-violet-400/[0.04]
                px-4
                py-3
                text-xs
                leading-6
                text-violet-100/75
              "
            >
              {
                analysis.aiCoach
                  .encouragement
              }
            </p>
          </div>
        </Card>
      ) : null}

      {analysis.documentStats ? (
        <Card className="p-6">
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
              xl:grid-cols-4
            "
          >
            <Stat
              label="کلمه"
              value={numberFormatter.format(
                analysis.documentStats
                  .wordCount,
              )}
            />

            <Stat
              label="جمله"
              value={numberFormatter.format(
                analysis.documentStats
                  .sentenceCount,
              )}
            />

            <Stat
              label="پاراگراف"
              value={numberFormatter.format(
                analysis.documentStats
                  .paragraphCount,
              )}
            />

            <Stat
              label="میانگین طول جمله"
              value={`${numberFormatter.format(
                analysis.documentStats
                  .averageSentenceLength,
              )} کلمه`}
            />

            <Stat
              label="تنوع واژگان"
              value={`${numberFormatter.format(
                analysis.documentStats
                  .uniqueWordRatio,
              )}٪`}
            />

            <Stat
              label="Lexical Density"
              value={`${numberFormatter.format(
                analysis.documentStats
                  .lexicalDensity,
              )}٪`}
            />

            <Stat
              label="کاراکتر"
              value={numberFormatter.format(
                analysis.documentStats
                  .characterCount,
              )}
            />

            <Stat
              label="امتیاز کلی"
              value={`${numberFormatter.format(
                analysis.overallScore,
              )}٪`}
            />
          </div>
        </Card>
      ) : null}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <FeedbackPanel
          icon={
            CheckCircle2
          }
          title="نقاط قوت"
          items={
            strengths
          }
          tone="success"
        />

        <FeedbackPanel
          icon={
            Target
          }
          title="اولویت‌های بهبود"
          items={
            priorities
          }
          tone="warning"
        />
      </div>

      {analysis.taskAchievement ? (
        <Card className="p-6">
          <div
            className="
              flex
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
              {
                analysis.taskAchievement
                  .score
              }
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
            {
              analysis.taskAchievement
                .summary
            }
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
                analysis.taskAchievement
                  .coveredPoints
              }
              emptyText="مورد مشخصی ثبت نشده است."
            />

            <PointList
              title="موارد قابل توسعه"
              items={
                analysis.taskAchievement
                  .missingPoints
              }
              emptyText="نکته مهمی برای تکمیل موضوع ثبت نشده است."
            />
          </div>
        </Card>
      ) : null}

      {analysis.errorPatterns &&
      analysis.errorPatterns.length >
        0 ? (
        <Card className="p-6">
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
            {analysis.errorPatterns.map(
              (
                pattern,
              ) => (
                <article
                  key={
                    pattern.id
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
                      {
                        pattern.title
                      }
                    </h3>

                    <span
                      className="
                        rounded-full
                        bg-amber-400/[0.07]
                        px-2
                        py-1
                        text-[10px]
                        text-amber-300
                      "
                    >
                      ×
                      {
                        pattern.occurrenceCount
                      }
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
                      bg-cyan-400/[0.035]
                      px-3
                      py-2
                      text-xs
                      leading-6
                      text-cyan-100/75
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
        </Card>
      ) : null}

      {analysis.paragraphFeedback &&
      analysis.paragraphFeedback.length >
        0 ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-violet-300
            "
          >
            <FileText
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
              تحلیل پاراگراف‌ها
            </h2>
          </div>

          <div
            className="
              mt-5
              space-y-3
            "
          >
            {analysis.paragraphFeedback.map(
              (
                paragraph,
              ) => (
                <article
                  key={
                    paragraph.paragraphIndex
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
                      flex-wrap
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        پاراگراف{" "}
                        {
                          paragraph.paragraphIndex
                        }
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-violet-300
                        "
                      >
                        {getParagraphRoleLabel(
                          paragraph.role,
                        )}
                      </p>
                    </div>

                    <strong
                      className="
                        text-sm
                        text-white
                      "
                    >
                      {
                        paragraph.score
                      }
                      ٪
                    </strong>
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
                      paragraph.summary
                    }
                  </p>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-cyan-200/75
                    "
                  >
                    {
                      paragraph.suggestion
                    }
                  </p>
                </article>
              ),
            )}
          </div>
        </Card>
      ) : null}

      {analysis.rewriteChanges &&
      analysis.rewriteChanges.length >
        0 ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-emerald-300
            "
          >
            <Sparkles
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
              تغییرات بازنویسی
            </h2>
          </div>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            {analysis.rewriteChanges.map(
              (
                change,
              ) => (
                <article
                  key={
                    change.id
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
                      grid
                      gap-3
                      lg:grid-cols-2
                    "
                    dir="ltr"
                  >
                    <div
                      className="
                        rounded-xl
                        bg-red-400/[0.035]
                        p-3
                        text-left
                        text-xs
                        leading-6
                        text-red-100/75
                      "
                    >
                      {
                        change.before
                      }
                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-emerald-400/[0.035]
                        p-3
                        text-left
                        text-xs
                        leading-6
                        text-emerald-100/75
                      "
                    >
                      {
                        change.after
                      }
                    </div>
                  </div>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {change.reason}
                  </p>
                </article>
              ),
            )}
          </div>
        </Card>
      ) : null}
    </section>
  );
}

function createLegacyStrengths(
  analysis:
    WritingAnalysisResult,
) {
  return [
    analysis.grammar,
    analysis.vocabulary,
    analysis.coherence,
    analysis.clarity,
    analysis.tone,
  ]
    .sort(
      (
        first,
        second,
      ) =>
        second.score -
        first.score,
    )
    .slice(
      0,
      2,
    )
    .map(
      (
        metric,
        index,
      ) => ({
        id:
          `legacy-strength-${index}`,

        title:
          metric.label,

        description:
          metric.detail,

        evidence:
          `امتیاز ${metric.score}٪`,
      }));
}

function createLegacyPriorities(
  analysis:
    WritingAnalysisResult,
) {
  return [
    analysis.grammar,
    analysis.vocabulary,
    analysis.coherence,
    analysis.clarity,
    analysis.tone,
  ]
    .sort(
      (
        first,
        second,
      ) =>
        first.score -
        second.score,
    )
    .slice(
      0,
      2,
    )
    .map(
      (
        metric,
        index,
      ) => ({
        id:
          `legacy-priority-${index}`,

        title:
          metric.label,

        description:
          `برای بهبود نتیجه بعدی روی ${metric.label} تمرکز بیشتری داشته باش.`,

        evidence:
          `امتیاز ${metric.score}٪`,
      }));
}

function DiagnosisBox({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string;
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
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          leading-7
          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string;
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
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-lg
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

function FeedbackPanel({
  icon: Icon,
  title,
  items,
  tone,
}: Readonly<{
  icon:
    typeof CheckCircle2;

  title:
    string;

  items:
    readonly {
      id:
        string;

      title:
        string;

      description:
        string;

      evidence:
        string | null;
    }[];

  tone:
    "success" | "warning";
}>) {
  return (
    <Card className="p-6">
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Icon
          aria-hidden="true"
          className={
            tone ===
            "success"
              ? "h-5 w-5 text-emerald-300"
              : "h-5 w-5 text-amber-300"
          }
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

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {items.map(
          (
            item,
          ) => (
            <article
              key={
                item.id
              }
              className="
                rounded-xl
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
                  text-slate-500
                "
              >
                {item.description}
              </p>

              {item.evidence ? (
                <p
                  className="
                    mt-2
                    text-[10px]
                    text-slate-600
                  "
                >
                  {item.evidence}
                </p>
              ) : null}
            </article>
          ),
        )}
      </div>
    </Card>
  );
}

function PointList({
  title,
  items,
  emptyText,
}: Readonly<{
  title:
    string;

  items:
    readonly string[];

  emptyText:
    string;
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

      {items.length >
      0 ? (
        <ul
          className="
            mt-3
            space-y-2
          "
        >
          {items.map(
            (
              item,
            ) => (
              <li
                key={
                  item
                }
                className="
                  flex
                  items-start
                  gap-2
                  text-xs
                  leading-6
                  text-slate-500
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
            ),
          )}
        </ul>
      ) : (
        <p
          className="
            mt-3
            text-xs
            leading-6
            text-slate-600
          "
        >
          {emptyText}
        </p>
      )}
    </div>
  );
}