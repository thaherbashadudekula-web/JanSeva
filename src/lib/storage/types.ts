export type Language = 'en' | 'hi' | 'te';

export interface MultilingualText {
  en: string;
  hi: string;
  te: string;
}

export interface MultilingualList {
  en: string[];
  hi: string[];
  te: string[];
}

export interface ServiceRecord {
  id: string; // unique slug e.g. 'birth-certificate'
  title: MultilingualText;
  category: 'certificates' | 'welfare' | 'municipal' | 'revenue' | 'transport' | 'health' | 'education';
  department: string;
  description: MultilingualText;
  steps: MultilingualList;
  // Confirmed details vs unconfirmed from source:
  eligibility: string | null; // null if "Not confirmed in the available source"
  documentsRequired: string[] | null;
  fees: string | null;
  processingTime: string | null;
  
  sourceLabel: string;
  sourceUrl: string;
  contentLanguage: string; // e.g. "English", "Hindi", "Telugu"
  lastReviewedDate: string; // ISO date format YYYY-MM-DD
  isSynthetic: boolean; // clearly flag synthetic demo guidance
  tags: string[];
}

export type GrievanceStatus = 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'IN_PROGRESS' 
  | 'RESOLVED' 
  | 'CLOSED';

export type UserRole = 'citizen' | 'staff' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  languagePreference: Language;
  createdAt: string;
  grievanceIds: string[]; // reference numbers of grievances associated with user
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  languagePreference: Language;
}

export interface StatusHistoryEntry {
  status: GrievanceStatus;
  timestamp: string; // ISO format
  updatedBy: string; // "Demo System" or "Demo Reviewer"
  notes: string;
}

export interface GrievanceRecord {
  id: string;
  referenceNumber: string; // e.g. "SR-2026-XXXX"
  pinHash: string; // SHA-256 hash of the 6-digit access PIN
  failedLookupAttempts: number;
  lastLookupAttempt?: string;
  lockedUntil?: string;

  subject: string;
  description: string;
  category: string;
  locationArea: string;
  attachmentName?: string;

  status: GrievanceStatus;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
}

export interface AppDatabase {
  services: ServiceRecord[];
  grievances: GrievanceRecord[];
  users: UserAccount[];
}
