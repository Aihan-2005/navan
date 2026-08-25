import type {
  ComponentPropsWithoutRef,
} from "react";

import {
  cn,
} from "../../../../lib/utils/cn";

import styles from "./reading-light-surface.module.css";

type ReadingLightSurfaceProps =
  ComponentPropsWithoutRef<"div">;


export function ReadingLightSurface({
  className,
  children,
  ...props
}: ReadingLightSurfaceProps) {
  return (
    <div
      data-reading-surface="light"
      className={cn(
        styles.root,

        "relative",
        "isolate",
        "w-full",

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
          -top-32
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#00685F]/[0.055]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-[28rem]
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#712AE2]/[0.035]
          blur-[100px]
        "
      />

      {children}
    </div>
  );
}