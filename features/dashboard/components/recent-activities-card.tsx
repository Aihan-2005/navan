import type {
  RecentActivity,
} from "../types/dashboard.types";

type RecentActivitiesCardProps = {
  activities:
    readonly RecentActivity[];
};

function formatActivityMeta(
  activity:
    RecentActivity,
  index: number,
): string {
  if (
    index === 0
  ) {
    return activity.score !==
      null
      ? `دیروز - ${activity.score}/۱۰۰`
      : "دیروز";
  }

  if (
    index === 1
  ) {
    return `۲ روز پیش - ${activity.durationMinutes} دقیقه`;
  }

  return activity.score !==
    null
    ? `۳ روز پیش - ${activity.score}٪ درست`
    : `۳ روز پیش - ${activity.durationMinutes} دقیقه`;
}

export function RecentActivitiesCard({
  activities,
}: RecentActivitiesCardProps) {
  return (
    <section
      dir="rtl"
      className="
        h-[236px]
        w-full
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        px-6
        pb-[49px]
        pt-6
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <h2
        className="
          text-sm
          font-bold
          leading-5
          text-[#191C1E]
        "
      >
        فعالیت‌های اخیر
      </h2>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-4
        "
      >
        {activities
          .slice(0, 3)
          .map(
            (
              activity,
              index,
            ) => (
              <article
                key={
                  activity.id
                }
                className="
                  flex
                  min-h-[31px]
                  items-start
                  gap-3
                "
              >
                <span
                  className={`
                    mt-1
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    ${
                      index ===
                      2
                        ? "bg-[#545C72]"
                        : "bg-[#14B8A6]"
                    }
                  `}
                />

                <div className="min-w-0">
                  <h3
                    className="
                      truncate
                      text-xs
                      font-bold
                      leading-4
                      text-[#191C1E]
                    "
                  >
                    {
                      activity.title
                    }
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      leading-[15px]
                      text-[#6D7A77]
                    "
                  >
                    {formatActivityMeta(
                      activity,
                      index,
                    )}
                  </p>
                </div>
              </article>
            ),
          )}
      </div>
    </section>
  );
}