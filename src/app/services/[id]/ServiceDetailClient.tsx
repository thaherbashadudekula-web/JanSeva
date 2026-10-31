'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ServiceRecord } from '@/lib/storage/types';
import { 
  Building2, 
  ExternalLink, 
  Calendar, 
  Globe, 
  Tag, 
  CheckCircle, 
  FileCheck, 
  FileText,
  Clock, 
  CreditCard, 
  MessageSquare, 
  Send,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export function ServiceDetailClient({ initialService }: { initialService: ServiceRecord | null }) {
  const { t, language } = useLanguage();

  if (!initialService) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <AlertTriangle size={48} color="#dc2626" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Service Not Found
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            The requested public service record does not exist or has been modified.
          </p>
          <Link href="/services" className="btn btn-primary">
            {t.backToDirectory}
          </Link>
        </div>
      </div>
    );
  }

  const service = initialService;
  const localizedTitle = service.title[language] || service.title.en;
  const localizedDesc = service.description[language] || service.description.en;
  const localizedSteps = service.steps[language] || service.steps.en;

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '900px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link 
          href="/services" 
          className="btn btn-secondary" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          {t.backToDirectory}
        </Link>
      </div>

      {/* Header card */}
      <div className="card" style={{ marginBottom: '2rem', borderTop: '5px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            background: 'var(--color-primary-light)', 
            color: 'var(--color-primary)', 
            padding: '3px 10px', 
            borderRadius: 'var(--radius-sm)' 
          }}>
            {service.category}
          </span>

          {service.isSynthetic && (
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              background: '#fef3c7', 
              color: '#92400e', 
              padding: '3px 10px', 
              borderRadius: 'var(--radius-full)' 
            }}>
              {t.syntheticNotice}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem', lineHeight: '1.25' }}>
          {localizedTitle}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          <Building2 size={18} color="#2563eb" />
          <strong>{service.department}</strong>
        </div>

        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
          {localizedDesc}
        </p>

        {/* Source citation banner */}
        <div style={{ 
          background: '#f8fafc', 
          border: '1px solid var(--color-border)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1rem 1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                <Globe size={16} color="#2563eb" />
                <span>{t.sourceLabel}: <strong>{service.sourceLabel}</strong></span>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={13} />
                  {t.contentLanguageLabel}: <strong>{service.contentLanguage}</strong>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={13} />
                  {t.lastReviewed}: <strong>{service.lastReviewedDate}</strong>
                </span>
              </div>
            </div>

            <a 
              href={service.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
            >
              {t.officialSourceLink} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Step by step procedure */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={22} color="#16a34a" />
          {t.stepByStepGuide}
        </h2>
        
        <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {localizedSteps.map((step, idx) => (
            <li key={idx} style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Requirements Matrix: Eligibility, Documents, Fees, Processing Time */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* Eligibility */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-main)' }}>
            <FileCheck size={18} color="#2563eb" />
            {t.eligibilityTitle}
          </h3>
          {service.eligibility ? (
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              {service.eligibility}
            </p>
          ) : (
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
              {t.notConfirmedInSource}
            </div>
          )}
        </div>

        {/* Required Documents */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-main)' }}>
            <FileText size={18} color="#0d9488" />
            {t.documentsTitle}
          </h3>
          {service.documentsRequired && service.documentsRequired.length > 0 ? (
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              {service.documentsRequired.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          ) : (
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
              {t.notConfirmedInSource}
            </div>
          )}
        </div>

        {/* Fees */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-main)' }}>
            <CreditCard size={18} color="#d97706" />
            {t.feesTitle}
          </h3>
          {service.fees ? (
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              {service.fees}
            </p>
          ) : (
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
              {t.notConfirmedInSource}
            </div>
          )}
        </div>

        {/* Processing Time */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-main)' }}>
            <Clock size={18} color="#7c3aed" />
            {t.processingTimeTitle}
          </h3>
          {service.processingTime ? (
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              {service.processingTime}
            </p>
          ) : (
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
              {t.notConfirmedInSource}
            </div>
          )}
        </div>

      </div>

      {/* Citizen Action Bar */}
      <div className="card" style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Need help or facing an issue with this service?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Ask our grounded assistant or submit a sample civic grievance to our demo system.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link 
            href={`/assistant?q=${encodeURIComponent(service.title.en)}`}
            className="btn btn-primary"
          >
            <MessageSquare size={16} />
            {t.askAssistantAboutThis}
          </Link>
          <Link 
            href={`/grievance/new?category=${service.category}&subject=${encodeURIComponent(`Issue regarding ${service.title.en}`)}`}
            className="btn btn-secondary"
          >
            <Send size={16} />
            {t.submitRelatedGrievance}
          </Link>
        </div>
      </div>
    </div>
  );
}

