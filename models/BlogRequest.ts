import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogRequest extends Document {
  type: 'create' | 'update' | 'delete';
  blogId?: mongoose.Types.ObjectId; // For update and delete
  data?: {
    title: string;
    body: string;
    author: string;
    cover: string;
  };
  requesterId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogRequestSchema: Schema = new Schema(
  {
    type: { type: String, enum: ['create', 'update', 'delete'], required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog' },
    data: {
      title: { type: String },
      body: { type: String },
      author: { type: String },
      cover: { type: String },
    },
    requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BlogRequest || mongoose.model<IBlogRequest>('BlogRequest', BlogRequestSchema);
