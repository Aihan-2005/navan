import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  PenLine,
  Sparkles,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  WritingExercise,
} from "../../types/writing.types";

type WritingModeCardProps =
  Readonly<{
    exercise: WritingExercise;
    variant?: "catalog" | "recommended";
    className?: string;
  }>;

const persianNumberFormatter =
  new Intl.NumberFormat("fa-IR");

const DIFFICULTY_STYLES = {
  "مبتدی":
    "bg-[#EADDFF] text-[#25005A]",
  "متوسط":
    "bg-[#ECEEF0] text-[#3D4947]",
  "پیشرفته":
    "bg-[#FFDAD6] text-[#93000A]",
} satisfies Record<
  WritingExercise["difficulty"],
  string
>;

function getCategoryLabel(
  category: string,
): string {
  switch (category) {
    case "استدلال":
      return "استدلالی";

    case "تحلیل":
      return "تحلیلی";

    default:
      return category;
  }
}

function getCategoryClass(
  category: string,
): string {
  switch (category) {
    case "استدلال":
      return "bg-[#DAE2FD] text-[#131B2E]";

    case "تحلیل":
      return "bg-[#ECEEF0] text-[#3D4947]";

    case "رسمی":
      return "bg-[#ECEEF0] text-[#3D4947]";

    default:
      return "bg-[#E0F2F1] text-[#00685F]";
  }
}

export function WritingModeCard({
  exercise,
  variant = "catalog",
  className,
}: WritingModeCardProps) {
  if (variant === "recommended") {
    return (
      <RecommendedWritingCard
        exercise={exercise}
        className={className}
      />
    );
  }

  return (
    <CatalogWritingCard
      exercise={exercise}
      className={className}
    />
  );
}

function RecommendedWritingCard({
  exercise,
  className,
}: Readonly<{
  exercise: WritingExercise;
  className?: string;
}>) {
  return (
    <article
      className={cn(
        `
          flex
          min-h-[271px]
          h-full
          flex-col
          justify-between
          rounded-3xl
          border
          border-[#E2E8F0]
          bg-white
          p-6
          shadow-[0_1px_2px_rgba(0,0,0,0.04)]
        `,
        className,
      )}
      dir="rtl"
    >
      <div>
        <div
          className="
            flex
            min-h-[23px]
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-[#F3E8FF]
                px-3
                py-1
                text-[10px]
                font-bold
                leading-[15px]
                text-[#7E22CE]
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-3 w-3"
              />

              پیشنهادی
            </span>

            <span
              className="
                rounded-md
                bg-[#F1F5F9]
                px-2
                py-1
                text-[10px]
                font-bold
                leading-[15px]
                text-[#475569]
              "
            >
              {exercise.difficulty}
            </span>
          </div>
        </div>

        <p
          className="
            mt-4
            text-xs
            font-bold
            leading-4
            text-[#0D9488]
          "
        >
          {getCategoryLabel(
            exercise.category,
          )}
        </p>

        <h3
          className="
            mt-1
            text-lg
            font-bold
            leading-7
            text-[#0F172A]
          "
        >
          {exercise.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            font-normal
            leading-[22.75px]
            text-[#475569]
          "
        >
          {exercise.description}
        </p>
      </div>

      <footer
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#F1F5F9]
          pt-4
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-1
            text-xs
            font-normal
            leading-4
            text-[#64748B]
          "
        >
          <Clock3
            aria-hidden="true"
            className="h-4 w-4"
          />

          {persianNumberFormatter.format(
            exercise.estimatedMinutes,
          )}{" "}
          دقیقه
        </div>

        <Link
          href={`/writing/exercises/${exercise.id}`}
          aria-label={`شروع تمرین ${exercise.title}`}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#E2E8F0]
            bg-[#F8FAFC]
            text-[#0F766E]
            transition
            hover:border-[#99F6E4]
            hover:bg-[#F0FDFA]
          "
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-5 w-5"
          />
        </Link>
      </footer>
    </article>
  );
}

function CatalogWritingCard({
  exercise,
  className,
}: Readonly<{
  exercise: WritingExercise;
  className?: string;
}>) {
  return (
    <article
      className={cn(
        `
          group
          flex
          min-h-[221px]
          h-full
          flex-col
          justify-between
          rounded-2xl
          border
          border-[#E2E8F0]
          bg-white
          p-6
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          transition
          duration-300
          hover:-translate-y-0.5
          hover:border-[#B7DAD6]
          hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        `,
        className,
      )}
      dir="rtl"
    >
      <div>
        <div
          className="
            flex
            min-h-[22px]
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className={cn(
                `
                  rounded-full
                  px-2
                  py-1
                  text-xs
                  font-normal
                  leading-[14px]
                  tracking-[0.6px]
                `,
                DIFFICULTY_STYLES[
                  exercise.difficulty
                ],
              )}
            >
              {exercise.difficulty}
            </span>

            <span
              className={cn(
                `
                  rounded-full
                  px-2
                  py-1
                  text-xs
                  font-normal
                  leading-[14px]
                  tracking-[0.6px]
                `,
                getCategoryClass(
                  exercise.category,
                ),
              )}
            >
              {getCategoryLabel(
                exercise.category,
              )}
            </span>
          </div>

          <PenLine
            aria-hidden="true"
            className="
              h-5
              w-5
              shrink-0
              text-[#545C72]
            "
            strokeWidth={1.7}
          />
        </div>

        <h3
          className="
            mt-4
            text-[22px]
            font-bold
            leading-[30px]
            text-[#191C1E]
          "
        >
          {exercise.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            font-normal
            leading-5
            text-[#3D4947]
          "
        >
          {exercise.description}
        </p>
      </div>

      <footer
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[#BCC9C64D]
          pt-4
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-4
            text-xs
            font-normal
            leading-[14px]
            tracking-[0.6px]
            text-[#3D4947]
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1
            "
          >
            <Clock3
              aria-hidden="true"
              className="h-3 w-3"
            />

            {persianNumberFormatter.format(
              exercise.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>

          <span>
            {persianNumberFormatter.format(
              exercise.expectedWordCount,
            )}{" "}
            کلمه
          </span>
        </div>

        <Link
          href={`/writing/exercises/${exercise.id}`}
          aria-label={`شروع تمرین ${exercise.title}`}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#F8FAFC]
            text-[#00685F]
            transition
            group-hover:bg-[#D6EDEB]
          "
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </footer>
    </article>
  );
}