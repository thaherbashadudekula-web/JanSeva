import { AppDatabase, GrievanceRecord, GrievanceStatus, ServiceRecord, UserAccount } from './types';
import { loadDatabase, saveDatabase } from './db';
import { hashPin, verifyPin } from '../security/crypto';

export interface IStorageRepository {
  getAllServices(): Promise<ServiceRecord[]>;
  getServiceById(id: string): Promise<ServiceRecord | null>;
  searchServices(query: string, category?: string): Promise<ServiceRecord[]>;

  createGrievance(data: {
    referenceNumber: string;
    pin: string;
    subject: string;
    description: string;
    category: string;
    locationArea: string;
    attachmentName?: string;
  }): Promise<{ grievance: GrievanceRecord; rawPin: string }>;

  lookupGrievanceSecurely(
    referenceNumber: string,
    pin: string
  ): Promise<
    | { success: true; grievance: GrievanceRecord }
    | { success: false; reason: 'NOT_FOUND' | 'INVALID_PIN' | 'RATE_LIMITED'; lockedUntil?: string }
  >;

  getAllGrievancesForStaff(): Promise<GrievanceRecord[]>;
  
  updateGrievanceByStaff(
    id: string,
    updates: {
      status?: GrievanceStatus;
      category?: string;
      notes: string;
      reviewerName: string;
    }
  ): Promise<GrievanceRecord | null>;

  findUserByEmail(email: string): Promise<UserAccount | null>;
  findUserById(id: string): Promise<UserAccount | null>;
  createUser(user: Omit<UserAccount, 'id' | 'createdAt'>): Promise<UserAccount>;
  getUserGrievances(emailOrId: string): Promise<GrievanceRecord[]>;
  linkGrievanceToUser(userEmail: string, referenceNumber: string): Promise<void>;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export class JsonStorageRepository implements IStorageRepository {
  private getDb(): AppDatabase {
    return loadDatabase();
  }

  private persistDb(db: AppDatabase): void {
    saveDatabase(db);
  }

  async getAllServices(): Promise<ServiceRecord[]> {
    const db = this.getDb();
    return db.services;
  }

  async getServiceById(id: string): Promise<ServiceRecord | null> {
    const db = this.getDb();
    return db.services.find(s => s.id === id) || null;
  }

  async searchServices(query: string, category?: string): Promise<ServiceRecord[]> {
    const db = this.getDb();
    const q = query.trim().toLowerCase();

    return db.services.filter(service => {
      if (category && category !== 'all' && service.category !== category) {
        return false;
      }
      if (!q) return true;

      const titleMatch = 
        service.title.en.toLowerCase().includes(q) ||
        service.title.hi.toLowerCase().includes(q) ||
        service.title.te.toLowerCase().includes(q);

      const descMatch =
        service.description.en.toLowerCase().includes(q) ||
        service.description.hi.toLowerCase().includes(q) ||
        service.description.te.toLowerCase().includes(q);

      const deptMatch = service.department.toLowerCase().includes(q);
      const tagMatch = service.tags.some(tag => tag.toLowerCase().includes(q));

      return titleMatch || descMatch || deptMatch || tagMatch;
    });
  }

  async createGrievance(data: {
    referenceNumber: string;
    pin: string;
    subject: string;
    description: string;
    category: string;
    locationArea: string;
    attachmentName?: string;
  }): Promise<{ grievance: GrievanceRecord; rawPin: string }> {
    const db = this.getDb();
    const now = new Date().toISOString();

    const newRecord: GrievanceRecord = {
      id: `gr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      referenceNumber: data.referenceNumber,
      pinHash: hashPin(data.pin),
      failedLookupAttempts: 0,
      subject: data.subject.trim(),
      description: data.description.trim(),
      category: data.category,
      locationArea: data.locationArea.trim(),
      attachmentName: data.attachmentName || undefined,
      status: 'SUBMITTED',
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        {
          status: 'SUBMITTED',
          timestamp: now,
          updatedBy: 'Demo Citizen Portal',
          notes: 'Sample service request / grievance received by demo portal.'
        }
      ]
    };

    db.grievances.unshift(newRecord);
    this.persistDb(db);

    return {
      grievance: newRecord,
      rawPin: data.pin
    };
  }

  async lookupGrievanceSecurely(
    referenceNumber: string,
    pin: string
  ): Promise<
    | { success: true; grievance: GrievanceRecord }
    | { success: false; reason: 'NOT_FOUND' | 'INVALID_PIN' | 'RATE_LIMITED'; lockedUntil?: string }
  > {
    const db = this.getDb();
    const cleanRef = referenceNumber.trim().toUpperCase();
    const record = db.grievances.find(g => g.referenceNumber.toUpperCase() === cleanRef);

    if (!record) {
      return { success: false, reason: 'NOT_FOUND' };
    }

    const now = new Date();
    // Check if account is locked due to rate limiting
    if (record.lockedUntil) {
      const lockDate = new Date(record.lockedUntil);
      if (now < lockDate) {
        return { success: false, reason: 'RATE_LIMITED', lockedUntil: record.lockedUntil };
      } else {
        // lockout expired, reset
        record.failedLookupAttempts = 0;
        record.lockedUntil = undefined;
      }
    }

    // Verify PIN against stored hash
    const isValid = verifyPin(pin, record.pinHash);

    if (!isValid) {
      record.failedLookupAttempts = (record.failedLookupAttempts || 0) + 1;
      record.lastLookupAttempt = now.toISOString();

      if (record.failedLookupAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockoutTime = new Date(now.getTime() + LOCKOUT_MINUTES * 60 * 1000);
        record.lockedUntil = lockoutTime.toISOString();
        this.persistDb(db);
        return { success: false, reason: 'RATE_LIMITED', lockedUntil: record.lockedUntil };
      }

      this.persistDb(db);
      return { success: false, reason: 'INVALID_PIN' };
    }

    // Success: reset failed attempts
    record.failedLookupAttempts = 0;
    record.lockedUntil = undefined;
    record.lastLookupAttempt = now.toISOString();
    this.persistDb(db);

    return { success: true, grievance: record };
  }

  async getAllGrievancesForStaff(): Promise<GrievanceRecord[]> {
    const db = this.getDb();
    // Return all records sorted by creation date descending
    return [...db.grievances].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateGrievanceByStaff(
    id: string,
    updates: {
      status?: GrievanceStatus;
      category?: string;
      notes: string;
      reviewerName: string;
    }
  ): Promise<GrievanceRecord | null> {
    const db = this.getDb();
    const record = db.grievances.find(g => g.id === id);
    if (!record) return null;

    const now = new Date().toISOString();
    const newStatus = updates.status || record.status;

    if (updates.category) {
      record.category = updates.category;
    }

    record.status = newStatus;
    record.updatedAt = now;

    record.statusHistory.push({
      status: newStatus,
      timestamp: now,
      updatedBy: updates.reviewerName || 'Demo Staff Reviewer',
      notes: updates.notes.trim() || 'Demo status update applied.'
    });

    this.persistDb(db);
    return record;
  }

  async findUserByEmail(email: string): Promise<UserAccount | null> {
    const db = this.getDb();
    const clean = email.trim().toLowerCase();
    return db.users.find(u => u.email.toLowerCase() === clean) || null;
  }

  async findUserById(id: string): Promise<UserAccount | null> {
    const db = this.getDb();
    return db.users.find(u => u.id === id) || null;
  }

  async createUser(userData: Omit<UserAccount, 'id' | 'createdAt'>): Promise<UserAccount> {
    const db = this.getDb();
    const now = new Date().toISOString();
    const newUser: UserAccount = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: userData.email.trim().toLowerCase(),
      name: userData.name.trim(),
      role: userData.role || 'citizen',
      passwordHash: userData.passwordHash,
      languagePreference: userData.languagePreference || 'te',
      createdAt: now,
      grievanceIds: userData.grievanceIds || []
    };

    db.users.push(newUser);
    this.persistDb(db);
    return newUser;
  }

  async getUserGrievances(emailOrId: string): Promise<GrievanceRecord[]> {
    const db = this.getDb();
    const clean = emailOrId.trim().toLowerCase();
    const user = db.users.find(u => u.email.toLowerCase() === clean || u.id === emailOrId);
    if (!user) return [];

    const refSet = new Set(user.grievanceIds.map(r => r.toUpperCase()));
    return db.grievances.filter(g => refSet.has(g.referenceNumber.toUpperCase()));
  }

  async linkGrievanceToUser(userEmail: string, referenceNumber: string): Promise<void> {
    const db = this.getDb();
    const clean = userEmail.trim().toLowerCase();
    const user = db.users.find(u => u.email.toLowerCase() === clean);
    if (user) {
      if (!user.grievanceIds.includes(referenceNumber)) {
        user.grievanceIds.unshift(referenceNumber);
        this.persistDb(db);
      }
    }
  }
}

// Global Singleton Instance
export const storage: IStorageRepository = new JsonStorageRepository();
