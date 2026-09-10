import type {
  Metadata,
} from "next";

import {
  getDashboardOverview,
} from "../../../features/dashboard";

import {
  buildProfileProgress,
  ProfileProgressOverview,
} from "../../../features/profile";

export const metadata: Metadata = {
  title: "پیشرفت من",

  description:
    "مشاهده روند پیشرفت، مهارت‌ها، زمان یادگیری، واژگان و فعالیت‌های اخیر",
};

export default async function ProfilePage() {
  const dashboard =
    await getDashboardOverview();

  const progress =
    buildProfileProgress(
      dashboard,
    );

  return (
    <ProfileProgressOverview
      data={progress}
    />
  );
}