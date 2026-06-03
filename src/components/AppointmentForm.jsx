import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

function FieldWrapper({ label, error, children, optional }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.75rem] font-medium tracking-wide text-[var(--charcoal)] uppercase">
        {label}{optional && <span className="ml-1 text-[var(--charcoal-light)] normal-case font-normal tracking-normal">(optional)</span>}
      </label>
      {children}
      {error && <span className="text-[0.72rem] text-red-500">{error}</span>}
    </div>
  );
}

const inputClass = 'w-full bg-[var(--white)] border border-[rgba(44,44,44,0.15)] rounded-xl px-4 py-3 text-[0.9rem] text-[var(--charcoal)] placeholder:text-[var(--charcoal-light)] focus:border-[var(--rose-gold)] transition-colors duration-150';

const INITIAL = { name: '', email: '', phone: '', treatment: '', date: '', time: '', notes: '' };

export default function AppointmentForm() {
  const { t } = useLang();
  const f = t.form;

  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!fields.name.trim()) e.name = f.errors.name;
    if (!fields.email.trim()) {
      e.email = f.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = f.errors.emailInvalid;
    }
    if (!fields.phone.trim()) {
      e.phone = f.errors.phone;
    } else if (!/^[\d\s\-\+\(\)]{7,}$/.test(fields.phone)) {
      e.phone = f.errors.phoneInvalid;
    }
    if (!fields.treatment) e.treatment = f.errors.treatment;
    if (!fields.date) e.date = f.errors.date;
    if (!fields.time) e.time = f.errors.time;
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  }

  const firstName = fields.name.trim().split(' ')[0];

  return (
    <section id="appointment" className="py-[8rem] px-[6vw] bg-[var(--white)]">
      <div className="max-w-[1320px] mx-auto grid grid-cols-[1fr_1fr] gap-20 items-start max-[960px]:grid-cols-1 max-[960px]:gap-14">

        {/* ── Form column ── */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]">
              {f.eyebrow}
            </span>
            <h2 className="text-[2.8rem] leading-[1.1] font-light text-[var(--charcoal)]" style={{ fontFamily: 'var(--font-serif)' }}>
              {f.titlePre} <em className="text-[var(--rose-gold)]">{f.titleAccent}</em>
            </h2>
            <p className="text-[0.95rem] text-[var(--text-body)] max-w-[44ch] leading-relaxed">{f.subtitle}</p>
          </div>

          <div className="rounded-[1.75rem] p-[2px] bg-[rgba(44,44,44,0.05)] border border-[rgba(44,44,44,0.08)]">
            <div className="bg-[var(--off-white)] rounded-[calc(1.75rem-2px)] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FieldWrapper label={f.fields.name} error={errors.name}>
                        <input className={inputClass} type="text" name="name" value={fields.name} onChange={handleChange} placeholder={f.fields.namePlaceholder} />
                      </FieldWrapper>
                      <FieldWrapper label={f.fields.email} error={errors.email}>
                        <input className={inputClass} type="email" name="email" value={fields.email} onChange={handleChange} placeholder={f.fields.emailPlaceholder} />
                      </FieldWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FieldWrapper label={f.fields.phone} error={errors.phone}>
                        <input className={inputClass} type="tel" name="phone" value={fields.phone} onChange={handleChange} placeholder={f.fields.phonePlaceholder} />
                      </FieldWrapper>
                      <FieldWrapper label={f.fields.treatment} error={errors.treatment}>
                        <select className={inputClass} name="treatment" value={fields.treatment} onChange={handleChange}>
                          <option value="">{f.fields.treatmentDefault}</option>
                          {f.treatmentOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </FieldWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FieldWrapper label={f.fields.date} error={errors.date}>
                        <input className={inputClass} type="date" name="date" value={fields.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                      </FieldWrapper>
                      <FieldWrapper label={f.fields.time} error={errors.time}>
                        <select className={inputClass} name="time" value={fields.time} onChange={handleChange}>
                          <option value="">{f.fields.timeDefault}</option>
                          <option value="08:00">8:00 AM</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="19:00">7:00 PM</option>
                        </select>
                      </FieldWrapper>
                    </div>

                    <FieldWrapper label={f.fields.notes} optional>
                      <textarea className={`${inputClass} resize-none`} name="notes" value={fields.notes} onChange={handleChange} rows={4} placeholder={f.fields.notesPlaceholder} />
                    </FieldWrapper>

                    <div className="pt-2 flex justify-center">
                      <button type="submit" className="bg-[var(--charcoal)] text-[var(--white)] px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-[var(--charcoal-mid)] transition-colors duration-200">
                        {f.submit}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col items-center gap-6 py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(196,150,122,0.12)', border: '2px solid rgba(196,150,122,0.35)' }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M6 14.5L11.5 20L22 9" stroke="var(--rose-gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-[2rem] font-light text-[var(--charcoal)]" style={{ fontFamily: 'var(--font-serif)' }}>
                      {f.success.title}
                    </h3>
                    <p className="text-[0.95rem] text-[var(--text-body)] max-w-[380px] leading-relaxed">
                      {f.success.body.replace('{name}', firstName)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Map column ── */}
        <div className="flex flex-col gap-6 sticky top-10 max-[960px]:static">
          <div className="rounded-[1.5rem] overflow-hidden border border-[rgba(44,44,44,0.1)] shadow-[0_8px_40px_rgba(44,44,44,0.08)]" style={{ height: '420px' }}>
            <iframe
              title="Aura Aesthetics Chicago location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-87.6400%2C41.8900%2C-87.6100%2C41.9100&layer=mapnik&marker=41.9018%2C-87.6237"
              width="100%"
              height="100%"
              style={{ border: 'none', filter: 'saturate(0.45) sepia(0.15) brightness(1.06)', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-[1.25rem] border border-[rgba(44,44,44,0.1)] bg-[var(--off-white)] divide-y divide-[rgba(44,44,44,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex items-start gap-4 p-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-[2px] bg-[rgba(196,150,122,0.12)] border border-[rgba(196,150,122,0.25)]">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 7 3.5a1.5 1.5 0 0 1 0 3z" fill="var(--rose-gold)" />
                </svg>
              </span>
              <div className="flex flex-col gap-[0.2rem]">
                <span className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-[var(--rose-gold)]">{f.address}</span>
                <span className="text-[0.85rem] text-[var(--text-body)] leading-[1.6]">840 N Michigan Ave, Suite 1200</span>
                <span className="text-[0.85rem] text-[var(--text-body)]">Chicago, IL 60611</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-[2px] bg-[rgba(196,150,122,0.12)] border border-[rgba(196,150,122,0.25)]">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="var(--rose-gold)" strokeWidth="1.2" />
                  <path d="M7 4v3.5l2 1.5" stroke="var(--rose-gold)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
              <div className="flex flex-col gap-[0.2rem]">
                <span className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-[var(--rose-gold)]">{f.hours}</span>
                <span className="text-[0.85rem] text-[var(--text-body)]">{t.footer.hours}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
