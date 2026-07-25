import { notFound } from "next/navigation";

import {
  getSpeakingScenario,
  SpeakingPracticeShell,
} from "../../../../../features/speaking";

type SpeakingPracticePageProps = {
  params: Promise<{
    scenarioId: string;
  }>;
};

export default async function SpeakingPracticePage({
  params,
}: SpeakingPracticePageProps) {
  const { scenarioId } = await params;

  const scenario =
    await getSpeakingScenario(scenarioId);

  if (!scenario) {
    notFound();
  }

  return (
    <SpeakingPracticeShell
      scenario={scenario}
    />
  );
}