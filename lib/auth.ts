import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
if (!secret && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET = new TextEncoder().encode(secret || 'dev-secret-only-not-for-production');

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; username: string; role: string };
  } catch {
    return null;
  }
}

export async function isAdmin() {
  const session = await getSession();
  return session?.role === 'admin';
}
