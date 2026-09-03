import {
  BookOpen,
  Languages,
  Mic2,
  Zap,
} from "lucide-react";

const quickPractices = [
  {
    id: "quick-words",

    title:
      "کلمات سریع",

    icon:
      Zap,

    iconClass:
      "text-[#FFE500]",
  },

  {
    id: "short-pronunciation",

    title:
      "تلفظ کوتاه",

    icon:
      Mic2,

    iconClass:
      "text-[#2BC7FF]",
  },

  {
    id: "short-story",

    title:
      "داستان ۵ خطی",

    icon:
      BookOpen,

    iconClass:
      "text-[#FFAE00]",
  },

  {
    id: "five-challenge",

    title:
      "چالش ۵ تایی",

    icon:
      Languages,

    iconClass:
      "text-[#6BEB4B]",
  },
] as const;

export function QuickPracticeGrid() {
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
        p-6
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
        تمرین سریع
      </h2>

      <div
        className="
          mt-4
          grid
          h-[150px]
          grid-cols-2
          grid-rows-2
          gap-3
        "
      >
        {quickPractices.map(
          (practice) => {
            const Icon =
              practice.icon;

            return (
              <button
                key={
                  practice.id
                }
                type="button"
                className="
                  flex
                  h-[69px]
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-lg
                  border
                  border-[#BCC9C6]
                  bg-[#F7F9FB]
                  transition-colors
                  hover:bg-white
                "
              >
                <Icon
                  aria-hidden="true"
                  className={`
                    h-5
                    w-5
                    ${practice.iconClass}
                  `}
                  strokeWidth={2}
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    leading-[15px]
                    text-[#191C1E]
                  "
                >
                  {
                    practice.title
                  }
                </span>
              </button>
            );
          },
        )}
      </div>
    </section>
  );
}