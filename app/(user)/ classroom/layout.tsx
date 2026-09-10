import type {
  ReactNode,
} from "react";

import {
  ClassroomLightSurface,
} from "../../../features/classroom/components/classroom-light-surface";

type ClassroomLayoutProps =
  Readonly<{
    children: ReactNode;
  }>;

export default function ClassroomLayout({
  children,
}: ClassroomLayoutProps) {
  return (
    <ClassroomLightSurface>
      {children}
    </ClassroomLightSurface>
  );
}