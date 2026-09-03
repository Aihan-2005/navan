"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Brain,
  CheckCircle2,
  Eye,
  Keyboard,
  RotateCcw,
  Volume2,
  X,
} from "lucide-react";

import {
  getDueWords,
  previewReview,
} from "../domain/leitner";

import {
  useVocabularyStore,
} from "../store/use-vocabulary-store";

import {
  speakEnglish,
} from "../utils/pronunciation";

import type {
  ReviewGrade,
} from "../types/vocabulary.types";

const grades: {
  id: ReviewGrade;
  label: string;
  className: string;
}[] = [
  {
    id: "again",
    label: "دوباره",
    className:
      "border-[#FECACA] bg-[#FFF1F2] text-[#BE123C] hover:bg-[#FFE4E6]",
  },

  {
    id: "hard",
    label: "سخت",
    className:
      "border-[#FED7AA] bg-[#FFF7ED] text-[#C2410C] hover:bg-[#FFEDD5]",
  },

  {
    id: "good",
    label: "خوب",
    className:
      "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857] hover:bg-[#D1FAE5]",
  },

  {
    id: "easy",
    label: "آسان",
    className:
      "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE]",
  },
];

export function ReviewSession() {
  const words =
    useVocabularyStore(
      (state) =>
        state.words,
    );

  const hasHydrated =
    useVocabularyStore(
      (state) =>
        state.hasHydrated,
    );

  const reviewWord =
    useVocabularyStore(
      (state) =>
        state.reviewWord,
    );

  const [
    queue,
    setQueue,
  ] = useState<
    string[]
  >([]);

  const [
    initialized,
    setInitialized,
  ] = useState(false);

  const [
    index,
    setIndex,
  ] = useState(0);

  const [
    revealed,
    setRevealed,
  ] = useState(false);

  const [
    gradeStats,
    setGradeStats,
  ] = useState<
    Record<
      ReviewGrade,
      number
    >
  >({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });

  useEffect(() => {
    if (
      !hasHydrated ||
      initialized
    ) {
      return;
    }

    const due =
      getDueWords(
        words,
      );

    setQueue(
      due.map(
        (word) =>
          word.id,
      ),
    );

    setInitialized(true);
  }, [
    hasHydrated,
    initialized,
    words,
  ]);

  const card =
    useMemo(
      () =>
        words.find(
          (word) =>
            word.id ===
            queue[index],
        ),
      [
        index,
        queue,
        words,
      ],
    );

  function handleGrade(
    grade: ReviewGrade,
  ) {
    if (!card) {
      return;
    }

    reviewWord(
      card.id,
      grade,
    );

    setGradeStats(
      (current) => ({
        ...current,

        [grade]:
          current[
            grade
          ] + 1,
      }),
    );

    setRevealed(false);

    setIndex(
      (value) =>
        value + 1,
    );
  }

  useEffect(() => {
    function handleKeyboard(
      event:
        KeyboardEvent,
    ) {
      if (!card) {
        return;
      }

      if (
        event.code ===
          "Space" &&
        !revealed
      ) {
        event.preventDefault();

        setRevealed(true);

        return;
      }

      if (!revealed) {
        return;
      }

      const keyboardMap:
        Record<
          string,
          ReviewGrade
        > = {
        "1": "again",
        "2": "hard",
        "3": "good",
        "4": "easy",
      };

      const grade =
        keyboardMap[
          event.key
        ];

      if (grade) {
        handleGrade(
          grade,
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  });

  if (
    !hasHydrated ||
    !initialized
  ) {
    return (
      <div
        className="
          mx-auto
          h-[520px]
          w-full
          max-w-[900px]
          animate-pulse
          rounded-[28px]
          border
          border-[#E0E3E5]
          bg-[#F7F9FB]
        "
      />
    );
  }

  const total =
    queue.length;

  const reviewed =
    Math.min(
      index,
      total,
    );

  const progress =
    total > 0
      ? Math.round(
          (reviewed /
            total) *
            100,
        )
      : 100;

  if (!card) {
    return (
      <main
        dir="rtl"
        className="
          mx-auto
          flex
          min-h-[620px]
          w-full
          max-w-[900px]
          items-center
          justify-center
        "
      >
        <section
          className="
            w-full
            max-w-[560px]
            rounded-[28px]
            border
            border-[#BCC9C6]
            bg-white
            p-8
            text-center
            shadow-[0_14px_40px_rgba(0,0,0,0.07)]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#EAF9F7]
              text-[#0D9488]
            "
          >
            <CheckCircle2
              className="h-8 w-8"
            />
          </div>

          <h1
            className="
              mt-5
              text-xl
              font-black
              text-[#191C1E]
            "
          >
            مرور امروز تمام شد 🎉
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#6D7A77]
            "
          >
            {reviewed > 0
              ? `${reviewed} کارت را مرور کردی و زمان مرور بعدی آن‌ها محاسبه شد.`
              : "در حال حاضر واژه‌ای برای مرور نداری."}
          </p>

          {reviewed >
          0 ? (
            <div
              className="
                mt-6
                grid
                grid-cols-4
                gap-2
              "
            >
              {grades.map(
                (grade) => (
                  <div
                    key={
                      grade.id
                    }
                    className="
                      rounded-xl
                      bg-[#F7F9FB]
                      px-2
                      py-3
                    "
                  >
                    <strong
                      className="
                        text-lg
                        text-[#191C1E]
                      "
                    >
                      {
                        gradeStats[
                          grade
                            .id
                        ]
                      }
                    </strong>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        text-[#6D7A77]
                      "
                    >
                      {
                        grade.label
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          ) : null}

          <Link
            href="/vocabulary"
            className="
              mt-7
              inline-flex
              h-11
              items-center
              rounded-xl
              bg-[#0D9488]
              px-7
              text-sm
              font-bold
              text-white
            "
          >
            بازگشت به واژگان
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[900px]
        pb-12
      "
    >
      <header
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <Link
          href="/vocabulary"
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-lg
            border
            border-[#BCC9C6]
            bg-white
            px-3
            text-xs
            font-bold
            text-[#52615E]
          "
        >
          <X
            className="h-4 w-4"
          />

          پایان مرور
        </Link>

        <div className="text-left">
          <p
            className="
              text-xs
              font-bold
              text-[#191C1E]
            "
          >
            کارت{" "}
            {reviewed +
              1}{" "}
            از {total}
          </p>

          <p
            className="
              mt-0.5
              text-[10px]
              text-[#8A9693]
            "
          >
            {progress}٪ تکمیل
          </p>
        </div>
      </header>

      <div
        className="
          mt-4
          h-2
          overflow-hidden
          rounded-full
          bg-[#E8EDEE]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#14B8A6]
            transition-[width]
            duration-300
          "
          style={{
            width:
              `${progress}%`,
          }}
        />
      </div>

      <section
        className="
          mt-8
          overflow-hidden
          rounded-[28px]
          border
          border-[#BCC9C6]
          bg-white
          shadow-[0_16px_45px_rgba(0,0,0,0.07)]
        "
      >
        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            p-8
            text-center
            md:p-12
          "
        >
          <span
            className="
              rounded-full
              bg-[#F0FDFA]
              px-3
              py-1
              text-[10px]
              font-bold
              text-[#0D9488]
            "
          >
            جعبه{" "}
            {
              card.leitnerBox
            }
          </span>

          <div
            dir="ltr"
            className="
              mt-6
              text-center
            "
          >
            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-[#191C1E]
                md:text-5xl
              "
            >
              {card.word}
            </h1>

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span
                className="
                  text-sm
                  text-[#8A9693]
                "
              >
                {card.phonetic}
              </span>

              <button
                type="button"
                onClick={() =>
                  speakEnglish(
                    card.word,
                  )
                }
                aria-label="پخش تلفظ"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EAF9F7]
                  text-[#0D9488]
                "
              >
                <Volume2
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>

          {!revealed ? (
            <button
              type="button"
              onClick={() =>
                setRevealed(
                  true,
                )
              }
              className="
                mt-10
                inline-flex
                h-11
                items-center
                gap-2
                rounded-xl
                bg-[#0D9488]
                px-7
                text-sm
                font-bold
                text-white
                hover:bg-[#0F766E]
              "
            >
              <Eye
                className="h-4 w-4"
              />

              نمایش پاسخ
            </button>
          ) : (
            <div
              className="
                mt-8
                w-full
                max-w-[620px]
                border-t
                border-[#E8EDEE]
                pt-8
              "
            >
              <p
                className="
                  text-xl
                  font-black
                  text-[#0D9488]
                "
              >
                {
                  card.translation
                }
              </p>

              {card.definition ? (
                <p
                  dir="ltr"
                  className="
                    mx-auto
                    mt-4
                    max-w-[540px]
                    text-center
                    text-sm
                    leading-6
                    text-[#52615E]
                  "
                >
                  {
                    card.definition
                  }
                </p>
              ) : null}

              {card.example ? (
                <div
                  className="
                    mt-5
                    rounded-xl
                    bg-[#F7F9FB]
                    p-4
                  "
                >
                  <p
                    dir="ltr"
                    className="
                      text-sm
                      font-medium
                      leading-6
                      text-[#191C1E]
                    "
                  >
                    “
                    {
                      card.example
                    }
                    ”
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-[#6D7A77]
                    "
                  >
                    {
                      card.exampleTranslation
                    }
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {revealed ? (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              border-t
              border-[#E8EDEE]
              bg-[#FAFCFC]
              p-5
              md:grid-cols-4
            "
          >
            {grades.map(
              (grade) => {
                const preview =
                  previewReview(
                    card.leitnerBox,
                    grade.id,
                  );

                return (
                  <button
                    key={
                      grade.id
                    }
                    type="button"
                    onClick={() =>
                      handleGrade(
                        grade.id,
                      )
                    }
                    className={`
                      min-h-[72px]
                      rounded-xl
                      border
                      px-3
                      py-2
                      transition
                      ${grade.className}
                    `}
                  >
                    <span
                      className="
                        block
                        text-sm
                        font-black
                      "
                    >
                      {
                        grade.label
                      }
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-[10px]
                        opacity-70
                      "
                    >
                      {
                        preview.label
                      }
                    </span>
                  </button>
                );
              },
            )}
          </div>
        ) : null}
      </section>

      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          text-[10px]
          text-[#8A9693]
        "
      >
        <Keyboard
          className="h-3.5 w-3.5"
        />

        Space برای نمایش پاسخ • کلیدهای ۱ تا ۴ برای ثبت
        نتیجه
      </div>
    </main>
  );
}