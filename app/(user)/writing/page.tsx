import { getWritingOverview, WritingOverview } from "../../../features/writing";

export default async function WritingPage() {
  const overview = await getWritingOverview();

  return <WritingOverview overview={overview} />;
}
