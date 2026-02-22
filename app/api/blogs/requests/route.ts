import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import BlogRequest from '@/models/BlogRequest';
import { getSession, isAdmin } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const admin = await isAdmin();

    let requests;
    if (admin) {
      requests = await BlogRequest.find({})
        .populate('blogId')
        .populate('requesterId', 'username email')
        .sort({ createdAt: -1 });
    } else {
      requests = await BlogRequest.find({ requesterId: session.id })
        .populate('blogId')
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(requests);
  } catch (error: unknown) {
    console.error('Error fetching blog requests:', error);
    return NextResponse.json({ error: 'Failed to fetch blog requests' }, { status: 500 });
  }
}
