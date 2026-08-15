import Link from "next/link";

import {
  CheckCircle2,
  Files,
  Plus,
  WholeWord,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingMyResources as ReadingMyResourcesData,
} from "../../types/reading-my-resources.types";

import {
  ReadingMyResourceCard,
} from "./reading-my-resource-card";

type ReadingMyResourcesProps =
  Readonly<{
    data:
      ReadingMyResourcesData;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR", );

export function ReadingMyResources({
  data,
}: ReadingMyResourcesProps) {
  return (
    <main
      aria-labelledby="my-reading-resources-title"
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
      className="
        mx-auto
        w-full
        max-w-[936px]
        space-y-6
        pb-6
        text-[#191C1E]
      "
    >
      <header
        className="
          min-h-[72px]
          pb-2
        "
      >
        <h1
          id="my-reading-resources-title"
          className="
            text-[28px]
            font-bold
            leading-9
            tracking-[-0.01em]
            text-[#191C1E]
          "
        >
          منابع من
        </h1>
<p
          className="
            mt-3
            text-base
            font-normal
            leading-6
            text-[#3D4947]
          "
        >
          مدیریت و مشاهده متون و فایل‌های شخصی شما برای یادگیری
        </p>
      </header>

      <section
        aria-label="آمار منابع شخصی"
        className="
          grid
          gap-4
          md:grid-cols-3
          md:gap-6
        "
      >
        <ResourceStatCard
          title="کل منابع"
          value={
            numberFormatter.format(
              data.stats.totalResources,
            )
          }
          icon={
            Files}
          tone="teal"
        />

        <ResourceStatCard
          title="تکمیل شده"
          value={
            numberFormatter.format(
              data.stats.completedResources,
            )
          }
          icon={
            CheckCircle2
          }
          tone="violet"
        />

        <ResourceStatCard
          title="واژگان تحلیل شده"
          value={
            numberFormatter.format(
              data.stats.analyzedVocabularyCount,
            )
          }
          icon={
            WholeWord
          }
          tone="teal"
        />
      </section>
<section
        aria-label="لیست منابع شخصی"
        className="
          pt-4
        "
      >
        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {data.resources.map(
            (resource) => (
              <ReadingMyResourceCard
                key={
                  resource.id
                }
                resource={
                  resource
                }
              />
            ),
          )}

          <NewReadingResourceCard />
        </div>
      </section>
    </main> );
}

function ResourceStatCard({
  title,
  value,
  icon: Icon,
  tone,
}: Readonly<{
  title: string;

  value: string;

  icon:
    LucideIcon;

  tone:
    "teal" | "violet";
}>) {
  return (
    <article
      className="
        flex
        min-h-[104px]
        items-center
        gap-4
        rounded-2xl
        border
        border-[#BCC9C6]/30
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
      ">
      <span
        className={cn(
          "flex",
          "h-12 w-12",
          "shrink-0",
          "items-center",
          "justify-center",
          "rounded-xl",

          tone ===
            "violet"
            ? [
                "bg-[#8A4CFC]/10",
                "text-[#712AE2]",
              ]
            : [
                "bg-[#008378]/10",
                "text-[#008378]",
              ],
        )}>
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </span>

      <div
        className="
          min-w-0
        "
      >
        <p
          className="
            whitespace-nowrap
            text-xs
            font-normal
            leading-[14px]
            tracking-[0.05em]
            text-[#3D4947]
          "
        >
          {title}
        </p> <p
          className="
            mt-1
            whitespace-nowrap
            text-[28px]
            font-bold
            leading-9
            tracking-[-0.01em]
            text-[#191C1E]
          "
        >
          {value}
        </p>
      </div>
    </article>
  );
}

function NewReadingResourceCard() {
  return (
    <Link
      href="/reading/upload"
      className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        self-start
        rounded-2xl
        border-2
        border-dashed
        border-[#BCC9C6]
        bg-[#F2F4F6]
        px-6
        py-[59px]
        text-center
        transition
        hover:border-[#008378]
        hover:bg-[#EDF5F4]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#008378]/20
      "
    ><span
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#F7F9FB]
          text-[#00685F]
          shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        "
      >
        <Plus
          aria-hidden="true"
          className="h-[18px] w-[18px]"
        />
      </span>

      <h2
        className="
          mt-4
          text-[22px]
          font-bold
          leading-[30px]
          text-[#191C1E]
        "
      >
        منبع جدید
      </h2>
 <p
        className="
          mt-2
          max-w-[200px]
          text-sm
          font-normal
          leading-5
          text-[#3D4947]
        "
      >
        فایل PDF، لینک مقاله یا متن خود را برای تحلیل و یادگیری اضافه کنید.
      </p>
    </Link>
  );
}