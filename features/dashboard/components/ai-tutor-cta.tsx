import Link from "next/link";

import {
  MessageCircle,
} from "lucide-react";

export function AITutorCTA() {
  return (
    <section
      dir="rtl"
      className="
        flex
        h-[236px]
        w-full
        flex-col
        items-center
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#F2F4F6]
        px-6
        pb-[42px]
        pt-6
        text-center
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#B7E3E1]
          shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]
        "
      >
        <MessageCircle
          aria-hidden="true"
          className="
            h-7
            w-7
            text-[#0D9488]
          "
        />
      </div>

      <h2
        className="
          mt-3
          text-sm
          font-bold
          leading-5
          text-[#191C1E]
        "
      >
        آماده گفتگو هستی؟
      </h2>

      <p
        className="
          mt-1
          text-xs
          font-normal
          leading-4
          text-[#526E7A]
        "
      >
        همین حالا یک مکالمه واقعی را شروع کن.
      </p>

      <Link
        href="/speaking"
        className="
          mt-4
          flex
          h-9
          w-full
          items-center
          justify-center
          rounded-lg
          bg-[#14B8A6]
          text-sm
          font-bold
          leading-5
          text-white
          transition-colors
          hover:bg-[#0D9488]
        "
      >
        شروع گفتگو
      </Link>
    </section>
  );
}