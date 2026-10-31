'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  Search, 
  FileText, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  Clock, 
  Building, 
  HeartHandshake, 
  Car, 
  GraduationCap, 
  LandPlot, 
  ArrowRight,
  HelpCircle,
  Mic,
  User,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();
  const { user, login } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/services');
    }
  };

  const categories = [
    { id: 'certificates', label: t.categoryCertificates, icon: FileText, color: '#2563eb', count: '4 Services' },
    { id: 'welfare', label: t.categoryWelfare, icon: HeartHandshake, color: '#0d9488', count: '4 Services' },
    { id: 'municipal', label: t.categoryMunicipal, icon: Building, color: '#d97706', count: '5 Services' },
    { id: 'revenue', label: t.categoryRevenue, icon: LandPlot, color: '#7c3aed', count: '3 Services' },
    { id: 'transport', label: t.categoryTransport, icon: Car, color: '#0284c7', count: '2 Services' },
    { id: 'health', label: t.categoryHealth, icon: CheckCircle2, color: '#16a34a', count: '1 Service' },
    { id: 'education', label: t.categoryEducation, icon: GraduationCap, color: '#ea580c', count: '1 Service' },
  ];

  return (
    <div>
      
      {/* Hero Section with Smart City Civic Background */}
      <section className="hero-bg-section" style={{ 
        padding: '4.25rem 0 3.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          
          {/* Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--color-primary-border)',
            padding: '0.4rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-primary)',
            fontSize: '0.88rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.1)'
          }}>
            <Sparkles size={16} color="#2563eb" />
            <span>{t.portalSubtitle}</span>
          </div>

          <h1 style={{ 
            fontSize: '2.75rem', 
            fontWeight: 800, 
            lineHeight: 1.18, 
            color: 'var(--color-text-main)',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            textShadow: '0 1px 2px rgba(255,255,255,0.8)'
          }}>
            {t.heroTitle}
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: '#334155', 
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '750px',
            margin: '0 auto 2rem',
            fontWeight: 500
          }}>
            {t.heroSubtitle}
          </p>

          {/* Interactive Search Box with Hover Glow and Voice Pill */}
          <div style={{ maxWidth: '700px', margin: '0 auto 2.25rem' }}>
            <form 
              onSubmit={handleSearchSubmit}
              className="search-bar-interactive"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'white', 
                borderRadius: 'var(--radius-full)', 
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '2px solid var(--color-primary-border)',
                padding: '0.4rem 0.6rem 0.4rem 1.25rem',
                gap: '0.5rem'
              }}
            >
              <Search size={22} color="#64748b" style={{ flexShrink: 0 }} aria-hidden="true" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'te' 
                    ? 'సేవలు లేదా ఫిర్యాదులను శోధించండి (ఉదా: రేషన్ కార్డు, బర్త్ సర్టిఫికేట్)...' 
                    : language === 'hi'
                    ? 'सेवाएं या शिकायतें खोजें (उदा: राशन कार्ड, जन्म प्रमाण पत्र)...'
                    : t.searchPlaceholder
                }
                aria-label={t.searchPlaceholder}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '1.02rem',
                  color: 'var(--color-text-main)',
                  background: 'transparent'
                }}
              />

              {/* Direct Telugu Voice Trigger Button with Hover Effect */}
              <Link
                href="/assistant"
                className="btn interactive-pill"
                style={{ 
                  background: '#f0fdfa', 
                  border: '1px solid #0d9488', 
                  color: '#0f766e', 
                  borderRadius: 'var(--radius-full)', 
                  padding: '0.45rem 0.85rem', 
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  textDecoration: 'none'
                }}
                title="తెలుగులో మాట్లాడండి / Speak in Telugu"
              >
                <Mic size={15} color="#0d9488" />
                <span>తెలుగు</span>
              </Link>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.35rem', flexShrink: 0 }}
              >
                {language === 'hi' ? 'खोजें' : language === 'te' ? 'శోధించండి' : 'Search'}
              </button>
            </form>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2.25rem' }}>
            <Link href="/assistant" className="btn btn-primary" style={{ padding: '0.7rem 1.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <Mic size={18} />
              <span>{language === 'te' ? 'వాయిస్ సహాయకుడితో మాట్లాడండి' : language === 'hi' ? 'आवाज सहायक से पूछें' : t.talkToAssistant}</span>
            </Link>
            <Link href="/services" className="btn btn-secondary" style={{ padding: '0.7rem 1.25rem' }}>
              <FileText size={18} />
              {t.services}
            </Link>
            <Link href="/grievance/new" className="btn btn-secondary" style={{ padding: '0.7rem 1.25rem' }}>
              <Send size={18} />
              {t.fileSampleIssue}
            </Link>
            <Link href="/grievance/track" className="btn btn-secondary" style={{ padding: '0.7rem 1.25rem' }}>
              <Clock size={18} />
              {t.trackExistingRequest}
            </Link>
          </div>

          {/* Demo User Callout Banner with Hover Depth */}
          <div 
            className="interactive-pill"
            style={{ 
              maxWidth: '650px', 
              margin: '0 auto', 
              background: 'rgba(255, 255, 255, 0.95)', 
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-md)', 
              padding: '0.9rem 1.25rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textAlign: 'left' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {user 
                    ? (language === 'te' ? `లాగిన్ అయ్యారు: ${user.name}` : `Signed in as: ${user.name}`)
                    : (language === 'te' ? 'డెమో ఖాతాతో లాగిన్ అవ్వండి (రమేష్ కుమార్)' : 'Try demo account: Ramesh Kumar / Staff')}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                  {user 
                    ? (user.role === 'staff' ? 'Staff Review Officer' : 'View your linked grievances on Dashboard')
                    : 'Instant 1-click login with preloaded grievances'}
                </div>
              </div>
            </div>

            {user ? (
              <Link 
                href="/dashboard" 
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}
              >
                {language === 'te' ? 'డాష్‌బోర్డ్ తెరవండి' : 'Go to Dashboard'} <ArrowRight size={14} />
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)', background: '#0d9488', borderColor: '#0d9488' }}
              >
                {language === 'te' ? 'డెమో లాగిన్' : 'Demo Login'} <ArrowRight size={14} />
              </Link>
            )}
          </div>

        </div>
      </section>

      {/* Metrics Bar with Geometric Dot Pattern Background */}
      <section className="pattern-dots-section" style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            <div className="interactive-pill" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>20+</div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {language === 'te' ? 'ధృవీకరించబడిన పౌర సేవలు' : 'Verified Public Services'}
              </div>
            </div>
            <div className="interactive-pill" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0d9488' }}>3</div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {language === 'te' ? 'భాషలు (తెలుగు, హిందీ, English)' : 'Regional Languages (EN, HI, TE)'}
              </div>
            </div>
            <div className="interactive-pill" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ea580c' }}>100%</div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {language === 'te' ? 'గోప్యతా రక్షణ (ఫోన్/ఇమెయిల్ అవసరం లేదు)' : 'Privacy-First (No PII Required)'}
              </div>
            </div>
            <div className="interactive-pill" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#7c3aed' }}>SHA-256</div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {language === 'te' ? 'సురక్షిత పిన్ & రేట్-లిమిటెడ్ ట్రాకింగ్' : 'Salted Hash PIN Protection'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid with Hover Lift and Arrow Slide */}
      <section style={{ padding: '3.75rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                {t.exploreCategories}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                {t.directorySubtitle}
              </p>
            </div>
            <Link href="/services" className="btn btn-outline" style={{ fontSize: '0.88rem' }}>
              {t.directoryTitle} <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '1.25rem' 
          }}>
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link 
                  key={cat.id} 
                  href={`/services?category=${cat.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="card category-card" style={{ height: '100%', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                    <div className="icon-box" style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: 'var(--radius-md)', 
                      background: `${cat.color}15`, 
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComp size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                        {cat.label}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.35rem' }}>
                        {cat.count}
                      </div>
                      <span className="arrow-slide" style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        {t.viewDetails} <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights: Privacy & Grounded AI with Wave Pattern Background */}
      <section className="pattern-waves-section" style={{ padding: '4.5rem 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Card 1: Grounded AI Assistant */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'white' }}>
              <div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: '#f0fdfa', 
                  color: '#0f766e',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  <Mic size={14} color="#0d9488" />
                  <span>TELUGU, HINDI & ENGLISH VOICE</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {t.assistantTitle}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {language === 'te' 
                    ? 'మీరు తెలుగులో మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు. అసిస్టెంట్ కేవలం ధృవీకరించబడిన ప్రభుత్వ మూలాల ఆధారంగా సమాధానాలు ఇస్తుంది. ఆధారం లేని విషయాలను నిర్ధారించబడలేదు అని స్పష్టంగా చెబుతుంది.' 
                    : `${t.assistantSubtitle} Speaks English, Hindi, and Telugu. Supported by native Speech-to-Text input with review and editing controls.`}
                </p>
                <div className="alert alert-info" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <HelpCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{t.noEvidenceDisclaimer}</span>
                </div>
              </div>
              <Link href="/assistant" className="btn btn-primary" style={{ width: '100%', background: '#0d9488', borderColor: '#0d9488' }}>
                <Mic size={16} /> {language === 'te' ? 'తెలుగులో మాట్లాడండి' : t.talkToAssistant}
              </Link>
            </div>

            {/* Card 2: Privacy First Grievance */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'white' }}>
              <div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: '#eff6ff', 
                  color: '#1e40af',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  <Shield size={14} color="#2563eb" />
                  <span>PRIVACY & SECURITY</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {t.privacyNoticeTitle}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {t.privacyNoticeText} We generate a unique reference number and a cryptographic salted SHA-256 hashed 6-digit PIN.
                </p>
                <div className="alert alert-warning" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <Shield size={18} style={{ flexShrink: 0 }} />
                  <span>{t.demoSubmissionWarning}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link href="/grievance/new" className="btn btn-primary" style={{ flex: 1 }}>
                  {t.fileGrievance}
                </Link>
                <Link href="/grievance/track" className="btn btn-secondary" style={{ flex: 1 }}>
                  {t.trackGrievance}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
