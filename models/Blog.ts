import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  body: string;
  author: string;
  cover: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
