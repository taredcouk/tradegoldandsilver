import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  body: string;
  author: string;
  cover: string;
  status: 'draft' | 'published';
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
