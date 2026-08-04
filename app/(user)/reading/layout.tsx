import type {
  ReactNode,
} from "react";

import {
  ReadingNavigation,
} from "../../../features/reading/components/navigation/reading-navigation";

type ReadingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function ReadingLayout({
  children,
}: ReadingLayoutProps) {
  return (
    <>
      <ReadingNavigation />

      {children}
    </>
  );
}
