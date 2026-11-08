"use server";

import { createHash } from "crypto";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import ImpressionModel from "@/models/Impression";

const MAX_PER_HOUR = 2;
const HOUR = 60 * 60 * 1000;

export type ImpressionItem = {
    id: string;
    name: string;
    company?: string;
    division?: string;
    message: string;
    likes: number;
    created_at: string;
};

async function isAdmin() {
    return (await cookies()).get("admin_session")?.value === "authenticated";
}

async function visitorHash() {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
    return createHash("sha256").update(ip + (process.env.NOTE_SALT ?? "playground")).digest("hex");
}

const toItem = (d: any): ImpressionItem => ({
    id: String(d._id),
    name: d.name,
    company: d.company || undefined,
    division: d.division || undefined,
    message: d.message,
    likes: Array.isArray(d.liked_by) ? d.liked_by.length : 0,
    created_at: new Date(d.created_at).toISOString(),
});

export async function getImpressions(limit?: number): Promise<ImpressionItem[]> {
    await connectToDatabase();
    let q = ImpressionModel.find({}, "-ip_hash").sort({ created_at: -1 });
    if (limit) q = q.limit(limit);
    return (await q.lean()).map(toItem);
}

export async function countImpressions(): Promise<number> {
    await connectToDatabase();
    return ImpressionModel.countDocuments({});
}

export async function createImpression(input: {
    name: string;
    company?: string;
    division?: string;
    message: string;
    honeypot?: string;
}): Promise<{ ok: true; item: ImpressionItem } | { ok: false; error: string }> {
    if (input.honeypot) return { ok: false, error: "Something went wrong." };
    const name = String(input.name ?? "").trim();
    const company = String(input.company ?? "").trim();
    const division = String(input.division ?? "").trim();
    const message = String(input.message ?? "").trim();

    if (name.length < 2 || name.length > 60) return { ok: false, error: "Please enter your name (2–60 characters)." };
    if (company.length > 80 || division.length > 80) return { ok: false, error: "Company/division is too long (max 80)." };
    if (message.length < 10 || message.length > 500) return { ok: false, error: "Impression must be 10–500 characters." };

    try {
        const ip_hash = await visitorHash();
        await connectToDatabase();
        const recent = await ImpressionModel.countDocuments({ ip_hash, created_at: { $gt: new Date(Date.now() - HOUR) } });
        if (recent >= MAX_PER_HOUR) return { ok: false, error: "Thanks! Please come back a bit later." };

        const doc = await ImpressionModel.create({
            name,
            company: company || undefined,
            division: division || undefined,
            message,
            ip_hash,
        });
        revalidatePath("/");
        revalidatePath("/impressions");
        return { ok: true, item: toItem(doc.toObject()) };
    } catch {
        return { ok: false, error: "Unable to save your impression right now. Please try again." };
    }
}

// One like per visitor; returns the new total.
export async function toggleLike(id: string, like: boolean): Promise<number> {
    const hash = await visitorHash();
    await connectToDatabase();
    const doc = await ImpressionModel.findByIdAndUpdate(
        id,
        like ? { $addToSet: { liked_by: hash } } : { $pull: { liked_by: hash } },
        { new: true, select: "liked_by" }
    ).lean();
    return (doc as any)?.liked_by?.length ?? 0;
}

export async function deleteImpression(id: string) {
    if (!(await isAdmin())) throw new Error("Unauthorized");
    await connectToDatabase();
    await ImpressionModel.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/impressions");
    revalidatePath("/admin/dashboard/impressions");
}
