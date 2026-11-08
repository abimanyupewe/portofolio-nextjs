import mongoose, { Schema, Document, Model } from 'mongoose';

export const BANNER_TEMPLATES = ['announcement', 'minimal', 'marquee'] as const;
export const BANNER_TONES = ['inverted', 'subtle'] as const;

export interface IBanner extends Document {
    enabled: boolean;
    template: (typeof BANNER_TEMPLATES)[number];
    tone: (typeof BANNER_TONES)[number];
    badge?: string;
    message: string;
    cta_label?: string;
    cta_url?: string;
    dismissible: boolean;
    updated_at: Date;
}

// Singleton: the site has at most one banner document.
const BannerSchema: Schema = new Schema({
    enabled: { type: Boolean, default: false },
    template: { type: String, enum: BANNER_TEMPLATES, default: 'announcement' },
    tone: { type: String, enum: BANNER_TONES, default: 'inverted' },
    badge: { type: String, maxlength: 20 },
    message: { type: String, required: true, maxlength: 160 },
    cta_label: { type: String, maxlength: 30 },
    cta_url: { type: String, maxlength: 300 },
    dismissible: { type: Boolean, default: true },
    updated_at: { type: Date, default: Date.now },
});

const Banner: Model<IBanner> = mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);

export default Banner;
