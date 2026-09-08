import type {
  ReactNode,
} from "react";

import {
  AssessmentLightSurface,
} from "../../../features/assessment/components/assessment-light-surface";

type AssessmentLayoutProps =
  Readonly<{
    children: ReactNode;
  }>;

export default function AssessmentLayout({
  children,
}: AssessmentLayoutProps) {
  return (
    <AssessmentLightSurface>
      {children}
    </AssessmentLightSurface>
  );
}