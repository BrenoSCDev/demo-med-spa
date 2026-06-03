import { useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-20, 20], [6, -6]);
  const rotateY = useTransform(x, [-20, 20], [-6, 6]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y, rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="relative min-h-[100dvh] bg-[var(--white)] flex items-center py-24 px-[6vw] overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hf_20260506_193942_a2707946-9fdd-4d81-b400-52e8f70e946e.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Subtle white overlay — preserves video warmth while keeping text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(248,248,246,0.70) 50%, rgba(255,255,255,0.55) 100%)',
        }}
      />
      {/* Soft vignette at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(255,255,255,0.18) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <motion.div
          className="flex flex-col gap-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="inline-flex w-fit px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]">
            {h.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-[3.6rem] leading-[1.08] font-light text-[var(--charcoal)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {h.titleLine1}<br />
            <em className="text-[var(--rose-gold)]">{h.titleLine2}</em><br />
            {h.titleLine3}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[1.05rem] text-[var(--text-body)] max-w-[440px] leading-relaxed">
            {h.body}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              className="bg-[var(--charcoal)] text-[var(--white)] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-[var(--charcoal-mid)] transition-colors duration-200"
              onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {h.cta}
            </MagneticButton>
            <a
              href="#services"
              className="text-sm text-[var(--charcoal-mid)] underline underline-offset-4 decoration-[var(--sage)] hover:text-[var(--charcoal)] transition-colors duration-200"
            >
              {h.ctaLink}
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — physician portrait */}
        <motion.div
          initial={{ opacity: 0, x: 50, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative rounded-[1.75rem] overflow-hidden w-full max-w-[420px] shadow-[0_24px_80px_rgba(44,44,44,0.15),0_0_0_1px_rgba(44,44,44,0.08)]">
            {/* Portrait image */}
            <div style={{ aspectRatio: '3/4' }} className="overflow-hidden">
              <img
                src="/Physician%20Portrait.png"
                alt="Lead Physician"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,44,44,0.65)] via-[rgba(44,44,44,0.08)] to-transparent pointer-events-none" />

            {/* Brand label — top right */}
            <div className="absolute top-5 right-5 text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(248,248,246,0.8)] font-medium bg-[rgba(44,44,44,0.45)] backdrop-blur-[6px] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)]">
              {h.cardBrand}
            </div>

            {/* Stats overlay — bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-3">
                {h.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-[0.15rem]">
                    <span className="text-[1.7rem] leading-none font-light text-[var(--rose-gold-light)]" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </span>
                    <span className="text-[0.72rem] font-medium text-[rgba(248,248,246,0.9)]">{stat.label}</span>
                    <span className="text-[0.6rem] text-[rgba(248,248,246,0.5)] tracking-wide">{stat.note}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.7rem] text-[rgba(248,248,246,0.55)] leading-relaxed border-t border-[rgba(255,255,255,0.12)] pt-4">
                {h.cardNote}
              </p>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[-1rem] left-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--white)] shadow-lg border border-[rgba(44,44,44,0.08)] text-[0.7rem] font-medium text-[var(--charcoal)] tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--sage)] inline-block" />
            {h.badge}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
