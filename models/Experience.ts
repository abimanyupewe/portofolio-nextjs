import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
    company: string;
    position: string;
    duration: string;
    description: string;
    logo_url: string;
    created_at: Date;
}

const ExperienceSchema: Schema = new Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String },
    description: { type: String },
    logo_url: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
