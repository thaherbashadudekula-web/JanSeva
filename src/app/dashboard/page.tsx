'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  User, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Sparkles, 
  ExternalLink, 
  LogOut, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Mic
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, grievances, isLoading, logout } = useAuth();
  const { t, language } = useLanguage();
  const [selectedGrievanceId, setSelectedGrievanceId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>{t.loading}...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <AlertCircle size={44} color="#ea580c" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {language === 'te' ? 'సైన్ ఇన్ అవసరం' : language === 'hi' ? 'लॉगिन आवश्यक है' : 'Sign In Required'}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {language === 'te' 
              ? 'మీ వ్యక్తిగత పౌర డాష్‌బోర్డ్ మరియు ఫిర్యాదుల చరిత్రను వీక్షించడానికి దయచేసి లాగిన్ అవ్వండి.' 
              : language === 'hi'
              ? 'अपनी शिकायतों को देखने के लिए कृपया लॉगिन करें।'
              : 'Please log in to access your personal citizen dashboard and grievance history.'}
          </p>
          <Link href="/login" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            {language === 'te' ? 'డెమో ఖాతాతో లాగిన్ అవ్వండి' : language === 'hi' ? 'लॉगिन करें' : 'Sign In with Demo Account'}
          </Link>
        </div>
      </div>
    );
  }

  const selectedGrievance = grievances.find(g => g.id === selectedGrievanceId);

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '1000px' }}>
      
      {/* Welcome Banner */}
      <div 
        className="card" 
        style={{ 
          padding: '1.75rem', 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
          color: 'white', 
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.18)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} color="#93c5fd" />
            <span>{user.role === 'staff' ? 'Staff Review Officer' : 'Verified Citizen Session'}</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 0.35rem' }}>
            {language === 'te' ? `నమస్కారం, ${user.name}!` : language === 'hi' ? `नमस्ते, ${user.name}!` : `Welcome, ${user.name}!`}
          </h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.92rem' }}>
            Email: {user.email} • {language === 'te' ? 'జనసేవ పౌర పోర్టల్' : 'JanSeva Public Services Portal'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link 
            href="/assistant" 
            className="btn" 
            style={{ background: '#0d9488', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem' }}
          >
            <Mic size={16} />
            <span>{language === 'te' ? 'వాయిస్ అసిస్టెంట్' : 'AI Assistant'}</span>
          </Link>
          <button 
            type="button" 
            onClick={logout} 
            className="btn" 
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <LogOut size={15} />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        
        <Link 
          href="/grievance/new" 
          className="card" 
          style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--color-border)', transition: 'transform 0.15s ease' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#2563eb' }}>
            <PlusCircle size={22} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
            {language === 'te' ? 'కొత్త ఫిర్యాదు దాఖలు చేయండి' : language === 'hi' ? 'नई शिकायत दर्ज करें' : 'Submit Sample Grievance'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {language === 'te' ? 'సమస్యను నివేదించి తక్షణ రిఫరెన్స్ పొందండి' : 'Report local civic issue with zero personal info'}
          </p>
        </Link>

        <Link 
          href="/assistant" 
          className="card" 
          style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--color-border)' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#0d9488' }}>
            <Sparkles size={22} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
            {language === 'te' ? 'తెలుగు వాయిస్ అసిస్టెంట్' : language === 'hi' ? 'आवाज सहायक से पूछें' : 'Voice Citizen Assistant'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {language === 'te' ? 'తెలుగు, హిందీ లేదా ఇంగ్లీషులో మాట్లాడండి' : 'Speak or type in Telugu, Hindi or English'}
          </p>
        </Link>

        <Link 
          href="/services" 
          className="card" 
          style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--color-border)' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#ea580c' }}>
            <FileText size={22} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
            {language === 'te' ? '20 పౌర సేవల డైరెక్టరీ' : language === 'hi' ? '20 सार्वजनिक सेवाएं' : '20 Public Services'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {language === 'te' ? 'ధృవీకరించబడిన ప్రభుత్వ మూలాలు మరియు దశలు' : 'Curated government procedures & steps'}
          </p>
        </Link>

        <Link 
          href="/grievance/track" 
          className="card" 
          style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', border: '1px solid var(--color-border)' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#7c3aed' }}>
            <Clock size={22} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
            {language === 'te' ? 'రిఫరెన్స్ ద్వారా ట్రాకింగ్' : language === 'hi' ? 'पिन द्वारा ट्रैकिंग' : 'PIN Status Tracking'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {language === 'te' ? 'రేట్-లిమిటెడ్ సురక్షిత పరిశీలన' : 'SHA-256 rate-limited verification'}
          </p>
        </Link>

      </div>

      {/* Grievance Records Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.25rem' }}>
              {language === 'te' ? 'మీ నమోదిత ఫిర్యాదులు' : language === 'hi' ? 'आपकी दर्ज शिकायतें' : 'Your Sample Grievances & Service Requests'}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
              {language === 'te' ? 'ఖాతాకు లింక్ చేయబడిన నమూనా వినతుల స్థితి' : 'Live tracking of requests associated with this account'}
            </p>
          </div>

          <Link href="/grievance/new" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}>
            + {language === 'te' ? 'కొత్తది' : 'New Request'}
          </Link>
        </div>

        {grievances.length === 0 ? (
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: 'white' }}>
            <FileText size={38} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {language === 'te' ? 'ఇంకా ఎటువంటి ఫిర్యాదులు నమోదు కాలేదు' : 'No grievances on record yet'}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {language === 'te' ? 'డెమో వ్యవస్థలో మొదటి నమూనా అభ్యర్థనను సమర్పించండి.' : 'Submit a test civic request to see real-time lifecycle tracking.'}
            </p>
            <Link href="/grievance/new" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              {language === 'te' ? 'నమూనా ఫిర్యాదును సమర్పించండి' : 'Submit Sample Grievance'}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {grievances.map((gr) => (
              <div 
                key={gr.id} 
                className="card" 
                style={{ 
                  padding: '1.25rem', 
                  background: 'white', 
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem', color: '#1e3a8a', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                        {gr.referenceNumber}
                      </span>
                      <span className={`badge badge-${gr.status.toLowerCase().replace('_', '-')}`}>
                        {gr.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>
                      {gr.subject}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedGrievanceId(selectedGrievanceId === gr.id ? null : gr.id)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                  >
                    {selectedGrievanceId === gr.id ? 'Hide Timeline' : 'View Status History'}
                  </button>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {gr.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={13} color="#ea580c" />
                    {gr.locationArea}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} />
                    {new Date(gr.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Inline Status History Accordion */}
                {selectedGrievanceId === gr.id && (
                  <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                      📜 {language === 'te' ? 'అధికారిక స్థితి పురోగతి చరిత్ర' : 'Status Progression Timeline'}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {gr.statusHistory.map((entry, idx) => (
                        <div key={idx} style={{ borderLeft: '3px solid #2563eb', paddingLeft: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e3a8a' }}>
                              {entry.status.replace('_', ' ')}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p style={{ margin: '0.2rem 0', fontSize: '0.82rem', color: '#334155' }}>
                            {entry.notes}
                          </p>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            Updated by: {entry.updatedBy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

