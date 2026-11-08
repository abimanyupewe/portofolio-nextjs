"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import BannerModel, { BANNER_TEMPLATES, BANNER_TONES } from "@/models/Banner";

export type BannerData = {
    enabled: boolean;
    template: (typeof BANNER_TEMPLATES)[number];
    tone: (typeof BANNER_TONES)[number];
    badge?: string;
    message: string;
    cta_label?: string;
    cta_url?: string;
    dismissible: boolean;
    /** changes on every save; lets visitors who dismissed an older banner see the new one */
    version: string;
};

async function requireAdmin() {
    if ((await cookies()).get("admin_session")?.value !== "authenticated") throw new Error("Unauthorized");
}

const toData = (d: any): BannerData => ({
    enabled: !!d.enabled,
    template: d.template,
    tone: d.tone,
    badge: d.badge || undefined,
    message: d.message,
    cta_label: d.cta_label || undefined,
    cta_url: d.cta_url || undefined,
    dismissible: d.dismissible !== false,
    version: new Date(d.updated_at).getTime().toString(),
});

export async function getBanner(): Promise<BannerData | null> {
    await connectToDatabase();
    const doc = await BannerModel.findOne().lean();
    return doc ? toData(doc) : null;
}

// Only allow in-site paths/anchors and http(s) links, never javascript: or data: URLs.
const safeUrl = (u?: string) => {
    const v = (u ?? "").trim();
    return /^(https?:\/\/|\/|#|mailto:)/i.test(v) ? v : undefined;
};

export async function updateBanner(input: Omit<BannerData, "version">) {
    await requireAdmin();
    const message = String(input.message ?? "").trim();
    if (!message) throw new Error("Message is required");
    if (message.length > 160) throw new Error("Message max 160 characters");
    if (!BANNER_TEMPLATES.includes(input.template) || !BANNER_TONES.includes(input.tone)) throw new Error("Invalid template");

    const cta_url = safeUrl(input.cta_url);
    if (input.cta_url?.trim() && !cta_url) throw new Error("Link must start with https://, /, # or mailto:");

    const data = {
        enabled: !!input.enabled,
        template: input.template,
        tone: input.tone,
        badge: input.badge?.trim().slice(0, 20) || undefined,
        message,
        cta_label: input.cta_label?.trim().slice(0, 30) || undefined,
        cta_url,
        dismissible: !!input.dismissible,
        updated_at: new Date(),
    };

    await connectToDatabase();
    const doc = await BannerModel.findOneAndUpdate({}, data, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/banner");
    return toData(doc);
}
