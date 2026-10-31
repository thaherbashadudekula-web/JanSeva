'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  Building2, 
  Menu, 
  X, 
  FileText, 
  Sparkles, 
  Send, 
  Search, 
  ShieldCheck,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        
        {/* Compact Brand Logo */}
        <Link href="/" className="brand-wrapper" onClick={closeMenu}>
          <div className="brand-emblem" aria-hidden="true">
            <Building2 size={18} />
          </div>
          <div>
            <div className="brand-title">JanSeva</div>
            <div className="brand-subtitle">
              {language === 'te' ? 'పౌర సేవలు' : language === 'hi' ? 'नागरिक सेवा' : 'Citizen Portal'}
            </div>
          </div>
        </Link>

        {/* Streamlined Desktop Navigation links */}
        <nav aria-label="Main Navigation">
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <Link 
                href="/" 
                className={`nav-link ${isActive('/') && pathname === '/' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {t.home}
              </Link>
            </li>
            <li>
              <Link 
                href="/services" 
                className={`nav-link ${isActive('/services') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <FileText size={14} aria-hidden="true" />
                <span>{language === 'te' ? 'సేవలు' : language === 'hi' ? 'सेवाएं' : 'Services'}</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/assistant" 
                className={`nav-link ${isActive('/assistant') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Sparkles size={14} color="#0d9488" aria-hidden="true" />
                <span>{language === 'te' ? 'సహాయకుడు 🎙️' : language === 'hi' ? 'सहायक 🎙️' : 'AI Assistant 🎙️'}</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/grievance/new" 
                className={`nav-link ${isActive('/grievance/new') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Send size={14} aria-hidden="true" />
                <span>{language === 'te' ? 'ఫిర్యాదు' : language === 'hi' ? 'शिकायत' : 'Grievance'}</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/grievance/track" 
                className={`nav-link ${isActive('/grievance/track') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Search size={14} aria-hidden="true" />
                <span>{language === 'te' ? 'ట్రాకింగ్' : language === 'hi' ? 'ट्रैकिंग' : 'Track'}</span>
              </Link>
            </li>
            {user && (
              <li>
                <Link 
                  href="/dashboard" 
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={closeMenu}
                  style={{ color: '#0f766e', fontWeight: 700 }}
                >
                  <User size={14} aria-hidden="true" />
                  <span>{language === 'te' ? 'డాష్‌బోర్డ్' : language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
                </Link>
              </li>
            )}
            <li>
              <Link 
                href="/staff" 
                className={`nav-link ${isActive('/staff') ? 'active' : ''}`}
                onClick={closeMenu}
                style={{ color: '#b45309' }}
              >
                <ShieldCheck size={14} aria-hidden="true" />
                <span>{language === 'te' ? 'సిబ్బంది' : language === 'hi' ? 'स्टाफ' : 'Staff'}</span>
              </Link>
            </li>

            {/* Mobile-Only Drawer Actions */}
            <li className="mobile-only" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="btn btn-outline"
                    style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                  >
                    <User size={15} />
                    <span>{language === 'te' ? 'డాష్‌బోర్డ్' : 'Dashboard'} ({user.name.split(' ')[0]})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => { closeMenu(); logout(); }}
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    <LogOut size={14} />
                    <span>{t.logout}</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  <LogIn size={15} />
                  <span>{language === 'te' ? 'లాగిన్' : language === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Section: Compact User Pill & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          
          {/* Desktop User Avatar / Login Button */}
          <div className="desktop-only">
            {user ? (
              <div className="user-nav-pill">
                <Link 
                  href="/dashboard"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                  title="Open Dashboard"
                >
                  <div className="user-avatar-badge">
                    {user.name.charAt(0)}
                  </div>
                  <span className="user-nav-name">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="user-nav-logout"
                  title={t.logout}
                  aria-label={t.logout}
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary"
                style={{ 
                  fontSize: '0.78rem', 
                  padding: '0.32rem 0.75rem', 
                  borderRadius: 'var(--radius-full)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.3rem',
                  fontWeight: 700 
                }}
              >
                <LogIn size={13} />
                <span>{language === 'te' ? 'లాగిన్' : language === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
              </Link>
            )}
          </div>

          {/* Compact Segmented Language Selector */}
          <div 
            className="lang-selector-group" 
            role="group" 
            aria-label={t.selectLanguage}
          >
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
              aria-pressed={language === 'hi'}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'te' ? 'active' : ''}`}
              onClick={() => setLanguage('te')}
              aria-pressed={language === 'te'}
              title="తెలుగులోకి మారండి"
            >
              తెలుగు
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>
    </header>
  );
}
