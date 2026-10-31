import { NextRequest, NextResponse } from 'next/server';
import { isStaffAuthorized } from '@/lib/security/auth';
import { storage } from '@/lib/storage/adapter';
import { GrievanceStatus } from '@/lib/storage/types';

const VALID_STATUSES: GrievanceStatus[] = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED'
];

export async function GET(request: NextRequest) {
  const authorized = await isStaffAuthorized(request);
  if (!authorized) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Demo staff access required.' },
      { status: 401 }
    );
  }

  try {
    const grievances = await storage.getAllGrievancesForStaff();
    // Strip pinHash from responses
    const sanitized = grievances.map(g => ({
      id: g.id,
      referenceNumber: g.referenceNumber,
      subject: g.subject,
      description: g.description,
      category: g.category,
      locationArea: g.locationArea,
      attachmentName: g.attachmentName,
      status: g.status,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      statusHistory: g.statusHistory
    }));

    return NextResponse.json({ success: true, grievances: sanitized });
  } catch (err: unknown) {
    console.error('Error fetching staff grievances:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to load staff queue.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authorized = await isStaffAuthorized(request);
  if (!authorized) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Demo staff access required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const id = typeof body.id === 'string' ? body.id : '';
    const status = body.status as GrievanceStatus | undefined;
    const category = typeof body.category === 'string' ? body.category.trim() : undefined;
    const notes = typeof body.notes === 'string' ? body.notes.trim() : '';
    const reviewerName = typeof body.reviewerName === 'string' && body.reviewerName.trim()
      ? body.reviewerName.trim()
      : 'Demo Staff Reviewer';

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Grievance ID is required.' },
        { status: 400 }
      );
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid grievance status.' },
        { status: 400 }
      );
    }

    if (!notes) {
      return NextResponse.json(
        { success: false, error: 'Reviewer notes are required when updating status.' },
        { status: 400 }
      );
    }

    const updated = await storage.updateGrievanceByStaff(id, {
      status,
      category,
      notes,
      reviewerName
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Grievance not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Demo status updated successfully.',
      grievance: {
        id: updated.id,
        referenceNumber: updated.referenceNumber,
        subject: updated.subject,
        description: updated.description,
        category: updated.category,
        locationArea: updated.locationArea,
        status: updated.status,
        updatedAt: updated.updatedAt,
        statusHistory: updated.statusHistory
      }
    });
  } catch (err: unknown) {
    console.error('Error updating staff grievance:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update grievance.' },
      { status: 500 }
    );
  }
}

