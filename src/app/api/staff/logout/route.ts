import { NextResponse } from 'next/server';
import { STAFF_COOKIE_NAME } from '@/lib/security/auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Staff session terminated.'
  });

  response.cookies.delete(STAFF_COOKIE_NAME);
  return response;
}

