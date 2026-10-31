'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle, 
  Copy, 
  ArrowRight, 
  AlertTriangle, 
  Paperclip, 
  MapPin, 
  FileText, 
  Info,
  Clock
} from 'lucide-react';

function GrievanceFormContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'municipal';
  const initialSubject = searchParams.get('subject') || '';

  const [subject, setSubject] = useState(initialSubject);
  const [category, setCategory] = useState(initialCategory);
  const [locationArea, setLocationArea] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceNumber: string;
    pin: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) {
      newErrors.subject = t.requiredField;
    } else if (subject.trim().length < 5) {
      newErrors.subject = 'Subject should be at least 5 characters.';
    }

    if (!locationArea.trim()) {
      newErrors.locationArea = t.requiredField;
    }

    if (!description.trim()) {
      newErrors.description = t.requiredField;
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide a little more detail (at least 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, attachment: 'File size exceeds 5MB limit.' }));
      } else {
        setAttachmentName(file.name);
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.attachment;
          return updated;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          category,
          locationArea: locationArea.trim(),
          description: description.trim(),
          attachmentName: attachmentName || undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionResult({
          referenceNumber: data.referenceNumber,
          pin: data.pin
        });
      } else {
        setErrors({ form: data.error || t.errorOccurred });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: t.errorOccurred });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!submissionResult) return;
    const text = `Reference Number: ${submissionResult.referenceNumber}\nAccess PIN: ${submissionResult.pin}\nPortal: JanSeva Citizen Portal Demo`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const categories = [
    { id: 'municipal', label: t.categoryMunicipal },
    { id: 'certificates', label: t.categoryCertificates },
    { id: 'welfare', label: t.categoryWelfare },
    { id: 'revenue', label: t.categoryRevenue },
    { id: 'transport', label: t.categoryTransport },
    { id: 'health', label: t.categoryHealth },
    { id: 'education', label: t.categoryEducation }
  ];

  // If successfully submitted, display Confirmation Screen
  if (submissionResult) {
    return (
      <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: '750px' }}>
        <div className="card" style={{ borderTop: '6px solid var(--color-success)', padding: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--color-success-bg)', 
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <CheckCircle size={36} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
              {t.successTitle}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
              {t.successSubtitle}
            </p>
          </div>

          {/* Demo disclaimer notice */}
          <div className="alert alert-warning" style={{ fontSize: '0.88rem', marginBottom: '2rem' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0 }} />
            <span>{t.demoSubmissionWarning}</span>
          </div>

          {/* Credentials Display Box */}
          <div style={{ 
            background: '#f8fafc', 
            border: '2px dashed var(--color-primary-border)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '1.75rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {t.refNumberLabel}
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  {submissionResult.referenceNumber}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {t.pinLabel}
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                  {submissionResult.pin}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#b45309', background: '#fffbeb', padding: '0.75rem', borderRadius: 'var(--radius-sm)', lineHeight: '1.5', margin: 0 }}>
              {t.pinNoticeText}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <button
              type="button"
              onClick={handleCopyCredentials}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              <Copy size={18} />
              {copied ? t.copiedNotice : t.copyDetailsButton}
            </button>

            <Link
              href={`/grievance/track?ref=${submissionResult.referenceNumber}&pin=${submissionResult.pin}`}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              <Clock size={18} />
              {t.trackNowButton} <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => {
                setSubmissionResult(null);
                setSubject('');
                setDescription('');
                setLocationArea('');
                setAttachmentName('');
              }}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              {t.fileAnotherButton}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          {t.grievanceTitle}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
          {t.grievanceSubtitle}
        </p>
      </div>

      {/* Privacy Guarantee Box */}
      <div className="card" style={{ marginBottom: '2rem', background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <ShieldCheck size={24} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.35rem' }}>
              {t.privacyNoticeTitle}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#1e3a8a', lineHeight: '1.5' }}>
              {t.privacyNoticeText}
            </p>
          </div>
        </div>
      </div>

      {errors.form && (
        <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
          <AlertTriangle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="card" noValidate>
        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject-input" className="form-label">
            {t.subjectLabel} <span className="required-mark">*</span>
          </label>
          <input
            id="subject-input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t.subjectPlaceholder}
            className="form-input"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="form-error">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Category & Location row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category-select" className="form-label">
              {t.categoryLabel} <span className="required-mark">*</span>
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Location / Area */}
          <div className="form-group">
            <label htmlFor="location-input" className="form-label">
              {t.locationLabel} <span className="required-mark">*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="location-input"
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder={t.locationPlaceholder}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                aria-invalid={Boolean(errors.locationArea)}
                aria-describedby={errors.locationArea ? 'location-error' : undefined}
              />
            </div>
            {errors.locationArea && (
              <p id="location-error" className="form-error">
                {errors.locationArea}
              </p>
            )}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="form-group">
          <label htmlFor="desc-input" className="form-label">
            {t.descriptionLabel} <span className="required-mark">*</span>
          </label>
          <textarea
            id="desc-input"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            className="form-textarea"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'desc-error' : undefined}
          />
          {errors.description && (
            <p id="desc-error" className="form-error">
              {errors.description}
            </p>
          )}
        </div>

        {/* Optional Attachment */}
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label htmlFor="attachment-file" className="form-label">
            {t.attachmentLabel}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label 
              htmlFor="attachment-file" 
              className="btn btn-secondary" 
              style={{ cursor: 'pointer', fontSize: '0.88rem', margin: 0 }}
            >
              <Paperclip size={16} />
              Choose File
            </label>
            <input
              id="attachment-file"
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept="image/*,.pdf,.doc,.docx"
            />
            <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              {attachmentName || 'No file selected'}
            </span>
          </div>
          <p className="form-help">{t.attachmentHelpText}</p>
          {errors.attachment && (
            <p className="form-error">{errors.attachment}</p>
          )}
        </div>

        {/* Submit button */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ minWidth: '200px', padding: '0.8rem 1.5rem' }}
          >
            {isSubmitting ? (
              <span>{t.submitting}</span>
            ) : (
              <>
                <Send size={18} />
                <span>{t.submitButton}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function GrievanceNewPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '3rem' }}>Loading form...</div>}>
      <GrievanceFormContent />
    </Suspense>
  );
}

