import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Credentials() {
  const { t } = useLang();
  const c = t.credentials;

  return (
    <section className="py-[8rem] px-[6vw] bg-[var(--charcoal)] relative overflow-hidden">
      {/* Clinic interior background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/Clinic%20Interior.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.12]"
        />
      </div>
      <div className="max-w-[1320px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-[580px]">
          <span className="inline-flex w-fit px-[0.9rem] py-[0.35rem] border border-[rgba(255,255,255,0.2)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.06)]">
            {c.eyebrow}
          </span>
          <h2
            className="text-[2.8rem] leading-[1.1] font-light text-[var(--white)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.titlePre} <em className="text-[var(--rose-gold)]">{c.titleAccent}</em>
          </h2>
          <p className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {c.body}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[rgba(255,255,255,0.1)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {c.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={[
                'flex flex-col gap-3 py-10 px-8',
                i < c.stats.length - 1 ? 'border-r border-[rgba(255,255,255,0.1)]' : '',
              ].join(' ')}
            >
              <span
                className="text-[3.2rem] leading-none font-light text-[var(--rose-gold)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </span>
              <span className="text-[0.85rem] font-medium text-[var(--white)]">{stat.label}</span>
              <span className="text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {stat.note}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
