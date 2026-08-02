import type {
  Metadata,
} from "next";

import {
  getReadingOverview,
  ReadingOverview,
} from "../../../features/reading";

export const metadata: Metadata = {
  title:
    "تمرین خواندن",

  description:
    "مطالعه مرحله‌ای کتاب و متن با صوت، تحلیل گرامر و واژگان هوشمند",
};

export default async function ReadingPage() {
  const overview =
    await getReadingOverview();

  return (
    <ReadingOverview
      overview={overview}
    />
  );
}