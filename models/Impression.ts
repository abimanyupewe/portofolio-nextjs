import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImpression extends Document {
    name: string;
    company?: string;
    division?: string;
    message: string;
    liked_by: string[]; // ip hashes, one like per visitor
    ip_hash: string;
    created_at: Date;
}

const ImpressionSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 60 },
    company: { type: String, maxlength: 80 },
    division: { type: String, maxlength: 80 },
    message: { type: String, required: true, maxlength: 500 },
    liked_by: { type: [String], default: [] },
    ip_hash: { type: String, index: true },
    created_at: { type: Date, default: Date.now, index: true },
});

const Impression: Model<IImpression> =
    mongoose.models.Impression || mongoose.model<IImpression>('Impression', ImpressionSchema);

export default Impression;
