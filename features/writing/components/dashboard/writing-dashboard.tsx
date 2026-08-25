import {
  getWritingOverview,
} from "../../api/get-writing-overview";

import {
  WritingOverview,
} from "../overview/writing-overview";

import type {
  WritingOverviewData,
} from "../../types/writing.types";

type WritingDashboardProps =
  Readonly<{
 
    overview?: WritingOverviewData;
  }>;

export async function WritingDashboard({
  overview: providedOverview,
}: WritingDashboardProps = {}) {
  const overview =
    providedOverview ??
    (await getWritingOverview());

  return (
    <WritingOverview
      overview={overview}
    />
  );
}