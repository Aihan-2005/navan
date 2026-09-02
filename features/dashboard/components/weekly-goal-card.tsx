type WeeklyGoalSummary = {
  words: number;
  listening: number;
  speaking: number;
};

type WeeklyGoalCardProps = {
  summary: WeeklyGoalSummary;
};

const goals = [
  {
    key: "words",
    label: "یادگیری ۱۰۰ واژه جدید",
    color: "#14B8A6",
  },
  {
    key: "listening",
    label: "۱۰ ساعت گوش دادن",
    color: "#14B8A6",
  },
  {
    key: "speaking",
    label: "۵ جلسه مکالمه با AI",
    color: "#14B8A6",
  },
] as const;


export function WeeklyGoalCard({
  summary,
}: WeeklyGoalCardProps) {

  const values = {
    words: summary.words,
    listening: summary.listening,
    speaking: summary.speaking,
  };


  return (
    <article
      dir="rtl"
      className="
        h-[250px]
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-6
        backdrop-blur-xl
        shadow-[0_4px_20px_rgba(0,0,0,.04)]
      "
    >

      <h3
        className="
          text-base
          font-bold
          text-[#191C1E]
        "
      >
        اهداف هفتگی
      </h3>


      <div
        className="
          mt-6
          space-y-5
        "
      >

        {goals.map((goal) => {

          const progress =
            values[goal.key];


          return (
            <div
              key={goal.key}
              className="space-y-2"
            >

              <div
                className="
                  flex
                  justify-between
                  text-xs
                  font-bold
                  text-[#191C1E]
                "
              >
                <span>
                  {goal.label}
                </span>

                <span
                  style={{
                    color: goal.color,
                  }}
                >
                  {progress}
                </span>
              </div>


              <div
                className="
                  h-2
                  rounded-full
                  bg-[#ECEEF0]
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                  "
                  style={{
                    width:`${progress}%`,
                    backgroundColor:
                      goal.color,
                  }}
                />

              </div>


            </div>
          );

        })}

      </div>

    </article>
  );
}