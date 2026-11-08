import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICurrentPosition {
    role: string;
    company: string;
    status_type: string;
    location: string;
    period: string;
    description: string;
    is_active: boolean;
    logo_url?: string;
}

export interface IProfile extends Document {
    full_name: string;
    taglines: string[];
    bio: string;
    avatar_url: string;
    avatar_manga_url?: string;
    social_links: Record<string, string>;
    current_position?: ICurrentPosition;
    created_at: Date;
}

const CurrentPositionSchema = new Schema({
    role: { type: String, default: "Quality Assurance Intern" },
    company: { type: String, default: "Jagoan Hosting (PT Beon Intermedia)" },
    status_type: { type: String, default: "Internship" },
    location: { type: String, default: "Malang, Indonesia" },
    period: { type: String, default: "2026 - Present" },
    description: { type: String, default: "Mengembangkan automated testing, manual regression testing, dan pengujian kualitas sistem di Jagoan Hosting." },
    is_active: { type: Boolean, default: true },
    logo_url: { type: String, default: "" },
});

const ProfileSchema: Schema = new Schema({
    full_name: { type: String, required: true },
    taglines: { type: [String], default: [] },
    bio: { type: String },
    avatar_url: { type: String },
    avatar_manga_url: { type: String },
    social_links: { type: Map, of: String, default: {} },
    current_position: { type: CurrentPositionSchema, default: () => ({}) },
    created_at: { type: Date, default: Date.now }
});

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
