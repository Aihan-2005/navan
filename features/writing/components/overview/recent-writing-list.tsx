import Link from "next/link";
import {
  FilePenLine,
} from "lucide-react";

import type {
  RecentWriting,
} from "../../types/writing.types";

type RecentWritingListProps =
  Readonly<{
    writings: readonly RecentWriting[];
  }>;

const persianNumberFormatter =
  new Intl.NumberFormat("fa-IR");

export function RecentWritingList({
  writings,
}: RecentWritingListProps) {
  return (
    <article
      className="
        min-h-[470px]
        h-full
        rounded-3xl
        border
        border-[#EBEFF3]
        bg-white
        p-6
      "
      dir="rtl"
    >
      <div
        className="
          flex
          min-h-[52px]
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h3
            className="
              text-lg
              font-bold
              leading-7
              text-[#111827]
            "
          >
            نوشته‌های اخیر
          </h3>

          <p
            className="
              mt-1
              text-sm
              leading-5
              text-[#6B7280]
            "
          >
            آخرین تمرین‌هایی که تحلیل شده‌اند.
          </p>
        </div>

        <Link
          href="/writing/history"
          className="
            whitespace-nowrap
            text-xs
            font-bold
            text-[#0D9488]
            transition
            hover:text-[#00685F]
          "
        >
          مشاهده همه
        </Link>
      </div>

      <div
        className="
          mt-6
          space-y-4
        "
      >
        {writings.slice(0, 2).map(
          (writing) => (
            <Link
              key={writing.id}
              href={`/writing/submissions/${writing.id}`}
              className="
                flex
                min-h-[82px]
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-[#EBEFF3]
                bg-[#F7F9FB]
                p-4
                transition
                hover:border-[#CDE0DD]
                hover:bg-[#F4F8F8]
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#0D9488]
                    shadow-sm
                  "
                >
                  <FilePenLine
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-base
                      font-bold
                      leading-6
                      text-[#111827]
                    "
                  >
                    {writing.title}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-1
                      text-xs
                      font-normal
                      leading-4
                      text-[#6B7280]
                    "
                  >
                    {writing.feedback}
                  </p>
                </div>
              </div>

              <div
                className="
                  shrink-0
                  text-left
                "
              >
                <strong
                  className="
                    block
                    text-sm
                    font-bold
                    text-[#0D9488]
                  "
                >
                  {persianNumberFormatter.format(
                    writing.score,
                  )}
                  ٪
                </strong>

                <span
                  className="
                    mt-1
                    block
                    whitespace-nowrap
                    text-xs
                    font-medium
                    leading-4
                    text-[#9CA3AF]
                  "
                >
                  {writing.date}
                </span>
              </div>
            </Link>
          ),
        )}
      </div>
    </article>
  );
}