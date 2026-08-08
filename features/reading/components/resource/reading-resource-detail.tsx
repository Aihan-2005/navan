import Link from "next/link";
import {
  BookOpenText,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Languages,
  LoaderCircle,
  Lock,
  Play,
  Sparkles,
  TriangleAlert,
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
  READING_PROCESSING_PIPELINE,
  READING_PROCESSING_STATUS_LABELS,
  READING_RESOURCE_TYPE_LABELS,
  READING_SECTION_STATUS_LABELS,
  READING_SOURCE_FILE_KIND_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingProcessingPipelineStep,
} from "../../constants/reading.constants";

import type {
  ReadingProcessingStatus,
  ReadingResourceDetail as ReadingResourceDetailData,
} from "../../types/reading.types";

type ReadingResourceDetailProps =
  Readonly<{
    resource:
      ReadingResourceDetailData;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function formatFileSize(
  bytes: number,
): string {
  const megabytes =
    bytes / (1024 * 1024);

  return `${numberFormatter.format(
    megabytes,
  )} مگابایت`;
}


type ReadingPipelineStepState =
  | "completed"
  | "active"
  | "upcoming";

function getPipelineStepState(
  currentStatus: ReadingProcessingStatus,
  step: ReadingProcessingPipelineStep,
): ReadingPipelineStepState {
  
  if (currentStatus === "failed") {
    return "upcoming";
  }

  const currentIndex =
    READING_PROCESSING_PIPELINE.indexOf(
      currentStatus,
    );

  const stepIndex =
    READING_PROCESSING_PIPELINE.indexOf(
      step,
    );

  if (stepIndex < currentIndex) {
    return "completed";
  }

  if (stepIndex === currentIndex) {
    return "active";
  }

  return "upcoming";
}



export function ReadingResourceDetail({
  resource,
}: ReadingResourceDetailProps) {
  const isProcessing =
    resource.status === "processing";

  const isReady =
    resource.processingStatus ===
    "ready";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-72 w-72 rounded-full
            bg-cyan-500/15 blur-3xl
          "
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full
                bg-cyan-400/10
                px-3 py-1 text-xs
                text-cyan-200
              "
            >
              {
                READING_RESOURCE_TYPE_LABELS[
                  resource.resourceType
                ]
              }
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3 py-1 text-xs
                text-slate-400
              "
            >
              سطح {resource.cefrLevel}
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3 py-1 text-xs
                text-slate-400
              "
            >
              {
                READING_PROCESSING_STATUS_LABELS[
                  resource.processingStatus
                ]
              }
            </span>
          </div>

          <h1
            className="
              mt-5 text-3xl font-bold
              leading-tight text-white
              sm:text-4xl
            "
            dir="ltr"
          >
            {resource.title}
          </h1>

          {resource.author ? (
            <p
              className="mt-2 text-sm text-slate-600"
              dir="ltr"
            >
              {resource.author}
            </p>
          ) : null}

          {resource.description ? (
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-400">
              {resource.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3
                aria-hidden="true"
                className="h-4 w-4"
              />

              {numberFormatter.format(
                resource.estimatedMinutes,
              )}{" "}
              دقیقه
            </span>

            <span className="flex items-center gap-1.5">
              <BookOpenText
                aria-hidden="true"
                className="h-4 w-4"
              />

              {numberFormatter.format(
                resource.totalSections,
              )}{" "}
              بخش
            </span>

            <span className="flex items-center gap-1.5">
              <Languages
                aria-hidden="true"
                className="h-4 w-4"
              />

              {numberFormatter.format(
                resource.totalWords,
              )}{" "}
              کلمه
            </span>
          </div>
        </div>
      </section>

      {isProcessing ? (
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-amber-300">
            <LoaderCircle
              aria-hidden="true"
              className="h-5 w-5 animate-spin"
            />

            آماده‌سازی منبع
          </div>

          <h2 className="mt-3 text-xl font-bold text-white">
            هوش مصنوعی در حال پردازش فایل است
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            استخراج متن، تشخیص سطح، بخش‌بندی محتوایی،
            تحلیل جمله‌ها و ساخت صوت در چند مرحله انجام
            می‌شوند.
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                پیشرفت کلی
              </span>

              <span className="text-sm font-bold text-white">
                {numberFormatter.format(
                  resource.processingProgress,
                )}
                ٪
              </span>
            </div>

            <Progress
              value={
                resource.processingProgress
              }
              label="پیشرفت پردازش منبع"
            />
          </div>

          <div
            className="
              mt-6 grid gap-3
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {READING_PROCESSING_PIPELINE.map(
              (step, index) => {
                const state =
                  getPipelineStepState(
                    resource.processingStatus,
                    step,
                  );

                return (
                  <div
                    key={step}
                    className={cn(
                      "rounded-xl border p-4",

                      state ===
                        "completed" && [
                        "border-emerald-400/15",
                        "bg-emerald-400/[0.05]",
                      ],

                      state ===
                        "active" && [
                        "border-cyan-400/20",
                        "bg-cyan-400/[0.06]",
                      ],

                      state ===
                        "upcoming" && [
                        "border-white/[0.06]",
                        "bg-white/[0.02]",
                      ],
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9",
                          "items-center justify-center",
                          "rounded-xl",

                          state ===
                            "completed"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : state ===
                                "active"
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-white/[0.04] text-slate-600",
                        )}
                      >
                        {state ===
                        "completed" ? (
                          <Check
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        ) : state ===
                          "active" ? (
                          <LoaderCircle
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <span className="text-xs">
                            {numberFormatter.format(
                              index + 1,
                            )}
                          </span>
                        )}
                      </span>

                      <span className="text-sm text-slate-300">
                        {
                          READING_PROCESSING_STATUS_LABELS[
                            step
                          ]
                        }
                      </span>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {resource.processingWarnings.length >
          0 ? (
            <div
              className="
                mt-6 rounded-xl
                border border-amber-400/15
                bg-amber-400/[0.04]
                px-4 py-3
              "
            >
              <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                <TriangleAlert
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                نکات پردازش
              </div>

              <ul className="mt-2 space-y-1.5">
                {resource.processingWarnings.map(
                  (warning) => (
                    <li
                      key={warning}
                      className="text-xs leading-6 text-amber-100/60"
                    >
                      • {warning}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </Card>
      ) : null}

      {resource.originalFilename ? (
        <Card className="p-5">
          <div className="flex items-center gap-2 text-violet-300">
            <FileText
              aria-hidden="true"
              className="h-5 w-5"
            />

            اطلاعات فایل
          </div>

          <dl
            className="
              mt-5 grid gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <FileMetadata
              label="نام فایل"
              value={
                resource.originalFilename
              }
            />

            <FileMetadata
              label="فرمت"
              value={
                resource.sourceFileKind
                  ? READING_SOURCE_FILE_KIND_LABELS[
                      resource
                        .sourceFileKind
                    ]
                  : "-"
              }
            />

            <FileMetadata
              label="حجم"
              value={
                resource.sizeBytes
                  ? formatFileSize(
                      resource.sizeBytes,
                    )
                  : "-"
              }
            />

            <FileMetadata
              label="زبان"
              value={
                resource.languageCode
              }
            />
          </dl>
        </Card>
      ) : null}

      {isReady ? (
        <>
          <section>
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span className="text-sm font-medium">
                مسیر مطالعه
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white">
              بخش‌های آماده یادگیری
            </h2>

            <div className="mt-5 space-y-4">
              {resource.sections.map(
                (section) => {
                  const isLocked =
                    section.status ===
                    "locked";

                  return (
                    <Card
                      key={section.id}
                      className={cn(
                        "p-5",

                        isLocked &&
                          "opacity-60",
                      )}
                    >
                      <div
                        className="
                          flex flex-col gap-4
                          lg:flex-row
                          lg:items-center
                          lg:justify-between
                        "
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-11 w-11 shrink-0",
                              "items-center justify-center",
                              "rounded-xl",

                              section.status ===
                                "completed"
                                ? "bg-emerald-400/10 text-emerald-300"
                                : isLocked
                                  ? "bg-white/[0.04] text-slate-600"
                                  : "bg-cyan-400/10 text-cyan-300",
                            )}
                          >
                            {section.status ===
                            "completed" ? (
                              <CheckCircle2
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            ) : isLocked ? (
                              <Lock
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            ) : (
                              <Play
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            )}
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              بخش{" "}
                              {numberFormatter.format(
                                section.order,
                              )}
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-white">
                              {section.title}
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-slate-500">
                              {section.summary}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
                              <span>
                                {numberFormatter.format(
                                  section.wordCount,
                                )}{" "}
                                کلمه
                              </span>

                              <span>
                                {numberFormatter.format(
                                  section.estimatedMinutes,
                                )}{" "}
                                دقیقه
                              </span>

                              <span>
                                {numberFormatter.format(
                                  section.vocabularyCount,
                                )}{" "}
                                لغت کلیدی
                              </span>

                              <span>
                                {numberFormatter.format(
                                  section.grammarPointCount,
                                )}{" "}
                                نکته گرامری
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <p className="text-xs text-slate-500">
                            {
                              READING_SECTION_STATUS_LABELS[
                                section.status
                              ]
                            }
                          </p>

                          <p className="mt-1 text-[11px] text-slate-700">
                            صوت:{" "}
                            {
                              READING_AUDIO_STATUS_LABELS[
                                section.audioStatus
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                },
              )}
            </div>
          </section>

          <Card className="p-5 text-center">
            <p className="text-sm text-slate-500">
              Workspace مطالعه مرحله‌ای، صوت و تحلیل
              جمله‌ها در مرحله بعد پیاده‌سازی می‌شود.
            </p>
          </Card>
        </>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/reading/library"
          className="
            inline-flex min-h-11
            items-center justify-center
            rounded-xl border
            border-white/[0.08]
            bg-white/[0.04]
            px-5 py-2.5 text-sm
            text-slate-300 transition
            hover:bg-white/[0.08]
          "
        >
          بازگشت به کتابخانه
        </Link>

        <Link
          href="/reading/upload"
          className="
            inline-flex min-h-11
            items-center justify-center
            rounded-xl bg-cyan-400
            px-5 py-2.5 text-sm
            font-bold text-slate-950
            transition hover:bg-cyan-300
          "
        >
          آپلود منبع دیگر
        </Link>
      </div>
    </main>
  );
}

function FileMetadata({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.06]
        bg-white/[0.025]
        px-4 py-3
      "
    >
      <dt className="text-xs text-slate-600">
        {label}
      </dt>

      <dd
        className="
          mt-2 truncate
          text-sm font-medium
          text-slate-300
        "
        dir="auto"
      >
        {value}
      </dd>
    </div>
  );
}