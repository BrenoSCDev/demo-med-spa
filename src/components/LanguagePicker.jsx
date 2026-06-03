import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const LANGS = ['en', 'pt'];

export default function LanguagePicker() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="fixed top-6 right-6 z-[999] flex items-center gap-[2px] p-[3px] rounded-full bg-[rgba(248,248,246,0.88)] border border-[rgba(44,44,44,0.12)] backdrop-blur-[12px] shadow-[0_2px_16px_rgba(44,44,44,0.1)]"
      role="group"
      aria-label="Language selector"
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            className="relative py-[0.3rem] px-[0.65rem] rounded-full text-[0.65rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer"
            style={{ color: active ? 'var(--white)' : 'var(--charcoal-light)' }}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[var(--charcoal)]"
                layoutId="ms-lang-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
