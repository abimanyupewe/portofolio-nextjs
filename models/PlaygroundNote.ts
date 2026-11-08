import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlaygroundNote extends Document {
    word: string;
    ip_hash: string;
    created_at: Date;
}

const PlaygroundNoteSchema: Schema = new Schema({
    word: { type: String, required: true, maxlength: 20 },
    ip_hash: { type: String, index: true },
    created_at: { type: Date, default: Date.now, index: true },
});

const PlaygroundNote: Model<IPlaygroundNote> =
    mongoose.models.PlaygroundNote || mongoose.model<IPlaygroundNote>('PlaygroundNote', PlaygroundNoteSchema);

export default PlaygroundNote;
