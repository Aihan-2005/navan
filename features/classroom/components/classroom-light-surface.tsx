import type {
  ComponentPropsWithoutRef,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import styles from "./classroom-light-surface.module.css";

type ClassroomLightSurfaceProps =
  ComponentPropsWithoutRef<"div">;

export function ClassroomLightSurface({
  className,
  children,
  ...props
}: ClassroomLightSurfaceProps) {
  return (
    <div
      dir="rtl"
      data-classroom-surface="light"
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
          -top-28
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#14B8A6]/[0.055]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          top-[30rem]
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#712AE2]/[0.04]
          blur-[110px]
        "
      />

      {children}
    </div>
  );
}