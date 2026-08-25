import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  WritingWeakPoint,
} from "../../types/writing.types";

type WritingWeakPointsProps =
  Readonly<{
    weakPoints:
      readonly WritingWeakPoint[];
    className?: string;
  }>;

const SEVERITY_STYLES = {
  "کم":
    "bg-[#FEF9C3] text-[#854D0E]",
  "متوسط":
    "bg-[#DBEAFE] text-[#1D4ED8]",
  "زیاد":
    "bg-[#FEE2E2] text-[#B91C1C]",
} satisfies Record<
  WritingWeakPoint["severity"],
  string
>;

export function WritingWeakPoints({
  weakPoints,
  className,
}: WritingWeakPointsProps) {
  return (
    <article
      className={cn(
        `
          min-h-[470px]
          h-full
          rounded-3xl
          border
          border-[#EBEFF3]
          bg-white
          p-6
        `,
        className,
      )}
      dir="rtl"
    >
      <header>
        <h3
          className="
            text-lg
            font-bold
            leading-7
            text-[#111827]
          "
        >
          نقاط ضعف نوشتاری
        </h3>

        <p
          className="
            mt-1
            text-sm
            font-normal
            leading-5
            text-[#6B7280]
          "
        >
          حوزه‌هایی که برای رشد بیشتر ارزش دارند.
        </p>
      </header>

      <div
        className="
          mt-6
          space-y-4
        "
      >
        {weakPoints.slice(0, 3).map(
          (weakPoint) => (
            <div
              key={weakPoint.id}
              className="
                rounded-2xl
                border
                border-[#EBEFF3]
                bg-[#F7F9FB80]
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
                <h4
                  className="
                    text-base
                    font-bold
                    leading-6
                    text-[#111827]
                  "
                >
                  {weakPoint.title}
                </h4>

                <span
                  className={cn(
                    `
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      leading-4
                    `,
                    SEVERITY_STYLES[
                      weakPoint.severity
                    ],
                  )}
                >
                  {weakPoint.severity}
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-normal
                  leading-[22.75px]
                  text-[#4B5563]
                "
              >
                {weakPoint.description}
              </p>
            </div>
          ),
        )}
      </div>
    </article>
  );
}