import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/utils/cn";

export type CardProps = ComponentPropsWithoutRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04]",
        "shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
        "backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}