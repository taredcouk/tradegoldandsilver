import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Message from '@/models/Message';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    // Fetch all messages, sorted by most recent
    const messages = await Message.find({}).sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages.' },
      { status: 500 }
    );
  }
}
