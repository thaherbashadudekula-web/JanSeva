import { NextResponse } from 'next/server';
import { USER_COOKIE_NAME, STAFF_COOKIE_NAME } from '@/lib/security/auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  response.cookies.set({
    name: USER_COOKIE_NAME,
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });

  response.cookies.set({
    name: STAFF_COOKIE_NAME,
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });

  return response;
}

