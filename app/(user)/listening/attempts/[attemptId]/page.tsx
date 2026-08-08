import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getListeningAttempt,
  ListeningAnalysisView,
} from "../../../../../features/listening";

type ListeningAttemptPageProps =
  Readonly<{
    params: Promise<{
      attemptId: string;
    }>;
  }>;

export async function generateMetadata({
  params,
}: ListeningAttemptPageProps): Promise<Metadata> {
  const {
    attemptId,
  } = await params;

  const attempt =
    await getListeningAttempt(
      attemptId,
    );

  if (!attempt) {
    return {
      title:
        "نتیجه تمرین پیدا نشد",
    };
  }

  return {
    title:
      `تحلیل ${attempt.contentTitle}`,

    description:
      `نتیجه و تحلیل تمرین شنیداری ${attempt.contentTitle}`,
  };
}

export default async function ListeningAttemptPage({
  params,
}: ListeningAttemptPageProps) {
  const {
    attemptId,
  } = await params;

  const attempt =
    await getListeningAttempt(
      attemptId,
    );

  if (!attempt) {
    notFound();
  }

  return (
    <ListeningAnalysisView
      analysis={attempt}
    />
  );
}