import type {
  Metadata,
} from "next";

import {
  ClassroomOverview,
  getClassroomOverview,
} from "../../../features/classroom";

export const metadata: Metadata = {
  title:
    "اتاق گفتگو",

  description:
    "فضای گفت‌وگوی زنده برای تمرین زبان با دوستان و سایر زبان‌آموزها.",
};

export const dynamic =
  "force-dynamic";

export default async function ClassroomPage() {
  const data =
    await getClassroomOverview();

  return (
    <ClassroomOverview
      data={
        data
      }
    />
  );
}