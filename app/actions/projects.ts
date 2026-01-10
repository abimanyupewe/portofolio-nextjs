"use server";

import connectToDatabase from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { revalidatePath } from "next/cache";

const serialize = (doc: any) => {
    if (!doc) return null;
    const obj = JSON.parse(JSON.stringify(doc));
    if (obj._id) {
        obj.id = obj._id;
        delete obj._id;
    }
    // Also handle array if doc was array?
    // find() returns array. JSON.stringify handles array.
    // If array, map each item.
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

export async function getProjects() {
    await connectToDatabase();
    const projects = await ProjectModel.find({}).sort({ created_at: -1 }).lean();
    return serialize(projects);
}

export async function getProject(id: string) {
    await connectToDatabase();
    const project = await ProjectModel.findById(id).lean();
    return serialize(project);
}

export async function createProject(data: any) {
    await connectToDatabase();
    // Validate?
    const newProject = await ProjectModel.create(data);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return serialize(newProject);
}

export async function updateProject(id: string, data: any) {
    await connectToDatabase();
    // Remove _id from data if present to avoid error
    const { _id, ...updateData } = data;
    const project = await ProjectModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return serialize(project);
}

export async function deleteProject(id: string) {
    await connectToDatabase();
    await ProjectModel.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return { success: true };
}
