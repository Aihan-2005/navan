import type {
  ComponentPropsWithoutRef,
} from "react";

import {
  cn,
} from "../../../../lib/utils/cn";

type ReadingDarkSurfaceProps =
  ComponentPropsWithoutRef<"div">;


export function ReadingDarkSurface({
  className,
  children,
  ...props
}: ReadingDarkSurfaceProps) {
  return (
    <div
      data-reading-surface="dark"
      className={cn(
        "relative",
        "isolate",
        "overflow-hidden",
        "rounded-[32px]",
        "border",
        "border-white/[0.12]",
        "bg-[#07192B]",
        "p-3",
        "shadow-[0_24px_70px_rgba(0,0,0,0.24)]",
        "sm:p-5",
        "lg:p-6",

    
        "[&_.text-slate-600]:text-slate-400",
        "[&_.text-slate-500]:text-slate-300",
        "[&_.text-slate-400]:text-slate-200",
        "[&_.text-slate-300]:text-slate-100",

      
        "[&_.text-cyan-300]:text-cyan-200",
        "[&_.text-violet-300]:text-violet-200",
        "[&_.text-amber-300]:text-amber-200",
        "[&_.text-emerald-300]:text-emerald-200",
        "[&_.text-red-300]:text-red-200",

        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          -top-36
          -z-10
          h-96
          w-96
          rounded-full
          bg-cyan-500/[0.08]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-28
          -z-10
          h-96
          w-96
          rounded-full
          bg-violet-500/[0.06]
          blur-[110px]
        "
      />

      {children}
    </div>
  );
}