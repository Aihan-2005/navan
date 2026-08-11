"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";

import { Card } from "../../../../components/ui/card";

type DraftStatusProps = Readonly<{
  status: "idle" | "saving" | "saved";
  lastSavedAt: string | null;
}>;

export function DraftStatus({ status, lastSavedAt }: DraftStatusProps) {
  const isSaved = status === "saved";

  return (
    <Card className="p-5" dir="rtl">
      <div className="flex items-center gap-2 text-sm text-cyan-300">
        {isSaved ? (
          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
        ) : (
          <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
        )}
        وضعیت پیش‌نویس
      </div>

      <p className="mt-3 text-sm leading-8 text-slate-400">
        {isSaved
          ? `پیش‌نویس با موفقیت ذخیره شد${lastSavedAt ? ` در ${lastSavedAt}` : ""}.`
          : "در حال ذخیره‌ی خودکار متن شما..."}
      </p>
    </Card>
  );
}
