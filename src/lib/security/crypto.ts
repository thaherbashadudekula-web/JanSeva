import { createHash, randomBytes } from 'crypto';

/**
 * Computes SHA-256 hash of a string with a fixed salt.
 * Ensures the PIN is never saved or logged in plaintext.
 */
export function hashPin(pin: string): string {
  const salt = process.env.PIN_SALT || 'civic-service-salt-2026';
  return createHash('sha256').update(`${salt}:${pin.trim()}`).digest('hex');
}

/**
 * Verifies a supplied PIN against a stored hash.
 */
export function verifyPin(pin: string, storedHash: string): boolean {
  return hashPin(pin) === storedHash;
}

/**
 * Generates a user-friendly 6-digit random PIN.
 */
export function generateRandomPin(): string {
  // 6 digits: 100000 to 999999
  const num = Math.floor(100000 + Math.random() * 900000);
  return num.toString();
}

/**
 * Generates a unique citizen reference number: SR-YYYYMMDD-XXXX
 */
export function generateReferenceNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = randomBytes(2).toString('hex').toUpperCase();
  return `SR-${dateStr}-${randomSuffix}`;
}
