'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ServiceRecord } from '@/lib/storage/types';
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Calendar, 
  Globe, 
  Building2, 
  CheckCircle2, 
  Tag, 
  AlertCircle 
} from 'lucide-react';

function ServiceDirectoryContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const url = `/api/services?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setServices(data.services);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchServices, 150);
    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'certificates', label: t.categoryCertificates },
    { id: 'welfare', label: t.categoryWelfare },
    { id: 'municipal', label: t.categoryMunicipal },
    { id: 'revenue', label: t.categoryRevenue },
    { id: 'transport', label: t.categoryTransport },
    { id: 'health', label: t.categoryHealth },
    { id: 'education', label: t.categoryEducation }
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          {t.directoryTitle}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '800px' }}>
          {t.directorySubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '2.5rem', background: '#f8fafc' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Search box */}
          <div>
            <label htmlFor="service-search" className="form-label">
              {t.searchServicesLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="service-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category-select" className="form-label">
              {t.categoryFilterLabel}
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="btn"
              style={{
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: selectedCategory === cat.id ? 'var(--color-primary)' : 'white',
                color: selectedCategory === cat.id ? 'white' : 'var(--color-text-main)',
                border: selectedCategory === cat.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Count and Loading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
          Showing <strong>{services.length}</strong> catalogued civic service records
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          {t.loading}
        </div>
      ) : services.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <AlertCircle size={44} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.noServicesFound}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Try adjusting your search terms or clearing the category filter.
          </p>
          <button 
            type="button" 
            onClick={() => { setQuery(''); setSelectedCategory('all'); }} 
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {services.map(service => {
            const localizedTitle = service.title[language] || service.title.en;
            const localizedDesc = service.description[language] || service.description.en;

            return (
              <div 
                key={service.id} 
                className="card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderTop: '4px solid var(--color-primary)' 
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase', 
                      background: 'var(--color-primary-light)', 
                      color: 'var(--color-primary)', 
                      padding: '2px 8px', 
                      borderRadius: 'var(--radius-sm)' 
                    }}>
                      {service.category}
                    </span>

                    {service.isSynthetic && (
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 600, 
                        background: '#fef3c7', 
                        color: '#92400e', 
                        padding: '2px 7px', 
                        borderRadius: 'var(--radius-full)' 
                      }}>
                        {t.syntheticNotice}
                      </span>
                    )}
                  </div>

                  {/* Title & Department */}
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    <Link href={`/services/${service.id}`} style={{ color: 'inherit' }}>
                      {localizedTitle}
                    </Link>
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-light)', marginBottom: '0.85rem' }}>
                    <Building2 size={14} />
                    <span>{service.department}</span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    {localizedDesc}
                  </p>
                </div>

                {/* Source Citation & Metadata */}
                <div>
                  <div style={{ 
                    borderTop: '1px solid var(--color-border)', 
                    paddingTop: '0.85rem', 
                    marginBottom: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Globe size={13} color="#2563eb" />
                      <span>{t.sourceLabel}: <strong>{service.sourceLabel}</strong></span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.78rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={12} />
                        {t.contentLanguageLabel}: <strong>{service.contentLanguage}</strong>
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} />
                        {t.lastReviewed}: {service.lastReviewedDate}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Link href={`/services/${service.id}`} className="btn btn-primary" style={{ flex: 1, fontSize: '0.88rem', padding: '0.55rem 0.85rem' }}>
                      {t.viewDetails} <ArrowRight size={15} />
                    </Link>
                    <a 
                      href={service.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary"
                      title={t.officialSourceLink}
                      style={{ padding: '0.55rem 0.85rem', flexShrink: 0 }}
                      aria-label={`${t.officialSourceLink} (${service.sourceLabel})`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '3rem' }}>Loading services...</div>}>
      <ServiceDirectoryContent />
    </Suspense>
  );
}

