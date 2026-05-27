import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import hashtagIcon from '../assets/hashtag-icon.png';
import leftFrogIcon from '../assets/Left Frog Icon.png';
import rightFrogIcon from '../assets/Right Frog Icon.png';
import arrowC from '../assets/arrow-c.png';
import arrowCurved from '../assets/arrow-curved.png';

export default function Hero() {
  return (
    <header className="relative flex min-h-screen items-center justify-center bg-[var(--brand-blue)] px-5 py-10 text-[var(--text-light)] sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--grid-overlay),var(--grid-overlay)),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px),linear-gradient(0deg,var(--grid-line)_1px,transparent_1px)] bg-[length:100%_100%,42px_42px,42px_42px]" />
      <motion.div
        className="relative z-10 flex min-h-[420px] items-center justify-center text-center sm:min-h-[520px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block">
          <motion.img
            src={hashtagIcon}
            alt="Hashtag icon"
            className="pointer-events-none absolute left-[165px] -top-8 h-24 w-24"
            animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={leftFrogIcon}
            alt="Left frog icon"
            className="pointer-events-none absolute left-[-20px] top-[-80px] h-[150px] w-[150px] -rotate-[12.71deg]"
            animate={{ y: [0, -6, 0], rotate: [-12.71, -10.5, -12.71] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={arrowC}
            alt="Arrow icon"
            className="pointer-events-none absolute left-[732px] top-[12px] h-36 w-36"
            animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={arrowCurved}
            alt="Curved arrow icon"
            className="pointer-events-none absolute left-[32px] top-[252px] h-36 w-36"
            animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={rightFrogIcon}
            alt="Right frog icon"
            className="pointer-events-none absolute bottom-[-20px] right-[-120px] h-[200px] w-[200px] rotate-[7.911deg]"
            animate={{ y: [0, 8, 0], rotate: [7.911, 9.2, 7.911] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <h1 className="text-center font-hero text-[140px] font-black uppercase leading-[0.8] text-[var(--text-light)]">
            <span className="block">LET&apos;S</span>
            <span className="block">TAKE THIS</span>
            <span className="block">OFFLINE</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <Link
              to="/translator"
              className="group relative overflow-hidden rounded-full bg-[var(--cta-lime)] px-12 py-4 text-base font-cta-heavy uppercase text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              Open Translator
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
