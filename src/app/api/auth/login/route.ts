import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage/adapter';
import { verifyPin, hashPin } from '@/lib/security/crypto';
import { createSessionToken, USER_COOKIE_NAME, STAFF_COOKIE_NAME, STAFF_DEMO_KEY } from '@/lib/security/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await storage.findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = verifyPin(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const sessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      languagePreference: user.languagePreference
    };

    const token = createSessionToken(sessionPayload);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        languagePreference: user.languagePreference
      }
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // If staff user, also set the staff session cookie so staff APIs are directly unlocked
    if (user.role === 'staff') {
      response.cookies.set({
        name: STAFF_COOKIE_NAME,
        value: STAFF_DEMO_KEY,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
    }

    return response;
  } catch (err: unknown) {
    console.error('Error in /api/auth/login:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}

