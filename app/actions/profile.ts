"use server";

import connectToDatabase from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import SkillModel from "@/models/Skill";
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

// --- PROFILE ---
export async function getProfile() {
    await connectToDatabase();
    const profile = await ProfileModel.findOne().lean();
    return serialize(profile);
}

export async function updateProfile(data: any) {
    await connectToDatabase();
    // Assuming singleton profile. If exists update, else create.
    const existing = await ProfileModel.findOne();
    if (existing) {
        const { _id, ...updateData } = data;
        const updated = await ProfileModel.findByIdAndUpdate(existing._id, updateData, { new: true }).lean();
        revalidatePath("/");
        revalidatePath("/about");
        return serialize(updated);
    } else {
        const newProfile = await ProfileModel.create(data);
        revalidatePath("/");
        revalidatePath("/about");
        return serialize(newProfile);
    }
}

// --- SKILLS ---
export async function getSkills() {
    await connectToDatabase();
    const skills = await SkillModel.find({}).sort({ category: 1 }).lean();
    return serialize(skills);
}

export async function createSkill(data: any) {
    await connectToDatabase();
    const newSkill = await SkillModel.create(data);
    revalidatePath("/admin/dashboard/profile");
    revalidatePath("/");
    return serialize(newSkill);
}

export async function updateSkill(id: string, data: any) {
    await connectToDatabase();
    const { _id, ...updateData } = data;
    const skill = await SkillModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/admin/dashboard/profile");
    revalidatePath("/");
    return serialize(skill);
}

export async function deleteSkill(id: string) {
    await connectToDatabase();
    await SkillModel.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard/profile");
    revalidatePath("/");
    return { success: true };
}
