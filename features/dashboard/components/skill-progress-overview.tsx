import {
  BookOpen,
  Ear,
  Mic2,
  PenLine,
} from "lucide-react";

import type {
  SkillProgress,
} from "../types/dashboard.types";

type SkillProgressOverviewProps = {
  skills:
    readonly SkillProgress[];
};

type VisibleSkill =
  | "listening"
  | "speaking"
  | "writing"
  | "vocabulary";

const metadata = {
  listening: {
    title:
      "شنیداری (Listening)",

    status:
      "عالی - در حد پیشرفته",

    box:
      "border-[#DFF0EC] bg-[#EAFFFD]",

    accent:
      "text-[#14B8A6]",
  },

  speaking: {
    title:
      "گفتاری (Speaking)",

    status:
      "نیاز به تمرین بیشتر",

    box:
      "border-[#D6E3F9] bg-[#E2EDFF]",

    accent:
      "text-[#4285F4]",
  },

  writing: {
    title:
      "نوشتاری (Writing)",

    status:
      "خوب - در حال رشد",

    box:
      "border-[#E6D7FF] bg-[#F8F3FF]",

    accent:
      "text-[#712AE2]",
  },

  vocabulary: {
    title:
      "واژگان (Vocabulary)",

    status:
      "ممتاز - فراتر از هدف",

    box:
      "border-[#FFE1CF] bg-[#FFEFE4]",

    accent:
      "text-[#F97316]",
  },
} as const;

function SkillIcon({
  skill,
}: {
  skill: VisibleSkill;
}) {
  if (
    skill ===
    "listening"
  ) {
    return (
      <Ear className="h-5 w-[18px]" />
    );
  }

  if (
    skill ===
    "speaking"
  ) {
    return (
      <Mic2 className="h-5 w-[22px]" />
    );
  }

  if (
    skill ===
    "writing"
  ) {
    return (
      <PenLine className="h-[19px] w-[19px]" />
    );
  }

  return (
    <BookOpen className="h-4 w-[22px]" />
  );
}

export function SkillProgressOverview({
  skills,
}: SkillProgressOverviewProps) {
  const visibleSkills:
    VisibleSkill[] = [
      "listening",
      "speaking",
      "writing",
      "vocabulary",
    ];

  const fallbackScores:
    Record<
      VisibleSkill,
      number
    > = {
      listening: 88,
      speaking: 62,
      writing: 74,
      vocabulary: 91,
    };

  return (
    <section
      dir="rtl"
      className="
        h-[348px]
        w-full
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-8
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <h2
        className="
          text-base
          font-bold
          leading-6
          text-[#191C1E]
        "
      >
        تحلیل مهارت‌ها
      </h2>

      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-4
        "
      >
        {visibleSkills.map(
          (skillName) => {
            const item =
              skills.find(
                (skill) =>
                  skill.skill ===
                  skillName,
              );

            const style =
              metadata[
                skillName
              ];

            const score =
              item?.score ??
              fallbackScores[
                skillName
              ];

            return (
              <article
                key={
                  skillName
                }
                className={`
                  flex
                  h-[109px]
                  flex-col
                  rounded-2xl
                  border
                  p-4
                  shadow-[0_4px_4px_0_rgba(0,0,0,0.16)]
                  ${style.box}
                `}
              >
                <div
                  className="
                    flex
                    h-6
                    items-center
                    justify-between
                  "
                >
                  <span
                    className={`
                      text-base
                      font-bold
                      leading-6
                      ${style.accent}
                    `}
                  >
                    {score}٪
                  </span>

                  <span
                    className={
                      style.accent
                    }
                  >
                    <SkillIcon
                      skill={
                        skillName
                      }
                    />
                  </span>
                </div>

                <h3
                  className="
                    mt-2
                    text-sm
                    font-bold
                    leading-5
                    text-[#191C1E]
                  "
                >
                  {
                    style.title
                  }
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-[15px]
                    text-[#3D4947]
                  "
                >
                  {
                    style.status
                  }
                </p>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}