"use client";


import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";


import {
  LoaderCircle,
} from "lucide-react";


import type {
  RecentWriting,
} from "../../types/writing.types";


import {
  readWritingSubmission,
} from "../../utils/writing-submission-storage";


import {
  WritingAnalysisView,
} from "./writing-analysis-view";



type Props =
  Readonly<{
    submissionId: string;

    fallbackSubmission?: RecentWriting;
  }>;



export function WritingSubmissionClient({
  submissionId,

  fallbackSubmission,
}: Props) {


  const [
    submission,
    setSubmission,
  ] =
    useState<RecentWriting | null>(
      fallbackSubmission ?? null,
    );


  const [
    loading,
    setLoading,
  ] =
    useState(true);



  useEffect(
    () => {


      const result =
        readWritingSubmission(
          submissionId,
        );


      if (result) {

        setSubmission(result);

      }


      setLoading(false);


    },
    [
      submissionId,
    ],
  );



  if (loading) {

    return (

      <main className="flex min-h-[60vh] items-center justify-center">

        <LoaderCircle
          className="animate-spin text-cyan-400"
        />

      </main>

    );

  }



  if (!submission) {

    return (

      <main
        dir="rtl"
        className="
          mx-auto
          max-w-5xl
          rounded-3xl
          border
          border-white/10
          bg-slate-950
          p-8
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          تحلیل پیدا نشد
        </h1>


        <Link
          href="/writing"
          className="
            mt-6
            inline-flex
            rounded-xl
            bg-cyan-500/20
            px-5
            py-3
            text-cyan-300
          "
        >
          بازگشت به Writing
        </Link>


      </main>

    );

  }



  return (

    <WritingAnalysisView
      submission={
        submission
      }
    />

  );

}