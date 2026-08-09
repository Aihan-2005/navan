import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  CloudUpload,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  READING_PROCESSING_STATUS_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingUploadResult,
} from "../../types/reading-upload.types";

export type ReadingUploadUiPhase =
  | "idle"
  | "uploading"
  | "processing"
  | "error";

type ReadingUploadProgressProps =
  Readonly<{
    phase:
      ReadingUploadUiPhase;

    uploadProgress: number;

    result:
      ReadingUploadResult | null;

    errorMessage:
      string | null;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function ReadingUploadProgress({
  phase,
  uploadProgress,
  result,
  errorMessage,
}: ReadingUploadProgressProps) {
  if (phase === "idle") {
    return null;
  }

  if (phase === "error") {
    return (
      <Card
        className="
          border-red-400/15
          bg-red-400/[0.035]
          p-5 sm:p-6
        "
      >
        <div
          className="
            flex items-start gap-3
          "
        >
          <span
            className="
              flex h-10 w-10
              shrink-0 items-center
              justify-center
              rounded-xl
              bg-red-400/10
              text-red-300
            "
          >
            <CircleAlert
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
              Upload کامل نشد
            </h2>

            <p
              className="
                mt-2 text-sm
                leading-7
                text-red-100/60
              "
            >
              {errorMessage ??
                "هنگام Upload فایل خطایی رخ داد."}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (phase === "uploading") {
    return (
      <Card className="p-5 sm:p-6">
        <div
          className="
            flex items-center
            gap-3
          "
        >
          <span
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <CloudUpload
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
              در حال ارسال فایل
            </h2>

            <p
              className="
                mt-1 text-xs
                text-slate-500
              "
            >
              تا پایان انتقال، صفحه را
              نبند.
            </p>
          </div>
        </div>

        <div className="mt-5">
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
              Upload
            </span>

            <strong
              className="
                text-sm text-white
              "
            >
              {numberFormatter.format(
                uploadProgress,
              )}
              ٪
            </strong>
          </div>

          <Progress
            value={uploadProgress}
            label="پیشرفت Upload فایل"
          />
        </div>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Card
      className="
        border-cyan-400/15
        bg-cyan-400/[0.03]
        p-5 sm:p-6
      "
    >
      <div
        className="
          flex flex-col gap-5
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div
          className="
            flex items-start gap-3
          "
        >
          <span
            className="
              flex h-11 w-11
              shrink-0 items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <div
              className="
                flex flex-wrap
                items-center gap-2
              "
            >
              <h2
                className="
                  font-bold text-white
                "
              >
                فایل دریافت شد
              </h2>

              <span
                className="
                  inline-flex
                  items-center gap-1
                  rounded-full
                  bg-emerald-400/10
                  px-2.5 py-1
                  text-[10px]
                  text-emerald-300
                "
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                Upload موفق
              </span>
            </div>

            <p
              className="
                mt-2 text-sm
                leading-7
                text-slate-500
              "
            >
              فایل روی Server دریافت شده
              و پردازش AI شروع شده است.
            </p>
          </div>
        </div>

        <Link
          href={`/reading/resources/${encodeURIComponent(
            result.resourceId,
          )}`}
          className="
            inline-flex min-h-11
            shrink-0 items-center
            justify-center gap-2
            rounded-xl
            bg-cyan-400
            px-4 py-2.5
            text-sm font-bold
            text-slate-950
            transition
            hover:bg-cyan-300
          "
        >
          مشاهده منبع

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>

      <div className="mt-6">
        <div
          className="
            flex items-center
            justify-between gap-4
          "
        >
          <span
            className="
              inline-flex
              items-center gap-2
              text-xs
              text-slate-400
            "
          >
            <LoaderCircle
              aria-hidden="true"
              className="
                h-4 w-4
                animate-spin
                text-cyan-300
              "
            />

            {
              READING_PROCESSING_STATUS_LABELS[
                result.processingStatus
              ]
            }
          </span>

          <strong
            className="
              text-sm text-white
            "
          >
            {numberFormatter.format(
              result.processingProgress,
            )}
            ٪
          </strong>
        </div>

        <Progress
          value={
            result.processingProgress
          }
          label="پیشرفت پردازش AI"
          className="mt-3"
        />
      </div>

      {result.warnings.length >
      0 ? (
        <div
          className="
            mt-5 rounded-xl
            border
            border-amber-400/15
            bg-amber-400/[0.04]
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs font-medium
              text-amber-300
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
              mt-3 space-y-2
            "
          >
            {result.warnings.map(
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
  );
}