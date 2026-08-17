"use client";

import {
  FileText,
  MessageSquareText,
  Sparkles,
  Type,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

type LiveWritingStatsProps =
  Readonly<{
    wordCount:
      number;

    characterCount:
      number;

    sentenceCount:
      number;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function LiveWritingStats({
  wordCount,
  characterCount,
  sentenceCount,
}: LiveWritingStatsProps) {
  return (
    <Card
      className="p-5"
      dir="rtl"
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-cyan-300
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-4 w-4"
          />

          آمار لحظه‌ای
        </div>

        <span
          className="
            text-[11px]
            text-slate-600
          "
        >
          بدون محدودیت طول متن
        </span>
      </div>

      <div
        className="
          mt-4
          grid
          gap-3
          sm:grid-cols-3
        "
      >
        <Stat
          icon={
            FileText
          }
          label="کلمه"
          value={
            numberFormatter.format(
              wordCount,
            )
          }
        />

        <Stat
          icon={
            Type
          }
          label="کاراکتر"
          value={
            numberFormatter.format(
              characterCount,
            )
          }
        />

        <Stat
          icon={
            MessageSquareText
          }
          label="جمله"
          value={
            numberFormatter.format(
              sentenceCount,
            )
          }
        />
      </div>

      <p
        className="
          mt-4
          text-xs
          leading-6
          text-slate-600
        "
      >
        تعداد کلمه فقط برای آمار و تحلیل نمایش داده می‌شود و هیچ حداقل یا حداکثری برای ارسال متن وجود ندارد.
      </p>
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof FileText;

  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.03]
        p-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-500
        "
      >
        <Icon
          aria-hidden="true"
          className="h-4 w-4"
        />

        {label}
      </div>

      <p
        className="
          mt-2
          text-xl
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}