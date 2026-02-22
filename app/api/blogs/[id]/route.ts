import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';
import { getSession } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await dbConnect();
    const { title, body, author, cover } = await request.json();

    const updateData: { title?: string; body?: string; author?: string; cover?: string } = {};
    if (title) updateData.title = title;
    if (body) updateData.body = body;
    if (author) updateData.author = author;
    if (cover) updateData.cover = cover;

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete blog' }, { status: 500 });
  }
}
