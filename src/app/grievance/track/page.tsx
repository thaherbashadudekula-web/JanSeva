'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { GrievanceRecord, GrievanceStatus } from '@/lib/storage/types';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Tag, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

function GrievanceTrackContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  const initialRef = searchParams.get('ref') || '';
  const initialPin = searchParams.get('pin') || '';

  const [referenceNumber, setReferenceNumber] = useState(initialRef);
  const [pin, setPin] = useState(initialPin);
  const [showPin, setShowPin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [grievance, setGrievance] = useState<GrievanceRecord | null>(null);

  // If initial credentials are provided in URL, perform lookup
  useEffect(() => {
    if (initialRef && initialPin) {
      handleLookup(initialRef, initialPin);
    }
  }, [initialRef, initialPin]);

  const handleLookup = async (refNum?: string, accessPin?: string) => {
    const cleanRef = (refNum || referenceNumber).trim();
    const cleanPin = (accessPin || pin).trim();

    if (!cleanRef) {
      setErrorMessage(t.requiredField);
      return;
    }
    if (!cleanPin) {
      setErrorMessage('Access PIN is required.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setGrievance(null);

    try {
      const res = await fetch('/api/grievance/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceNumber: cleanRef, pin: cleanPin })
      });

      const data = await res.json();

      if (data.success && data.grievance) {
        setGrievance(data.grievance);
      } else {
        if (data.reason === 'RATE_LIMITED') {
          setErrorMessage(t.rateLimitedError);
        } else if (data.reason === 'INVALID_PIN') {
          setErrorMessage(t.invalidPinError);
        } else if (data.reason === 'NOT_FOUND') {
          setErrorMessage(t.notFoundError);
        } else {
          setErrorMessage(data.error || t.errorOccurred);
        }
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setErrorMessage(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: GrievanceStatus) => {
    switch (status) {
      case 'SUBMITTED': return t.statusSubmitted;
      case 'UNDER_REVIEW': return t.statusUnderReview;
      case 'IN_PROGRESS': return t.statusInProgress;
      case 'RESOLVED': return t.statusResolved;
      case 'CLOSED': return t.statusClosed;
      default: return status;
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '850px' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          {t.trackingTitle}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
          {t.trackingSubtitle}
        </p>
      </div>

      {/* Lookup Card */}
      <div className="card" style={{ marginBottom: '2.5rem', background: '#f8fafc' }}>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleLookup(); }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'flex-end' }}
        >
          {/* Reference Number input */}
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="ref-input" className="form-label">
              {t.refNumberInputLabel}
            </label>
            <input
              id="ref-input"
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder={t.refNumberInputPlaceholder}
              className="form-input"
              style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
              required
            />
          </div>

          {/* PIN Input with toggle */}
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="pin-input" className="form-label">
              {t.pinInputLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="pin-input"
                type={showPin ? 'text' : 'password'}
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={t.pinInputPlaceholder}
                className="form-input"
                style={{ fontFamily: 'monospace', paddingRight: '2.5rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem 1rem' }}
            >
              {loading ? (
                <span>{t.checkingStatus}</span>
              ) : (
                <>
                  <Search size={18} />
                  <span>{t.checkStatusButton}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Help Notice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
          <Lock size={13} color="#2563eb" />
          <span>Access PINs are securely verified via salted SHA-256 hashes. Maximum 5 attempts before lockout.</span>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="alert alert-danger" style={{ marginBottom: '2rem' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Grievance Details when Found */}
      {grievance && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Main Status Card */}
          <div className="card" style={{ borderTop: '5px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {t.refNumberLabel}
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                  {grievance.referenceNumber}
                </div>
              </div>

              <span className={`status-pill status-${grievance.status}`} style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                {getStatusLabel(grievance.status)}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
              {grievance.subject}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {grievance.description}
            </p>

            {/* Meta details grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              background: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={12} /> {t.category}
                </span>
                <strong style={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>{grievance.category}</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={12} /> {t.location}
                </span>
                <strong style={{ fontSize: '0.9rem' }}>{grievance.locationArea}</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={12} /> {t.dateSubmitted}
                </span>
                <strong style={{ fontSize: '0.9rem' }}>
                  {new Date(grievance.createdAt).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} /> {t.lastUpdated}
                </span>
                <strong style={{ fontSize: '0.9rem' }}>
                  {new Date(grievance.updatedAt).toLocaleDateString()}
                </strong>
              </div>
            </div>

            {grievance.attachmentName && (
              <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={14} color="#0d9488" />
                <span>Sample Attachment: <strong>{grievance.attachmentName}</strong></span>
              </div>
            )}
          </div>

          {/* Activity / Status Timeline */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="#2563eb" />
              {t.statusHistoryTitle}
            </h3>

            {grievance.statusHistory.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>{t.noHistoryAvailable}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Timeline vertical bar */}
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: '#e2e8f0' }} />

                {grievance.statusHistory.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Circle Dot */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '-1.5rem', 
                      top: '4px', 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      background: idx === grievance.statusHistory.length - 1 ? 'var(--color-primary)' : '#94a3b8',
                      border: '3px solid white',
                      boxShadow: '0 0 0 1px #cbd5e1'
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <span className={`status-pill status-${item.status}`}>
                        {getStatusLabel(item.status)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '2px 8px', borderRadius: 'var(--radius-sm)', color: '#475569' }}>
                        {t.timelineBy}: {item.updatedBy}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginTop: '0.35rem', lineHeight: '1.5' }}>
                      {item.notes}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default function GrievanceTrackPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '3rem' }}>Loading tracker...</div>}>
      <GrievanceTrackContent />
    </Suspense>
  );
}

