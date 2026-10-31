import { NextRequest, NextResponse } from 'next/server';
import { processCitizenQuery } from '@/lib/assistant/grounding';
import { Language } from '@/lib/storage/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = typeof body.query === 'string' ? body.query : '';
    const language: Language = ['en', 'hi', 'te'].includes(body.language) 
      ? body.language 
      : 'en';

    if (!query.trim()) {
      return NextResponse.json(
        { success: false, error: 'Query cannot be empty.' },
        { status: 400 }
      );
    }

    const response = await processCitizenQuery(query, language);
    return NextResponse.json({ success: true, ...response });
  } catch (err: unknown) {
    console.error('Error in /api/assistant:', err);
    return NextResponse.json(
      { success: false, error: 'Internal assistant error.' },
      { status: 500 }
    );
  }
}

