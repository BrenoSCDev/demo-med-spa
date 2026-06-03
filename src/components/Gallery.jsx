import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const IMAGES = [
  '/Botox%20%20Lip%20Filler.png',
  '/Laser%20Resurfacing.png',
  '/Body%20Contouring.png',
];

const FADE_UP = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

function GalleryTile({ src, caption, sub, tall, wide }) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-[1.5rem] will-change-transform cursor-pointer ${tall ? 'row-span-2' : ''} ${wide ? 'col-span-2 max-[680px]:col-span-1' : ''}`}
      variants={FADE_UP}
      whileHover={{ scale: 1.015, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className={`w-full overflow-hidden ${tall ? 'h-full min-h-[540px]' : wide ? 'min-h-[280px]' : 'min-h-[258px]'} max-[680px]:min-h-[240px]`}>
        <motion.img
          src={src}
          alt={caption}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,44,44,0.6)] via-transparent to-transparent pointer-events-none" />

      {/* Rose-gold hover tint */}
      <div className="absolute inset-0 bg-[rgba(196,150,122,0.09)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
        <span className="block text-[0.6rem] font-medium tracking-[0.18em] uppercase text-[rgba(248,248,246,0.65)] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {sub}
        </span>
        <span className="font-[var(--font-serif)] text-[1.2rem] font-light text-[var(--off-white)] leading-none italic">
          {caption}
        </span>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-[var(--rose-gold)]" />
        <div className="absolute top-0 right-0 w-px h-full bg-[var(--rose-gold)]" />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery;

  return (
    <section className="py-[8rem] px-[6vw] bg-[var(--white)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(44,44,44,0.1),transparent)]">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-14">

        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 max-w-[480px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={STAGGER}
        >
          <motion.span
            className="inline-flex w-fit px-[0.9rem] py-[0.35rem] border border-[rgba(44,44,44,0.15)] rounded-full text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--charcoal-mid)] bg-[rgba(44,44,44,0.04)]"
            variants={FADE_UP}
          >
            {g.eyebrow}
          </motion.span>
          <motion.h2
            className="text-[2.8rem] leading-[1.1] font-light text-[var(--charcoal)]"
            style={{ fontFamily: 'var(--font-serif)' }}
            variants={FADE_UP}
          >
            {g.titlePre} <em className="text-[var(--rose-gold)]">{g.titleAccent}</em>
          </motion.h2>
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-4 max-[680px]:grid-cols-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={STAGGER}
        >
          {/* Tall left — Botox/Lip Filler, spans 2 rows */}
          <GalleryTile src={IMAGES[0]} caption={g.items[0].caption} sub={g.items[0].sub} tall />

          {/* Top right — Laser Resurfacing */}
          <GalleryTile src={IMAGES[1]} caption={g.items[1].caption} sub={g.items[1].sub} />

          {/* Bottom right — Body Contouring */}
          <GalleryTile src={IMAGES[2]} caption={g.items[2].caption} sub={g.items[2].sub} />
        </motion.div>

      </div>
    </section>
  );
}
