import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  Clock3,
  Headphones,
  MessagesSquare,
  Newspaper,
  Podcast,
  Radio,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

import {
  LISTENING_ACCENT_LABELS,
  LISTENING_CONTENT_STATUS_LABELS,
  LISTENING_CONTENT_TYPE_LABELS,
} from "../../constants/listening.constants";

import type {
  ListeningContentSummary,
  ListeningContentType,
} from "../../types/listening.types";

type ListeningContentCardProps = Readonly<{
  content: ListeningContentSummary;
}>;

const contentTypeIcons = {
  podcast: Podcast,
  conversation: MessagesSquare,
  story: BookOpenText,
  news: Newspaper,
  interview: BriefcaseBusiness,
  lecture: Radio,
  exam: Headphones,
  custom: Headphones,
} satisfies Record<
  ListeningContentType,
  LucideIcon
>;

const statusStyles = {
  ready:
    "border-emerald-400/15 bg-emerald-400/10 text-emerald-200",

  processing:
    "border-amber-400/15 bg-amber-400/10 text-amber-200",

  coming_soon:
    "border-white/[0.07] bg-white/[0.04] text-slate-500",
} as const;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function formatDuration(
  durationSeconds: number,
): string {
  const minutes = Math.floor(
    durationSeconds / 60,
  );

  const seconds =
    durationSeconds % 60;

  if (seconds === 0) {
    return `${numberFormatter.format(
      minutes,
    )} دقیقه`;
  }

  return `${numberFormatter.format(
    minutes,
  )}:${numberFormatter
    .format(seconds)
    .padStart(2, "۰")}`;
}

export function ListeningContentCard({
  content,
}: ListeningContentCardProps) {
  const ContentIcon =
    contentTypeIcons[content.contentType];

  const practiceHref =
    `/listening/practice/${content.id}`;

  const isReady =
    content.status === "ready";

  const cardContent = (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-5",
        "transition duration-300",

        isReady && [
          "hover:-translate-y-1",
          "hover:border-cyan-400/20",
          "hover:bg-cyan-400/[0.035]",
        ],

        !isReady && "opacity-70",
      )}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-44 w-44 rounded-full bg-cyan-500/10
          opacity-0 blur-3xl transition
          group-hover:opacity-100
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl bg-cyan-400/10 text-cyan-300
            "
          >
            <ContentIcon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {content.isFeatured ? (
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full border
                  border-violet-400/15
                  bg-violet-400/10 px-2.5 py-1
                  text-[10px] font-medium text-violet-200
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                پیشنهادی
              </span>
            ) : null}

            <span
              className={cn(
                "rounded-full border px-2.5 py-1",
                "text-[10px] font-medium",
                statusStyles[content.status],
              )}
            >
              {
                LISTENING_CONTENT_STATUS_LABELS[
                  content.status
                ]
              }
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs font-medium text-cyan-300">
          {
            LISTENING_CONTENT_TYPE_LABELS[
              content.contentType
            ]
          }
        </p>

        <h3 className="mt-2 text-lg font-bold leading-8 text-white">
          {content.title}
        </h3>

        {content.description ? (
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">
            {content.description}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {content.topics
            .slice(0, 3)
            .map((topic) => (
              <span
                key={topic}
                className="
                  rounded-lg bg-white/[0.04]
                  px-2.5 py-1
                  text-[10px] text-slate-500
                "
              >
                {topic}
              </span>
            ))}
        </div>

        <div
          className="
            mt-5 flex flex-wrap items-center gap-4
            border-t border-white/[0.06] pt-4
            text-xs text-slate-500
          "
        >
          <span className="flex items-center gap-1.5">
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {formatDuration(
              content.durationSeconds,
            )}
          </span>

          <span>
            سطح {content.cefrLevel}
          </span>

          <span>
            {
              LISTENING_ACCENT_LABELS[
                content.accent
              ]
            }
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          {content.bestAccuracyScore !== null ? (
            <p className="text-xs text-slate-500">
              بهترین دقت:{" "}
              <span className="font-semibold text-emerald-300">
                {numberFormatter.format(
                  content.bestAccuracyScore,
                )}
                ٪
              </span>
            </p>
          ) : (
            <p className="text-xs text-slate-600">
              هنوز انجام نشده
            </p>
          )}

          {isReady ? (
            <span
              className="
                inline-flex h-10 w-10 items-center
                justify-center rounded-xl
                bg-white text-slate-950
                transition group-hover:bg-cyan-300
              "
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );

  if (!isReady) {
    return cardContent;
  }

  return (
    <Link
      href={practiceHref}
      aria-label={`شروع تمرین ${content.title}`}
      className="
        block h-full rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/60
      "
    >
      {cardContent}
    </Link>
  );
}