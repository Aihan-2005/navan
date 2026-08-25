"use client";


import {
  useMemo,
} from "react";


import {
  History,
} from "lucide-react";


import type {
  RecentWriting,
} from "../../types/writing.types";


import {
  WritingHistoryCard,
} from "./writing-history-card";



type Props =
  Readonly<{
    writings:
      readonly RecentWriting[];
  }>;



export function WritingHistory({
  writings,
}: Props) {


  const sorted =
    useMemo(
      () =>
        [...writings],
        [
          writings,
        ],
    );



  if (
    sorted.length === 0
  ) {

    return (

      <section
        dir="rtl"
        className="
          rounded-3xl
          border
          border-white/10
          bg-slate-950/50
          p-8
          text-center
        "
      >

        <History
          className="
            mx-auto
            h-10
            w-10
            text-slate-500
          "
        />


        <h2
          className="
            mt-4
            text-lg
            font-bold
            text-white
          "
        >
          هنوز نوشته‌ای ثبت نشده
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          بعد از تحلیل اولین نوشته، تاریخچه اینجا نمایش داده می‌شود.
        </p>


      </section>

    );

  }



  return (

    <section
      dir="rtl"
      className="
        space-y-4
      "
    >

      {
        sorted.map(
          (
            writing,
          ) => (

            <WritingHistoryCard

              key={
                writing.id
              }

              writing={
                writing
              }

            />

          ),
        )
      }

    </section>

  );

}