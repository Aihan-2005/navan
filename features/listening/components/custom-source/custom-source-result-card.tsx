import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import {
  CUSTOM_AUDIO_STATUS_LABELS,
} from "../../constants/listening-custom-source.constants";

import type {
  CustomListeningSourceResult,
} from "../../types/listening-custom-source.types";

type CustomSourceResultCardProps =
  Readonly<{
    result:
      CustomListeningSourceResult;
  }>;

export function CustomSourceResultCard({
  result,
}: CustomSourceResultCardProps) {
  const isReady =
    result.status ===
      "ready" &&
    result.contentId !==
      null;

  const isFailed =
    result.status ===
    "failed";

  const isProcessing =
    !isReady &&
    !isFailed;

  return (
    <div
      className="
        mt-5
        rounded-2xl
        border
        border-[#D8E5E2]
        bg-[#F8FBFA]
        p-5
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              isReady
                ? "bg-[#ECFDF5] text-[#047857]"
                : isFailed
                  ? "bg-[#FEF2F2] text-[#B91C1C]"
                  : "bg-[#EFF6FF] text-[#2563EB]"
            }
          `}
        >
          {isReady ? (
            <CheckCircle2
              aria-hidden="true"
              className="h-5 w-5"
            />
          ) : isFailed ? (
            <XCircle
              aria-hidden="true"
              className="h-5 w-5"
            />
          ) : (
            <Clock3
              aria-hidden="true"
              className="h-5 w-5"
            />
          )}
        </div>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-black
              text-[#0F172A]
            "
          >
            {result.title}
          </p>

          <p
            className="
              mt-1
              text-xs
              font-bold
              text-[#00685F]
            "
          >
            {
              CUSTOM_AUDIO_STATUS_LABELS[
                result.status
              ]
            }
          </p>

          <p
            className="
              mt-3
              text-xs
              leading-6
              text-[#64748B]
            "
          >
            {isReady
              ? "پردازش کامل شده و Content آماده تمرین است."
              : isFailed
                ? "Backend نتوانست فایل را پردازش کند."
                : "فایل ثبت شده و پردازش Transcript و Segmentها به‌صورت Job انجام می‌شود."}
          </p>

          {isProcessing ? (
            <div
              className="
                mt-4
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#EFF6FF]
                px-3
                py-2.5
                text-xs
                text-[#1D4ED8]
              "
            >
              <LoaderCircle
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />

              Job ID:
              {" "}
              <code
                dir="ltr"
                className="
                  break-all
                  font-bold
                "
              >
                {result.jobId}
              </code>
            </div>
          ) : null}
        </div>
      </div>

      {result.warnings.length >
      0 ? (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-[#F4D9A4]
            bg-[#FFFBEB]
            px-4
            py-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-black
              text-[#B45309]
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
              mt-2
              space-y-1.5
            "
          >
            {result.warnings.map(
              (warning) => (
                <li
                  key={
                    warning
                  }
                  className="
                    text-xs
                    leading-6
                    text-[#785B2A]
                  "
                >
                  • {warning}
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}

      {isReady ? (
        <Link
          href={`/listening/practice/${encodeURIComponent(
            result.contentId!,
          )}`}
          className="
            mt-5
            inline-flex
            min-h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#00685F]
            px-4
            py-2
            text-xs
            font-black
            text-white
            transition
            hover:bg-[#005A52]
          "
        >
          شروع تمرین

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      ) : null}
    </div>
  );
}