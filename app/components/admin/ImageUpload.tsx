"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/app/actions/upload";

interface ImageUploadProps {
  value?: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
  folder?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  folder = "portfolio",
  label = "Upload Image",
}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const files = Array.from(e.target.files);
      const newUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const { url } = await uploadImage(formData);
        newUrls.push(url);
      }

      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : [];
        onChange([...currentUrls, ...newUrls]);
      } else {
        onChange(newUrls[0]);
      }
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((url) => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="flex flex-wrap gap-4">
        {/* Helper to display current images */}
        {(Array.isArray(value) ? value : value ? [value] : []).map(
          (url, index) => (
            <div
              key={index}
              className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <Image
                src={url}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )
        )}

        {/* Upload Button */}
        {(!value || multiple || (Array.isArray(value) && value.length === 0)) && (
          <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
            {uploading ? (
              <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
