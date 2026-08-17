import {
  BrainCircuit,
} from "lucide-react";

import type {
  WritingAnalysisMetric,
  WritingAnalysisResult,
} from "../../types/writing.types";

import {
  AnalysisScoreCard,
} from "./analysis-score-card";

type AnalysisScoreOverviewProps =
  Readonly<{
    analysis:
      WritingAnalysisResult;

    date:
      string;
  }>;

export function AnalysisScoreOverview({
  analysis,
  date,
}: AnalysisScoreOverviewProps) {
  const metrics:
    WritingAnalysisMetric[] =
    [
      analysis.grammar,
      analysis.vocabulary,
      analysis.coherence,
      analysis.clarity,
      analysis.tone,

      ...(analysis.taskResponse
        ? [
            analysis.taskResponse,
          ]
        : []),

      ...(analysis.organization
        ? [
            analysis.organization,
          ]
        : []),

      ...(analysis.style
        ? [
            analysis.style,
          ]
        : []),
    ];

  return (
    <section
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
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-cyan-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-4 w-4"
            />

            ارزیابی کلی
          </div>

          <p
            className="
              mt-3
              text-4xl
              font-bold
              text-white
            "
          >
            {analysis.overallScore}
            ٪
          </p>

          {analysis.estimatedCefrLevel ? (
            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              سطح تخمینی Writing:{" "}
              <strong
                className="
                  font-semibold
                  text-violet-300
                "
              >
                {
                  analysis.estimatedCefrLevel
                }
              </strong>

              {analysis.confidencePercent !==
              undefined
                ? ` • اطمینان ${Math.round(
                    analysis.confidencePercent,
                  )}٪`
                : ""}
            </p>
          ) : null}
        </div>

        <div
          className="
            text-sm
            text-slate-500
          "
        >
          تاریخ: {date}
        </div>
      </div>

      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {metrics.map(
          (
            metric,
          ) => (
            <AnalysisScoreCard
              key={
                metric.label
              }
              metric={
                metric
              }
            />
          ),
        )}
      </div>
    </section>
  );
}