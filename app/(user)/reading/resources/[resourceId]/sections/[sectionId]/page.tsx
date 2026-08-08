import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getReadingSection,
} from "../../../../../../../features/reading/api/get-reading-section";

import {
  ReadingSectionWorkspace,
} from "../../../../../../../features/reading/components/workspace/reading-section-workspace";

type ReadingSectionPageProps =
  Readonly<{
    params: Promise<{
      resourceId: string;
      sectionId: string;
    }>;
  }>;

function isUnavailableSection(
  status: string,
): boolean {
  return status === "locked";
}

export async function generateMetadata({
  params,
}: ReadingSectionPageProps): Promise<Metadata> {
  const {
    resourceId,
    sectionId,
  } = await params;

  const section =
    await getReadingSection(
      resourceId,
      sectionId,
    );

  if (
    !section ||
    isUnavailableSection(
      section.status,
    )
  ) {
    return {
      title:
        "بخش Reading در دسترس نیست",

      description:
        "بخش موردنظر پیدا نشد یا هنوز برای مطالعه باز نشده است.",
    };
  }

  return {
    title:
      `${section.title} | ${section.resourceTitle}`,

    description:
      section.summary,
  };
}

export default async function ReadingSectionPage({
  params,
}: ReadingSectionPageProps) {
  const {
    resourceId,
    sectionId,
  } = await params;

  const section =
    await getReadingSection(
      resourceId,
      sectionId,
    );

  if (!section) {
    notFound();
  }

  if (
    section.resourceId !==
    resourceId
  ) {
    notFound();
  }

  if (
    isUnavailableSection(
      section.status,
    )
  ) {
    notFound();
  }

  return (
    <ReadingSectionWorkspace
      section={section}
    />
  );
}