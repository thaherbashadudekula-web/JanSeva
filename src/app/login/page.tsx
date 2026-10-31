'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  LogIn, 
  User, 
  ShieldCheck, 
  Key, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const { t, language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regName, setRegName] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      if (user.role === 'staff') {
        router.push('/staff');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: regName,
            email,
            password,
            languagePreference: language
          })
        });
        const data = await res.json();
        if (data.success) {
          window.location.href = '/dashboard';
          return;
        } else {
          setError(data.error || 'Registration failed.');
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          // If staff, go to staff, else dashboard
          window.location.href = email.includes('staff') ? '/staff' : '/dashboard';
          return;
        } else {
          setError(res.error || 'Invalid email or password.');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoCitizen = async () => {
    setEmail('citizen@demo.gov.in');
    setPassword('CitizenDemo@2026');
    setIsRegisterMode(false);
    setError(null);
    setIsSubmitting(true);
    const res = await login('citizen@demo.gov.in', 'CitizenDemo@2026');
    if (res.success) {
      window.location.href = '/dashboard';
    } else {
      setError(res.error || 'Failed to login with demo citizen account.');
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoStaff = async () => {
    setEmail('staff@demo.gov.in');
    setPassword('StaffDemo@2026');
    setIsRegisterMode(false);
    setError(null);
    setIsSubmitting(true);
    const res = await login('staff@demo.gov.in', 'StaffDemo@2026');
    if (res.success) {
      window.location.href = '/staff';
    } else {
      setError(res.error || 'Failed to login with demo staff account.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 4rem', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid #bfdbfe', color: '#1e40af', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Sparkles size={16} color="#2563eb" />
          <span>{language === 'te' ? 'జనసేవ పౌర & సిబ్బంది లాగిన్' : language === 'hi' ? 'जनसेवा नागरिक एवं कर्मचारी लॉगिन' : 'JanSeva Demo Portal Authentication'}</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          {isRegisterMode 
            ? (language === 'te' ? 'కొత్త పౌర ఖాతా నమోదు' : language === 'hi' ? 'नया नागरिक खाता बनाएं' : 'Create Citizen Account')
            : (language === 'te' ? 'పౌర మరియు సమీక్షకుల లాగిన్' : language === 'hi' ? 'पोर्टल में साइन इन करें' : 'Sign in to JanSeva')}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto' }}>
          {language === 'te' 
            ? 'నమూనా పౌర సేవలను యాక్సెస్ చేయడానికి లేదా సమీక్షించడానికి లాగిన్ అవ్వండి. దిగువన ఉన్న డెమో ఖాతాలను తక్షణమే ఉపయోగించవచ్చు.' 
            : language === 'hi'
            ? 'अपनी शिकायतों को ट्रैक करने या समीक्षा करने के लिए लॉगिन करें। त्वरित परीक्षण के लिए नीचे दिए गए डेमो खातों का उपयोग करें।'
            : 'Access personalized grievance history, track submissions without a PIN, or manage the staff review queue using demo credentials.'}
        </p>
      </div>

      {/* 1-Click Demo Accounts Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.75rem', textAlign: 'center' }}>
          ⚡ {language === 'te' ? 'తక్షణ డెమో లాగిన్ (1-క్లిక్)' : language === 'hi' ? 'त्वरित 1-क्लिक डेमो लॉगिन' : 'Quick 1-Click Demo Logins'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          
          {/* Demo Citizen Card */}
          <div 
            className="card" 
            style={{ 
              padding: '1.25rem', 
              border: '2px solid #0d9488', 
              background: '#f0fdfa',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: '#0d9488', color: 'white', fontWeight: 700 }}>
                  <User size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {language === 'te' ? 'డెమో పౌరుడు' : language === 'hi' ? 'डेमो नागरिक' : 'Demo Citizen'}
                </span>
                <span style={{ fontSize: '0.74rem', color: '#0f766e', fontWeight: 600 }}>
                  Preloaded 2 Grievances
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#134e4a', marginBottom: '0.25rem' }}>
                Ramesh Kumar (రమేష్ కుమార్)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#0f766e', marginBottom: '0.75rem' }}>
                Email: <strong>citizen@demo.gov.in</strong><br />
                Password: <strong>CitizenDemo@2026</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoCitizen}
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', background: '#0d9488', borderColor: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <span>{language === 'te' ? 'పౌరుడిగా 1-క్లిక్ లాగిన్' : language === 'hi' ? 'नागरिक के रूप में लॉगिन करें' : '1-Click Login as Citizen'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Demo Staff Card */}
          <div 
            className="card" 
            style={{ 
              padding: '1.25rem', 
              border: '2px solid #2563eb', 
              background: '#eff6ff',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: '#2563eb', color: 'white', fontWeight: 700 }}>
                  <ShieldCheck size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {language === 'te' ? 'డెమో సిబ్బంది' : language === 'hi' ? 'डेमो समीक्षा अधिकारी' : 'Demo Staff Reviewer'}
                </span>
                <span style={{ fontSize: '0.74rem', color: '#1e40af', fontWeight: 600 }}>
                  Full Review Queue Access
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.25rem' }}>
                Priya Sharma (Review Officer)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#1e40af', marginBottom: '0.75rem' }}>
                Email: <strong>staff@demo.gov.in</strong><br />
                Password: <strong>StaffDemo@2026</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoStaff}
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', background: '#2563eb', borderColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <span>{language === 'te' ? 'సిబ్బందిగా 1-క్లిక్ లాగిన్' : language === 'hi' ? 'अधिकारी के रूप में लॉगिन करें' : '1-Click Login as Staff'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Form Box */}
      <div className="card" style={{ padding: '2rem', background: 'white', maxWidth: '520px', margin: '0 auto' }}>
        
        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          
          {isRegisterMode && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="reg-name">
                <User size={15} style={{ display: 'inline', marginRight: '6px' }} />
                {language === 'te' ? 'పూర్తి పేరు' : language === 'hi' ? 'पूरा नाम' : 'Full Name'}
              </label>
              <input
                id="reg-name"
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label" htmlFor="login-email">
              <Mail size={15} style={{ display: 'inline', marginRight: '6px' }} />
              {language === 'te' ? 'ఇమెయిల్ చిరునామా' : language === 'hi' ? 'ईमेल पता' : 'Email Address'}
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. citizen@demo.gov.in"
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" htmlFor="login-password">
              <Lock size={15} style={{ display: 'inline', marginRight: '6px' }} />
              {language === 'te' ? 'పాస్‌వర్డ్' : language === 'hi' ? 'पासवर्ड' : 'Password'}
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: 700 }}
          >
            {isSubmitting ? (
              <span>{t.loading}</span>
            ) : isRegisterMode ? (
              <span>{language === 'te' ? 'ఖాతా సృష్టించండి' : language === 'hi' ? 'खाता बनाएं' : 'Create Account'}</span>
            ) : (
              <span>{language === 'te' ? 'సైన్ ఇన్ చేయండి' : language === 'hi' ? 'साइन इन करें' : 'Sign In'}</span>
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.88rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          {isRegisterMode ? (
            <p style={{ color: 'var(--color-text-muted)' }}>
              {language === 'te' ? 'ఇప్పటికే ఖాతా ఉందా?' : language === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setError(null); }}
                style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                {language === 'te' ? 'ఇక్కడ లాగిన్ అవ్వండి' : language === 'hi' ? 'यहाँ लॉगिन करें' : 'Sign In here'}
              </button>
            </p>
          ) : (
            <p style={{ color: 'var(--color-text-muted)' }}>
              {language === 'te' ? 'కొత్త ఖాతా కావాలా?' : language === 'hi' ? 'नया खाता बनाना चाहते हैं?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setError(null); }}
                style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                {language === 'te' ? 'కొత్త పౌర ఖాతా నమోదు చేయండి' : language === 'hi' ? 'नया नागरिक खाता बनाएं' : 'Register a Citizen Account'}
              </button>
            </p>
          )}
        </div>

      </div>

      {/* Privacy note */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
        🔒 {language === 'te' 
          ? 'డెమో భద్రతా హామీ: అన్ని పాస్‌వర్డ్‌లు సాల్టెడ్ SHA-256 హాష్‌లుగా నిల్వ చేయబడతాయి. వ్యక్తిగత సమాచారం సేకరించబడదు.' 
          : language === 'hi'
          ? 'डेमो सुरक्षा आश्वासन: सभी पासवर्ड सॉल्टेड SHA-256 हैश के रूप में सुरक्षित हैं।'
          : 'Demo Security: Credentials are encrypted using salted SHA-256 hashes. No real-world PII is shared.'}
      </div>

    </div>
  );
}

