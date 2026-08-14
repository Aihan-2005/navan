import Link from "next/link";

import {
  FileUp,
  Lightbulb,
} from "lucide-react";

import type {
  ReadingOverview as ReadingOverviewData,
} from "../../types/reading.types";

type ReadingOverviewSidePanelProps =
  Readonly<{
    weeklyGoal:
      ReadingOverviewData["weeklyGoal"];

    insight:
      ReadingOverviewData["primaryInsight"];
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function ReadingOverviewSidePanel({
   weeklyGoal,
  insight,
}: ReadingOverviewSidePanelProps) {
  const sectionProgress =
    Math.min(
      100,
      Math.max(
        0,
        Math.round(
          (weeklyGoal.completedSections /
            weeklyGoal.targetSections) *
            100,
        ),
      ),
    );

  return (
    <aside
      className="
        space-y-8
      "
      aria-label="خلاصه پیشرفت و پیشنهاد Reading"
    >
      <section
        className="
          rounded-2xl
          border
          border-[#E2E8F0]
          bg-white
          p-6
           shadow-[0_2px_6px_rgba(15,23,42,0.035)]
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xs
                font-medium
                tracking-[0.05em]
                text-[#7E22CE]
              "
            >
              هدف این هفته
            </p>

            <h2
              className="
                mt-2
                text-base
                font-normal
                leading-6
                text-[#1E293B]
              " >
              تکمیل{" "}
              {numberFormatter.format(
                weeklyGoal.targetSections,
              )}{" "}
              بخش جدید
            </h2>
          </div>

          <strong
            className="
              text-[22px]
              font-bold
              leading-[30px]
              text-[#1E293B]
            "
          >
            {numberFormatter.format(
              weeklyGoal.completedSections,
            )}
            /
            {numberFormatter.format(
              weeklyGoal.targetSections,
            )}
          </strong>
        </div>

        <p
          className="
            mt-5
           text-sm
            leading-[22px]
            text-[#64748B]
          "
        >
          دو بخش دیگر از داستان فعلی را کامل کن و حداقل{" "}
          {numberFormatter.format(
            weeklyGoal.targetNewWords,
          )}{" "}
          واژه جدید را در Context مرور کن.
        </p>

        <div
          role="progressbar"
          aria-label="پیشرفت هدف هفتگی"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={
            sectionProgress
          }
          className="
            mt-5
            h-2.5
            overflow-hidden
            rounded-full
            bg-[#F1F5F9]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-[#7E22CE]
              transition-[width]
              duration-500
            "
            style={{
              width:
                `${sectionProgress}%`,
            }}
          />
        </div>
      </section>

      <section
        className="
          rounded-2xl
          border
          border-[#F3E8FF]
          bg-[#FAF5FF]/80
          p-6
          shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[#7E22CE]
          "
        >
          <Lightbulb
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h2
            className="
              text-sm
              font-medium
            "
          >
            پیشنهاد مربی هوشمند
          </h2>
        </div>

        <p
          className="
            mt-5
            text-sm
            leading-[22px]
            text-[#334155]
          "
        >
          {insight?.description ??
            "بعد از چند جلسه مطالعه، پیشنهادهای شخصی‌سازی‌شده در این قسمت نمایش داده می‌شوند."}
        </p>

        <div
          className="
            mt-5
            flex
            h-10
            items-center
            justify-center
            rounded-xl
            border
            border-[#E9D5FF]
            bg-white
            text-sm
            text-[#7E22CE]
            shadow-[0_1px_2px_rgba(0,0,0,0.05)]
          "
        >
          {insight?.actionLabel ??
            "مشاهده پیشنهادها"}
        </div>
      </section>
<section
        className="
          flex
          min-h-[206px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-[#CBD5E1]
          bg-white
          p-6
          text-center
          shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#F1F5F9]
            text-[#64748B]"
        >
          <FileUp
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <h2
          className="
            mt-4
            text-base
            font-normal
            leading-6
            text-[#1E293B]
          "
        >
          منبع خودت را وارد کن
        </h2>

        <p
          className="
            mt-2
            text-xs
            tracking-[0.05em]
            text-[#64748B]
          "
        >
          پشتیبانی از PDF، متن و تصویر
        </p><Link
          href="/reading/upload"
          className="
            mt-5
            inline-flex
            h-8
            items-center
            justify-center
            rounded-xl
            bg-[#F1F5F9]
            px-5
            text-xs
            font-medium
            text-[#64748B]
            transition
            hover:bg-[#E8EEF3]
            hover:text-[#00685F]
          "
        >
          انتخاب فایل
        </Link>
      </section>
    </aside>
  );
}