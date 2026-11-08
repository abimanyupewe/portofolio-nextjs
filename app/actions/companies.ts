"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import CompanyModel from "@/models/Company";

export type CompanyItem = {
    id: string;
    name: string;
    industry: string;
    description?: string;
    period?: string;
    website?: string;
    logo_url?: string;
};

type CompanyInput = Omit<CompanyItem, "id">;

async function requireAdmin() {
    if ((await cookies()).get("admin_session")?.value !== "authenticated") throw new Error("Unauthorized");
}

const toItem = (d: any): CompanyItem => ({
    id: String(d._id),
    name: d.name,
    industry: d.industry,
    description: d.description || undefined,
    period: d.period || undefined,
    website: d.website || undefined,
    logo_url: d.logo_url || undefined,
});

// Only accept http(s) links so a stored value can never be a javascript: URL.
const safeUrl = (u?: string) => (u && /^https?:\/\//i.test(u.trim()) ? u.trim() : undefined);

const clean = (d: CompanyInput): CompanyInput => ({
    name: String(d.name ?? "").trim(),
    industry: String(d.industry ?? "").trim(),
    description: d.description?.trim() || undefined,
    period: d.period?.trim() || undefined,
    website: safeUrl(d.website),
    logo_url: d.logo_url?.trim() || undefined,
});

const refresh = () => {
    revalidatePath("/");
    revalidatePath("/admin/dashboard/companies");
};

export async function getCompanies(): Promise<CompanyItem[]> {
    await connectToDatabase();
    return (await CompanyModel.find({}).sort({ created_at: -1 }).lean()).map(toItem);
}

export async function createCompany(data: CompanyInput) {
    await requireAdmin();
    const c = clean(data);
    if (!c.name || !c.industry) throw new Error("Name and industry are required");
    await connectToDatabase();
    const doc = await CompanyModel.create(c);
    refresh();
    return toItem(doc.toObject());
}

export async function updateCompany(id: string, data: CompanyInput) {
    await requireAdmin();
    const c = clean(data);
    if (!c.name || !c.industry) throw new Error("Name and industry are required");
    await connectToDatabase();
    const doc = await CompanyModel.findByIdAndUpdate(id, c, { new: true }).lean();
    refresh();
    return doc ? toItem(doc) : null;
}

export async function deleteCompany(id: string) {
    await requireAdmin();
    await connectToDatabase();
    await CompanyModel.findByIdAndDelete(id);
    refresh();
}
