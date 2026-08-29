import Image from "next/image";
import Link from "next/link";

import {
  Clock3,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  SPEAKING_MODE_LABELS,
} from "../constants/speaking.constants";

import type {
  SpeakingScenario,
} from "../types/speaking.types";

type ScenarioCardProps =
  Readonly<{
    scenario: SpeakingScenario;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const scenarioImages:
  Partial<Record<string, string>> = {
    "job-interview":
      "/speaking/restaurant.jpeg",

    "restaurant-roleplay":
      "/speaking/interview.jpeg",

    "coffee-shop-shadowing":
      "/speaking/shadowing.jpeg",

    "free-speaking":
      "/speaking/conversation.jpg",

    "sixty-second-story":
      "/speaking/story.jpg",

    "social-media-debate":
      "/speaking/social.jpg",
  };

export function ScenarioCard({
  scenario,
}: ScenarioCardProps) {
  const image =
    scenarioImages[scenario.id];

  const isPronunciation =
    scenario.mode ===
    "pronunciation";

  return (
    <Card
      dir="rtl"
      className={cn(
        "group relative flex min-h-[356px] w-full flex-col",
        "overflow-hidden rounded-[22px] border-[#E2E8F0]",
        "bg-white p-0",
        "shadow-[0_4px_18px_rgba(15,23,42,0.045)]",
        "transition duration-300",

        scenario.isAvailable && [
          "hover:-translate-y-1",
          "hover:border-[#0D9488]/40",
          "hover:shadow-[0_16px_30px_-20px_rgba(0,104,95,0.38)]",
        ],

        !scenario.isAvailable &&
          "opacity-60",
      )}
    >
      <div
        className={cn(
          "relative h-[156px] shrink-0 overflow-hidden",

          !image &&
            "bg-[#F1F5F4]",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            loading={
              image ===
              "/speaking/shadowing.jpeg"
                ? "eager"
                : undefined
            }
            sizes="(min-width: 1024px) 296px, (min-width: 640px) 50vw, 100vw"
            className="
              object-cover
              transition
              duration-500
              group-hover:scale-[1.02]
            "
          />
        ) : isPronunciation ? (
          <p
            dir="ltr"
            className="
              flex
              h-full
              items-center
              justify-center
              text-4xl
              font-bold
              text-[#007C72]
            "
          >
            /θ/ &amp; /ð/
          </p>
        ) : null}

        <div
          className="
            absolute
            inset-x-4
            top-4
            flex
            items-center
            justify-start
            gap-2
            text-white
          "
        >
          <span
            className="
              inline-flex
              min-h-[22px]
              items-center
              rounded-full
              bg-[#007C72]/90
              px-3
              text-[11px]
              font-medium
            "
          >
            {
              SPEAKING_MODE_LABELS[
                scenario.mode
              ]
            }
          </span>

          <span
            dir="ltr"
            className="
              inline-flex
              min-h-[22px]
              items-center
              rounded-full
              bg-[#3D4041]/80
              px-3
              text-[11px]
              font-medium
            "
          >
            {scenario.cefrLevel}
          </span>
        </div>
      </div>

      <div
        className="
          flex
          flex-1
          flex-col
          px-5
          py-5
          text-right
        "
      >
        <h3
          className="
            text-[20px]
            font-bold
            leading-8
            text-[#191C1E]
          "
        >
          {scenario.title}
        </h3>

        <p
          className="
            mt-2
            flex-1
            text-sm
            leading-6
            text-[#3D4947]
          "
        >
          {scenario.description}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              text-[#64748B]
            "
          >
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {numberFormatter.format(
              scenario.estimatedMinutes,
            )} دقیقه
          </span>

          {scenario.isAvailable ? (
            <Link
              href={`/speaking/practice/${scenario.id}`}
              aria-label={`شروع تمرین ${scenario.title}`}
              className="
                inline-flex
                min-h-10
                min-w-[82px]
                items-center
                justify-center
                rounded-xl
                bg-[#00685F]
                px-5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-[#005A52]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#00685F]/25
              "
            >
              شروع
            </Link>
          ) : (
            <span
              className="
                rounded-full
                bg-[#F1F5F9]
                px-3
                py-1.5
                text-[11px]
                text-[#64748B]
              "
            >
              به‌زودی
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}