import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import BlogRequest from '@/models/BlogRequest';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { identifier } = await request.json();

    if (!identifier) {
      return NextResponse.json({ error: 'Please provide your username or email' }, { status: 400 });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: identifier.toLowerCase() },
        { email: identifier.toLowerCase() }
      ]
    });

    if (!user) {
      // For security, don't reveal if the user exists or not
      return NextResponse.json({ message: 'If an account exists with that username or email, a reset request has been sent to the administrator.' });
    }

    // Check if there is already a pending password reset request for this user
    const existingRequest = await BlogRequest.findOne({
      requesterId: user._id,
      type: 'password_reset',
      status: 'pending'
    });

    if (existingRequest) {
      return NextResponse.json({ message: 'A password reset request is already pending for this account.' });
    }

    // Create the moderation request
    await BlogRequest.create({
      type: 'password_reset',
      requesterId: user._id,
      status: 'pending'
    });

    return NextResponse.json({ message: 'A password reset request has been sent to the administrator. Please contact them for your new credentials.' });

  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
