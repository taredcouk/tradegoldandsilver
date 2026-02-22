import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const isAdmin = session.role === 'admin';
  const isSelf = session.id === id;

  if (!isAdmin && !isSelf) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { username, email, password, role, title, socialLinks } = await request.json();

    const updateData: {
      username?: string;
      email?: string;
      role?: string;
      password?: string;
      title?: string;
      socialLinks?: {
        facebook?: string;
        linkedin?: string;
        twitter?: string;
        pinterest?: string;
        website?: string;
      }
    } = {};

    if (isAdmin) {
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      if (title) updateData.title = title;
      if (socialLinks) updateData.socialLinks = socialLinks;
    } else if (isSelf) {
      // Users can update their password, title, and social links
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      if (title) updateData.title = title;
      if (socialLinks) updateData.socialLinks = socialLinks;

      // Prevent sensitive fields from being updated by non-admins
      if (username || email || role) {
        return NextResponse.json({ error: 'Unauthorized to update these fields' }, { status: 403 });
      }

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete user' }, { status: 500 });
  }
}
