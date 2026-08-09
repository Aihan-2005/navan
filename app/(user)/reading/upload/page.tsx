import type {
  Metadata,
} from "next";

import {
  ReadingSourceUploader,
} from "../../../../features/reading";

export const metadata: Metadata = {
  title: "آپلود منبع Reading",

  description:
    "فایل PDF، Word، متن یا تصویر خود را آپلود کنید و با کمک AI آن را به یک درس تعاملی Reading تبدیل کنید.",
};

export default function ReadingUploadPage() {
  return (
    <ReadingSourceUploader />
  );
}