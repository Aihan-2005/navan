import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentPlacementSummary,
} from "../../types/assessment-overview.types";

type PlacementTestCardProps =
  Readonly<{
    placement:
      AssessmentPlacementSummary;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function PlacementTestCard({
  placement,
}: PlacementTestCardProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#DFD3F8]
        bg-[linear-gradient(135deg,#FBF9FF_0%,#FFFFFF_58%,#F4F0FF_100%)]
        p-6
        shadow-[0_12px_36px_rgba(113,42,226,0.06)]
        sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-60
          w-60
          rounded-full
          bg-[#712AE2]/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          grid
          gap-7
          lg:grid-cols-[minmax(0,1fr)_310px]
          lg:items-start
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-bold
              text-[#712AE2]
            "
          >
            <Target
              aria-hidden="true"
              className="h-5 w-5"
            />

            تعیین سطح استاندارد
          </div>

          <h2
            className="
              mt-3
              text-2xl
              font-black
              text-[#0F172A]
            "
          >
            {placement.title}
          </h2>

          <p
            className="
              mt-3
              max-w-3xl
              text-sm
              leading-8
              text-[#64748B]
            "
          >
            {placement.description}
          </p>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {placement.skills.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    border
                    border-[#D9CDF5]
                    bg-[#F4F0FF]
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-[#5B21B6]
                  "
                >
                  {
                    ASSESSMENT_SKILL_LABELS[
                      skill
                    ]
                  }
                </span>
              ),
            )}
          </div>

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-3
            "
          >
            <PreparationItem>
              قبل از شروع محیط آرام و
              هدفون مناسب داشته باش.
            </PreparationItem>

            <PreparationItem>
              جواب‌ها را بر اساس دانش
              واقعی خودت بده، نه حدس طولانی.
            </PreparationItem>

            <PreparationItem>
              نتیجه برای تنظیم مسیر
              تمرین‌های بعدی استفاده می‌شود.
            </PreparationItem>
          </div>
        </div>

        <aside
          className="
            rounded-2xl
            border
            border-[#E1D7F7]
            bg-white
            p-4
            shadow-sm
          "
        >
          <p
            className="
              text-xs
              font-black
              text-[#0F172A]
            "
          >
            مشخصات آزمون
          </p>

          <div
            className="
              mt-4
              grid
              grid-cols-2
              gap-3
            "
          >
            <Metric
              icon={Clock3}
              label="زمان تقریبی"
              value={`${numberFormatter.format(
                placement.estimatedMinutes,
              )} دقیقه`}
            />

            <Metric
              icon={ListChecks}
              label="تعداد سؤال"
              value={`${numberFormatter.format(
                placement.questionCount,
              )} سؤال`}
            />

            <Metric
              icon={BrainCircuit}
              label="حالت"
              value={
                placement.mode === "adaptive"
                  ? "تطبیقی"
                  : "ثابت"
              }
            />

            <Metric
              icon={Sparkles}
              label="سطح شروع"
              value={
                placement
                  .recommendedStartingLevel ??
                "خودکار"
              }
            />
          </div>

          <Link
            href={placement.href}
            className="
              mt-4
              inline-flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#712AE2]
              px-5
              text-sm
              font-black
              text-[#FFFFFF]
              transition
              hover:bg-[#5F20C5]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#712AE2]/30
            "
          >
            شروع تعیین سطح

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>

          <p
            className="
              mt-3
              text-center
              text-[10px]
              leading-5
              text-[#64748B]
            "
          >
            در طول آزمون پیشرفت پاسخ‌ها
            ذخیره می‌شود.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof Clock3;
  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#E8E2F5]
        bg-[#FBFAFE]
        p-3
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4
          w-4
          text-[#712AE2]
        "
      />

      <p
        className="
          mt-2
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-xs
          font-black
          text-[#0F172A]
        "
      >
        {value}
      </p>
    </div>
  );
}

function PreparationItem({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="
        flex
        items-start
        gap-2
        rounded-xl
        bg-white/80
        p-3
      "
    >
      <CheckCircle2
        aria-hidden="true"
        className="
          mt-0.5
          h-4
          w-4
          shrink-0
          text-[#00685F]
        "
      />

      <p
        className="
          text-xs
          leading-6
          text-[#52615F]
        "
      >
        {children}
      </p>
    </div>
  );
}
