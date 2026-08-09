import Link from "next/link";

import {
  BookOpenText,
  Check,
  Clock3,
  FileText,
  Languages,
  LoaderCircle,
  Sparkles,
  TriangleAlert,
  XCircle,
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
  READING_PROCESSING_PIPELINE,
  READING_PROCESSING_STATUS_LABELS,
  READING_RESOURCE_STATUS_LABELS,
  READING_RESOURCE_TYPE_LABELS,
  READING_SOURCE_FILE_KIND_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingProcessingPipelineStep,
} from "../../constants/reading.constants";

import type {
  ReadingProcessingStatus,
  ReadingResourceDetail as ReadingResourceDetailData,
} from "../../types/reading.types";

import {
  ReadingResourceSections,
} from "./reading-resource-sections";

type ReadingResourceDetailProps =
  Readonly<{
    resource:
      ReadingResourceDetailData;
  }>;

type ReadingPipelineStepState =
  | "completed"
  | "active"
  | "upcoming";

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function formatFileSize(
  bytes: number,
): string {
  const megabytes =
    bytes / (1024 * 1024);

  return `${numberFormatter.format(
    Number(
      megabytes.toFixed(1),
    ),
  )} مگابایت`;
}

function getPipelineStepState(
  currentStatus:
    ReadingProcessingStatus,
  step:
    ReadingProcessingPipelineStep,
): ReadingPipelineStepState {
  if (
    currentStatus === "failed"
  ) {
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

  if (
    stepIndex < currentIndex
  ) {
    return "completed";
  }

  if (
    stepIndex === currentIndex
  ) {
    return "active";
  }

  return "upcoming";
}

export function ReadingResourceDetail({
  resource,
}: ReadingResourceDetailProps) {
  const isFailed =
    resource.status === "failed" ||
    resource.processingStatus ===
      "failed";

  const isProcessing =
    resource.status ===
      "processing" &&
    !isFailed;

  const isReady =
    resource.status === "ready" &&
    resource.processingStatus ===
      "ready";

  const isComingSoon =
    resource.status ===
    "coming_soon";

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
    >
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
            pointer-events-none
            absolute -left-24 -top-24
            h-72 w-72
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-28 right-10
            h-64 w-64
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex flex-wrap
              items-center gap-2
            "
          >
            <span
              className="
                rounded-full
                bg-cyan-400/10
                px-3 py-1
                text-xs
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
                px-3 py-1
                text-xs
                text-slate-400
              "
            >
              سطح {resource.cefrLevel}
            </span>

            <span
              className={cn(
                "rounded-full",
                "px-3 py-1",
                "text-xs",

                isReady && [
                  "bg-emerald-400/10",
                  "text-emerald-300",
                ],

                isProcessing && [
                  "bg-amber-400/10",
                  "text-amber-300",
                ],

                isFailed && [
                  "bg-red-400/10",
                  "text-red-300",
                ],

                isComingSoon && [
                  "bg-violet-400/10",
                  "text-violet-300",
                ],
              )}
            >
              {
                READING_RESOURCE_STATUS_LABELS[
                  resource.status
                ]
              }
            </span>
          </div>

          <h1
            dir="ltr"
            className="
              mt-5 text-left
              text-3xl font-bold
              leading-tight text-white
              sm:text-4xl
            "
          >
            {resource.title}
          </h1>

          {resource.author ? (
            <p
              dir="ltr"
              className="
                mt-2 text-left
                text-sm text-slate-600
              "
            >
              {resource.author}
            </p>
          ) : null}

          {resource.description ? (
            <p
              className="
                mt-4 max-w-3xl
                text-sm leading-8
                text-slate-400
              "
            >
              {resource.description}
            </p>
          ) : null}

          <div
            className="
              mt-6 flex
              flex-wrap gap-4
              text-xs
              text-slate-500
            "
          >
            <span
              className="
                flex items-center
                gap-1.5
              "
            >
              <Clock3
                aria-hidden="true"
                className="h-4 w-4"
              />

              {numberFormatter.format(
                resource.estimatedMinutes,
              )}{" "}
              دقیقه
            </span>

            <span
              className="
                flex items-center
                gap-1.5
              "
            >
              <BookOpenText
                aria-hidden="true"
                className="h-4 w-4"
              />

              {numberFormatter.format(
                resource.totalSections,
              )}{" "}
              بخش
            </span>

            <span
              className="
                flex items-center
                gap-1.5
              "
            >
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

          {resource.topics.length >
          0 ? (
            <div
              className="
                mt-6 flex
                flex-wrap gap-2
              "
            >
              {resource.topics.map(
                (topic) => (
                  <span
                    key={topic}
                    className="
                      rounded-full
                      border
                      border-white/[0.06]
                      bg-white/[0.025]
                      px-3 py-1.5
                      text-xs
                      text-slate-500
                    "
                  >
                    {topic}
                  </span>
                ),
              )}
            </div>
          ) : null}
        </div>
      </section>

      {resource.learningFocuses
        .length > 0 ? (
        <Card className="p-5 sm:p-6">
          <div
            className="
              flex items-center
              gap-2 text-violet-300
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-sm font-medium
              "
            >
              تمرکزهای آموزشی
            </h2>
          </div>

          <div
            className="
              mt-4 flex
              flex-wrap gap-2
            "
          >
            {resource.learningFocuses.map(
              (focus) => (
                <span
                  key={focus}
                  dir="ltr"
                  className="
                    rounded-xl
                    border
                    border-violet-400/10
                    bg-violet-400/[0.05]
                    px-3 py-2
                    text-xs
                    text-violet-200
                  "
                >
                  {focus}
                </span>
              ),
            )}
          </div>
        </Card>
      ) : null}

      {isProcessing ? (
        <Card className="p-5 sm:p-6">
          <div
            className="
              flex items-center
              gap-2 text-amber-300
            "
          >
            <LoaderCircle
              aria-hidden="true"
              className="
                h-5 w-5
                animate-spin
              "
            />

            آماده‌سازی منبع
          </div>

          <h2
            className="
              mt-3 text-xl
              font-bold text-white
            "
          >
            هوش مصنوعی در حال پردازش
            فایل است
          </h2>

          <p
            className="
              mt-2 text-sm
              leading-7 text-slate-500
            "
          >
            استخراج متن، تشخیص سطح،
            بخش‌بندی محتوایی، تحلیل
            جمله‌ها و آماده‌سازی صوت
            در چند مرحله انجام می‌شوند.
          </p>

          <div className="mt-6">
            <div
              className="
                mb-2 flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                پیشرفت کلی
              </span>

              <span
                className="
                  text-sm font-bold
                  text-white
                "
              >
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
                      "rounded-xl",
                      "border p-4",

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
                    <div
                      className="
                        flex items-center
                        gap-3
                      "
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9",
                          "items-center",
                          "justify-center",
                          "rounded-xl",

                          state ===
                            "completed"
                            ? [
                                "bg-emerald-400/10",
                                "text-emerald-300",
                              ]
                            : state ===
                                "active"
                              ? [
                                  "bg-cyan-400/10",
                                  "text-cyan-300",
                                ]
                              : [
                                  "bg-white/[0.04]",
                                  "text-slate-600",
                                ],
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
                            className="
                              h-4 w-4
                              animate-spin
                            "
                          />
                        ) : (
                          <span
                            className="
                              text-xs
                            "
                          >
                            {numberFormatter.format(
                              index + 1,
                            )}
                          </span>
                        )}
                      </span>

                      <span
                        className="
                          text-sm
                          text-slate-300
                        "
                      >
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

          {resource.processingWarnings
            .length > 0 ? (
            <div
              className="
                mt-6 rounded-xl
                border
                border-amber-400/15
                bg-amber-400/[0.04]
                px-4 py-3
              "
            >
              <div
                className="
                  flex items-center
                  gap-2 text-xs
                  font-medium
                  text-amber-200
                "
              >
                <TriangleAlert
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                نکات پردازش
              </div>

              <ul
                className="
                  mt-2 space-y-1.5
                "
              >
                {resource.processingWarnings.map(
                  (warning) => (
                    <li
                      key={warning}
                      className="
                        text-xs
                        leading-6
                        text-amber-100/60
                      "
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

      {isFailed ? (
        <Card
          className="
            border-red-400/15
            bg-red-400/[0.035]
            p-5 sm:p-6
          "
        >
          <div
            className="
              flex items-start gap-4
            "
          >
            <span
              className="
                flex h-11 w-11
                shrink-0 items-center
                justify-center
                rounded-xl
                bg-red-400/10
                text-red-300
              "
            >
              <XCircle
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <div>
              <h2
                className="
                  font-bold text-white
                "
              >
                پردازش منبع کامل نشد
              </h2>

              <p
                className="
                  mt-2 text-sm
                  leading-7
                  text-slate-500
                "
              >
                هنگام آماده‌سازی این منبع
                مشکلی رخ داده است. اطلاعات
                فایل حفظ شده و بعداً می‌توان
                امکان پردازش مجدد را به
                Backend متصل کرد.
              </p>

              {resource.processingWarnings
                .length > 0 ? (
                <ul
                  className="
                    mt-4 space-y-2
                  "
                >
                  {resource.processingWarnings.map(
                    (warning) => (
                      <li
                        key={warning}
                        className="
                          text-xs
                          leading-6
                          text-red-200/60
                        "
                      >
                        • {warning}
                      </li>
                    ),
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </Card>
      ) : null}

      {isComingSoon ? (
        <Card className="p-6 text-center">
          <BookOpenText
            aria-hidden="true"
            className="
              mx-auto h-8 w-8
              text-violet-300
            "
          />

          <h2
            className="
              mt-4 text-lg
              font-bold text-white
            "
          >
            این منبع به‌زودی آماده می‌شود
          </h2>

          <p
            className="
              mx-auto mt-2
              max-w-xl text-sm
              leading-7
              text-slate-500
            "
          >
            محتوای این منبع هنوز برای
            مطالعه منتشر نشده است.
          </p>
        </Card>
      ) : null}

      {resource.originalFilename ? (
        <Card className="p-5">
          <div
            className="
              flex items-center
              gap-2 text-violet-300
            "
          >
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
        <ReadingResourceSections
          resourceId={resource.id}
          sections={resource.sections}
          completedSections={
            resource.completedSections
          }
          totalSections={
            resource.totalSections
          }
          progressPercent={
            resource.progressPercent
          }
        />
      ) : null}

      <div
        className="
          flex flex-wrap gap-3
        "
      >
        <Link
          href="/reading/library"
          className="
            inline-flex min-h-11
            items-center
            justify-center
            rounded-xl border
            border-white/[0.08]
            bg-white/[0.04]
            px-5 py-2.5
            text-sm
            text-slate-300
            transition
            hover:bg-white/[0.08]
            hover:text-white
          "
        >
          بازگشت به کتابخانه
        </Link>

        <Link
          href="/reading/upload"
          className="
            inline-flex min-h-11
            items-center
            justify-center
            rounded-xl
            bg-cyan-400
            px-5 py-2.5
            text-sm font-bold
            text-slate-950
            transition
            hover:bg-cyan-300
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
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.06]
        bg-white/[0.025]
        px-4 py-3
      "
    >
      <dt
        className="
          text-xs text-slate-600
        "
      >
        {label}
      </dt>

      <dd
        dir="auto"
        className="
          mt-2 truncate
          text-sm font-medium
          text-slate-300
        "
      >
        {value}
      </dd>
    </div>
  );
}