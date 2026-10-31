'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/storage/types';
import { useSpeechToText } from '@/lib/hooks/useSpeechToText';
import { 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  HelpCircle, 
  ExternalLink, 
  Globe, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  AlertCircle,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isSupported?: boolean;
  matchedServices?: Array<{
    id: string;
    title: string;
    category: string;
    department: string;
    sourceLabel: string;
    sourceUrl: string;
    lastReviewedDate: string;
    contentLanguage: string;
    isSynthetic: boolean;
  }>;
  clarificationPrompt?: string;
  suggestedActions?: Array<{
    label: string;
    href: string;
  }>;
  timestamp: string;
}

function AssistantChatContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState<Language>(language);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Synchronize initial voice language when portal language changes
  useEffect(() => {
    setVoiceLanguage(language);
  }, [language]);

  // Voice speech-to-text hook with dynamic language support
  const {
    isSupported,
    isListening,
    activeLocale,
    transcript,
    setTranscript,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechToText({
    language: voiceLanguage,
    onTranscriptChange: (text) => {
      setInputQuery(text);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // Initial welcome message
  useEffect(() => {
    const welcomeText = 
      language === 'hi'
        ? `नमस्ते! मैं आपका जनसेवा नागरिक सहायक हूँ। मैं आधिकारिक स्रोतों के आधार पर सरकारी प्रक्रियाओं, जन्म/मृत्यु प्रमाण पत्र, राशन कार्ड, पेंशन और नगर पालिका सेवाओं के बारे में जानकारी प्रदान करता हूँ।

आप अपना प्रश्न टाइप कर सकते हैं या माइक्रोफ़ोन का उपयोग करके बोल सकते हैं।`
        : language === 'te'
        ? `నమస్కారం! నేను మీ జనసేవ పౌర సహాయకుడిని. ప్రభుత్వ విధానాలు, ధృవీకరణ పత్రాలు, పెన్షన్లు మరియు పౌర సేవల గురించి ధృవీకరించబడిన సమాచారాన్ని నేను అందిస్తాను.

మీరు మీ ప్రశ్నను టైప్ చేయవచ్చు లేదా మైక్రోఫోన్ ఉపయోగించి మాట్లాడవచ్చు.`
        : `Hello! I am your JanSeva Citizen Assistant. I provide strictly source-grounded guidance on public procedures, vital certificates, welfare schemes, and civic services.

Ask any question below or tap the microphone to speak.`;

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: welcomeText,
        isSupported: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Handle incoming query param
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
    }
  }, [initialQuery]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isSending) return;

    if (isListening) {
      stopListening();
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    resetTranscript();
    setIsSending(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, language })
      });
      const data = await res.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          isSupported: data.isSupported,
          matchedServices: data.matchedServices,
          clarificationPrompt: data.clarificationPrompt,
          suggestedActions: data.suggestedActions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: data.error || t.errorOccurred,
            isSupported: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error('Failed to query assistant:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: t.errorOccurred,
          isSupported: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleMicClick = (targetLang?: Language) => {
    const langToUse = targetLang || voiceLanguage;
    if (targetLang) {
      setVoiceLanguage(targetLang);
    }
    if (isListening && (!targetLang || targetLang === voiceLanguage)) {
      stopListening();
    } else {
      startListening(langToUse);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    resetTranscript();
    setInputQuery('');
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem', maxWidth: '900px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={28} color="#2563eb" />
            {t.assistantTitle}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            {t.assistantSubtitle}
          </p>
        </div>

        <button 
          type="button" 
          onClick={handleClearChat}
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
        >
          <RotateCcw size={15} />
          {t.clearChat}
        </button>
      </div>

      {/* Suggested Questions Pill bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          {t.suggestedQuestionsTitle}:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[t.q1, t.q2, t.q3, t.q4].map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'white',
                border: '1px solid var(--color-border)',
                textAlign: 'left'
              }}
            >
              <HelpCircle size={13} color="#2563eb" />
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="card" style={{ padding: '1.25rem', minHeight: '480px', display: 'flex', flexDirection: 'column', background: 'white' }}>
        
        {/* Messages Scroll Area */}
        <div style={{ flex: '1 1 auto', overflowY: 'auto', maxHeight: '520px', paddingRight: '0.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: msg.sender === 'user' ? '80%' : '92%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                background: msg.sender === 'user' ? 'var(--color-primary)' : '#f8fafc',
                color: msg.sender === 'user' ? 'white' : 'var(--color-text-main)',
                padding: '1rem 1.25rem',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {msg.text}

                {/* Clarification prompt */}
                {msg.clarificationPrompt && (
                  <div style={{ marginTop: '0.85rem', padding: '0.65rem 0.85rem', background: '#eff6ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', fontSize: '0.88rem', color: '#1e40af' }}>
                    <strong>Follow-up suggestion:</strong> {msg.clarificationPrompt}
                  </div>
                )}

                {/* Sources Cited */}
                {msg.matchedServices && msg.matchedServices.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.82rem' }}>
                    <div style={{ fontWeight: 700, color: '#334155', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Globe size={14} color="#2563eb" />
                      <span>{t.sourcesCited}:</span>
                    </div>
                    {msg.matchedServices.map(srv => (
                      <div key={srv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <a href={srv.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            {srv.sourceLabel} <ExternalLink size={12} />
                          </a>
                          <span style={{ color: '#64748b', marginLeft: '0.5rem', fontSize: '0.76rem' }}>
                            ({srv.contentLanguage})
                          </span>
                        </div>
                        <span style={{ color: '#64748b', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Calendar size={11} />
                          {t.lastReviewed}: {srv.lastReviewedDate}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Action Buttons */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {msg.suggestedActions.map((action, idx) => (
                      <Link 
                        key={idx}
                        href={action.href}
                        className="btn btn-outline"
                        style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                      >
                        {action.label} <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isSending && (
            <div style={{ alignSelf: 'flex-start', background: '#f8fafc', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="mic-active" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }} />
              {t.loading}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Speech-to-text Status & Transcript Review State */}
        {isListening && (
          <div className="alert alert-warning" style={{ margin: '0.5rem 0', padding: '0.65rem 1rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="mic-active" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
              <span>
                <strong>
                  {voiceLanguage === 'te' 
                    ? 'వింటోంది... తెలుగులో మాట్లాడండి (te-IN)' 
                    : voiceLanguage === 'hi' 
                    ? 'सुन रहा हूँ... कृपया हिन्दी में बोलें (hi-IN)' 
                    : 'Listening... Please speak in English (en-IN)'}
                </strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => stopListening()}
              className="btn btn-danger"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)' }}
            >
              Stop
            </button>
          </div>
        )}

        {speechError && (
          <div className="alert alert-danger" style={{ margin: '0.5rem 0', padding: '0.65rem 1rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} />
            <span>
              {speechError === 'SPEECH_UNSUPPORTED' 
                ? t.speechUnsupported 
                : speechError === 'PERMISSION_DENIED'
                ? t.speechMicBlocked
                : speechError === 'NO_SPEECH'
                ? (voiceLanguage === 'te' 
                    ? 'శబ్దం వినబడలేదు. దయచేసి మైక్రోఫోన్ అనుమతించి, స్పష్టంగా మాట్లాడండి లేదా ప్రశ్నను టైప్ చేయండి.' 
                    : voiceLanguage === 'hi'
                    ? 'कोई आवाज नहीं सुनी गई। कृपया स्पष्ट बोलें या प्रश्न टाइप करें।'
                    : 'No speech detected. Please speak clearly into the microphone or type your question.')
                : `Voice recognition status: ${speechError}`}
            </span>
          </div>
        )}

        {/* Transcript Review / Edit Box if voice produced text */}
        {transcript && (
          <div style={{ background: '#f8fafc', border: '2px dashed #0d9488', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f766e', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={14} color="#0d9488" />
                {voiceLanguage === 'te' ? 'వాయిస్ ద్వారా రికార్డ్ అయిన వచనం (సవరించవచ్చు):' : voiceLanguage === 'hi' ? 'आवाज से प्राप्त पाठ (संशोधन योग्य):' : t.editTranscriptHint}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleSend(inputQuery)}
                  className="btn btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', background: '#0d9488' }}
                >
                  {voiceLanguage === 'te' ? 'ఈ ప్రశ్నను పంపండి' : voiceLanguage === 'hi' ? 'पूछें' : 'Send this'}
                </button>
                <button 
                  type="button" 
                  onClick={resetTranscript} 
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Clear
                </button>
              </div>
            </div>
            <input 
              type="text" 
              value={inputQuery} 
              onChange={(e) => setInputQuery(e.target.value)}
              className="form-input"
              style={{ fontSize: '0.95rem', padding: '0.5rem 0.75rem', fontWeight: 600 }}
            />
          </div>
        )}

        {/* Input Bar with Left Input and Right-Side Multi-Language Voice Assistant Buttons */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.85rem', flexWrap: 'wrap' }}
        >
          {/* Text Input on the left */}
          <div style={{ flex: '1 1 240px' }}>
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                voiceLanguage === 'te' 
                  ? 'ప్రశ్నను టైప్ చేయండి లేదా కుడివైపు [తెలుగు] మైక్ నొక్కండి...' 
                  : voiceLanguage === 'hi'
                  ? 'प्रश्न लिखें या दाईं ओर [हिन्दी] माइक दबाएं...'
                  : t.chatPlaceholder
              }
              aria-label={t.chatPlaceholder}
              className="form-input"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1.25rem', width: '100%' }}
            />
          </div>

          {/* Right-Side Controls: Dedicated One-Click Multi-Language Voice Buttons + Send */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, marginLeft: 'auto', flexWrap: 'wrap' }}>
            
            {/* Direct Telugu Voice Mic Button */}
            <button
              type="button"
              onClick={() => handleMicClick('te')}
              className={`btn ${isListening && voiceLanguage === 'te' ? 'mic-active' : ''}`}
              title="తెలుగులో మాట్లాడండి (Telugu Audio Input - te-IN)"
              aria-label="Telugu Voice Input"
              style={{ 
                padding: '0.55rem 0.85rem', 
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: isListening && voiceLanguage === 'te' ? '2px solid #dc2626' : '1px solid #0d9488',
                background: isListening && voiceLanguage === 'te' ? '#dc2626' : voiceLanguage === 'te' ? '#0d9488' : '#f0fdfa',
                color: (isListening && voiceLanguage === 'te') || voiceLanguage === 'te' ? 'white' : '#0f766e',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: voiceLanguage === 'te' ? '0 2px 6px rgba(13,148,136,0.25)' : 'none'
              }}
            >
              {isListening && voiceLanguage === 'te' ? (
                <>
                  <MicOff size={16} color="white" />
                  <span>● ఆపండి</span>
                </>
              ) : (
                <>
                  <Mic size={16} color={voiceLanguage === 'te' ? 'white' : '#0d9488'} />
                  <span>తెలుగు</span>
                </>
              )}
            </button>

            {/* Direct Hindi Voice Mic Button */}
            <button
              type="button"
              onClick={() => handleMicClick('hi')}
              className={`btn ${isListening && voiceLanguage === 'hi' ? 'mic-active' : ''}`}
              title="हिन्दी में बोलें (Hindi Audio Input - hi-IN)"
              aria-label="Hindi Voice Input"
              style={{ 
                padding: '0.55rem 0.85rem', 
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: isListening && voiceLanguage === 'hi' ? '2px solid #dc2626' : '1px solid #ea580c',
                background: isListening && voiceLanguage === 'hi' ? '#dc2626' : voiceLanguage === 'hi' ? '#ea580c' : '#fff7ed',
                color: (isListening && voiceLanguage === 'hi') || voiceLanguage === 'hi' ? 'white' : '#c2410c',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {isListening && voiceLanguage === 'hi' ? (
                <>
                  <MicOff size={16} color="white" />
                  <span>● रोकें</span>
                </>
              ) : (
                <>
                  <Mic size={16} color={voiceLanguage === 'hi' ? 'white' : '#ea580c'} />
                  <span>हिन्दी</span>
                </>
              )}
            </button>

            {/* Direct English Voice Mic Button */}
            <button
              type="button"
              onClick={() => handleMicClick('en')}
              className={`btn ${isListening && voiceLanguage === 'en' ? 'mic-active' : ''}`}
              title="Speak in English (English Audio Input - en-IN)"
              aria-label="English Voice Input"
              style={{ 
                padding: '0.55rem 0.85rem', 
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: isListening && voiceLanguage === 'en' ? '2px solid #dc2626' : '1px solid #2563eb',
                background: isListening && voiceLanguage === 'en' ? '#dc2626' : voiceLanguage === 'en' ? '#2563eb' : '#eff6ff',
                color: (isListening && voiceLanguage === 'en') || voiceLanguage === 'en' ? 'white' : '#1d4ed8',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {isListening && voiceLanguage === 'en' ? (
                <>
                  <MicOff size={16} color="white" />
                  <span>● Stop</span>
                </>
              ) : (
                <>
                  <Mic size={16} color={voiceLanguage === 'en' ? 'white' : '#2563eb'} />
                  <span>English</span>
                </>
              )}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim() || isSending}
              className="btn btn-primary"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.15rem', flexShrink: 0 }}
              aria-label={t.sendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </form>

      </div>

      {/* Floating Quick Multi-Language Voice Pill at Bottom-Right */}
      <div 
        className="floating-voice-pill"
        style={{ 
          position: 'fixed', 
          bottom: '22px', 
          right: '22px', 
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'white',
          padding: '6px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          border: '2px solid var(--color-primary-border)'
        }}
        aria-label="Floating Quick Voice Assistant"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', fontWeight: 800, color: '#1e3a8a', paddingRight: '4px' }}>
          <Mic size={15} color="#2563eb" />
          <span>Speak:</span>
        </div>

        <button
          type="button"
          onClick={() => handleMicClick('te')}
          style={{
            padding: '4px 9px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.76rem',
            fontWeight: 700,
            background: isListening && voiceLanguage === 'te' ? '#dc2626' : voiceLanguage === 'te' ? '#0d9488' : '#f1f5f9',
            color: (isListening && voiceLanguage === 'te') || voiceLanguage === 'te' ? 'white' : '#334155',
            transition: 'all 0.15s ease'
          }}
          title="తెలుగులో మాట్లాడండి (Telugu Audio Input - te-IN)"
        >
          {isListening && voiceLanguage === 'te' ? '● Stop' : 'తెలుగు'}
        </button>

        <button
          type="button"
          onClick={() => handleMicClick('hi')}
          style={{
            padding: '4px 9px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.76rem',
            fontWeight: 700,
            background: isListening && voiceLanguage === 'hi' ? '#dc2626' : voiceLanguage === 'hi' ? '#ea580c' : '#f1f5f9',
            color: (isListening && voiceLanguage === 'hi') || voiceLanguage === 'hi' ? 'white' : '#334155',
            transition: 'all 0.15s ease'
          }}
          title="हिन्दी में बोलें (Hindi Audio Input - hi-IN)"
        >
          {isListening && voiceLanguage === 'hi' ? '● Stop' : 'हिन्दी'}
        </button>

        <button
          type="button"
          onClick={() => handleMicClick('en')}
          style={{
            padding: '4px 9px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.76rem',
            fontWeight: 700,
            background: isListening && voiceLanguage === 'en' ? '#dc2626' : voiceLanguage === 'en' ? 'var(--color-primary)' : '#f1f5f9',
            color: (isListening && voiceLanguage === 'en') || voiceLanguage === 'en' ? 'white' : '#334155',
            transition: 'all 0.15s ease'
          }}
          title="Speak English (English Audio Input - en-IN)"
        >
          {isListening && voiceLanguage === 'en' ? '● Stop' : 'EN'}
        </button>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '3rem' }}>Loading assistant...</div>}>
      <AssistantChatContent />
    </Suspense>
  );
}

