import { cn } from "../../../lib/utils/cn";

type OverviewStatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  variant?: "teal" | "purple" | "orange";
};

const variantConfig = {
  teal: {
    value: "text-[#14B8A6]",
    icon: "bg-[#14B8A61A]",
    progress: "bg-[#14B8A6]",
  },

  purple: {
    value: "text-[#712AE2]",
    icon: "bg-[#E0D3F4]",
    progress: "bg-[#8A4CFC]",
  },

  orange: {
    value: "text-[#F97316]",
    icon: "bg-[#FFF7ED]",
    progress: "bg-[#F97316]",
  },
} as const;


export function OverviewStatCard({
  title,
  value,
  subtitle,
  progress = 70,
  variant = "teal",
}: OverviewStatCardProps) {

  const config = variantConfig[variant];


  return (
    <article
      dir="rtl"
      className="
        flex
        h-[145px]
        flex-col
        justify-between
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        backdrop-blur-xl
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <h3
            className="
              text-base
              font-bold
              leading-6
              text-[#3D4947]
            "
          >
            {title}
          </h3>


          <p
            className={cn(
              "mt-1 text-base font-black leading-6",
              config.value,
            )}
          >
            {value}
          </p>


          {subtitle ? (
            <p
              className="
                mt-1
                text-[10px]
                text-[#6D7A77]
              "
            >
              {subtitle}
            </p>
          ) : null}

        </div>



        <div
          className={cn(
            `
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            `,
            config.icon,
          )}
        >

          <span
            className="
              h-6
              w-6
              rounded-full
              border-2
              border-current
            "
          />

        </div>


      </div>



      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-[#ECEEF0]
        "
      >

        <div
          className={cn(
            "h-full rounded-full",
            config.progress,
          )}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>


    </article>
  );
}