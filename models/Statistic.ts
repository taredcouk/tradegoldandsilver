import mongoose, { Schema, Document } from 'mongoose';

export interface IStatistic extends Document {
  name: string;
  value: number;
  updatedAt: Date;
}

const StatisticSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
StatisticSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Statistic || mongoose.model<IStatistic>('Statistic', StatisticSchema);
