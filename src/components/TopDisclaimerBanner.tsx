'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { AlertTriangle, Globe } from 'lucide-react';

export function TopDisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <aside aria-label="Demo Disclaimer Banner" className="gov-top-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: '1 1 auto' }}>
        <span className="gov-badge">{t.demoDisclaimerBadge}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
          <AlertTriangle size={14} color="#f59e0b" aria-hidden="true" />
          {t.demoBannerText}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
        <Globe size={13} aria-hidden="true" />
        <span>{t.officialSourceNotice}</span>
      </div>
    </aside>
  );
}

