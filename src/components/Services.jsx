import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="services" className="py-[8rem] px-[6vw] bg-[var(--off-white)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-4 max-w-[560px]">
          <span className="inline-flex w-fit px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]">
            {s.eyebrow}
          </span>
          <h2
            className="text-[2.8rem] leading-[1.1] font-light text-[var(--charcoal)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {s.titlePre} <em className="text-[var(--rose-gold)]">{s.titleAccent}</em> {s.titlePost}
          </h2>
          <p className="text-[var(--text-body)] text-[0.95rem] leading-relaxed">{s.subtitle}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {s.items.map((item) => (
            <motion.div
              key={item.num}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              className="rounded-[1.75rem] p-[2px] bg-[rgba(44,44,44,0.05)] border border-[rgba(44,44,44,0.08)]"
            >
              <div className="bg-[var(--off-white)] rounded-[calc(1.75rem-2px)] p-10 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] h-full">
                <div className="flex items-start justify-between">
                  <span
                    className="text-[3.5rem] leading-none font-light select-none"
                    style={{ fontFamily: 'var(--font-serif)', color: 'rgba(196,150,122,0.28)' }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="text-[0.8rem] font-medium px-3 py-1 rounded-full"
                    style={{ color: 'var(--rose-gold)', background: 'rgba(196,150,122,0.1)', border: '1px solid rgba(196,150,122,0.25)' }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="w-7 h-[2px] bg-[var(--rose-gold)]" />
                <h3
                  className="text-[1.6rem] font-light leading-tight text-[var(--charcoal)]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.name}
                </h3>
                <p className="text-[0.8rem] font-medium tracking-wide text-[var(--sage-dark)]">{item.tagline}</p>
                <p className="text-[0.9rem] text-[var(--text-body)] leading-relaxed flex-1">{item.description}</p>
                <a
                  href="#appointment"
                  className="text-[0.8rem] font-medium text-[var(--charcoal)] hover:text-[var(--rose-gold)] transition-colors duration-200 mt-auto pt-4 border-t border-[rgba(44,44,44,0.08)]"
                >
                  {s.ctaLink}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
