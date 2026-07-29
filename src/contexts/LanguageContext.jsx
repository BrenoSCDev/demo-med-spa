import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const SUPPORTED_LANGS = ['en', 'pt'];
const DEFAULT_LANG = 'en';

// A `?lang=pt` / `?lang=en` query param pins the language for the whole visit
// and hides the picker, so a link can be shared pre-translated.
function readLangParam() {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('lang');
  if (!param) return null;
  const code = param.trim().toLowerCase();
  return SUPPORTED_LANGS.includes(code) ? code : null;
}

export function LanguageProvider({ children }) {
  const [pinnedLang] = useState(readLangParam);
  const [lang, setLang] = useState(pinnedLang ?? DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang], isLangPinned: pinnedLang !== null }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
