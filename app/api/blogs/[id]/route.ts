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
    const { title, body, author, cover, submitForApproval } = await request.json();

    const isAdmin = session.role === 'admin';
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Check ownership if not admin
    if (!isAdmin && blog.authorId?.toString() !== session.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (isAdmin) {
      const updateData: { title?: string; body?: string; author?: string; cover?: string } = {};
      if (title) updateData.title = title;
      if (body) updateData.body = body;
      if (author) updateData.author = author;
      if (cover) updateData.cover = cover;

      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      return NextResponse.json(updatedBlog);
    } else {
      // User update
      if (blog.status === 'draft') {
        // Just update the draft
        const updateData: { title?: string; body?: string; author?: string; cover?: string } = {};
        if (title) updateData.title = title;
        if (body) updateData.body = body;
        if (author) updateData.author = author;
        if (cover) updateData.cover = cover;

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

        if (submitForApproval) {
          const BlogRequest = (await import('@/models/BlogRequest')).default;
          // Check if there is already a pending request
          await BlogRequest.findOneAndUpdate(
            { blogId: id, status: 'pending' },
            {
              type: 'create',
              data: { title: title || blog.title, body: body || blog.body, author: author || blog.author, cover: cover || blog.cover },
              requesterId: session.id,
            },
            { upsert: true, new: true }
          );
        }
        return NextResponse.json(updatedBlog);
      } else {
        // Updating a published blog
        if (submitForApproval) {
          const BlogRequest = (await import('@/models/BlogRequest')).default;
          await BlogRequest.findOneAndUpdate(
            { blogId: id, status: 'pending' },
            {
              type: 'update',
              data: { title: title || blog.title, body: body || blog.body, author: author || blog.author, cover: cover || blog.cover },
              requesterId: session.id,
            },
            { upsert: true, new: true }
          );
          return NextResponse.json({ message: 'Update submitted for approval' });
        } else {
          // User cannot update published blog directly without submitting
          return NextResponse.json({ error: 'Published blogs can only be updated via submission' }, { status: 400 });
        }
      }
    }
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
    const isAdmin = session.role === 'admin';
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    if (!isAdmin && blog.authorId?.toString() !== session.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (isAdmin) {
      await Blog.findByIdAndDelete(id);
      return NextResponse.json({ message: 'Blog deleted successfully' });
    } else {
      // User request delete
      if (blog.status === 'draft') {
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Draft deleted successfully' });
      } else {
        const BlogRequest = (await import('@/models/BlogRequest')).default;
        await BlogRequest.findOneAndUpdate(
          { blogId: id, status: 'pending' },
          {
            type: 'delete',
            requesterId: session.id,
          },
          { upsert: true, new: true }
        );
        return NextResponse.json({ message: 'Delete request submitted for approval' });
      }
    }
  } catch (error: unknown) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete blog' }, { status: 500 });
  }
}
