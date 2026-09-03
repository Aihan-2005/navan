import type {
  Metadata,
} from "next";

import {
  ReviewSession,
} from "../../../../features/vocabulary";

export const metadata: Metadata = {
  title: "مرور واژگان",

  description:
    "جلسه مرور واژگان با سیستم لایتنر",
};

export default function VocabularyReviewPage() {
  return (
    <ReviewSession />
  );
}