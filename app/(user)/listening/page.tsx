import type { Metadata } from "next";

import {
  getListeningOverview,
  ListeningOverview,
} from "../../../features/listening";

export const metadata: Metadata = {
  title: "تمرین شنیداری",
  description:
    "تمرین پادکست، مکالمه و رونویسی با تحلیل هوشمند",
};

export default async function ListeningPage() {
  const overview =
    await getListeningOverview();

  return (
    <ListeningOverview
      overview={overview}
    />
  );
}