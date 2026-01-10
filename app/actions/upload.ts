"use server";

import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio_nextjs";

    if (!file) {
        throw new Error("No file uploaded");
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ url: string }>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: folder,
                    resource_type: "auto", // auto-detect image/video
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    if (result) {
                        resolve({ url: result.secure_url });
                    } else {
                        reject(new Error("Upload failed"));
                    }
                }
            )
            .end(buffer);
    });
}
