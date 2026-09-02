import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Star,
} from "lucide-react";


type DailyTask = {
  id: string;
  title: string;
  duration: string;
  reward: string;
  category: string;
  status: "done" | "available";
};


type DailyPlanCardProps = {
  tasks?: readonly DailyTask[];
};


const defaultTasks: readonly DailyTask[] = [
  {
    id: "travel-vocabulary",
    title: "مرور کلمات سفر",
    duration: "۱۰ دقیقه",
    reward: "+۲۰ امتیاز",
    category: "واژگان",
    status: "done",
  },
  {
    id: "daily-dialogue",
    title: "دیالوگ‌های روزمره",
    duration: "۸ دقیقه",
    reward: "+۳۰ امتیاز",
    category: "مکالمه",
    status: "available",
  },
  {
    id: "past-perfect",
    title: "زمان افعال: گذشته دور",
    duration: "۱۲ دقیقه",
    reward: "+۴۰ امتیاز",
    category: "گرامر",
    status: "available",
  },
  {
    id: "preposition",
    title: "تمرین حروف اضافه",
    duration: "۵ دقیقه",
    reward: "+۱۵ امتیاز",
    category: "نوشتاری",
    status: "available",
  },
];


const categoryStyles: Record<
  string,
  string
> = {
  واژگان:
    "bg-[#DCFCE7] text-[#166534]",

  مکالمه:
    "bg-[#DAE2FD] text-[#3F465C]",

  گرامر:
    "bg-[#EADDFF] text-[#5A00C6]",

  نوشتاری:
    "bg-[#FFEDD5] text-[#C2410C]",
};


export function DailyPlanCard({
  tasks = defaultTasks,
}: DailyPlanCardProps) {

  return (
    <section
      dir="rtl"
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        shadow-[0_4px_20px_rgba(0,0,0,.04)]
        backdrop-blur-xl
      "
    >

      <header
        className="
          flex
          h-[73px]
          items-center
          justify-between
          border-b
          border-[#BCC9C6]
          px-6
        "
      >

        <h2
          className="
            text-base
            font-bold
            text-[#191C1E]
          "
        >
          تمرین‌های امروز
        </h2>


        <Link
          href="/practice"
          className="
            text-sm
            font-bold
            text-[#00685F]
          "
        >
          مشاهده کامل
        </Link>

      </header>



      <div>

        {tasks.map((task) => (

          <div
            key={task.id}
            className="
              flex
              min-h-[73px]
              items-center
              justify-between
              border-b
              border-[#BCC9C6]
              px-6
              last:border-none
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#DCFCE7]
                "
              >

                {task.status === "done" ? (
                  <CheckCircle2
                    className="
                      h-5
                      w-5
                      text-[#16A34A]
                    "
                  />
                ) : (
                  <Clock3
                    className="
                      h-5
                      w-5
                      text-[#6D7A77]
                    "
                  />
                )}

              </div>



              <div>

                <h3
                  className="
                    text-sm
                    font-bold
                    text-[#191C1E]
                  "
                >
                  {task.title}
                </h3>


                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    text-[#3D4947]
                  "
                >

                  <span>
                    {task.duration}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {task.reward}
                  </span>

                </div>

              </div>


            </div>



            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <span
                className={`
                  rounded-md
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  ${categoryStyles[task.category]}
                `}
              >
                {task.category}
              </span>


              {task.status === "available" ? (
                <Link
                  href="/practice"
                  className="
                    rounded-lg
                    bg-[#0D9488]
                    px-4
                    py-1.5
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  شروع
                </Link>
              ) : (
                <Star
                  className="
                    h-4
                    w-4
                    text-[#6D7A77]
                  "
                />
              )}

            </div>


          </div>

        ))}

      </div>

    </section>
  );
}