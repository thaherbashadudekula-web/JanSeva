import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage/adapter';
import { generateReferenceNumber, generateRandomPin } from '@/lib/security/crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : 'municipal';
    const locationArea = typeof body.locationArea === 'string' ? body.locationArea.trim() : '';
    const attachmentName = typeof body.attachmentName === 'string' ? body.attachmentName.trim() : undefined;

    if (!subject) {
      return NextResponse.json(
        { success: false, error: 'Subject is required.' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { success: false, error: 'Description is required.' },
        { status: 400 }
      );
    }

    if (!locationArea) {
      return NextResponse.json(
        { success: false, error: 'Location/area is required.' },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber();
    const pin = generateRandomPin();

    const { grievance } = await storage.createGrievance({
      referenceNumber,
      pin,
      subject,
      description,
      category,
      locationArea,
      attachmentName
    });

    return NextResponse.json({
      success: true,
      referenceNumber: grievance.referenceNumber,
      pin, // returned once upon creation for citizen to save
      status: grievance.status,
      createdAt: grievance.createdAt,
      demoNotice: 'Demo submission: Saved in demo database. Not forwarded to actual government authorities.'
    });
  } catch (err: unknown) {
    console.error('Error in /api/grievance POST:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to submit grievance.' },
      { status: 500 }
    );
  }
}

