import type {
  Metadata,
} from "next";

import {
  Headphones,
  Library,
} from "lucide-react";

import {
  getListeningOverview,
  ListeningContentCard,
} from "../../../../features/listening";

export const metadata: Metadata = {
  title: "کتابخانه Listening",

  description:
    "تمرین‌های شنیداری در سطح‌ها، موضوع‌ها و لهجه‌های مختلف",
};

export default async function ListeningLibraryPage() {
  const overview =
    await getListeningOverview();

  const contents = Array.from(
    new Map(
      [
        ...overview.featuredContents,
        ...overview.recommendedContents,
      ].map((content) => [
        content.id,
        content,
      ]),
    ).values(),
  );

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-8
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex h-12 w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <Library
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <p
            className="
              mt-5 text-sm
              font-medium
              text-cyan-300
            "
          >
            Listening Library
          </p>

          <h1
            className="
              mt-2 text-3xl
              font-bold text-white
              sm:text-4xl
            "
          >
            کتابخانه تمرین‌های شنیداری
          </h1>

          <p
            className="
              mt-4 max-w-3xl
              text-sm leading-8
              text-slate-400
            "
          >
            از میان پادکست، مکالمه،
            داستان، خبر و مصاحبه یک
            تمرین متناسب با سطح خودت
            انتخاب کن.
          </p>
        </div>
      </section>

      {contents.length > 0 ? (
        <section>
          <div
            className="
              flex items-center
              gap-2 text-slate-300
            "
          >
            <Headphones
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg font-bold
                text-white
              "
            >
              همه تمرین‌ها
            </h2>
          </div>

          <div
            className="
              mt-5 grid gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {contents.map(
              (content) => (
                <ListeningContentCard
                  key={content.id}
                  content={content}
                />
              ),
            )}
          </div>
        </section>
      ) : (
        <section
          className="
            rounded-2xl border
            border-white/[0.07]
            bg-white/[0.03]
            p-10 text-center
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            فعلاً تمرینی در کتابخانه
            وجود ندارد.
          </p>
        </section>
      )}
    </main>
  );
}