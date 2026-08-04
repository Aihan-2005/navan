import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/utils/cn";

type ProgressProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  value: number;
  max?: number;
  label: string;
  indicatorClassName?: string;
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function Progress({
  value,
  max = 100,
  label,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = clamp(value, 0, safeMax);
  const percentage = (safeValue / safeMax) * 100;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/[0.08]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-l",
          "from-cyan-300 to-blue-500",
          "transition-[width] duration-500 ease-out",
          indicatorClassName,
        )}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}