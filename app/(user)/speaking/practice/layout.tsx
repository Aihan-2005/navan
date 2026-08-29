import type {
  ReactNode,
} from "react";

import {
  SpeakingLightSurface,
} from "../../../../features/speaking/components/speaking-light-surface";

type SpeakingPracticeLayoutProps =
  Readonly<{
    children: ReactNode;
  }>;

export default function SpeakingPracticeLayout({
  children,
}: SpeakingPracticeLayoutProps) {
  return (
    <SpeakingLightSurface>
      {children}
    </SpeakingLightSurface>
  );
}