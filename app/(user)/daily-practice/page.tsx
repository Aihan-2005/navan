import type {
  Metadata,
} from "next";

import {
  DailyPracticeOverview,
  getDailyPracticeOverview,
} from "../../../features/daily-practice";

export const metadata:
  Metadata = {
  title: "تمرین روزانه",

  description:
    "برنامه تمرین روزانه، پیشرفت امروز و پیشنهاد هوشمند یادگیری",
};

export default async function DailyPracticePage() {
  const overview =
    await getDailyPracticeOverview();

  return (
    <DailyPracticeOverview
      overview={overview}
    />
  );
}