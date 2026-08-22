import Link from "next/link";
import Image from "next/image";
import { Clock3 } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";
const numberFormatter = new Intl.NumberFormat("fa-IR");

export function FreeSpeakingCard() {
  return (
    <Card
      className={cn("group relative flex min-h-[364px] flex-col overflow-hidden border-[#e5e7eb] bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:border-[#0d9488]/45 hover:shadow-[0_18px_32px_-20px_rgba(0,104,95,0.45)]")}
    >
      <div className="relative h-40 overflow-hidden bg-[#c7e8e5]">
        <Image
          src="/speaking/conversation.jpg"
          alt=""
          fill
          sizes="(min-width: 900px) 296px, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
        
        <div className="absolute inset-x-3 top-3 flex items-center justify-start gap-2 text-[10px] font-bold text-white">
          <span className="rounded-full bg-[#007c72]/90 px-2.5 py-1">گفت‌وگوی آزاد</span>
          <span className="rounded-full bg-[#3d4041]/80 px-2.5 py-1">همه سطح‌ها</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5 text-right">
        <h3 className="text-xl font-bold leading-8 text-[#202124]">
          گفت‌وگوی آزاد
        </h3>

        <p className="mt-2 flex-1 text-sm leading-7 text-[#4b5563]">
          درباره هر موضوعی که دوست داری صحبت کن و بازخورد دریافت کن.
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-[#4b5563]">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              {numberFormatter.format(10)} دقیقه
            </span>
          </div>

          <Link
            href="/speaking/free"
            aria-label="شروع گفت‌وگوی آزاد"
            className="inline-flex items-center justify-center rounded-2xl bg-[#007c72] px-6 py-2.5 text-base font-bold text-white transition hover:bg-[#00685f]"
          >
            شروع
          </Link>
        </div>
      </div>
    </Card>
  );
}
