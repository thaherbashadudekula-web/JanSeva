'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../storage/types';

interface UseSpeechToTextOptions {
  language: Language;
  onTranscriptChange?: (text: string) => void;
}

// BCP 47 language mapping for Indian regional locales
const LOCALE_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN'
};

export function useSpeechToText({ language, onTranscriptChange }: UseSpeechToTextOptions) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>(LOCALE_MAP[language] || 'en-IN');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(Boolean(SpeechRecognition));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore if already stopped
      }
    }
    setIsListening(false);
    setIsProcessing(false);
  }, []);

  const startListening = useCallback((specificLang?: Language) => {
    setError(null);

    if (typeof window === 'undefined') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('SPEECH_UNSUPPORTED');
      return;
    }

    try {
      // Abort any existing instance
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const langToUse = specificLang || language;
      const targetLocale = LOCALE_MAP[langToUse] || 'en-IN';
      setActiveLocale(targetLocale);

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = targetLocale;

      recognition.onstart = () => {
        setIsListening(true);
        setIsProcessing(false);
        setError(null);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let fullFinal = '';
        let fullInterim = '';

        for (let i = 0; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item && item[0]) {
            if (item.isFinal) {
              fullFinal += item[0].transcript + ' ';
            } else {
              fullInterim += item[0].transcript;
            }
          }
        }

        const currentText = (fullFinal + fullInterim).trim();
        if (currentText) {
          setTranscript(currentText);
          if (onTranscriptChange) {
            onTranscriptChange(currentText);
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setError('PERMISSION_DENIED');
        } else if (event.error === 'no-speech') {
          setError('NO_SPEECH');
        } else {
          setError(event.error || 'ERROR');
        }
        setIsListening(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };

      recognition.start();
    } catch (err: unknown) {
      console.error('Failed to start speech recognition:', err);
      setError('FAILED_TO_START');
      setIsListening(false);
    }
  }, [language, onTranscriptChange]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    isProcessing,
    activeLocale,
    transcript,
    setTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}

