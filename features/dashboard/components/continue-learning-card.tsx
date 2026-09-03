import Link from "next/link";

type ContinueLearningActivity = {
  title: string;

  grammar: string;

  remainingTime: string;

  href: string;
};

type ContinueLearningCardProps = {
  activity?:
    | ContinueLearningActivity
    | null;
};

const fallbackActivity:
  ContinueLearningActivity = {
    title:
      "مکالمه در محیط کار - بخش ۳",

    grammar:
      "گرامر: حال کامل استمراری",

    remainingTime:
      "۱۲ دقیقه",

    href:
      "/speaking",
  };

export function ContinueLearningCard({
  activity,
}: ContinueLearningCardProps) {
  const currentActivity =
    activity ??
    fallbackActivity;

  return (
    <article
      dir="rtl"
      className="
        flex
        h-[250px]
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        border
        border-[#F3F4F6]
        bg-white
        p-8
        shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
      "
    >
      <div
        className="
          flex
          h-[155px]
          w-[294px]
          flex-col
          gap-4
        "
      >
        <p
          className="
            text-xs
            font-medium
            leading-4
            text-[#9CA3AF]
          "
        >
          ادامه درس امروز
        </p>

        <h2
          className="
            text-xl
            font-bold
            leading-7
            text-[#1F2937]
          "
        >
          {currentActivity.title}
        </h2>

        <p
          className="
            text-sm
            leading-[23px]
            text-[#6B7280]
          "
        >
          {currentActivity.grammar}
        </p>

        <div
          className="
            mt-auto
            flex
            h-10
            items-center
            gap-6
          "
        >
          <Link
            href={
              currentActivity.href
            }
            className="
              inline-flex
              h-10
              min-w-[114px]
              items-center
              justify-center
              rounded-lg
              bg-[#0D9488]
              px-6
              text-sm
              font-bold
              text-white
              transition-colors
              hover:bg-[#0F766E]
            "
          >
            ادامه جلسه
          </Link>

          <span
            className="
              whitespace-nowrap
              text-xs
              leading-4
              text-[#9CA3AF]
            "
          >
            زمان باقی‌مانده:{" "}
            {
              currentActivity.remainingTime
            }
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          flex
          h-[171px]
          w-[168px]
          shrink-0
          items-center
          justify-center
        "
      >
        <div
          className="
            h-[160px]
            w-[160px]
            rotate-[-3deg]
            rounded-2xl
            border
            border-[#00C0AF]
            bg-[#F0FDFA]
          "
        />
      </div>
    </article>
  );
}