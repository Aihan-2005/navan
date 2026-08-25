import {
  MessageSquareText,
} from "lucide-react";


import type {
  WritingAnalysis,
} from "../../types/writing.types";



type Props =
  Readonly<{
    analysis:
      WritingAnalysis;
  }>;



export function TeacherFeedbackCard({
  analysis,
}: Props) {


  const feedback =
    analysis.aiCoach?.message ??
    analysis.nextPractice ??
    "بازخوردی ثبت نشده است.";



  return (

    <section
      dir="rtl"
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-950/60
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <MessageSquareText
          className="
            h-5
            w-5
            text-cyan-400
          "
        />


        <h3
          className="
            font-bold
            text-white
          "
        >
          بازخورد مدرس
        </h3>


      </div>


      <p
        className="
          mt-5
          leading-8
          text-slate-300
        "
      >
        {feedback}
      </p>


    </section>

  );

}