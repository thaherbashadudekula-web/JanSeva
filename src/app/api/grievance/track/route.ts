import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage/adapter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const referenceNumber = typeof body.referenceNumber === 'string' ? body.referenceNumber.trim() : '';
    const pin = typeof body.pin === 'string' ? body.pin.trim() : '';

    if (!referenceNumber) {
      return NextResponse.json(
        { success: false, error: 'Reference number is required.' },
        { status: 400 }
      );
    }

    if (!pin) {
      return NextResponse.json(
        { success: false, error: 'Access PIN is required.' },
        { status: 400 }
      );
    }

    // Rate-limited lookup using secure hash comparison
    const result = await storage.lookupGrievanceSecurely(referenceNumber, pin);

    if (!result.success) {
      if (result.reason === 'RATE_LIMITED') {
        return NextResponse.json(
          {
            success: false,
            error: 'Too many consecutive failed attempts. Temporarily locked for 15 minutes.',
            reason: 'RATE_LIMITED',
            lockedUntil: result.lockedUntil
          },
          { status: 429 }
        );
      } else if (result.reason === 'INVALID_PIN') {
        return NextResponse.json(
          {
            success: false,
            error: 'Incorrect PIN provided for this reference number.',
            reason: 'INVALID_PIN'
          },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            error: 'No grievance found with this reference number.',
            reason: 'NOT_FOUND'
          },
          { status: 404 }
        );
      }
    }

    const { grievance } = result;

    // Do NOT return pinHash or sensitive internal fields to the client
    return NextResponse.json({
      success: true,
      grievance: {
        id: grievance.id,
        referenceNumber: grievance.referenceNumber,
        subject: grievance.subject,
        description: grievance.description,
        category: grievance.category,
        locationArea: grievance.locationArea,
        attachmentName: grievance.attachmentName,
        status: grievance.status,
        createdAt: grievance.createdAt,
        updatedAt: grievance.updatedAt,
        statusHistory: grievance.statusHistory
      }
    });
  } catch (err: unknown) {
    console.error('Error in /api/grievance/track POST:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to look up grievance.' },
      { status: 500 }
    );
  }
}

