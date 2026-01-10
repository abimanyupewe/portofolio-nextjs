import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificate extends Document {
    title: string;
    issuer: string;
    date: Date;
    credential_url: string;
    image_url: string;
    created_at: Date;
}

const CertificateSchema: Schema = new Schema({
    title: { type: String, required: true },
    issuer: { type: String },
    date: { type: Date },
    credential_url: { type: String },
    image_url: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Certificate: Model<ICertificate> = mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;
