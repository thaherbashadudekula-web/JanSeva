import { NextRequest, NextResponse } from 'next/server';
import { STAFF_DEMO_KEY, STAFF_COOKIE_NAME } from '@/lib/security/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const passcode = typeof body.passcode === 'string' ? body.passcode.trim() : '';

    if (passcode !== STAFF_DEMO_KEY) {
      return NextResponse.json(
        { success: false, error: 'Invalid staff passcode. Demo default is: staff-demo-2026' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Demo staff session authorized.',
      reviewerName: 'Demo Staff Reviewer'
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: STAFF_COOKIE_NAME,
      value: STAFF_DEMO_KEY,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8 // 8 hours
    });

    return response;
  } catch (err: unknown) {
    console.error('Error in /api/staff/login:', err);
    return NextResponse.json(
      { success: false, error: 'Staff authentication error.' },
      { status: 500 }
    );
  }
}

