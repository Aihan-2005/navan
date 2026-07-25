import {
  getSpeakingOverview,
  SpeakingOverview,
} from "../../../features/speaking";

export default async function SpeakingPage() {
  const overview =
    await getSpeakingOverview();

  return (
    <SpeakingOverview overview={overview} />
  );
}