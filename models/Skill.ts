import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: string;
    percentage: number;
    icon_url: string;
    created_at: Date;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String },
    percentage: { type: Number, default: 0 },
    icon_url: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
