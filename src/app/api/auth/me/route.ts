import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/security/auth';
import { storage } from '@/lib/storage/adapter';

export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null, grievances: [] });
    }

    const user = await storage.findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null, grievances: [] });
    }

    const grievances = await storage.getUserGrievances(user.email);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        languagePreference: user.languagePreference
      },
      grievances
    });
  } catch (err: unknown) {
    console.error('Error in /api/auth/me:', err);
    return NextResponse.json(
      { authenticated: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

