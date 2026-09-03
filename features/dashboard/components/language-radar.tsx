type LanguageRadarProps = {
  listening: number;

  speaking: number;

  writing: number;

  vocabulary: number;

  reading: number;
};

const CENTER_X = 150;
const CENTER_Y = 116;

const RADIUS = 76;

const AXES = 5;

function pointAt(
  index: number,
  radius: number,
) {
  const angle =
    -Math.PI / 2 +
    (
      index *
      Math.PI *
      2
    ) /
      AXES;

  return {
    x:
      CENTER_X +
      Math.cos(angle) *
        radius,

    y:
      CENTER_Y +
      Math.sin(angle) *
        radius,
  };
}

function polygonPoints(
  multiplier: number,
) {
  return Array.from(
    {
      length: AXES,
    },
    (_, index) =>
      pointAt(
        index,
        RADIUS *
          multiplier,
      ),
  )
    .map(
      (point) =>
        `${point.x},${point.y}`,
    )
    .join(" ");
}

function valuePoints(
  values: number[],
) {
  return values
    .map(
      (
        value,
        index,
      ) => {
        const safeValue =
          Math.max(
            0,
            Math.min(
              100,
              value,
            ),
          );

        return pointAt(
          index,
          RADIUS *
            (
              safeValue /
              100
            ),
        );
      },
    )
    .map(
      (point) =>
        `${point.x},${point.y}`,
    )
    .join(" ");
}

export function LanguageRadar({
  listening,
  speaking,
  writing,
  vocabulary,
  reading,
}: LanguageRadarProps) {
  const currentValues = [
    vocabulary,
    reading,
    writing,
    speaking,
    listening,
  ];

  const weeklyTarget = [
    95,
    90,
    88,
    82,
    92,
  ];

  return (
    <section
      dir="rtl"
      className="
        h-[348px]
        w-full
        rounded-[24px]
        border
        border-[#BCC9C6]
        bg-white
        px-6
        pb-[46px]
        pt-6
      "
    >
      <h2
        className="
          text-[15px]
          font-bold
          leading-[23px]
          text-[#191C1E]
        "
      >
        پراکنش مهارت‌های زبانی
      </h2>

      <svg
        viewBox="0 0 300 235"
        className="
          mt-1
          h-[235px]
          w-full
        "
        role="img"
        aria-label="نمودار پراکنش مهارت‌های زبانی"
      >
        {[
          1,
          0.75,
          0.5,
          0.25,
        ].map(
          (level) => (
            <polygon
              key={level}
              points={
                polygonPoints(
                  level,
                )
              }
              fill="none"
              stroke="#EAE6DF"
              strokeWidth="1"
              strokeDasharray={
                level ===
                1
                  ? undefined
                  : "3 3"
              }
            />
          ),
        )}

        {Array.from(
          {
            length: AXES,
          },
          (
            _,
            index,
          ) => {
            const point =
              pointAt(
                index,
                RADIUS,
              );

            return (
              <line
                key={
                  index
                }
                x1={
                  CENTER_X
                }
                y1={
                  CENTER_Y
                }
                x2={
                  point.x
                }
                y2={
                  point.y
                }
                stroke="#EAE6DF"
                strokeWidth="1"
              />
            );
          },
        )}

        <polygon
          points={
            valuePoints(
              weeklyTarget,
            )
          }
          fill="none"
          stroke="#EAE6DF"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        <polygon
          points={
            valuePoints(
              currentValues,
            )
          }
          fill="#00A89622"
          stroke="#00A896"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <text
          x="150"
          y="18"
          textAnchor="middle"
          fontSize="10"
          fill="#191C1E"
        >
          واژگان
        </text>

        <text
          x="258"
          y="91"
          textAnchor="middle"
          fontSize="10"
          fill="#191C1E"
        >
          خواندن
        </text>

        <text
          x="220"
          y="209"
          textAnchor="middle"
          fontSize="10"
          fill="#191C1E"
        >
          نوشتن
        </text>

        <text
          x="80"
          y="209"
          textAnchor="middle"
          fontSize="10"
          fill="#191C1E"
        >
          مکالمه
        </text>

        <text
          x="42"
          y="91"
          textAnchor="middle"
          fontSize="10"
          fill="#191C1E"
        >
          شنیداری
        </text>
      </svg>

      <div
        className="
          -mt-1
          flex
          items-center
          justify-center
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#00A896]
            "
          />

          <span
            className="
              text-xs
              font-bold
              text-[#00A896]
            "
          >
            وضعیت کنونی شما
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-1.5
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#EAE6DF]
            "
          />

          <span
            className="
              text-xs
              text-[#526E7A]
            "
          >
            هدف‌گذاری هفتگی
          </span>
        </div>
      </div>
    </section>
  );
}