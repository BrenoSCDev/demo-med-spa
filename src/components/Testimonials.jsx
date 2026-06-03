import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;

  return (
    <section className="py-[8rem] px-[6vw] bg-[var(--off-white)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]">
            {tm.eyebrow}
          </span>
          <h2
            className="text-[2.8rem] leading-[1.1] font-light text-[var(--charcoal)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {tm.titlePre} <em className="text-[var(--rose-gold)]">{tm.titleAccent}</em>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {tm.items.map((r) => (
            <motion.div
              key={r.name}
              variants={cardVariants}
              className="rounded-[1.75rem] p-[2px] bg-[rgba(44,44,44,0.05)] border border-[rgba(44,44,44,0.08)]"
            >
              <div className="bg-[var(--white)] rounded-[calc(1.75rem-2px)] p-8 flex flex-col gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] h-full">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[var(--rose-gold)] text-[1rem]">★</span>
                  ))}
                </div>
                <span
                  className="inline-flex w-fit text-[0.68rem] font-medium px-3 py-1 rounded-full tracking-wide"
                  style={{ color: 'var(--rose-gold-dark)', background: 'rgba(196,150,122,0.08)', border: '1px solid rgba(196,150,122,0.3)' }}
                >
                  {r.result}
                </span>
                <p
                  className="text-[1.05rem] leading-relaxed text-[var(--charcoal)] font-light flex-1"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[rgba(44,44,44,0.08)]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[0.7rem] font-medium text-[var(--white)] shrink-0"
                    style={{ background: 'var(--charcoal)', fontFamily: 'var(--font-serif)' }}
                  >
                    {r.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.85rem] font-medium text-[var(--charcoal)]">{r.name}</span>
                    <span className="text-[0.75rem] text-[var(--charcoal-light)]">{r.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
