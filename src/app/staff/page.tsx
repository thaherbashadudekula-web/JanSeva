'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { GrievanceRecord, GrievanceStatus } from '@/lib/storage/types';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Tag, 
  CheckCircle, 
  FileText, 
  Edit3, 
  X,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function StaffPortalPage() {
  const { t } = useLanguage();

  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [grievances, setGrievances] = useState<GrievanceRecord[]>([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modal / Edit state
  const [selectedGrievance, setSelectedGrievance] = useState<GrievanceRecord | null>(null);
  const [newStatus, setNewStatus] = useState<GrievanceStatus>('UNDER_REVIEW');
  const [newCategory, setNewCategory] = useState('');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [reviewerName, setReviewerName] = useState('Demo Staff Reviewer');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  // Check initial authentication by attempting to load the queue
  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoadingQueue(true);
    try {
      const res = await fetch('/api/staff/grievances');
      if (res.status === 401) {
        setIsAuthenticated(false);
      } else {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          setGrievances(data.grievances);
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoadingQueue(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPasscode('');
        fetchQueue();
      } else {
        setLoginError(data.error || 'Authentication failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('An unexpected network error occurred.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/staff/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
      setGrievances([]);
      setSelectedGrievance(null);
    }
  };

  const openUpdateModal = (g: GrievanceRecord) => {
    setSelectedGrievance(g);
    setNewStatus(g.status);
    setNewCategory(g.category);
    setReviewerNotes('');
    setUpdateError(null);
    setUpdateSuccess(null);
  };

  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    if (!reviewerNotes.trim()) {
      setUpdateError('Reviewer notes are required when applying a demo update.');
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const res = await fetch('/api/staff/grievances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedGrievance.id,
          status: newStatus,
          category: newCategory,
          notes: reviewerNotes.trim(),
          reviewerName: reviewerName.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        setUpdateSuccess(t.updateSuccess);
        // Refresh local queue
        await fetchQueue();
        setTimeout(() => {
          setSelectedGrievance(null);
        }, 1200);
      } else {
        setUpdateError(data.error || 'Failed to update record.');
      }
    } catch (err) {
      console.error('Update error:', err);
      setUpdateError('Network error while saving update.');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredGrievances = grievances.filter(g => {
    if (filterStatus === 'all') return true;
    return g.status === filterStatus;
  });

  // 1. Loading screen
  if (isAuthenticated === null && loadingQueue) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>{t.loading}</p>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '3.5rem 1rem 5rem', maxWidth: '540px' }}>
        <div className="card" style={{ borderTop: '5px solid #b45309', padding: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              background: '#fffbeb', 
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <ShieldCheck size={32} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              {t.staffPortalTitle}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              {t.staffPortalSubtitle}
            </p>
          </div>

          <div className="alert alert-warning" style={{ fontSize: '0.85rem', marginBottom: '1.75rem' }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{t.staffDisclaimer}</span>
          </div>

          {loginError && (
            <div className="alert alert-danger" style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              <AlertTriangle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="staff-passcode" className="form-label">
                {t.passcodeLabel}
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="staff-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={t.passcodePlaceholder}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
              </div>
              <p className="form-help">Default demo passcode: <code>staff-demo-2026</code></p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              {isLoggingIn ? t.loading : t.staffLoginButton}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // 3. Authenticated Staff Dashboard View
  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      
      {/* Top Bar with Reviewer ID and Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={24} color="#b45309" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              {t.staffPortalTitle}
            </h1>
            <span style={{ 
              background: '#fffbeb', 
              color: '#b45309', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: 'var(--radius-full)',
              border: '1px solid #fde68a'
            }}>
              DEMO REVIEW SESSION
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            Logged in as <strong>Demo Staff Reviewer</strong> (Server-authorized via secure session).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            type="button" 
            onClick={fetchQueue} 
            className="btn btn-secondary" 
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
          <button 
            type="button" 
            onClick={handleLogout} 
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', color: '#dc2626' }}
          >
            <LogOut size={15} />
            {t.staffLogoutButton}
          </button>
        </div>
      </div>

      {/* Staff disclaimer alert */}
      <div className="alert alert-info" style={{ fontSize: '0.85rem', marginBottom: '1.75rem' }}>
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        <span>{t.staffDisclaimer}</span>
      </div>

      {/* Queue Filter Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Filter by Status:</span>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.88rem', width: 'auto' }}
          >
            <option value="all">All Submissions ({grievances.length})</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {filteredGrievances.length} requests in view
        </span>
      </div>

      {/* Grievances Queue List */}
      {filteredGrievances.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>No sample grievances match this status filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredGrievances.map(item => (
            <div key={item.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                      {item.referenceNumber}
                    </span>
                    <span className={`status-pill status-${item.status}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.35rem 0 0.15rem', color: 'var(--color-text-main)' }}>
                    {item.subject}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => openUpdateModal(item)}
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
                >
                  <Edit3 size={15} />
                  {t.updateStatusButton}
                </button>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid var(--color-border)', paddingTop: '0.65rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={13} /> Category: <strong style={{ textTransform: 'capitalize' }}>{item.category}</strong>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={13} /> Location: <strong>{item.locationArea}</strong>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} /> Submitted: <strong>{new Date(item.createdAt).toLocaleDateString()}</strong>
                </span>
                {item.attachmentName && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#0d9488' }}>
                    <FileText size={13} /> File: {item.attachmentName}
                  </span>
                )}
                <span>History entries: <strong>{item.statusHistory.length}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review & Update Status Modal */}
      {selectedGrievance && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', position: 'relative' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Demo Staff Action
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                  Review Request: {selectedGrievance.referenceNumber}
                </h2>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedGrievance(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                aria-label={t.close}
              >
                <X size={22} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>Subject:</strong> {selectedGrievance.subject}<br />
              <strong>Reported Location:</strong> {selectedGrievance.locationArea}
            </p>

            {updateError && (
              <div className="alert alert-danger" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                <AlertTriangle size={16} />
                <span>{updateError}</span>
              </div>
            )}

            {updateSuccess && (
              <div className="alert alert-success" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                <CheckCircle size={16} />
                <span>{updateSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveUpdate}>
              {/* Status Select */}
              <div className="form-group">
                <label htmlFor="update-status" className="form-label">
                  Assign New Status <span className="required-mark">*</span>
                </label>
                <select
                  id="update-status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as GrievanceStatus)}
                  className="form-select"
                >
                  <option value="SUBMITTED">Submitted</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {/* Category Select */}
              <div className="form-group">
                <label htmlFor="update-category" className="form-label">
                  {t.changeCategoryLabel}
                </label>
                <select
                  id="update-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="municipal">Municipal & Civil Works</option>
                  <option value="certificates">Certificates & Vital Records</option>
                  <option value="welfare">Social Welfare & Pensions</option>
                  <option value="revenue">Revenue & Land Records</option>
                  <option value="transport">Transport & Driving</option>
                  <option value="health">Public Health</option>
                  <option value="education">Public Education</option>
                </select>
              </div>

              {/* Reviewer Notes */}
              <div className="form-group">
                <label htmlFor="reviewer-notes" className="form-label">
                  {t.internalNotesLabel} <span className="required-mark">*</span>
                </label>
                <textarea
                  id="reviewer-notes"
                  rows={4}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder={t.internalNotesPlaceholder}
                  className="form-textarea"
                  required
                />
              </div>

              {/* Reviewer Name */}
              <div className="form-group">
                <label htmlFor="reviewer-name" className="form-label">
                  Staff Reviewer Signature / Display Name
                </label>
                <input
                  id="reviewer-name"
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedGrievance(null)}
                  className="btn btn-secondary"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn btn-primary"
                >
                  {isUpdating ? t.loading : t.saveChangesButton}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

