import type {
  Metadata,
} from "next";

import {
  getWritingSubmission,
} from "../../../../../features/writing/api/get-writing-submission";

import {
  WritingSubmissionClient,
} from "../../../../../features/writing/components/analysis/writing-submission-client";

type WritingSubmissionPageProps =
  Readonly<{
    params:
      Promise<{
        submissionId:
          string;
      }>;
  }>;

export const metadata: Metadata = {
  title:
    "تحلیل Writing",

  description:
    "تحلیل کامل نوشته، مشکلات، نقاط قوت، واژگان و پیشنهادهای بهبود.",
};

export default async function WritingSubmissionPage({
  params,
}: WritingSubmissionPageProps) {
  const {
    submissionId,
  } =
    await params;

  /**
   * برای Submissionهای قدیمی Mock،
   * Server همچنان fallback را فراهم می‌کند.
   *
   * Submissionهای جدید توسط Client از
   * localStorage خوانده می‌شوند تا زمانی
   * که Persistence واقعی Backend اضافه شود.
   */
  const fallbackSubmission =
    await getWritingSubmission(
      submissionId,
    );

  return (
    <WritingSubmissionClient
      submissionId={
        submissionId
      }
      fallbackSubmission={
        fallbackSubmission
      }
    />
  );
}