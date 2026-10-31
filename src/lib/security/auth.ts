import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { AuthSession } from '../storage/types';

export const STAFF_DEMO_KEY = process.env.STAFF_DEMO_KEY || 'staff-demo-2026';
export const STAFF_COOKIE_NAME = 'civic_staff_session';
export const USER_COOKIE_NAME = 'civic_user_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'civic-public-service-secret-key-salt-2026';

/**
 * Creates a tamper-proof signed session token
 */
export function createSessionToken(session: AuthSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${signature}`;
}

/**
 * Verifies and decodes a signed session token
 */
export function verifySessionToken(token: string): AuthSession | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const decoded = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(decoded) as AuthSession;
  } catch {
    return null;
  }
}

/**
 * Retrieves the currently authenticated user session from HTTP-only cookie.
 */
export async function getAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(USER_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  return verifySessionToken(sessionCookie.value);
}

/**
 * Validates whether the incoming request is authorized as Demo Staff.
 * Enforced on the server inside API route handlers.
 */
export async function isStaffAuthorized(request?: NextRequest): Promise<boolean> {
  // 1. Check HTTP-only cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(STAFF_COOKIE_NAME);
  if (sessionCookie && sessionCookie.value === STAFF_DEMO_KEY) {
    return true;
  }

  // 2. Check if logged-in user is staff role
  const userSession = await getAuthSession();
  if (userSession && userSession.role === 'staff') {
    return true;
  }

  // 3. Check Authorization Header if passed from programmatic client
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.replace(/^Bearer\s+/i, '').trim() === STAFF_DEMO_KEY) {
      return true;
    }
  }

  return false;
}
