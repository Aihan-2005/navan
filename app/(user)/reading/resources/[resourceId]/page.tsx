import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getReadingResource,
} from "../../../../../features/reading/api/get-reading-resource";

import {
  ReadingResourceDetail,
} from "../../../../../features/reading/components/resource/reading-resource-detail";

type ReadingResourcePageProps =
  Readonly<{
    params: Promise<{
      resourceId: string;
    }>;
  }>;

export async function generateMetadata({
  params,
}: ReadingResourcePageProps): Promise<Metadata> {
  const { resourceId } =
    await params;

  const resource =
    await getReadingResource(
      resourceId,
    );

  if (!resource) {
    return {
      title: "منبع پیدا نشد",

      description:
        "منبع Reading موردنظر وجود ندارد.",
    };
  }

  return {
    title: resource.title,

    description:
      resource.description ??
      "جزئیات منبع Reading",
  };
}

export default async function ReadingResourcePage({
  params,
}: ReadingResourcePageProps) {
  const { resourceId } =
    await params;

  const resource =
    await getReadingResource(
      resourceId,
    );

  if (!resource) {
    notFound();
  }

  return (
    <ReadingResourceDetail
      resource={resource}
    />
  );
}