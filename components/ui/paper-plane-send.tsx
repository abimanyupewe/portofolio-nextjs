"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaperPlaneSendProps {
  /** Resolve true when the message was accepted; the plane only flies on success. */
  onSend: () => Promise<boolean>;
  /** Called after the flight animation ends. */
  onSent?: () => void;
  disabled?: boolean;
  label?: string;
  sentLabel?: string;
  className?: string;
}

type Phase = "idle" | "sending" | "flying" | "sent";

/** A sheet folds into a paper plane and flies out of the button, which then confirms "Sent". */
export const PaperPlaneSend = ({
  onSend,
  onSent,
  disabled,
  label = "Send",
  sentLabel = "Sent",
  className,
}: PaperPlaneSendProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const reduced = useReducedMotion();

  const click = async () => {
    if (phase !== "idle" || disabled) return;
    setPhase("sending");
    const ok = await onSend().catch(() => false);
    if (!ok) return setPhase("idle");
    if (reduced) {
      setPhase("sent");
      return onSent?.();
    }
    setPhase("flying");
  };

  return (
    <button
      type="button"
      onClick={click}
      disabled={disabled || phase !== "idle"}
      className={cn(
        "relative inline-flex h-12 min-w-40 items-center justify-center overflow-visible rounded-full bg-foreground px-8 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-90 disabled:cursor-not-allowed",
        (disabled && phase === "idle") && "opacity-40",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {phase === "flying" ? null : phase === "sent" ? (
          <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <Check size={16} /> {sentLabel}
          </motion.span>
        ) : (
          <motion.span key="label" exit={{ opacity: 0 }} className="flex items-center gap-2">
            {phase === "sending" ? "Sending…" : label}
            <Send size={14} />
          </motion.span>
        )}
      </AnimatePresence>

      {phase === "flying" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -ml-3 -mt-4 text-foreground"
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1 }}
          animate={{
            // 1) fold the sheet narrow, 2) it becomes a plane and takes off up and to the right
            x: [0, 0, 40, 160],
            y: [0, 0, -18, -90],
            rotate: [0, 0, -20, -28],
            scaleX: [1, 0.6, 1, 0.9],
            scaleY: [1, 1, 1, 0.9],
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: 1.1, times: [0, 0.3, 0.55, 1], ease: "easeInOut" }}
          onAnimationComplete={() => {
            setPhase("sent");
            onSent?.();
          }}
        >
          {/* the sheet cross-fades into a plane while it narrows, then the plane takes off */}
          <motion.svg
            width="24" height="32" viewBox="0 0 24 32"
            className="absolute left-0 top-0"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, times: [0, 0.3, 0.45, 1] }}
          >
            <path d="M2 2h20v28H2z" className="fill-background stroke-foreground" strokeWidth="1.5" />
            <path d="M7 11h10M7 16h10M7 21h6" className="stroke-foreground" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
          <motion.span
            className="absolute left-0 top-1 text-foreground"
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 1.1, times: [0, 0.3, 0.45, 1] }}
          >
            <Send size={24} fill="currentColor" />
          </motion.span>
        </motion.span>
      )}
    </button>
  );
};
