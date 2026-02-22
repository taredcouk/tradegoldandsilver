import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: unknown) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { title, body, author, cover } = await request.json();

    if (!title || !body || !author || !cover) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const blog = await Blog.create({
      title,
      body,
      author,
      cover
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create blog' }, { status: 500 });
  }
}
