'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Shield, ExternalLink, Info } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Shield size={20} color="#60a5fa" />
              <div className="footer-title" style={{ margin: 0 }}>{t.portalTitle}</div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              {t.portalSubtitle}. {t.demoBannerText}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <Info size={16} color="#38bdf8" />
              <span>{t.machineTranslationDisclaimer}</span>
            </div>
          </div>

          <div>
            <div className="footer-title">{t.quickActions}</div>
            <ul className="footer-links">
              <li><Link href="/services">{t.services}</Link></li>
              <li><Link href="/assistant">{t.assistant}</Link></li>
              <li><Link href="/grievance/new">{t.fileGrievance}</Link></li>
              <li><Link href="/grievance/track">{t.trackGrievance}</Link></li>
              <li><Link href="/staff">{t.staffPortal}</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Citations & Governance</div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              All service records cite primary portals such as crsorgi.gov.in, sarathi.parivahan.gov.in, and pmjay.gov.in.
            </p>
            <ul className="footer-links">
              <li>
                <a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  National Services Portal <ExternalLink size={13} />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  CPGRAMS Portal <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {t.portalTitle} — Open Demonstration Environment. Built with Next.js, React 19 & TypeScript.</p>
          <p style={{ marginTop: '0.35rem' }}>
            Privacy Guarantee: No citizen personal phone numbers, names, or emails are retained.
          </p>
        </div>
      </div>
    </footer>
  );
}

