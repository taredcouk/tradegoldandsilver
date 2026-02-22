import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import BlogRequest from '@/models/BlogRequest';
import { isAdmin } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await dbConnect();
    const { adminNotes } = await request.json();

    const blogRequest = await BlogRequest.findById(id);

    if (!blogRequest || blogRequest.status !== 'pending') {
      return NextResponse.json({ error: 'Request not found or not pending' }, { status: 404 });
    }

    blogRequest.status = 'rejected';
    blogRequest.adminNotes = adminNotes;
    await blogRequest.save();

    return NextResponse.json({ message: 'Request rejected successfully' });
  } catch (error: unknown) {
    console.error('Error rejecting request:', error);
    return NextResponse.json({ error: 'Failed to reject request' }, { status: 500 });
  }
}
