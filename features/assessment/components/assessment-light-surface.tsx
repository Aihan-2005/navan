import type {
  ComponentPropsWithoutRef,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import styles from "./assessment-light-surface.module.css";

type AssessmentLightSurfaceProps =
  ComponentPropsWithoutRef<"div">;

export function AssessmentLightSurface({
  className,
  children,
  ...props
}: AssessmentLightSurfaceProps) {
  return (
    <div
      dir="rtl"
      data-assessment-surface="light"
      className={cn(
        styles.root,
        "relative isolate w-full",
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
          -left-28
          -top-32
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#14B8A6]/[0.06]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          top-[28rem]
          -z-10
          h-72
          w-72
          rounded-full
          bg-[#712AE2]/[0.045]
          blur-[110px]
        "
      />

      {children}
    </div>
  );
}