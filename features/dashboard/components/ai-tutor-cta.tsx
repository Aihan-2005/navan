import Link from "next/link";
import {
  MessageCircle,
} from "lucide-react";


export function AITutorCTA(){

  return (
    <section
      dir="rtl"
      className="
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,.04)]
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-[#FFF7ED]
          "
        >

          <MessageCircle
            className="
              h-8
              w-8
              text-[#F97316]
            "
          />

        </div>



        <h2
          className="
            mt-5
            text-base
            font-bold
            text-[#191C1E]
          "
        >
          آماده گفتگو هستی؟
        </h2>



        <p
          className="
            mt-2
            text-xs
            leading-5
            text-[#3D4947]
          "
        >
          همین حالا یک مکالمه واقعی را شروع کن.
        </p>



        <Link
          href="/speaking"
          className="
            mt-5
            flex
            h-9
            w-full
            items-center
            justify-center
            rounded-lg
            bg-[#00685F]
            text-sm
            font-bold
            text-white
            transition
            hover:bg-[#00574F]
          "
        >
          شروع مکالمه
        </Link>


      </div>


    </section>
  );
}