"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { PaperPlaneSend } from "@/components/ui/paper-plane-send";
import { createImpression, type ImpressionItem } from "@/app/actions/impressions";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (item: ImpressionItem) => void;
}

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-foreground";

const ImpressionModal = ({ open, onClose, onCreated }: Props) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [division, setDivision] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const created = useRef<ImpressionItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const send = async () => {
    setError(null);
    try {
      const res = await createImpression({ name, company, division, message, honeypot });
      if (!res.ok) {
        setError(res.error);
        return false;
      }
      created.current = res.item;
      return true;
    } catch {
      setError("Unable to send your impression right now. Please try again.");
      return false;
    }
  };

  // Close only after the plane has flown, then hand the new card to the list.
  const done = () => {
    if (created.current) onCreated(created.current);
    created.current = null;
    setName("");
    setCompany("");
    setDivision("");
    setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="impression-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
            <h3 id="impression-title" className="font-heading text-2xl font-semibold">
              Leave an impression
            </h3>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">What was it like working with me?</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* honeypot: hidden from people, bots tend to fill it */}
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Your name *" aria-label="Your name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} value={company} onChange={(e) => setCompany(e.target.value)} maxLength={80} placeholder="Company (optional)" aria-label="Company" />
                <input className={field} value={division} onChange={(e) => setDivision(e.target.value)} maxLength={80} placeholder="Division (optional)" aria-label="Division" />
              </div>
              <div>
                <textarea
                  className={`${field} min-h-32 resize-none`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  placeholder="Your impression *"
                  aria-label="Your impression"
                  required
                />
                <p className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{message.length > 0 && message.trim().length < 10 ? "Minimum 10 characters" : " "}</span>
                  <span>{message.length}/500</span>
                </p>
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="flex justify-end pt-2">
                <PaperPlaneSend onSend={send} onSent={done} disabled={!name.trim() || !message.trim()} />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImpressionModal;
