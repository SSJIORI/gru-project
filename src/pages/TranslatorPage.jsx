import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import arrowC from '../assets/arrow-c.png';
import arrowCurved from '../assets/arrow-curved.png';
import hashtagIcon from '../assets/hashtag-icon.png';
import informalFrog from '../assets/Informal Frog.png';
import formalFrog from '../assets/Formal Frog.png';

const CARD_WRAPPER_CLASSES = 'flex h-[300px] w-full flex-col items-start gap-6 rounded-[20px] bg-[var(--card-bg)] p-6 sm:h-[380px] lg:h-[450px] lg:w-[655px]';
const HEADER_LABEL_CLASSES = 'text-[16px] font-bold uppercase leading-[0.8] tracking-[2.56px] text-[var(--brand-blue)]';
const HEADER_TITLE_CLASSES = 'text-[14px] font-hero leading-[0.8] text-[var(--text-dark)] lg:text-[20px]';
const COUNT_CLASSES = 'text-[16px] font-bold leading-[0.8] text-[var(--text-dark)]';
const ACTION_BUTTON_CLASSES =
  'group relative flex items-center justify-center gap-2 overflow-hidden rounded-[100px] bg-[var(--cta-lime)] text-[16px] font-bold leading-[0.8] text-[var(--text-dark)] transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)] disabled:cursor-not-allowed disabled:bg-[var(--disabled-bg)] disabled:text-ink/40';
const SHINE_SPAN_CLASSES =
  'pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition duration-700 group-enabled:group-hover:translate-x-[120%]';
const API_URL = import.meta.env.VITE_REWRITE_API_URL ?? 'http://127.0.0.1:8000/rewrite';
const MODEL_OPTIONS = [
  { id: 'gru', label: 'GRU' },
  { id: 'flan', label: 'FLAN-T5' },
];

function CardHeader({ label, title }) {
  return (
    <div className="flex w-full flex-col items-start gap-4 self-stretch">
      <p className={HEADER_LABEL_CLASSES}>{label}</p>
      <h2 className={HEADER_TITLE_CLASSES}>{title}</h2>
      <div className="h-0 w-full border-t border-[var(--brand-blue)]" />
    </div>
  );
}

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gru');
  const [isTranslating, setIsTranslating] = useState(false);

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const isTranslateDisabled = wordCount < 2 || isTranslating;

  async function handleTranslate() {
    setIsTranslating(true);
    setOutputText('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const nextOutput = data.outputs?.[0] ?? data.output ?? data.text ?? '';

      if (!nextOutput) {
        throw new Error('The model returned an empty response.');
      }

      setOutputText(nextOutput);
    } catch (error) {
      console.error('Failed to translate message', error);
      toast.error('Model backend is unavailable', {
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          fontWeight: 700,
          borderRadius: '999px',
        },
      });
    } finally {
      setIsTranslating(false);
    }
  }

  async function handleCopyOutput() {
    if (!outputText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast.success('Copied', {
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          fontWeight: 700,
          borderRadius: '999px',
        },
      });
    } catch (error) {
      console.error('Failed to copy output text', error);
    }
  }

  return (
    <section className="relative min-h-screen w-screen overflow-x-hidden bg-[var(--brand-blue)] lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--grid-overlay),var(--grid-overlay)),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px),linear-gradient(0deg,var(--grid-line)_1px,transparent_1px)] bg-[length:100%_100%,42px_42px,42px_42px]" />
      <div className="relative mx-auto w-full max-w-[1440px] lg:h-full">
        <motion.img
          src={arrowC}
          alt="Arrow icon"
          className="pointer-events-none absolute right-[65px] top-[220px] z-20 h-[112px] w-[110.014px] hidden lg:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />
        <motion.img
          src={arrowCurved}
          alt="Curved arrow icon"
          className="pointer-events-none absolute bottom-[5px] left-[130px] z-20 h-[110px] w-[114.948px] hidden lg:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.img
          src={hashtagIcon}
          alt="Hashtag icon"
          className="pointer-events-none absolute left-[590px] top-[20px] z-20 h-[54.801px] w-[48.638px] -rotate-[5.398deg] hidden lg:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.img
          src={informalFrog}
          alt="Informal frog icon"
          className="pointer-events-none absolute left-[168px] top-[130px] z-0 hidden lg:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.img
          src={formalFrog}
          alt="Formal frog icon"
          className="pointer-events-none absolute right-[168px] top-[130px] z-0 hidden lg:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      <div className="relative z-10 flex flex-col items-center px-4 pt-5 pb-10 lg:px-0 lg:pt-[40px] lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-center font-hero text-[28px] font-black uppercase leading-[0.8] text-[var(--text-light)] sm:text-[38px] lg:text-[48px]">
            <span className="block">LET&apos;S</span>
            <span className="block">TAKE THIS</span>
            <span className="block">OFFLINE</span>
          </Link>
        </motion.div>
        <motion.div
          className="mt-8 flex h-[48px] items-center rounded-full border border-white/30 bg-white/15 p-1 backdrop-blur"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {MODEL_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedModel(option.id)}
              className={`h-10 min-w-[104px] rounded-full px-5 text-[13px] font-bold uppercase tracking-[1.6px] transition ${
                selectedModel === option.id
                  ? 'bg-[var(--cta-lime)] text-[var(--text-dark)] shadow-[0_8px_20px_rgba(0,0,0,0.16)]'
                  : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
              aria-pressed={selectedModel === option.id}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 flex w-full flex-col items-center justify-center gap-6 lg:mt-[48px] lg:w-auto lg:flex-row lg:gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className={CARD_WRAPPER_CLASSES}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardHeader label="INPUT" title="WHAT YOU WANT TO SAY" />
            <div className="relative flex w-full flex-1 flex-col items-start gap-4 self-stretch rounded-[16px] bg-[var(--input-bg)] px-4 py-6">
              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="absolute right-6 top-4 text-ink/50 transition hover:text-ink"
                  aria-label="Clear input"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <textarea
                className="h-full w-full resize-none bg-transparent pr-10 text-sm font-medium text-ink/90 outline-none placeholder:text-ink/50 custom-scrollbar"
                placeholder="Start typing your message..."
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-between self-stretch">
              <span className={COUNT_CLASSES}>{inputText.length} CHARS</span>
              <button
                type="button"
                className={`${ACTION_BUTTON_CLASSES} px-12 py-4`}
                onClick={handleTranslate}
                disabled={isTranslateDisabled}
              >
                <span className={SHINE_SPAN_CLASSES} />
                {isTranslating ? 'WORKING' : 'TRANSLATE'}
              </button>
            </div>
          </motion.div>
          <motion.div
            className={CARD_WRAPPER_CLASSES}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <CardHeader label="OUTPUT" title="WHAT YOU SHOULD SAY" />
            <div className="flex w-full flex-1 flex-col items-start gap-4 self-stretch rounded-[16px] bg-[var(--input-bg)] px-4 py-6">
              <textarea
                className="h-full w-full resize-none bg-transparent text-sm font-medium text-ink/90 outline-none placeholder:text-ink/50 custom-scrollbar"
                placeholder="Your translated message will appear here..."
                value={outputText}
                readOnly
              />
            </div>
            <div className="flex w-full items-center justify-between self-stretch">
              <span className={COUNT_CLASSES}>{outputText.length} CHARS</span>
              <button
                type="button"
                className={`${ACTION_BUTTON_CLASSES} px-6 py-4`}
                onClick={handleCopyOutput}
                disabled={!outputText}
              >
                <span className={SHINE_SPAN_CLASSES} />
                <Clipboard size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
