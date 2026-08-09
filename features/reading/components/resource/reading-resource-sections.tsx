import Link from "next/link";

import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  Clock3,
  Headphones,
  Languages,
  LockKeyhole,
  Play,
  RotateCcw,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  READING_AUDIO_STATUS_LABELS,
  READING_SECTION_STATUS_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingSectionStatus,
  ReadingSectionSummary,
} from "../../types/reading.types";

type ReadingResourceSectionsProps =
  Readonly<{
    resourceId: string;

    sections:
      readonly ReadingSectionSummary[];

    completedSections: number;

    totalSections: number;

    progressPercent: number;
  }>;

type SectionActionConfig =
  Readonly<{
    label: string;
    icon: typeof Play;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function getSectionAction(
  status: ReadingSectionStatus,
): SectionActionConfig {
  switch (status) {
    case "completed":
      return {
        label: "مرور دوباره",
        icon: RotateCcw,
      };

    case "in_progress":
      return {
        label: "ادامه مطالعه",
        icon: Play,
      };

    case "available":
      return {
        label: "شروع مطالعه",
        icon: Play,
      };

    case "locked":
      return {
        label: "قفل‌شده",
        icon: LockKeyhole,
      };
  }
}

function getSectionIcon(
  status: ReadingSectionStatus,
) {
  switch (status) {
    case "completed":
      return CheckCircle2;

    case "locked":
      return LockKeyhole;

    case "available":
    case "in_progress":
      return BookOpenText;
  }
}

function getSectionStatusClasses(
  status: ReadingSectionStatus,
): string {
  switch (status) {
    case "completed":
      return [
        "border-emerald-400/15",
        "bg-emerald-400/[0.035]",
      ].join(" ");

    case "in_progress":
      return [
        "border-cyan-400/20",
        "bg-cyan-400/[0.045]",
      ].join(" ");

    case "available":
      return [
        "border-white/[0.08]",
        "bg-white/[0.025]",
      ].join(" ");

    case "locked":
      return [
        "border-white/[0.05]",
        "bg-white/[0.015]",
        "opacity-65",
      ].join(" ");
  }
}

export function ReadingResourceSections({
  resourceId,
  sections,
  completedSections,
  totalSections,
  progressPercent,
}: ReadingResourceSectionsProps) {
  if (sections.length === 0) {
    return (
      <Card className="p-8 text-center">
        <BookOpenText
          aria-hidden="true"
          className="
            mx-auto h-8 w-8
            text-slate-600
          "
        />

        <h2
          className="
            mt-4 text-lg
            font-bold text-white
          "
        >
          هنوز بخشی آماده نشده است
        </h2>

        <p
          className="
            mt-2 text-sm
            leading-7 text-slate-500
          "
        >
          بخش‌های این منبع بعد از پایان
          پردازش در این قسمت نمایش داده
          می‌شوند.
        </p>
      </Card>
    );
  }

  const sortedSections = [
    ...sections,
  ].sort(
    (firstSection, secondSection) =>
      firstSection.order -
      secondSection.order,
  );

  return (
    <section
      aria-labelledby="reading-resource-sections-title"
    >
      <div
        className="
          flex flex-col gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <div
            className="
              flex items-center gap-2
              text-cyan-300
            "
          >
            <BookOpenText
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm font-medium
              "
            >
              مسیر مطالعه
            </span>
          </div>

          <h2
            id="reading-resource-sections-title"
            className="
              mt-2 text-2xl
              font-bold text-white
            "
          >
            بخش‌های منبع
          </h2>

          <p
            className="
              mt-2 max-w-2xl
              text-sm leading-7
              text-slate-500
            "
          >
            Sectionها به‌ترتیب باز می‌شوند.
            بخش‌های تکمیل‌شده را می‌توانی
            دوباره مرور کنی و مطالعه فعلی را
            از همان جایی که مانده ادامه بدهی.
          </p>
        </div>

        <div
          className="
            min-w-64 rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-4
          "
        >
          <div
            className="
              flex items-center
              justify-between gap-4
            "
          >
            <span
              className="
                text-xs text-slate-500
              "
            >
              پیشرفت منبع
            </span>

            <span
              className="
                text-xs font-bold
                text-white
              "
            >
              {numberFormatter.format(
                completedSections,
              )}{" "}
              از{" "}
              {numberFormatter.format(
                totalSections,
              )}
            </span>
          </div>

          <Progress
            value={progressPercent}
            label="پیشرفت مطالعه منبع"
            className="mt-3"
          />

          <p
            className="
              mt-2 text-left
              text-[11px]
              text-slate-600
            "
          >
            {numberFormatter.format(
              progressPercent,
            )}
            ٪
          </p>
        </div>
      </div>

      <div
        className="
          mt-6 space-y-4
        "
      >
        {sortedSections.map(
          (section, index) => {
            const isLocked =
              section.status ===
              "locked";

            const SectionIcon =
              getSectionIcon(
                section.status,
              );

            const action =
              getSectionAction(
                section.status,
              );

            const ActionIcon =
              action.icon;

            const sectionHref =
              `/reading/resources/${encodeURIComponent(
                resourceId,
              )}/sections/${encodeURIComponent(
                section.id,
              )}`;

            return (
              <div
                key={section.id}
                className="relative"
              >
                {index <
                sortedSections.length -
                  1 ? (
                  <div
                    aria-hidden="true"
                    className="
                      absolute right-[2.15rem]
                      top-[4.7rem]
                      hidden h-[calc(100%-2.2rem)]
                      w-px
                      bg-white/[0.06]
                      sm:block
                    "
                  />
                ) : null}

                <Card
                  className={cn(
                    "relative overflow-hidden",
                    "p-5 sm:p-6",
                    getSectionStatusClasses(
                      section.status,
                    ),
                  )}
                >
                  <div
                    className="
                      flex flex-col gap-5
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >
                    <div
                      className="
                        flex min-w-0
                        items-start gap-4
                      "
                    >
                      <div
                        className={cn(
                          "relative z-10",
                          "flex h-12 w-12",
                          "shrink-0 items-center",
                          "justify-center",
                          "rounded-2xl border",

                          section.status ===
                            "completed" && [
                            "border-emerald-400/20",
                            "bg-emerald-400/10",
                            "text-emerald-300",
                          ],

                          section.status ===
                            "in_progress" && [
                            "border-cyan-400/20",
                            "bg-cyan-400/10",
                            "text-cyan-300",
                          ],

                          section.status ===
                            "available" && [
                            "border-violet-400/15",
                            "bg-violet-400/10",
                            "text-violet-300",
                          ],

                          isLocked && [
                            "border-white/[0.06]",
                            "bg-white/[0.035]",
                            "text-slate-600",
                          ],
                        )}
                      >
                        <SectionIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </div>

                      <div className="min-w-0">
                        <div
                          className="
                            flex flex-wrap
                            items-center gap-2
                          "
                        >
                          <span
                            className="
                              text-xs
                              text-slate-600
                            "
                          >
                            بخش{" "}
                            {numberFormatter.format(
                              section.order,
                            )}
                          </span>

                          <span
                            className={cn(
                              "rounded-full",
                              "px-2.5 py-1",
                              "text-[10px]",
                              "font-medium",

                              section.status ===
                                "completed"
                                ? [
                                    "bg-emerald-400/10",
                                    "text-emerald-300",
                                  ]
                                : section.status ===
                                    "in_progress"
                                  ? [
                                      "bg-cyan-400/10",
                                      "text-cyan-300",
                                    ]
                                  : section.status ===
                                      "available"
                                    ? [
                                        "bg-violet-400/10",
                                        "text-violet-300",
                                      ]
                                    : [
                                        "bg-white/[0.04]",
                                        "text-slate-600",
                                      ],
                            )}
                          >
                            {
                              READING_SECTION_STATUS_LABELS[
                                section.status
                              ]
                            }
                          </span>
                        </div>

                        <h3
                          className="
                            mt-2 text-lg
                            font-bold text-white
                          "
                        >
                          {section.title}
                        </h3>

                        <p
                          className="
                            mt-2 max-w-3xl
                            text-sm leading-7
                            text-slate-500
                          "
                        >
                          {section.summary}
                        </p>

                        <div
                          className="
                            mt-4 flex
                            flex-wrap gap-x-4
                            gap-y-2 text-xs
                            text-slate-600
                          "
                        >
                          <span
                            className="
                              inline-flex
                              items-center gap-1.5
                            "
                          >
                            <BookOpenText
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />

                            {numberFormatter.format(
                              section.wordCount,
                            )}{" "}
                            کلمه
                          </span>

                          <span
                            className="
                              inline-flex
                              items-center gap-1.5
                            "
                          >
                            <Clock3
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />

                            {numberFormatter.format(
                              section.estimatedMinutes,
                            )}{" "}
                            دقیقه
                          </span>

                          <span
                            className="
                              inline-flex
                              items-center gap-1.5
                            "
                          >
                            <Languages
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />

                            {numberFormatter.format(
                              section.vocabularyCount,
                            )}{" "}
                            واژه
                          </span>

                          <span
                            className="
                              inline-flex
                              items-center gap-1.5
                            "
                          >
                            <Headphones
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />

                            {
                              READING_AUDIO_STATUS_LABELS[
                                section.audioStatus
                              ]
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isLocked ? (
                        <div
                          className="
                            inline-flex min-h-11
                            items-center
                            justify-center gap-2
                            rounded-xl border
                            border-white/[0.06]
                            bg-white/[0.025]
                            px-4 py-2.5
                            text-sm font-medium
                            text-slate-600
                          "
                        >
                          <LockKeyhole
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          {action.label}
                        </div>
                      ) : (
                        <Link
                          href={sectionHref}
                          className={cn(
                            "inline-flex min-h-11",
                            "items-center",
                            "justify-center gap-2",
                            "rounded-xl px-4",
                            "py-2.5 text-sm",
                            "font-bold transition",
                            "focus-visible:outline-none",
                            "focus-visible:ring-2",
                            "focus-visible:ring-cyan-300",

                            section.status ===
                              "completed"
                              ? [
                                  "border",
                                  "border-emerald-400/15",
                                  "bg-emerald-400/10",
                                  "text-emerald-200",
                                  "hover:bg-emerald-400/15",
                                ]
                              : [
                                  "bg-cyan-400",
                                  "text-slate-950",
                                  "hover:bg-cyan-300",
                                ],
                          )}
                        >
                          <ActionIcon
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          {action.label}

                          <ArrowLeft
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}