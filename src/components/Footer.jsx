import { Globe, Mail, Phone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const locations = t.locations.list;

  return (
    <footer className="bg-[var(--off-white-dark)] px-[6vw] pt-20 pb-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[rgba(44,44,44,0.1)]">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="text-[2.2rem] font-light leading-none text-[var(--charcoal)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Aura
              </div>
              <div className="text-[0.58rem] tracking-[0.25em] uppercase text-[var(--charcoal-light)] mt-0.5">
                Aesthetics &amp; Wellness
              </div>
            </div>
            <p className="text-[0.88rem] text-[var(--charcoal-light)] leading-relaxed" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              {f.tagline}
            </p>
            <div className="flex gap-4 pt-1">
              {[
                { icon: Globe, label: 'Website' },
                { icon: Mail, label: 'Email' },
                { icon: Phone, label: 'Phone' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-[rgba(44,44,44,0.15)] flex items-center justify-center text-[var(--charcoal-mid)] hover:text-[var(--rose-gold)] hover:border-[var(--rose-gold)] transition-colors duration-200">
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Treatments */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[var(--charcoal)]">
              {f.treatmentsLabel}
            </h4>
            <nav className="flex flex-col gap-3">
              {f.treatments.map((item) => (
                <a key={item} href="#services" className="text-[0.875rem] text-[var(--charcoal-light)] hover:text-[var(--charcoal)] transition-colors duration-150">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* About */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[var(--charcoal)]">
              {f.aboutLabel}
            </h4>
            <nav className="flex flex-col gap-3">
              {f.about.map((item) => (
                <a key={item} href="#" className="text-[0.875rem] text-[var(--charcoal-light)] hover:text-[var(--charcoal)] transition-colors duration-150">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[var(--charcoal)]">
              {f.locationsLabel}
            </h4>
            <div className="flex flex-col gap-5">
              {locations.map((loc) => (
                <div key={loc.city}>
                  <p className="text-[0.8rem] font-medium text-[var(--charcoal)] mb-0.5">{loc.city}</p>
                  <p className="text-[0.8rem] text-[var(--charcoal-light)] leading-snug">{loc.line1}</p>
                  <p className="text-[0.8rem] text-[var(--charcoal-light)]">{loc.line2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 text-[0.75rem] text-[var(--charcoal-light)]">
          <span>© {new Date().getFullYear()} Aura Aesthetics. {f.copyright}</span>
          <span>{f.hours}</span>
        </div>
      </div>
    </footer>
  );
}
