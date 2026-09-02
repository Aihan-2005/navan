import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "./../../../lib/utils/cn";

type ContinueLearningActivity = {
  title: string;
  grammar: string;
  remainingTime: string;
};

type ContinueLearningCardProps = {
  activity: ContinueLearningActivity;
};

export function ContinueLearningCard({
  activity,
}: ContinueLearningCardProps) {
  return (
    <article
      dir="rtl"
      className="
        relative
        flex
        h-[250px]
        overflow-hidden
        rounded-2xl
        border
        border-[#F3F4F6]
        bg-white
        p-8
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
      "
    >

      <div
        className="
          flex
          w-full
          flex-col
          justify-between
        "
      >

        <div>

          <p
            className="
              text-xs
              font-medium
              text-[#9CA3AF]
            "
          >
            ادامه درس امروز
          </p>


          <h2
            className="
              mt-3
              text-xl
              font-bold
              leading-7
              text-[#1F2937]
            "
          >
            {activity.title}
          </h2>


          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#6B7280]
            "
          >
            {activity.grammar}
          </p>

        </div>


        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <Link
            href="/speaking/session"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0D9488]
              px-6
              py-2.5
              text-sm
              font-bold
              text-white
              transition
              hover:bg-[#0F766E]
            "
          >
            ادامه جلسه

            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />

          </Link>


          <span
            className="
              text-xs
              text-[#9CA3AF]
            "
          >
            زمان باقی‌مانده:
            {" "}
            {activity.remainingTime}
          </span>

        </div>

      </div>


      <div
        className="
          absolute
          left-8
          top-8
          hidden
          h-40
          w-40
          rotate-[-3deg]
          rounded-2xl
          border
          border-[#00C0AF]
          bg-[#F0FDFA]
          lg:block
        "
      />

    </article>
  );
}