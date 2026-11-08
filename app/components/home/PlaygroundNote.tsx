"use client";

import React, { useState, useTransition } from "react";
import FallingText from "@/components/FallingText";
import Title from "@/app/components/home/props/Title";
import { createNote, type NoteWord } from "@/app/actions/notes";

// Tiles use the site's theme tokens so they follow charcoal/cream in both modes.
const tileTheme = {
  "--falling-text-tile": "var(--card)",
  "--falling-text-tile-edge": "var(--border)",
  "--falling-text-tile-highlight": "transparent",
  "--falling-text-tile-shadow": "0 4px 10px -6px rgba(0,0,0,0.35)",
  "--falling-text-tile-ink": "var(--foreground)",
} as React.CSSProperties;

const PlaygroundNote = ({ initialNotes }: { initialNotes: NoteWord[] }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [word, setWord] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createNote(word, honeypot);
      if (res.ok) {
        setNotes((prev) => [res.note, ...prev]);
        setWord("");
        setMessage({ text: "Thanks for your word!", error: false });
      } else {
        setMessage({ text: res.error, error: true });
      }
    });
  };

  return (
    <section id="playground" className="py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <Title text1="Playground" text2="Note" />
        <p className="mb-8 max-w-xl text-sm text-muted-foreground">
          Leave one word about your impression of this portfolio, then drag, throw and play with everyone&apos;s words.
        </p>

        <form onSubmit={submit} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* honeypot: hidden from people, bots tend to fill it */}
          <input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <input
            value={word}
            onChange={(e) => setWord(e.target.value.replace(/\s/g, ""))}
            maxLength={20}
            required
            aria-label="Your one word"
            placeholder="One word…"
            className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition focus:border-foreground sm:w-64"
          />
          <button
            type="submit"
            disabled={pending || word.length < 2}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-85 disabled:opacity-40"
          >
            {pending ? "Sending…" : "Leave a word"}
          </button>
          {message && (
            <p role="status" className={`text-sm ${message.error ? "text-destructive" : "text-muted-foreground"}`}>
              {message.text}
            </p>
          )}
        </form>

        <div className="h-[420px] overflow-hidden rounded-xl border border-border bg-muted/40">
          <FallingText
            text={notes.length ? notes.map((n) => n.word).join(" ") : "Be the first to leave a word"}
            variant="tiles"
            trigger="scroll"
            fontSize="1.25rem"
            gravity={0.8}
            bounciness={0.35}
            accentColor="var(--foreground)"
            style={tileTheme}
          />
        </div>
      </div>
    </section>
  );
};

export default PlaygroundNote;
