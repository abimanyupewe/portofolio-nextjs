"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import FaqModel from "@/models/Faq";

export type FaqItem = { id: string; question: string; answer: string };
type FaqInput = { question: string; answer: string };

async function requireAdmin() {
    if ((await cookies()).get("admin_session")?.value !== "authenticated") throw new Error("Unauthorized");
}

const toItem = (d: any): FaqItem => ({ id: String(d._id), question: d.question, answer: d.answer });

const clean = (d: FaqInput): FaqInput => {
    const question = String(d.question ?? "").trim();
    const answer = String(d.answer ?? "").trim();
    if (!question || !answer) throw new Error("Question and answer are required");
    if (question.length > 200 || answer.length > 2000) throw new Error("Question max 200, answer max 2000 characters");
    return { question, answer };
};

const refresh = () => {
    revalidatePath("/");
    revalidatePath("/admin/dashboard/faqs");
};

export async function getFaqs(): Promise<FaqItem[]> {
    await connectToDatabase();
    return (await FaqModel.find({}).sort({ order: 1, created_at: 1 }).lean()).map(toItem);
}

export async function createFaq(data: FaqInput) {
    await requireAdmin();
    const c = clean(data);
    await connectToDatabase();
    const last = await FaqModel.findOne({}).sort({ order: -1 }).select("order").lean();
    const doc = await FaqModel.create({ ...c, order: ((last as any)?.order ?? -1) + 1 });
    refresh();
    return toItem(doc.toObject());
}

export async function updateFaq(id: string, data: FaqInput) {
    await requireAdmin();
    const c = clean(data);
    await connectToDatabase();
    const doc = await FaqModel.findByIdAndUpdate(id, c, { new: true }).lean();
    refresh();
    return doc ? toItem(doc) : null;
}

export async function deleteFaq(id: string) {
    await requireAdmin();
    await connectToDatabase();
    await FaqModel.findByIdAndDelete(id);
    refresh();
}

// Persist a new order: ids in the order they should appear.
export async function reorderFaqs(ids: string[]) {
    await requireAdmin();
    await connectToDatabase();
    await FaqModel.bulkWrite(ids.map((id, order) => ({ updateOne: { filter: { _id: id }, update: { $set: { order } } } })));
    refresh();
}
