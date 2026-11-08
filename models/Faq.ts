import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaq extends Document {
    question: string;
    answer: string;
    order: number;
    created_at: Date;
}

const FaqSchema: Schema = new Schema({
    question: { type: String, required: true, maxlength: 200 },
    answer: { type: String, required: true, maxlength: 2000 },
    order: { type: Number, default: 0, index: true },
    created_at: { type: Date, default: Date.now },
});

const Faq: Model<IFaq> = mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);

export default Faq;
