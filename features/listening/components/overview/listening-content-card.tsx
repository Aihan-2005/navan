import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Clock3,
  Headphones,
  MessagesSquare,
  Newspaper,
  Podcast,
  Radio,
  Sparkles,
  UserRound,
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
} satisfies Record<ListeningContentType, LucideIcon>;

const contentTypeIconColors = {
  podcast: "text-[#EA580C] bg-[#EA580C]/10",
  conversation: "text-[#0D9488] bg-[#0D9488]/10",
  story: "text-[#2563EB] bg-[#2563EB]/10",
  news: "text-[#2563EB] bg-[#2563EB]/10",
  interview: "text-[#0D9488] bg-[#0D9488]/10",
  lecture: "text-[#2563EB] bg-[#2563EB]/10",
  exam: "text-[#0D9488] bg-[#0D9488]/10",
  custom: "text-[#0D9488] bg-[#0D9488]/10",
} satisfies Record<ListeningContentType, string>;

const contentTypeTextColors = {
  podcast: "text-[#EA580C]",
  conversation: "text-[#0D9488]",
  story: "text-[#2563EB]",
  news: "text-[#2563EB]",
  interview: "text-[#0D9488]",
  lecture: "text-[#2563EB]",
  exam: "text-[#0D9488]",
  custom: "text-[#0D9488]",
} satisfies Record<ListeningContentType, string>;

const statusStyles = {
  ready: "border-transparent bg-[#F3F4F6] text-[#4B5563]",

  processing: "border-transparent bg-[#F3F4F6] text-[#4B5563]",

  coming_soon: "border-transparent bg-[#F3F4F6] text-[#4B5563]",
} as const;

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);

  const seconds = durationSeconds % 60;

  if (seconds === 0) {
    return `${numberFormatter.format(minutes)} دقیقه`;
  }

  return `${numberFormatter.format(minutes)}:${numberFormatter
    .format(seconds)
    .padStart(2, "۰")}`;
}

export function ListeningContentCard({ content }: ListeningContentCardProps) {
  const ContentIcon = contentTypeIcons[content.contentType];

  const practiceHref = `/listening/practice/${content.id}`;

  const isReady = content.status === "ready";

  const cardContent = (
    <Card
      className={cn(
        "group relative flex w-full max-w-none justify-self-stretch self-stretch flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none",
        "transition duration-300",

        isReady && [
          "hover:-translate-y-1",
          "hover:border-[#0D9488]/30",
          "hover:bg-[#F8FFFE]",
        ],

        !isReady && "opacity-70",
      )}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-44 w-44 rounded-full bg-[#0D9488]/10
          opacity-0 blur-3xl transition
          group-hover:opacity-100
        "
      />

      <div className="relative flex flex-col">
        <div className="relative -top-2 flex h-12 items-start justify-between gap-4">
          <div
            className={cn(
              "absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full",
              contentTypeIconColors[content.contentType],
            )}
          >
            <ContentIcon aria-hidden="true" className="h-6 w-6" />
          </div>

          <div className="absolute right-0 top-0 flex flex-wrap justify-end gap-1">
            {content.isFeatured ? (
              <span
                className="
                  inline-flex h-6 items-center gap-1
                  rounded-2xl bg-[#F3E8FF] px-2.5 py-1
                  font-[Vazirmatn] text-xs font-medium text-[#7E22CE]
                "
              >
                <Sparkles aria-hidden="true" className="h-3 w-3" />
                پیشنهادی
              </span>
            ) : null}

            <span
              className={cn(
                "inline-flex h-6 items-center rounded-2xl border px-2.5 py-1",
                "font-[Vazirmatn] text-xs font-medium",
                statusStyles[content.status],
              )}
            >
              {LISTENING_CONTENT_STATUS_LABELS[content.status]}
            </span>
          </div>
        </div>

        <p
          className={cn(
            "mt-1 font-[Vazirmatn] text-xs font-medium",
            contentTypeTextColors[content.contentType],
          )}
        >
          {LISTENING_CONTENT_TYPE_LABELS[content.contentType]}
        </p>

        <h3 className="mt-2 font-[Vazirmatn] text-[18px] font-bold leading-7 text-[#0F172A]">
          {content.title}
        </h3>

        <div
          className="
            mt-4 flex flex-wrap items-center gap-4
            text-sm text-[#64748B]
          "
        >
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />

            {formatDuration(content.durationSeconds)}
          </span>

          <span className="flex items-center gap-1.5">
            <ChartNoAxesColumn aria-hidden="true" className="h-3.5 w-3.5" />
            سطح {content.cefrLevel}
          </span>

          <span className="flex items-center gap-1.5">
            <UserRound aria-hidden="true" className="h-3.5 w-3.5" />
            {LISTENING_ACCENT_LABELS[content.accent]}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {content.bestAccuracyScore !== null ? (
            <p className="font-[Vazirmatn] text-[14px] font-medium leading-5 text-[#0D9488]">
              بهترین دقت:{" "}
              <span>{numberFormatter.format(content.bestAccuracyScore)}٪</span>
            </p>
          ) : (
            <p className="font-[Vazirmatn] text-[14px] font-normal leading-5 text-[#9CA3AF]">
              هنوز انجام نشده
            </p>
          )}

          {isReady ? (
            <span
              className="
                inline-flex h-10 w-10 items-center
                justify-center rounded-full bg-[#F3F4F6] text-[#0F172A]
                transition group-hover:bg-[#00A89622]
              "
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
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
        flex w-full rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/60
      "
    >
      {cardContent}
    </Link>
  );
}
