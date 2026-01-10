"use server";

import connectToDatabase from "@/lib/mongodb";
import CertificateModel from "@/models/Certificate";
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

export async function getCertificates() {
    await connectToDatabase();
    const certs = await CertificateModel.find({}).sort({ date: -1 }).lean();
    return serialize(certs);
}

export async function createCertificate(data: any) {
    await connectToDatabase();
    const newCert = await CertificateModel.create(data);
    revalidatePath("/admin/dashboard/experiences"); // Certificates are on the same page
    revalidatePath("/");
    return serialize(newCert);
}

export async function updateCertificate(id: string, data: any) {
    await connectToDatabase();
    const { _id, ...updateData } = data;
    const cert = await CertificateModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/admin/dashboard/experiences");
    revalidatePath("/");
    return serialize(cert);
}

export async function deleteCertificate(id: string) {
    await connectToDatabase();
    await CertificateModel.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard/experiences");
    revalidatePath("/");
    return { success: true };
}
