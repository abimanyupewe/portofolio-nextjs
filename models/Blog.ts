import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail_url: string;
    tags: string[];
    published: boolean;
    created_at: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String },
    thumbnail_url: { type: String },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
