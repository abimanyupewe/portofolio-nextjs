import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    content: string;
    category: string[];
    status: string[];
    language: string[];
    preview_link: string;
    repo_link: string;
    show_in_public_contributions: boolean;
    thumbnail_url: string;
    gallery_urls: string[];
    created_at: Date;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    category: { type: [String], default: [] },
    status: { type: [String], default: [] },
    language: { type: [String], default: [] },
    preview_link: { type: String },
    repo_link: { type: String },
    show_in_public_contributions: { type: Boolean, default: false },
    thumbnail_url: { type: String },
    gallery_urls: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now }
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

// Keep the new visibility field available during Next.js development hot reloads.
if (!Project.schema.path('show_in_public_contributions')) {
    Project.schema.add({ show_in_public_contributions: { type: Boolean, default: false } });
}

export default Project;
