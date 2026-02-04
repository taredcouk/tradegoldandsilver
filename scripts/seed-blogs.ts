import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import path from 'path';
import Blog from '../models/Blog';

dotenv.config({ path: '.env.local' });

// Configure Cloudinary
console.log('CLOUDINARY_URL present:', !!process.env.CLOUDINARY_URL);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const blogs = [
  {
    title: 'The Future of Gold in 2024',
    body: 'Gold has always been a safe haven for investors. In 2024, we expect to see continued growth due to global economic uncertainties...',
    author: 'Malek Albawaih',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  },
  {
    title: 'Silver vs Gold: Which is Better for Beginners?',
    body: 'Many new investors wonder whether they should start with gold or silver. While gold is more stable, silver offers higher volatility...',
    author: 'Admin',
    coverImage: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80',
  },
  {
    title: 'Protecting Your Wealth with Precious Metals',
    body: 'In times of high inflation, fiat currencies lose value. Precious metals like gold and silver act as a hedge against inflation...',
    author: 'Malek Albawaih',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
  }
];

async function seedBlogs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs.');

    for (const blogData of blogs) {
      console.log(`Uploading cover image for: ${blogData.title}`);

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(blogData.coverImage, {
        folder: 'blogs',
      });

      console.log(`Creating blog document: ${blogData.title}`);
      await Blog.create({
        title: blogData.title,
        body: blogData.body,
        author: blogData.author,
        cover: uploadResponse.secure_url,
      });
    }

    console.log('Successfully seeded blogs!');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

seedBlogs();
