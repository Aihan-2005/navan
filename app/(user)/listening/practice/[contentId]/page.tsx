import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getListeningContent,
  ListeningPracticeWorkspace,
} from "../../../../../features/listening";

type ListeningPracticePageProps =
  Readonly<{
    params: Promise<{
      contentId: string;
    }>;
  }>;

export async function generateMetadata({
  params,
}: ListeningPracticePageProps): Promise<Metadata> {
  const { contentId } =
    await params;

  const content =
    await getListeningContent(
      contentId,
    );

  if (!content) {
    return {
      title: "تمرین پیدا نشد",
    };
  }

  return {
    title: content.title,
    description:
      content.description ??
      "تمرین شنیداری و رونویسی",
  };
}

export default async function ListeningPracticePage({
  params,
}: ListeningPracticePageProps) {
  const { contentId } =
    await params;

  const content =
    await getListeningContent(
      contentId,
    );

  if (!content) {
    notFound();
  }

  return (
    <ListeningPracticeWorkspace
      content={content}
    />
  );
}