import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

type ReadingBlockNavigatorProps =
  Readonly<{
    currentIndex:
      number;

    totalBlocks:
      number;

    onPrevious:
      () => void;

    onNext:
      () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function ReadingBlockNavigator({
  currentIndex,
  totalBlocks,
  onPrevious,
  onNext,
}: ReadingBlockNavigatorProps) {
  const isFirst =
    currentIndex ===
    0;

  const isLast =
    currentIndex ===
    totalBlocks -
      1;

  return (
    <nav
      aria-label="جابجایی بین پاراگراف‌های متن"
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <button
        type="button"
        disabled={
          isFirst
        }
        onClick={
          onPrevious
        }
        className="
          inline-flex
          min-h-11
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.035]
          px-4
          text-sm
          text-slate-300
          transition
          hover:bg-white/[0.07]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        پاراگراف قبلی
      </button>

      <div
        className="
          text-center
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            text-xs
            text-cyan-300
          "
        >
          <BookOpenText
            aria-hidden="true"
            className="h-4 w-4"
          />

          تحلیل پاراگراف
        </div>

        <p
          className="
            mt-1
            text-sm
            font-bold
            text-white
          "
        >
          {numberFormatter.format(
            currentIndex +
              1,
          )}{" "}
          از{" "}
          {numberFormatter.format(
            totalBlocks,
          )}
        </p>
      </div>

      <button
        type="button"
        disabled={
          isLast
        }
        onClick={
          onNext
        }
        className={cn(
          "inline-flex",
          "min-h-11",
          "items-center",
          "justify-center",
          "gap-2",
          "rounded-xl",
          "px-4",
          "text-sm",
          "font-bold",
          "transition",

          isLast
            ? [
                "cursor-not-allowed",
                "bg-white/[0.04]",
                "text-slate-600",
              ]
            : [
                "bg-cyan-400",
                "text-slate-950",
                "hover:bg-cyan-300",
              ],
        )}
      >
        پاراگراف بعدی

        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4"
        />
      </button>
    </nav>
  );
}