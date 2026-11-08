"use server";

import { createHash } from "crypto";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import PlaygroundNoteModel from "@/models/PlaygroundNote";

const WORD_RE = /^[\p{L}\p{N}'-]{2,20}$/u; // exactly one word, no spaces/symbols
const MAX_PER_HOUR = 3;
const HOUR = 60 * 60 * 1000;

export type NoteWord = { id: string; word: string };

async function isAdmin() {
    return (await cookies()).get("admin_session")?.value === "authenticated";
}

export async function getNotes(limit = 40): Promise<NoteWord[]> {
    await connectToDatabase();
    const docs = await PlaygroundNoteModel.find({}, "word").sort({ created_at: -1 }).limit(limit).lean();
    return docs.map((d: any) => ({ id: String(d._id), word: d.word }));
}

// Public: visitors leave a one-word impression.
export async function createNote(
    word: string,
    honeypot = ""
): Promise<{ ok: true; note: NoteWord } | { ok: false; error: string }> {
    if (honeypot) return { ok: false, error: "Something went wrong." }; // bots fill hidden field
    const clean = String(word ?? "").trim();
    if (!WORD_RE.test(clean)) return { ok: false, error: "Use a single word (2–20 letters)." };

    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
    const ip_hash = createHash("sha256").update(ip + (process.env.NOTE_SALT ?? "playground")).digest("hex");

    await connectToDatabase();
    const recent = await PlaygroundNoteModel.countDocuments({ ip_hash, created_at: { $gt: new Date(Date.now() - HOUR) } });
    if (recent >= MAX_PER_HOUR) return { ok: false, error: "Thanks! Please come back a bit later." };

    const doc = await PlaygroundNoteModel.create({ word: clean, ip_hash });
    revalidatePath("/");
    return { ok: true, note: { id: String(doc._id), word: doc.word } };
}

// Admin only (server actions are callable directly, so re-check the session here).
export async function getAllNotes() {
    if (!(await isAdmin())) throw new Error("Unauthorized");
    await connectToDatabase();
    const docs = await PlaygroundNoteModel.find({}, "word created_at").sort({ created_at: -1 }).limit(500).lean();
    return docs.map((d: any) => ({ id: String(d._id), word: d.word as string, created_at: new Date(d.created_at).toISOString() }));
}

export async function deleteNote(id: string) {
    if (!(await isAdmin())) throw new Error("Unauthorized");
    await connectToDatabase();
    await PlaygroundNoteModel.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/dashboard/notes");
}
