import { motion } from 'framer-motion';
import { ClipboardList, Sliders, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const ICONS = [ClipboardList, Sliders, Sparkles];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Process() {
  const { t } = useLang();
  const p = t.process;

  return (
    <section className="py-[8rem] px-[6vw] bg-[var(--white)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]">
            {p.eyebrow}
          </span>
          <h2
            className="text-[2.8rem] leading-[1.1] font-light text-[var(--charcoal)] max-w-[500px]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {p.titlePre} <em className="text-[var(--rose-gold)]">{p.titleAccent}</em>
          </h2>
          <p className="text-[var(--text-body)] text-[0.95rem] max-w-[440px] leading-relaxed">{p.subtitle}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {p.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className={[
                  'flex flex-col gap-6 py-12 px-8',
                  'border-t border-[rgba(44,44,44,0.1)]',
                  i < p.steps.length - 1 ? 'md:border-r md:border-[rgba(44,44,44,0.1)]' : '',
                ].join(' ')}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--sage-light)]">
                  <Icon size={22} color="var(--sage-dark)" strokeWidth={1.5} />
                </div>
                <span
                  className="text-[4rem] leading-none font-light select-none"
                  style={{ fontFamily: 'var(--font-serif)', color: 'rgba(196,150,122,0.28)' }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-[1.5rem] font-light text-[var(--charcoal)]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {step.title}
                </h3>
                <p className="text-[0.9rem] text-[var(--text-body)] leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
