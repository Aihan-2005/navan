import type {
  Metadata,
} from "next";

import {
  getReadingLibrary,
} from "../../../../features/reading/api/get-reading-library";

import {
  ReadingLibrary,
} from "../../../../features/reading/components/library/reading-library";

export const metadata: Metadata = {
  title: "کتابخانه Reading",

  description:
    "کتاب‌ها، داستان‌ها و مقاله‌های سطح‌بندی‌شده برای تقویت مهارت خواندن",
};

export default async function ReadingLibraryPage() {
  const library =
    await getReadingLibrary();

  return (
    <ReadingLibrary
      resources={library.resources}
    />
  );
}