import Image from "next/image";
import Link from "next/link";

import { Clock3 } from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import { SPEAKING_MODE_LABELS } from "../constants/speaking.constants";

import type { SpeakingScenario } from "../types/speaking.types";

type ScenarioCardProps = {
  scenario: SpeakingScenario;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

const scenarioImages: Partial<Record<string, string>> = {
  "job-interview": "/speaking/restaurant.jpeg",
  "restaurant-roleplay": "/speaking/interview.jpeg",
  "coffee-shop-shadowing": "/speaking/shadowing.jpeg",
  "free-speaking": "/speaking/conversation.jpg",
  "sixty-second-story": "/speaking/story.jpg",
  "social-media-debate": "/speaking/social.jpg",
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const image = scenarioImages[scenario.id];
  const isPronunciation = scenario.mode === "pronunciation";

  return (
    <Card
      className={cn(
        "group relative flex h-[364px] w-full max-w-[296px] justify-self-center flex-col overflow-hidden rounded-[24px] border-[#e5e7eb] bg-white p-0 shadow-[0px_1px_2px_0px_#0000000D] backdrop-blur-[12px]",
        "transition duration-300",
        scenario.isAvailable &&
          "hover:-translate-y-1 hover:border-[#0d9488]/45 hover:shadow-[0_18px_32px_-20px_rgba(0,104,95,0.45)]",
        !scenario.isAvailable && "opacity-60",
      )}
    >
      <div
        className={cn(
          "relative h-40 overflow-hidden",
          !image && "bg-[#f1f3f3]",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            loading={image === "/speaking/shadowing.jpeg" ? "eager" : undefined}
            sizes="(min-width: 900px) 296px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        ) : isPronunciation ? (
          <p className="flex h-full items-center justify-center text-4xl font-bold text-[#007c72]">
            /θ/ &amp; /ð/
          </p>
        ) : null}

        <div className="absolute inset-x-4 top-4 flex items-center justify-start gap-2 text-white">
          <span className="h-[22px] rounded-full bg-[#007c72]/90 px-3 py-1 font-[Inter] text-[12px] font-medium leading-[14px] tracking-[0.6px]">
            {SPEAKING_MODE_LABELS[scenario.mode]}
          </span>
          <span className="h-[22px] rounded-full bg-[#3d4041]/80 px-3 py-1 font-[Inter] text-[12px] font-medium leading-[14px] tracking-[0.6px]">
            {scenario.cefrLevel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5 text-right">
        <h3 className="font-[Vazirmatn] text-[22px] font-bold leading-[30px] text-[#191C1E]">
          {scenario.title}
        </h3>

        <p className="mt-2 flex-1 font-[Vazirmatn] text-[14px] font-normal leading-[20px] text-[#3D4947]">
          {scenario.description}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-[#4b5563]">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              {numberFormatter.format(scenario.estimatedMinutes)} دقیقه
            </span>
          </div>

          {scenario.isAvailable ? (
            <Link
              href={`/speaking/practice/${scenario.id}`}
              aria-label={`شروع تمرین ${scenario.title}`}
              className="inline-flex h-[40px] w-[85px] items-center justify-center rounded-2xl bg-[#00685F] px-6 py-2 text-base font-bold text-white transition hover:bg-[#01746b]"
            >
              شروع
            </Link>
          ) : (
            <span className="text-[10px] text-slate-500">به‌زودی</span>
          )}
        </div>
      </div>
    </Card>
  );
}
