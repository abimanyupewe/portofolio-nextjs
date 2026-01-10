"use server";

import connectToDatabase from "@/lib/mongodb";
import ExperienceModel from "@/models/Experience";
import { revalidatePath } from "next/cache";

const serialize = (doc: any) => {
    if (!doc) return null;
    const obj = JSON.parse(JSON.stringify(doc));
    if (obj._id) {
        obj.id = obj._id;
        delete obj._id;
    }
    if (Array.isArray(obj)) {
        return obj.map((item: any) => {
            if (item._id) {
                item.id = item._id;
                delete item._id;
            }
            return item;
        });
    }
    return obj;
};

export async function getExperiences() {
    await connectToDatabase();
    const exps = await ExperienceModel.find({}).sort({ created_at: -1 }).lean();
    return serialize(exps);
}

export async function createExperience(data: any) {
    await connectToDatabase();
    const newExp = await ExperienceModel.create(data);
    revalidatePath("/admin/dashboard/experiences");
    revalidatePath("/");
    return serialize(newExp);
}

export async function updateExperience(id: string, data: any) {
    await connectToDatabase();
    const { _id, ...updateData } = data;
    const exp = await ExperienceModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/admin/dashboard/experiences");
    revalidatePath("/");
    return serialize(exp);
}

export async function deleteExperience(id: string) {
    await connectToDatabase();
    await ExperienceModel.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard/experiences");
    revalidatePath("/");
    return { success: true };
}
