import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import BlogRequest from '@/models/BlogRequest';
import Blog from '@/models/Blog';
import { isAdmin } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await dbConnect();
    const blogRequest = await BlogRequest.findById(id);

    if (!blogRequest || blogRequest.status !== 'pending') {
      return NextResponse.json({ error: 'Request not found or not pending' }, { status: 404 });
    }

    if (blogRequest.type === 'create') {
      await Blog.findByIdAndUpdate(blogRequest.blogId, {
        status: 'published',
        ...blogRequest.data
      });
    } else if (blogRequest.type === 'update') {
      await Blog.findByIdAndUpdate(blogRequest.blogId, blogRequest.data);
    } else if (blogRequest.type === 'delete') {
      await Blog.findByIdAndDelete(blogRequest.blogId);
    }

    blogRequest.status = 'approved';
    await blogRequest.save();

    return NextResponse.json({ message: 'Request approved successfully' });
  } catch (error: unknown) {
    console.error('Error approving request:', error);
    return NextResponse.json({ error: 'Failed to approve request' }, { status: 500 });
  }
}
