import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    industry: string;
    description?: string;
    period?: string;
    website?: string;
    logo_url?: string;
    created_at: Date;
}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    industry: { type: String, required: true },
    description: { type: String },
    period: { type: String },
    website: { type: String },
    logo_url: { type: String },
    created_at: { type: Date, default: Date.now },
});

const Company: Model<ICompany> = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
