import type {
  Metadata,
} from "next";

import {
  getReadingMyResources,
} from "../../../../features/reading/api/get-reading-my-resources";

import {
  ReadingMyResources,
} from "../../../../features/reading/components/resources/reading-my-resources";

export const metadata: Metadata = {
  title:
    "منابع من",

  description:
    "مدیریت و مشاهده منابع شخصی Reading.",
};

/**
 * My Resources یک صفحه user-specific است.
 *
 * حتی در Mock Mode نیز آن را Static
 * prerender نمی‌کنیم تا بعداً اتصال به
 * Backend/Auth بدون تغییر معماری Route
 * انجام شود.
 */
export const dynamic =
  "force-dynamic";
export default async function ReadingResourcesPage() {
  const data =
    await getReadingMyResources();

  return (
    <ReadingMyResources
      data={data}
    />
  );
}