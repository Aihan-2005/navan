import type {
  Metadata,
} from "next";

import {
  ClassroomOverview,
  getClassroomOverview,
} from "../../../features/classroom";

import {
  getOptionalSession,
} from "../../../lib/auth/get-optional-session";

export const metadata:
  Metadata = {
  title:
    "بحث آزاد آنلاین",

  description:
    "گفت‌وگوی زنده با زبان‌آموزهای دیگر همراه با چت، دفترچه شخصی، منابع مشترک و دستیار هوشمند.",
};

export const dynamic =
  "force-dynamic";

export default async function ClassroomPage() {
  const [
    data,
    session,
  ] =
    await Promise.all([
      getClassroomOverview(),
      getOptionalSession(),
    ]);

  const viewerId =
    session?.user?.id ??
    session?.user?.email ??
    null;

  return (
    <ClassroomOverview
      data={data}
      viewerId={viewerId}
    />
  );
}