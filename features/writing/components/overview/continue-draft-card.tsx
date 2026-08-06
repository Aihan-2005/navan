import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { Card } from "../../../../components/ui/card";

import type { WritingDraft } from "../../types/writing.types";

type ContinueDraftCardProps = Readonly<{
  draft: WritingDraft;
}>;

export function ContinueDraftCard({ draft }: ContinueDraftCardProps) {
  return (
    <Card className="p-6" dir="rtl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-300">ادامه‌ی نوشته</p>
          <h3 className="mt-2 text-lg font-bold text-white">{draft.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {draft.excerpt}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
          <FileText aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-300">
            {draft.wordCount}
          </span>{" "}
          کلمه • بروزرسانی {draft.updatedAt}
        </div>

        <Link
          href={`/writing/drafts/${draft.id}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
        >
          ادامه دادن
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
