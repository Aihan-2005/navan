"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../../lib/utils/cn";
import type { SubscriptionPlan } from "../types/plans";
import { PlanCard } from "./plan-card";

type PricingModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  plans: readonly SubscriptionPlan[];
}>;

export function PricingModal({ isOpen, onClose, plans }: PricingModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
        onClick={onClose}
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className={cn(
            "relative w-full max-w-6xl overflow-hidden rounded-[32px]",
            "border border-white/10 bg-[#081322]/95 shadow-2xl shadow-black/40",
            "backdrop-blur-xl",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-cyan-400/10 via-transparent to-violet-500/10" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  پلن‌های اشتراک
                </p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  انتخابی مناسب برای هدف‌های بلند مدت تو
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  منتور اختصاصی خودت رو داشته باش
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن پنجره پلن‌ها"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/[0.1] hover:text-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
