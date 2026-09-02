type RecentActivity = {
  id: string;
  title: string;
  meta: string;
  score?: string;
};


type RecentActivitiesCardProps = {
  activities?: readonly RecentActivity[];
};


const defaultActivities: readonly RecentActivity[] = [
  {
    id: "b1-test",
    title: "آزمون جامع سطح B1",
    meta: "دیروز - ۸۵/۱۰۰",
  },
  {
    id: "restaurant",
    title: "تمرین لغات رستوران",
    meta: "۲ روز پیش - ۱۵ دقیقه",
  },
  {
    id: "vocabulary",
    title: "مرور واژگان روزانه",
    meta: "۳ روز پیش - ۱۰۰٪ درست",
  },
];



export function RecentActivitiesCard({
  activities = defaultActivities,
}: RecentActivitiesCardProps) {

  return (
    <section
      dir="rtl"
      className="
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,.04)]
        backdrop-blur-xl
      "
    >

      <h2
        className="
          text-sm
          font-bold
          text-[#191C1E]
        "
      >
        فعالیت‌های اخیر
      </h2>


      <div
        className="
          mt-6
          space-y-5
        "
      >

        {activities.map((activity)=>(
          <article
            key={activity.id}
            className="
              flex
              items-start
              gap-3
            "
          >

            <span
              className="
                mt-1
                h-2
                w-2
                shrink-0
                rounded-full
                bg-[#14B8A6]
              "
            />


            <div>

              <h3
                className="
                  text-xs
                  font-bold
                  text-[#191C1E]
                "
              >
                {activity.title}
              </h3>


              <p
                className="
                  mt-1
                  text-[10px]
                  text-[#6D7A77]
                "
              >
                {activity.meta}
              </p>


            </div>


          </article>
        ))}

      </div>


    </section>
  );
}