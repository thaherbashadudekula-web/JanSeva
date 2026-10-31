import fs from 'fs';
import path from 'path';
import { AppDatabase, GrievanceRecord, ServiceRecord, UserAccount } from './types';
import { SEED_SERVICES } from '../services/seedServices';
import { hashPin } from '../security/crypto';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initial seed demo users
export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-demo-citizen',
    email: 'citizen@demo.gov.in',
    name: 'Ramesh Kumar (రమేష్ కుమార్)',
    role: 'citizen',
    passwordHash: hashPin('CitizenDemo@2026'),
    languagePreference: 'te',
    createdAt: '2026-10-25T10:00:00.000Z',
    grievanceIds: ['SR-20261025-8F3A', 'SR-20261028-2B9C']
  },
  {
    id: 'user-demo-staff',
    email: 'staff@demo.gov.in',
    name: 'Priya Sharma (Review Officer)',
    role: 'staff',
    passwordHash: hashPin('StaffDemo@2026'),
    languagePreference: 'en',
    createdAt: '2026-10-20T10:00:00.000Z',
    grievanceIds: []
  }
];

// Initialize initial sample demo grievances (with hashed PIN '123456' and '654321')
const INITIAL_GRIEVANCES: GrievanceRecord[] = [
  {
    id: 'demo-gr-1',
    referenceNumber: 'SR-20261025-8F3A',
    pinHash: hashPin('123456'),
    failedLookupAttempts: 0,
    subject: 'Streetlight pole #42 blinking and dark near primary school',
    category: 'municipal',
    locationArea: 'Ward 14, Main Road Near St. Mary School',
    description: 'The overhead sodium bulb at pole #42 has been flickering intermittently and goes completely dark past 8 PM, posing pedestrian safety risks for school children and evening commuters.',
    attachmentName: 'pole_photo_night.jpg',
    status: 'IN_PROGRESS',
    createdAt: '2026-10-25T14:30:00.000Z',
    updatedAt: '2026-10-27T09:15:00.000Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-10-25T14:30:00.000Z',
        updatedBy: 'Demo Citizen Portal',
        notes: 'Sample grievance submitted via demo portal. Reference number and secure PIN generated.'
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: '2026-10-26T10:00:00.000Z',
        updatedBy: 'Demo Staff Reviewer',
        notes: 'Verified location details. Forwarded to Electrical Maintenance Depot 3 for line inspection.'
      },
      {
        status: 'IN_PROGRESS',
        timestamp: '2026-10-27T09:15:00.000Z',
        updatedBy: 'Demo Staff Reviewer',
        notes: 'Technician team assigned for LED fixture replacement. Work order issued.'
      }
    ]
  },
  {
    id: 'demo-gr-2',
    referenceNumber: 'SR-20261028-2B9C',
    pinHash: hashPin('654321'),
    failedLookupAttempts: 0,
    subject: 'Contaminated tap water supply with foul smell',
    category: 'municipal',
    locationArea: 'Ward 7, Patel Nagar Cross 4',
    description: 'Water supplied between 6 AM and 8 AM today carries muddy sediment and foul sulfur odor. Multiple households affected on Cross 4.',
    status: 'UNDER_REVIEW',
    createdAt: '2026-10-28T07:45:00.000Z',
    updatedAt: '2026-10-28T11:20:00.000Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-10-28T07:45:00.000Z',
        updatedBy: 'Demo Citizen Portal',
        notes: 'Sample grievance registered in demo database.'
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: '2026-10-28T11:20:00.000Z',
        updatedBy: 'Demo Staff Reviewer',
        notes: 'Water quality sampling team notified. Pipe flushing schedule requested.'
      }
    ]
  }
];

function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadDatabase(): AppDatabase {
  ensureDataDirectory();
  if (!fs.existsSync(DB_FILE)) {
    const initialData: AppDatabase = {
      services: SEED_SERVICES,
      grievances: INITIAL_GRIEVANCES,
      users: INITIAL_USERS
    };
    saveDatabase(initialData);
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as AppDatabase;
    // ensure services are always up-to-date with seed data
    parsed.services = SEED_SERVICES;
    if (!parsed.users || parsed.users.length === 0) {
      parsed.users = INITIAL_USERS;
    }
    return parsed;
  } catch {
    const fallback: AppDatabase = {
      services: SEED_SERVICES,
      grievances: INITIAL_GRIEVANCES,
      users: INITIAL_USERS
    };
    saveDatabase(fallback);
    return fallback;
  }
}

export function saveDatabase(data: AppDatabase): void {
  ensureDataDirectory();
  const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE);
}
