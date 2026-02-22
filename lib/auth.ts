import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
const JWT_SECRET = new TextEncoder().encode(secret || 'fallback-secret-for-dev-only');

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; username: string; role: string };
  } catch (error) {
    return null;
  }
}

export async function isAdmin() {
  const session = await getSession();
  return session?.role === 'admin';
}
