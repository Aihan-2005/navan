import {
  Check,
  LockKeyhole,
  Route,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingLearningJourney,
} from "../../types/reading.types";

type ReadingLearningJourneyCardProps =
  Readonly<{
    journey:
      ReadingLearningJourney;
  }>;

export function ReadingLearningJourneyCard({
  journey,
}: ReadingLearningJourneyCardProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white
        p-6 shadow-[0_2px_6px_rgba(15,23,42,0.035)]
      "
      aria-labelledby="reading-journey-title"
    >
      <header
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            id="reading-journey-title"
            className="
              text-lg
              font-bold
              leading-7
              text-[#1E293B]
            "
          >
            {journey.title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-5
              text-[#64748B]
            "
          >
            {
              journey.description
            }
          </p>
        </div>

        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F1F5F9]
            text-[#0D9488]
          "
        >
          <Route
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
        </span>
      </header>

      <ol
        className="
          mt-7
          space-y-0
        "
      >
        {journey.steps.map(
          (
            step,
            index,
          ) => {
            const isCompleted =
              step.status ===
              "completed";

            const isActive =
              step.status ===
              "active";

            const isUpcoming =
              step.status ===
              "upcoming";

       const isLast =
              index ===
              journey.steps.length -
                1;

            return (
              <li
                key={
                  step.id
                }
                className={cn(
                  "relative flex gap-5",

                  !isLast &&
                    "pb-5",

                  isUpcoming &&
                    "opacity-50",
                )}
              >
                <div
                  className="
                    relative
                    flex
                    w-8
                    shrink-0
                    justify-center
                  "
                >
{!isLast ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-8 h-[calc(100%-8px)] w-px",

                        isCompleted ||
                          isActive
                          ? "bg-[#99D8D1]"
                          : "bg-[#E2E8F0]",
                      )}
                    />
                  ) : null}

                  <span
                    className={cn(
                      "relative z-10 flex h-8 w-8 items-center justify-center rounded-full",

                      isCompleted && [
                        "bg-[#0D9488]",
                        "text-white",
                      ],

                      isActive && [
                        "border-2",
                        "border-[#0D9488]",
                        "bg-white",
                        "text-[#0D9488]",
                      ],

                       isUpcoming && [
                        "border",
                        "border-[#E2E8F0]",
                        "bg-[#F1F5F9]",
                        "text-[#94A3B8]",
                      ],
                    )}
                  >
                    {isCompleted ? (
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : null}

                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-[#0D9488]
                        "
                      />
                    ) : null}

                    {isUpcoming ? (
                      <LockKeyhole
                        aria-hidden="true"
                className="h-3.5 w-3.5"
                      />
                    ) : null}
                  </span>
                </div>

                <div
                  className={cn(
                    "min-w-0 flex-1",

                    isActive
                      ? [
                          "-mt-3",
                          "rounded-xl",
                          "border",
                          "border-[#CCFBF1]",
                          "bg-[#F0FDFA]/50",
                          "p-4",
                        ]
                      : "pt-0.5",
                  )}
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-2
                    " >
                    <h3
                      className={cn(
                        "text-sm font-bold tracking-[0.01em]",

                        isActive
                          ? "text-[#0D9488]"
                          : "text-[#334155]",
                      )}
                    >
                      {
                        step.title
                      }
                    </h3>

                    {isActive ? (
                      <span
                        className="
                          rounded-md
                          bg-[#0D9488]
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          text-white
                        "
                      >
                        در حال انجام
                      </span>
                    ) : null}
                  </div>
 <p
                    className={cn(
                      "mt-1.5 text-sm leading-5",

                      isUpcoming
                        ? "text-[#94A3B8]"
                        : "text-[#64748B]",
                    )}
                  >
                    {
                      step.description
                    }
                  </p>
                </div>
              </li>
            );
          },
        )}
      </ol>
    </section>
  );
}