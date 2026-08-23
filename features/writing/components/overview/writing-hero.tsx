import Link from "next/link";
import { PenTool, Sparkles } from "lucide-react";

export function WritingHero() {
  return (
    <section
      className="relative min-h-[256px] overflow-hidden rounded-2xl border border-[#BCC9C6]/20 bg-white px-8 py-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      dir="rtl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,104,95,0.08),transparent_35%)]" />

      <div className="relative flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-[518px] text-right">
          <div className="mb-3 flex items-center justify-end gap-2 text-sm font-bold text-[#00685F]">
            <Sparkles className="h-4 w-4" />
            مربی هوشمند نوشتن
          </div>

          <h1 className="text-[36px] font-bold leading-[45px] tracking-[-0.72px] text-[#191C1E]">
            نوشتن <span className="text-[#00685F]">با بازخورد آنی</span>
          </h1>

          <p className="mt-4 text-[18px] font-normal leading-7 text-[#3D4947]">
            مهارت‌های نوشتاری خود را با تمرین‌های هدفمند و تحلیل‌های دقیق هوش مصنوعی بهبود ببخشید.
          </p>
        </div>

        <Link
          href="/writing/new"
          className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-[#00685F0D] backdrop-blur-[64px]"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F2F4F6] text-[#00685F] shadow-inner">
            <PenTool className="h-10 w-10" />
          </div>
        </Link>
      </div>
    </section>
  );
}