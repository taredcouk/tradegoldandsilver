import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const StatisticSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const Statistic = mongoose.models.Statistic || mongoose.model('Statistic', StatisticSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const stats = ['visitors', 'visits', 'conversion'];

    for (const name of stats) {
      const existingStat = await Statistic.findOne({ name });
      if (!existingStat) {
        await Statistic.create({ name, value: 0 });
        console.log(`Created statistic: ${name}`);
      } else {
        console.log(`Statistic ${name} already exists`);
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding statistics:', error);
    process.exit(1);
  }
}

seed();
