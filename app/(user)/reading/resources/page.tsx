import type {
  Metadata,
} from "next";

import {
  getReadingMyResources,
} from "../../../../features/reading/api/get-reading-my-resources";

import {
  ReadingMyResources,
} from "../../../../features/reading/components/resource/reading-my-resources";

export const metadata: Metadata = {
  title:
    "منابع من",

  description:
    "مدیریت و مشاهده متون و فایل‌های شخصی شما برای یادگیری.",
};

export const dynamic =
  "force-dynamic";

export default async function ReadingResourcesPage() {
  const data =
    await getReadingMyResources();

  return (
    <ReadingMyResources
      data={data}
    />  );
}