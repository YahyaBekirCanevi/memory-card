import mongoose, { Schema, Document } from "mongoose";

export interface IWord extends Document {
  word: string;
  meaning: string;
  example: string;
  translation: string;
  category: string;
}

const WordSchema = new Schema<IWord>({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  example: { type: String, required: true },
  translation: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Word ||
  mongoose.model<IWord>("Word", WordSchema);
