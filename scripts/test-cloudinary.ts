import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  console.log('Testing Cloudinary configuration...');
  console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  try {
    const result = await cloudinary.api.ping();
    console.log('Cloudinary Ping Result:', result);

    if (result.status === 'ok') {
      console.log('✅ Cloudinary is correctly configured and reachable!');
    }
  } catch (error) {
    console.error('❌ Cloudinary configuration error:', error);
    process.exit(1);
  }
}

testCloudinary();
