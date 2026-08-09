import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getReadingAiAnalysis,
} from "../../../../../features/reading/api/get-reading-ai-analysis";

import {
  getReadingResource,
} from "../../../../../features/reading/api/get-reading-resource";

import {
  ReadingAiAnalysisPanel,
} from "../../../../../features/reading/components/analysis/reading-ai-analysis-panel";

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
  const {
    resourceId,
  } = await params;

  const resource =
    await getReadingResource(
      resourceId,
    );

  if (!resource) {
    return {
      title:
        "منبع پیدا نشد",

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
  const {
    resourceId,
  } = await params;

  const [
    resource,
    analysis,
  ] = await Promise.all([
    getReadingResource(
      resourceId,
    ),

    getReadingAiAnalysis(
      resourceId,
    ),
  ]);

  if (!resource) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <ReadingResourceDetail
        resource={resource}
      />

      {analysis?.status ===
      "ready" ? (
        <ReadingAiAnalysisPanel
          analysis={analysis}
        />
      ) : null}
    </div>
  );
}