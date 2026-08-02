import type { Metadata } from "next";

import {
  CustomListeningSource,
} from "../../../../features/listening/components/custom-source/custom-listening-source";

export const metadata: Metadata = {
  title: "محتوای شنیداری شخصی",

  description:
    "آپلود فایل صوتی یا واردکردن لینک برای ساخت تمرین شنیداری",
};

export default function CustomListeningPage() {
  return <CustomListeningSource />;
}