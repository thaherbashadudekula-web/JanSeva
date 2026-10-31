import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage/adapter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;

    const services = await storage.searchServices(query, category);
    return NextResponse.json({ success: true, services });
  } catch (err: unknown) {
    console.error('Error in /api/services:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve services.' },
      { status: 500 }
    );
  }
}

