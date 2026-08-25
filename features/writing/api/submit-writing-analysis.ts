import {
  createWritingAnalysisMock,
} from "../mocks/writing-analysis.mock";

import type {
  RecentWriting,
  WritingMode,
} from "../types/writing.types";

import {
  saveWritingSubmission,
} from "../utils/writing-submission-storage";


export type SubmitWritingAnalysisRequest =
  Readonly<{
    content: string;

    exerciseId?: string;

    mode: WritingMode;

    context?: Readonly<{
      title?: string;

      prompt?: string;

      writingGoal?: string;
    }>;
  }>;


export type SubmitWritingAnalysisResponse =
  Readonly<{
    success: boolean;

    submissionId?: string;

    error?: string;
  }>;


function createSubmissionId(): string {

  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `writing-${crypto.randomUUID()}`;
  }


  return `writing-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}



function createExcerpt(
  text: string,
): string {

  const normalized =
    text
      .trim()
      .replace(/\s+/gu, " ");


  if (
    normalized.length <= 220
  ) {
    return normalized;
  }


  return `${normalized.slice(0, 217)}...`;
}



export async function submitWritingAnalysis(
  request: SubmitWritingAnalysisRequest,
): Promise<SubmitWritingAnalysisResponse> {


  const content =
    request.content.trim();



  if (!content) {

    return {
      success: false,

      error:
        "برای تحلیل باید متن وارد شود.",
    };
  }



  await new Promise(
    (resolve) =>
      setTimeout(resolve, 800),
  );



  const submissionId =
    createSubmissionId();



  const analysis =
    createWritingAnalysisMock(
      content,
      {
        mode:
          request.mode,

        prompt:
          request.context?.prompt,

        writingGoal:
          request.context?.writingGoal,
      },
    );



  const submission: RecentWriting =
    {

      id:
        submissionId,


      title:
        request.context?.title ??
        (
          request.mode === "free"
            ? "نوشتن آزاد"
            :
          request.mode === "draft"
            ? "ادامه پیش‌نویس"
            :
          "تمرین Writing"
        ),


      date:
        "همین الان",


      score:
        analysis.overallScore,


      feedback:
        analysis.aiCoach?.headline ??
        analysis.nextPractice,


      excerpt:
        createExcerpt(content),


      mode:
        request.mode,


      analysis,

    };



  const saved =
    saveWritingSubmission(
      submission,
    );



  if (!saved) {

    return {

      success: false,

      error:
        "ذخیره نتیجه تحلیل انجام نشد.",

    };

  }



  return {

    success: true,

    submissionId,

  };

}