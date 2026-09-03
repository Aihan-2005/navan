import type {
  Metadata,
} from "next";

import {
  VocabularyWorkspace,
} from "../../../features/vocabulary";

export const metadata: Metadata = {
  title: "واژگان",

  description:
    "یادگیری واژگان با جعبه لایتنر و مرور فاصله‌دار",
};

export default function VocabularyPage() {
  return (
    <VocabularyWorkspace />
  );
}