import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getMessages } from './messages';
import type { Locale } from './types';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tm: <T = unknown>(key: string) => T;
};

const STORAGE_KEY = 'ai-llm-course.locale';

function detectInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt-BR' || saved === 'en') return saved;
    const browser = window.navigator.language.toLowerCase();
    if (browser.startsWith('pt')) return 'pt-BR';
  }
  return 'en';
}

function getByPath(source: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);
}

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{\{(.*?)\}\}/g, (_, rawKey) => {
    const key = String(rawKey).trim();
    return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
  });
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: (key, params) => {
        const message = getByPath(messages, key);
        if (typeof message === 'string') return interpolate(message, params);
        return key;
      },
      tm: function <T>(key: string) {
        return getByPath(messages, key) as T;
      },
    }),
    [locale, messages],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
