import type {
  ComponentPropsWithoutRef,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import styles from "./speaking-light-surface.module.css";

type SpeakingLightSurfaceProps =
  ComponentPropsWithoutRef<"div">;

export function SpeakingLightSurface({
  className,
  children,
  ...props
}: SpeakingLightSurfaceProps) {
  return (
    <div
      data-speaking-surface="light"
      className={cn(
        styles.root,

        "relative",
        "isolate",
        "mx-auto",
        "w-full",
        "max-w-[936px]",

        "rounded-[28px]",

        "bg-[#F7F9FB]",
        "text-[#0F172A]",

        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          -top-28
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#00685F]/[0.045]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-[26rem]
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#712AE2]/[0.03]
          blur-[100px]
        "
      />

      {children}
    </div>
  );
}