import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
    full_name: string;
    taglines: string[];
    bio: string;
    avatar_url: string;
    social_links: Record<string, string>;
    created_at: Date;
}

const ProfileSchema: Schema = new Schema({
    full_name: { type: String, required: true },
    taglines: { type: [String], default: [] },
    bio: { type: String },
    avatar_url: { type: String },
    social_links: { type: Map, of: String, default: {} },
    created_at: { type: Date, default: Date.now }
});

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
