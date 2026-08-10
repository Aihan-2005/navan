import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  Layers3,
  Settings2,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import type {
  AssessmentCefrLevel,
} from "../../types/assessment-question.types";

type CustomAssessmentCardProps =
  Readonly<{
    currentCefrLevel:
      AssessmentCefrLevel | null;
  }>;

export function CustomAssessmentCard({
  currentCefrLevel,
}: CustomAssessmentCardProps) {
  return (
    <Card
      className="
        relative overflow-hidden
        border-cyan-400/15
        bg-cyan-400/[0.035]
        p-6 sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-64 w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex items-center
            gap-2 text-cyan-300
          "
        >
          <Settings2
            aria-hidden="true"
            className="h-5 w-5"
          />

          Custom Assessment
        </div>

        <h2
          className="
            mt-3 text-2xl
            font-bold text-white
          "
        >
          آزمون دلخواه بساز
        </h2>

        <p
          className="
            mt-3 max-w-3xl
            text-sm leading-8
            text-slate-400
          "
        >
          یک Skill یا چند Skill را
          انتخاب کن و نوع آزمون، سطح،
          تعداد سؤال، زمان و میزان
          شخصی‌سازی با سابقه یادگیری را
          مشخص کن.
        </p>

        <div
          className="
            mt-5 grid gap-3
            sm:grid-cols-3
          "
        >
          <Feature
            icon={Layers3}
            title="Multi Skill"
            description="یک یا چند مهارت"
          />

          <Feature
            icon={BrainCircuit}
            title="Adaptive Context"
            description={
              currentCefrLevel
                ? `شروع پیشنهادی ${currentCefrLevel}`
                : "تشخیص خودکار سطح"
            }
          />

          <Feature
            icon={Sparkles}
            title="AI Ready"
            description="آماده اتصال به Question Generator"
          />
        </div>

        <Link
          href="/assessment/custom"
          className="
            mt-6 inline-flex
            min-h-11 items-center
            justify-center gap-2
            rounded-xl
            bg-cyan-400
            px-5 py-2.5
            text-sm font-bold
            text-slate-950
            transition
            hover:bg-cyan-300
          "
        >
          تنظیم آزمون دلخواه

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </Card>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: Readonly<{
  icon: typeof Layers3;

  title: string;
  description: string;
}>) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.06]
        bg-black/10
        p-4
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4 w-4
          text-cyan-300
        "
      />

      <p
        dir="ltr"
        className="
          mt-3 text-left
          text-sm font-bold
          text-white
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1 text-xs
          text-slate-600
        "
      >
        {description}
      </p>
    </div>
  );
}