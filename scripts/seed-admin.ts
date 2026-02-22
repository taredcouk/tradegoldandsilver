import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const adminUsername = 'malekalbawaih';
    const adminPassword = 'Memo1994';
    const adminEmail = 'admin@tared.co.uk';

    const existingUser = await User.findOne({ username: adminUsername });

    if (existingUser) {
      console.log('Admin user already exists. Updating credentials...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.updateOne({ username: adminUsername }, {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        firstName: 'Malek',
        lastName: 'Albawaih',
      });
      console.log('Admin user updated successfully');
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        firstName: 'Malek',
        lastName: 'Albawaih',
      });
      console.log('Admin user created successfully');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
