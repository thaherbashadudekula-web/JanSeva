import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage/adapter';
import { hashPin } from '@/lib/security/crypto';
import { createSessionToken, USER_COOKIE_NAME } from '@/lib/security/auth';
import { Language } from '@/lib/storage/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const languagePreference: Language = ['en', 'hi', 'te'].includes(body.languagePreference)
      ? body.languagePreference
      : 'te';

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const existing = await storage.findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please log in.' },
        { status: 400 }
      );
    }

    const newUser = await storage.createUser({
      email,
      name,
      role: 'citizen',
      passwordHash: hashPin(password),
      languagePreference,
      grievanceIds: []
    });

    const sessionPayload = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      languagePreference: newUser.languagePreference
    };

    const token = createSessionToken(sessionPayload);

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        languagePreference: newUser.languagePreference
      }
    });

    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (err: unknown) {
    console.error('Error in /api/auth/register:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}

