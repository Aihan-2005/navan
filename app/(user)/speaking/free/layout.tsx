import type {
  ReactNode,
} from "react";

import {
  SpeakingLightSurface,
} from "../../../../features/speaking/components/speaking-light-surface";

type FreeSpeakingLayoutProps =
  Readonly<{
    children: ReactNode;
  }>;

export default function FreeSpeakingLayout({
  children,
}: FreeSpeakingLayoutProps) {
  return (
    <SpeakingLightSurface>
      {children}
    </SpeakingLightSurface>
  );
}