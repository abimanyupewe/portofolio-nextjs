"use server";

import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
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

export async function getBlogs() {
    await connectToDatabase();
    const blogs = await BlogModel.find({}).sort({ created_at: -1 }).lean();
    return serialize(blogs);
}

export async function getBlog(id: string) {
    await connectToDatabase();
    const blog = await BlogModel.findById(id).lean();
    return serialize(blog);
}

export async function createBlog(data: any) {
    await connectToDatabase();
    const newBlog = await BlogModel.create(data);
    revalidatePath("/admin/dashboard/blogs");
    revalidatePath("/");
    return serialize(newBlog);
}

export async function updateBlog(id: string, data: any) {
    await connectToDatabase();
    const { _id, ...updateData } = data;
    const blog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/admin/dashboard/blogs");
    revalidatePath("/");
    return serialize(blog);
}

export async function deleteBlog(id: string) {
    await connectToDatabase();
    await BlogModel.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard/blogs");
    revalidatePath("/");
    return { success: true };
}
